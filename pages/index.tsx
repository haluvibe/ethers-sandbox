import React from "react";
import { ConnectWallet } from "../container/ConnectWallet";
import { Container } from "../presentational/layout/Container";
import { WalletProvider } from "../providers/WalletProvider";
// import { Resource } from "../sandbox/Resource";

const Home: React.FunctionComponent = () => {
  return (
    <WalletProvider>
      {/* <Resource id={"one"} /> */}
      <Container>
        <ConnectWallet />
      </Container>
    </WalletProvider>
  );
};
export default Home;
