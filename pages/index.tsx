import React from 'react'
import { ConnectWallet } from '../container/ConnectWallet'
import { WalletProvider } from '../providers/WalletProvider'
import { Resource } from '../sandbox/Resource'



const Home: React.FunctionComponent = () => {
  return (
  <WalletProvider>
    <Resource id={"one"} />
    <ConnectWallet />
  </WalletProvider>
)}
export default Home
