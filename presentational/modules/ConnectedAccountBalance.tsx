import React from "react";

interface ICoonnectedAccountBalanceProps {
  balance: string;
}

export const ConnectedAccountBalance: React.FunctionComponent<ICoonnectedAccountBalanceProps> = ({
  balance,
}) => (
    <div data-testid={"connected-account-balance"}>
        Connected Account Balance (ETH): {balance}
    </div>
);
