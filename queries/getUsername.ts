import { updateUsername } from "../mutations/updateUsername";
import { gun } from "../providers/Gun";

const defaultUsername = "username"

export const getUsername = (publicKey: string) => {
    return new Promise<string>((resolve) => {
        gun.get(publicKey).once((node) => {
            // Retrieve the username value on startup
            if (!node) {
                updateUsername(publicKey, defaultUsername)
                resolve(defaultUsername)
            }
            resolve(node?.username)
        });
    })
}