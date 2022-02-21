import React from "react";
import { ErrorMessage } from "../presentational/modules/ErrorMessage";
import { Status } from "../presentational/modules/Status";
import { WalletDetails } from "../presentational/modules/WalletDetails";
import { useWallet } from "../providers/WalletProvider";

export const ConnectWallet: React.FunctionComponent = () => {
  const { loading, errorMessage, ...rest } = useWallet();

  if (loading) {
    return <Status status={"connecting"} />;
  }

  return (
    <>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <WalletDetails {...rest} />
    </>
  );
};
