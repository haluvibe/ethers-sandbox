import React from 'react'
import { Button, ButtonTypes } from '../presentational/elements/button/Button'
import { useWallet } from '../providers/WalletProvider'

export const ConnectWallet: React.FunctionComponent = () => {
    const { accounts, address, balance, handleConnectWallet, handleDisconnectWallet, loading, errorMessage } = useWallet()

    if (loading) {
        return <div>connecting...</div>
    }
    
  return (
    <div>
        {errorMessage && (<div>
            {errorMessage}
        </div>)}
        {!address ? (
            <Button type={ButtonTypes.secondary} label={"Connect Wallet"} onClick={handleConnectWallet} />
        ) : (
            <Button type={ButtonTypes.secondary} label={"Disconnect Wallet"} onClick={handleDisconnectWallet} />
        )}
        
        {address && (
        <div>Connected Wallet Address: {address}</div>
        )}
        {balance && (
        <div>Connected Wallet Balance (ETH): {balance}</div>
        )}
        {accounts && (
        <div>Connected Wallet Accounts: {accounts.map(account => <div key={account}>{account}</div>)}
        </div>
        )}
    </div>
)}
