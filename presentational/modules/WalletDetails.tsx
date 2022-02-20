import React from 'react'
import { Button, ButtonTypes } from '../elements/button/Button'

interface IWalletDetailsProps {
    address?: string;
    balance?: string;
    accounts?: string[];
    handleConnectWallet?: () => void;
    handleDisconnectWallet?: () => void;
}

export const WalletDetails: React.FunctionComponent<IWalletDetailsProps> = ({ 
    address,
    balance,
    accounts,
    handleConnectWallet,
    handleDisconnectWallet
}) => (
    <>
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
    </>
)
