import { user } from "../providers/Gun";

export const createUser = (address: string, pin: number) => {
    return new Promise<{ publicKey?: string, errorMessage?: string}>((resolve) => {
        let publicKey: string;
        let errorMessage: string;
        user.create(address, `${pin}-forever-decentralized`, (result) => {
            if ("pub" in result) {
                publicKey = result?.pub
                resolve({publicKey, errorMessage})
            }
            if ("err" in result && !(result?.err === "User already created!")) {
                errorMessage = result?.err;
                resolve({publicKey, errorMessage})
            }
            if ("err" in result && result?.err === "User already created!") {
                user.auth(address, `${pin}-forever-decentralized`, (result) => {
                    if ("err" in result) {
                        errorMessage = result?.err;
                        resolve({publicKey, errorMessage})
                    }
                    // @ts-ignore
                    publicKey = result?.root?.user?.is?.pub
                    resolve({publicKey, errorMessage})
                });
            }
        });
    })
    
}
