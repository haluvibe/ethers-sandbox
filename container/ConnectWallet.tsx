import React from "react";
import { Button, ButtonTypes } from "../presentational/elements/button/Button";
import { ConnectedAccountAddress } from "../presentational/modules/ConnectedAccountAddress";
import { ConnectedAccountBalance } from "../presentational/modules/ConnectedAccountBalance";
import { ErrorMessage } from "../presentational/modules/ErrorMessage";
import { Status } from "../presentational/modules/Status";
import { useWallet } from "../providers/WalletProvider";

export const ConnectWallet: React.FunctionComponent = () => {
  const { loading, errorMessage, address, balance, handleConnectWallet, handleDisconnectWallet } = useWallet();

  if (loading) {
    return <Status status={"connecting"} />;
  }

  return (
    <>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
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
        <ConnectedAccountAddress address={address} />
      )}
      {balance && (
        <ConnectedAccountBalance balance={balance} />
      )}
    </>
  );
};
