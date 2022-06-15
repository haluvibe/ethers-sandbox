import { gun } from "../providers/Gun";

export const updateUsername = (publicKey: string, value: string) => {
    gun.get(publicKey).put({ username: value });
}