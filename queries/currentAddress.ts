import { ethers } from 'ethers';
import useSWR from 'swr'

// fetcher
async function getWalletAddress() {
    const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    return walletAddress
}

export function useWalletAddress(config = {}) {
  return useSWR<string>('WalletAddress', getWalletAddress, config)
}
