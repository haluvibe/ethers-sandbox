import React, { useEffect, useState } from "react";
import { createUser } from "../mutations/createUser";
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
    const handleAddressOrPinChange = async () => {
      if (!address || !pin) {
        setPublicKey(null);
        setUserErrorMessage(null);
        return;
      }
      const { errorMessage, publicKey } = await createUser(address, pin)
      if (publicKey) {
        setPublicKey(publicKey);
      }
      if (errorMessage) {
        setUserErrorMessage(errorMessage);
      }
    }
    handleAddressOrPinChange()
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
