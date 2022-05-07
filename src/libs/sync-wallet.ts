import { ethers } from "ethers";
import axiosClient from "src/framework/axios";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { toHex } from "./to-hex";
import { firebaseClient } from "src/firebase";

export const syncWallet = async (wallet: any) => {
    const provider = new ethers.providers.Web3Provider(
        (window as any)?.ethereum,
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const walletAddr = await signer.getAddress();
    console.log(walletAddr);
    let response: { [x: string]: any } = await axiosClient.post<any>(
        "/auth/nonce",
        {
            walletAddr,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    const { nonce } = response;
    const hexedNonce = toHex(nonce);
    const signature = await signer.signMessage(hexedNonce);
    console.log(`signature`, signature);
    response = await axiosClient.post<any>(
        "/auth/wallet",
        {
            walletAddr,
            nonce: hexedNonce,
            signature,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    const { token } = response;
    const auth = getAuth(firebaseClient);
    await signInWithCustomToken(auth, token);
    // const user = auth.currentUser;
    // await user?.reload();
    // console.log(user);
    await wallet.connect("injected");
};
