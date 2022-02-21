import { ethers } from "ethers";

let provider;

if (process.browser) {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
}

export { provider };
