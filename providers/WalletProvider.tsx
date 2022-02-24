import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { provider } from "./Ethereum";

const WalletContext = React.createContext(null);

const useWallet = (): {
  loading?: boolean;
  address?: string;
  balance?: string;
  errorMessage: string;
  handleConnectWallet?: () => void;
  handleDisconnectWallet?: () => void;
} => {
  const {
    setHasListenerAttached,
    handleError,
    loading,
    setLoading,
    balance,
    address,
    errorMessage,
    clearConnectionDetails,
    updateConnectionDetails,
  } = React.useContext(WalletContext);

  if (typeof window.ethereum === "undefined") {
    handleError("You need to install an ethereum wallet like metamask");
    return { errorMessage };
  }

  const handleConnectWallet = async () => {
    setLoading(true);

    provider
      ?.send("eth_requestAccounts", [])
      .then(async () => {
        updateConnectionDetails();
        setHasListenerAttached(true);
      })
      .catch((error) => {
        const message =
          error?.code === 4001
            ? "user cancelled the connection request"
            : error.message;
        handleError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    address,
    balance,
    handleConnectWallet,
    handleDisconnectWallet: clearConnectionDetails,
    errorMessage,
  };
};

const WalletProvider = ({ children }) => {
  const uuid = useCallback(() => uuidv4(), []);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [address, setAddress] = useLocalStorage(`${uuid}-walletAddress`, null);
  const [balance, setBalance] = useLocalStorage(`${uuid}-walletBalance`, null);
  const [hasListenerAttached, setHasListenerAttached] = useLocalStorage(
    "walletListenerAttached",
    false
  );
  const [loading, setLoading] = useState<boolean>(false);

  const clearConnectionDetails = useCallback(() => {
    setAddress(null);
    setBalance(null);
  }, [setAddress, setBalance]);

  const updateConnectionDetails = useCallback(async () => {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    setAddress(address);
    setBalance(ethers.utils.formatEther(balance.toString()));
    setErrorMessage(null);
  }, [setAddress, setBalance]);

  const handleError = useCallback(
    (message) => {
      clearConnectionDetails();
      setErrorMessage(message);
    },
    [clearConnectionDetails]
  );

  useEffect(() => {
    if (!window?.ethereum || !hasListenerAttached) {
      return;
    }

    const handleAccountsChanged = async (accounts) => {
      if (accounts && accounts.length > 0) {
        updateConnectionDetails();
        return;
      }
      handleError("User cancelled the connection");
    };

    window?.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      if (window?.ethereum?.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [updateConnectionDetails, handleError, hasListenerAttached]);

  return (
    <WalletContext.Provider
      value={{
        hasListenerAttached,
        setHasListenerAttached,
        address,
        balance,
        loading,
        setLoading,
        errorMessage,
        clearConnectionDetails,
        updateConnectionDetails,
        handleError,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export { WalletProvider, useWallet, provider };
