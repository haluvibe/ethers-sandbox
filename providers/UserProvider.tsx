import React, { useEffect, useState } from "react";
import { gun, user } from "./Gun";
import { useWallet } from "./WalletProvider";

const UserContext = React.createContext(null);

const useUser = (): {
  publicKey?: string;
  userErrorMessage?: string;
  pin?: number;
  handleChangePin: (nextPin: number) => void;
} => {
  const { publicKey, userErrorMessage, pin, setPin } =
    React.useContext(UserContext);

  const handleChangePin = (nextPin: number) => {
    setPin(nextPin);
  };

  return {
    pin,
    handleChangePin,
    publicKey,
    userErrorMessage,
  };
};

const UserProvider = ({ children }) => {
  const { address } = useWallet();
  const [publicKey, setPublicKey] = useState<string>(null);
  const [pin, setPin] = useState<number>(null);
  const [userErrorMessage, setUserErrorMessage] = useState<string>(null);

  useEffect(() => {
    if (!address || !pin) {
      setPublicKey(null);
      setUserErrorMessage(null);
      return;
    }
    user.create(address, `${pin}-forever-decentralized`, (result) => {
      if ("pub" in result) {
        setPublicKey(result?.pub);
      }
      if ("err" in result) {
        if (result?.err === "User already created!") {
          user.auth(address, `${pin}-forever-decentralized`, (result) => {
            if ("err" in result) {
              setUserErrorMessage(result?.err);
              return;
            }
            // @ts-ignore
            setPublicKey(result?.root?.user?.is?.pub);
          });
          return;
        }
        setUserErrorMessage(result?.err);
      }
    });
  }, [address, pin]);

  return (
    <UserContext.Provider
      value={{
        publicKey,
        userErrorMessage,
        pin,
        setPin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
