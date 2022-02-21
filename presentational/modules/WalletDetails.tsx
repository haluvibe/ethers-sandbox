import React from "react";
import { Button, ButtonTypes } from "../elements/button/Button";

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
  handleDisconnectWallet,
}) => (
  <>
    {!address ? (
      <Button
        testid={"connect-wallet-button"}
        type={ButtonTypes.secondary}
        label={"Connect Wallet"}
        onClick={handleConnectWallet}
      />
    ) : (
      <Button
        testid={"disconnect-wallet-button"}
        type={ButtonTypes.secondary}
        label={"Disconnect Wallet"}
        onClick={handleDisconnectWallet}
      />
    )}

    {address && (
      <div data-testid={"connected-account-address"}>
        Connected Account Address: {address}
      </div>
    )}
    {balance && (
      <div data-testid={"connected-account-balance"}>
        Connected Account Balance (ETH): {balance}
      </div>
    )}
    {accounts && (
      <div>
        Connected Wallet Accounts:{" "}
        {accounts.map((account) => (
          <div key={account}>{account}</div>
        ))}
      </div>
    )}
  </>
);
