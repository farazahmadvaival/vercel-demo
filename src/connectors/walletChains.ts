import type { AddEthereumChainParameter } from "@web3-react/types";
import Web3 from "web3";
import { chainUrls } from "./consts";
import { walletConnect } from "./walletConnect";

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

const isExtendedChainInformation = (
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation => {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
};

export const IsMetaMaskInstalled = () => {
  if (typeof window.ethereum === "undefined") {
    window.open("https://metamask.io/download.html", "_blank");
    return false;
  } else if (!window.ethereum.isMetaMask) {
    window.open("https://metamask.io/download.html", "_blank");
    return false;
  } else {
    return true;
  }
};

export const addChainMetamask = (chainId: number) => {
  const chainInformation = CHAINS[chainId];

  if (isExtendedChainInformation(chainInformation)) {
    const addChainParameters: any = {
      chainId: Web3.utils.toHex(chainId),
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };

    if (window.ethereum) {
      try {
        typeof window !== "undefined" &&
          window.ethereum &&
          (
            window.ethereum as {
              request: (
                request: { method: string; params?: unknown[] },
                callback?: (result: unknown, error?: any) => void
              ) => Promise<unknown>;
            }
          ).request(
            {
              method: "wallet_addEthereumChain",
              params: [addChainParameters],
            },
            (addError: any, _response: any) => {
              if (addError) {
                console.error("Error adding chain to MetaMask:", addError);
              }
            }
          );
      } catch (addError) {
        console.error("Error adding chain to MetaMask:", addError);
      }
    }
    return addChainParameters;
  } else {
    return chainId;
  }
};

export const switchChainMetamask = (chainId: number): void => {
  const switchChainParameters = {
    chainId: Web3.utils.toHex(chainId),
  };

  if (window.ethereum) {
    try {
      (
        window.ethereum as {
          request: (
            request: { method: string; params?: unknown[] },
            callback?: (result: unknown) => void
          ) => Promise<unknown>;
        }
      ).request(
        {
          method: "wallet_switchEthereumChain",
          params: [switchChainParameters],
        },
        (switchError: any) => {
          if (switchError && switchError.code === 4902) {
            console.error("Error switching chain in MetaMask:", switchError);
          } else if (switchError) {
            console.error("Error switching chain in MetaMask:", switchError);
          }
        }
      );
    } catch (switchError) {
      console.error("Error switching chain in MetaMask:", switchError);
    }
  }
};

export const addMumbaiChain = async (chainId: number) => {
  if (walletConnect.provider && walletConnect.provider.connected) {
    try {
      const chainData = {
        chainId: Web3.utils.toHex(chainId),
        chainName: "Mumbai Testnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com"], // Mumbai testnet RPC URL
        blockExplorerUrls: ["https://mumbai.polygonscan.com"], // Mumbai testnet block explorer URL
      };

      await walletConnect.provider.request({
        method: "wallet_addEthereumChain",
        params: [chainData],
      });
    } catch (error) {
      console.error("Error adding Mumbai chain:", error);
    }
  } else {
    console.error("WalletConnect provider is not connected.");
  }
};
export const switchToChain = async (chainId: number) => {
  if (walletConnect.provider && walletConnect.provider.connected) {
    try {
      await walletConnect.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });
    } catch (error) {
      console.error("Error switching chain:", error);
      if (error) {
        addMumbaiChain(80001);
      }
    }
  } else {
    console.error("WalletConnect provider is not connected.");
  }
};

export const getAddChainParameters = (chainId: number): any => {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
};

type ChainConfig = {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
};

export const MAINNET_CHAINS: ChainConfig = {
  137: {
    urls: [chainUrls?.POLYGON_MAINNET_INFURA, chainUrls?.POLYGON].filter(
      Boolean
    ),
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: [chainUrls?.BLOCK_EXPLORER],
  },
};

export const TESTNET_CHAINS: ChainConfig = {
  80001: {
    urls: [chainUrls?.POLYGON_MUMBAI_INFURA].filter(Boolean),
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: [chainUrls?.POLYGON_MUMBAI],
  },
};

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
