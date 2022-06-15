import { useEffect, useState } from "react";
import { updateUsername } from "../mutations/updateUsername";
import { useUser } from "../providers/UserProvider";
import { getUsername } from "../queries/getUsername";
import { listenToUsername, removeListenerToUsername } from "../queries/listenToUsername";

export const useUserProfile = () => {
    const [username, setUsername] = useState<string>("");
    const { publicKey, pin, userErrorMessage } = useUser();
  
    useEffect(() => {
      const handlePublicKeyOrPinChange = async () => {
        if (!publicKey || !pin) {
          return;
        }
        const usernameFromDB = await getUsername(publicKey)
        setUsername(usernameFromDB)
        listenToUsername(publicKey, setUsername)
      }
      handlePublicKeyOrPinChange()
      return () => {
        removeListenerToUsername(publicKey)
      }
    }, [publicKey, pin]);
  
    const updateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
      updateUsername(publicKey, event.target.value)
      setUsername(event.target.value);
    };

    return {
        username,
        publicKey,
        pin,
        userErrorMessage,
        updateUserName
    }
};
