import React from "react";
import { ConnectWallet } from "../container/ConnectWallet";
import { Container } from "../presentational/layout/Container";
import { WalletProvider } from "../providers/WalletProvider";
import { provider } from "../providers/Ethereum";
import { UserProvider } from "../providers/UserProvider";
import { UserProfile } from "../container/UserProfile";
import { EnterPin } from "../container/EnterPin";
import { PleaseInstallWallet } from "../presentational/modules/PleaseInstallWallet";


const Home: React.FunctionComponent = () => {
  if (!provider) {
    return (
      <PleaseInstallWallet />
    );
  }
  return (
    <WalletProvider>
      <UserProvider>
        <Container>
          <ConnectWallet />
          <EnterPin />
          <UserProfile />
        </Container>
      </UserProvider>
    </WalletProvider>
  );
};
export default Home;
