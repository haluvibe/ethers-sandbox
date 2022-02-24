import { useEffect, useState } from "react";
import { gun } from "../providers/Gun";
import { useUser } from "../providers/UserProvider";

export const UserProfile: React.FunctionComponent = () => {
  const [username, setUsername] = useState<string>("");
  const { publicKey, pin, userErrorMessage } = useUser();

  useEffect(() => {
    if (!publicKey || !pin) {
      return;
    }
    gun.get(publicKey).once((node) => {
      // Retrieve the username value on startup
      if (!node) {
        gun.get(publicKey).put({ username: "username" });
        return;
      }
      setUsername(node.username);
    });

    gun.get(publicKey).on((node) => {
      setUsername(node.username);
    });
  }, [publicKey, pin]);

  const updateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    gun.get(publicKey).put({ username: event.target.value }); // Edit the value in our db
    setUsername(event.target.value);
  };

  if (userErrorMessage) {
    return <>{userErrorMessage}</>;
  }

  if (!publicKey || !pin) {
    return null;
  }

  return (
    <div className="GunDocs">
      <h1>User Profile:</h1>
      <label>Username:</label>
      <input value={username} onChange={updateUserName} />
    </div>
  );
};
