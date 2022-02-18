import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WalletContext = React.createContext(null);

let provider;
let signer;

if (process.browser) {
  provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );
}

const useWallet = () => {

    const {setHasListenerAttached, accounts, setAccounts, address, setAddress, balance, setBalance, loading, setLoading, setErrorMessage, errorMessage} = React.useContext(WalletContext);
  
    if (typeof window.ethereum === 'undefined') {
      setErrorMessage('You need to install an ethereum wallet like metamask')
      setAddress(null)
      setBalance(null)
      return { errorMessage }
    }

    const handleConnectWallet = async () => {
      setLoading(true)
      
      provider?.send("eth_requestAccounts", []).then(async () => {
          const accounts = await provider.listAccounts()
          signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balance = await provider.getBalance(address);
          setAccounts(accounts)
          setAddress(address)
          setBalance(ethers.utils.formatEther(balance.toString()))
          setErrorMessage(null)
          setHasListenerAttached(true)
        }).catch((error) => {
          if (error?.code === 4001) {
            setErrorMessage('user cancelled the connection request')
            return
          }
          setErrorMessage(errorMessage)
          setAddress(null)
          setBalance(null)
          setAccounts(null)
        }).finally(() => {
          setLoading(false)
        })

    };

    const handleDisconnectWallet = async () => {
        setAddress(null)
        setBalance(null)
        setAccounts(null)
        setErrorMessage(null)
    }

    
  
    return { loading, accounts, address, balance, handleConnectWallet, handleDisconnectWallet, errorMessage };
  };

const WalletProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  const [address, setAddress] = useLocalStorage("walletAddress", null)
  const [balance, setBalance] = useLocalStorage("walletBalance", null)
  const [accounts, setAccounts] = useLocalStorage("walletAccounts", null)
  const [hasListenerAttached, setHasListenerAttached] = useLocalStorage("walletListenerAttached", false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!window?.ethereum || !hasListenerAttached) {
      return
    }

    const handleAccountsChanged = async (accounts) => {
      if (!signer) {
        signer = await provider.getSigner();
      }
      if (accounts && accounts.length > 0) {
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        setAccounts(accounts)
        setAddress(address)
        setBalance(ethers.utils.formatEther(balance.toString()))
        setErrorMessage(null)
        return
      }
      setErrorMessage('User cancelled the connection')
      setAddress(null)
      setBalance(null)
      setAccounts(null)
    }

    window?.ethereum?.on('accountsChanged', handleAccountsChanged)

    return () => {
      if (window?.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [setErrorMessage, setAddress, setBalance, setAccounts, hasListenerAttached, signer])

  return (
    <WalletContext.Provider value={{hasListenerAttached, setHasListenerAttached, accounts, setAccounts, address, setAddress, balance, setBalance, loading, setLoading, errorMessage, setErrorMessage}}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletProvider, useWallet };