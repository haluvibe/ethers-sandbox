import { gun } from "../providers/Gun";

export const listenToUsername = (publicKey: string, callback: (value: string) => void) => {
    gun.get(publicKey).on((node) => {
        callback(node.username);
    },{
        change: true
    });
}

export const removeListenerToUsername = (publicKey: string) => {
    gun.get(publicKey).off()
}