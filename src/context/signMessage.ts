import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export const signMessage = async (
  provider: Web3Provider | undefined
): Promise<string> => {
  // Check if MetaMask is available
  if (provider) {
    const ethProvider = new ethers.providers.Web3Provider(
      provider?.provider as any
    );
    try {
      // // Request account access from the user
      // await window.ethereum.request({ method: "eth_requestAccounts" });

      // // Get the signer provider
      // const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = ethProvider.getSigner();
      const address = await signer.getAddress();

      const message = `Welcome to Ibanera Launchpad!
Click to sign in and accept the Ibanera Terms of Service (https://ibanera-launchpad/terms) and Privacy Policy (https://ibanera-launchpad/privacy).

This request will not trigger a blockchain transaction or cost any gas fees.
Your authentication status will reset after 24 hours.

Wallet address: ${address} `;

      // Sign the message using the signer
      const signature = await signer.signMessage(message);
      // Return the signature
      return signature;
    } catch (error) {
      // Handle error if user rejects or there's an issue
      console.error(error);
    }
  } else {
    // Handle case where MetaMask is not available
    console.error("MetaMask is not available");
  }

  return "";
};
