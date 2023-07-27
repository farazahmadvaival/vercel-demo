import { ethers } from "ethers";

interface ListedItemParams {
  seller: string | undefined;
  erc721: string;
  tokenId: number;
  price: number;
  duration: number;
  collaboratorAddress: string[];
  collaboratorAmount: string[];
  collectionId: string;
}
const convertToWei = (valueInEther: string): string => {
  // Convert the input value to a BigNumber object
  const valueInBigNumber = ethers.utils.parseEther(String(valueInEther));

  // Convert the BigNumber to Wei
  const valueInWei = ethers.utils.formatUnits(valueInBigNumber, "wei");

  // Return the value in Wei as a string
  return valueInWei;
};

export const signMessage = async (
  params: ListedItemParams,
  provider: any,
  account: any,
  chainId: any
): Promise<string | null> => {
  console.log("🚀 ~ file: signListing.ts:30 ~ params:", params);
  if (provider && account) {
    const valueInWei = convertToWei(String(params?.price));

    const msgParams = JSON.stringify({
      domain: {
        chainId,
        name: "Listing",
        verifyingContract: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        version: "1",
      },
      message: {
        seller: params.seller,
        erc721: params.erc721,
        tokenId: params.tokenId,
        price: String(valueInWei),
        duration: params.duration,
        collaboratorAddress: params.collaboratorAddress,
        collaboratorAmount: params.collaboratorAmount,
        collectionId: params.collectionId,
      },
      primaryType: "ListedItem",
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        ListedItem: [
          { name: "seller", type: "address" },
          { name: "erc721", type: "address" },
          { name: "tokenId", type: "uint256" },
          { name: "price", type: "uint256" },
          { name: "duration", type: "uint256" },
          { name: "collaboratorAddress", type: "address[]" },
          { name: "collaboratorAmount", type: "uint256[]" },
          { name: "collectionId", type: "string" },
        ],
      },
    });

    const paramss = [account, msgParams];
    console.log("🚀 ~ file: signListing.ts:72 ~ paramss:", paramss);

    if (window.ethereum) {
      try {
        const result = await (
          window.ethereum as {
            request: (
              request: { method: string; params?: unknown[] },
              callback?: (result: unknown) => void
            ) => Promise<unknown>;
          }
        ).request({
          method: "eth_signTypedData_v4",
          params: paramss,
        });

        const signature = result as string;
        // Do something with the signature
        return signature;
      } catch (err) {
        return null;
        console.error("Error:", err);
      }
    }
  }
  return null;
};
