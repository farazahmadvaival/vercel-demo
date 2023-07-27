import { useWeb3React } from "@web3-react/core";
import React, { useContext, useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { erc721Abi } from "./erc721Abi";
import { ethers, Contract } from "ethers";

export const useNFTContract = (contractAddress: any) => {
  const { provider } = useWeb3React();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    const setupContract = async () => {
      if (provider) {
        const ethProvider = new ethers.providers.Web3Provider(
          provider?.provider as any
        );

        const contractInstance = new ethers.Contract(
          String(contractAddress),
          erc721Abi,
          ethProvider.getSigner()
        );
        setContract(contractInstance);
      }
    };
    setupContract();
  }, [provider]);

  return contract;
};
