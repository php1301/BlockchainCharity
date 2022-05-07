import Web3 from "web3";

let web3: Web3;

if (
    typeof window !== "undefined" &&
    typeof (window as any).web3 !== "undefined"
) {
    // we are in the browser and meta mask is installed
    web3 = new Web3((window as any).web3.currentProvider);
} else {
    // we are on the server *OR* meta mask is not running
    // creating our own provider
    const web3Provider =
        "https://rinkeby.infura.io/v3/c32c3560feee48ee9a922e27e6c30052";
    const provider = new Web3.providers.HttpProvider(web3Provider);

    web3 = new Web3(provider);
}

export default web3;
