import React from "react";
import { ConnectWallet } from "../container/ConnectWallet";
import { Container } from "../presentational/layout/Container";
import { WalletProvider } from "../providers/WalletProvider";
import { provider } from "../providers/Ethereum";
import { UserProvider } from "../providers/UserProvider";
import { UserProfile } from "../container/UserProfile";
import { EnterPin } from "../container/EnterPin";


const Home: React.FunctionComponent = () => {
  if (!provider) {
    return (
      <div>
        Please install an ethereum wallet such as Metamask to use this dApp
      </div>
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
