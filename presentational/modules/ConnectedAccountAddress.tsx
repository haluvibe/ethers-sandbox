import React from "react";

interface ICoonnectedAccountAddressProps {
  address: string;
}

export const ConnectedAccountAddress: React.FunctionComponent<ICoonnectedAccountAddressProps> = ({
  address,
}) => (
    <div data-testid={"connected-account-address"}>
        Connected Account Address: {address}
    </div>
);
