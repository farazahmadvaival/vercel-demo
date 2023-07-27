import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Text,
  FormLabel,
  Input,
  Flex,
  Divider,
  Box,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Select,
  Icon,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../apis/apiUrl";
import { POST } from "../../hooks/consts";
import { useMutation } from "../../hooks/useMutation";
import { signMessage } from "../../context/signListing";
import { erc721Abi } from "../../connectors/erc721Abi";
import { ethers } from "ethers";
import { useNFTContract } from "../../connectors/erc721Provider";
import DatePickerReact from "../../components/DatePicker";
import { useContract } from "../../connectors/marketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../hooks/queryKeys";
import { showToaster } from "../../components/Toaster";
import { addDays, getTime } from "date-fns";

const ListNftModal = ({
  isOpen,
  onClose,
  onOpen,
  nftData,
}: {
  isOpen?: any;
  onClose?: any;
  onOpen?: any;
  nftData?: any;
}) => {
  // console.log("🚀 ~ file: listNft.tsx:41 ~ nftData:", nftData);
  const { provider, account, chainId } = useWeb3React();
  const [price, setPrice] = useState<number>(0);
  const [datee, setDatee] = useState<number>(
    Math.floor(getTime(addDays(new Date(), 1)) / 1000)
  );
  const contractInst = useContract();
  const queryClient = useQueryClient();
  const [transformedData, setTransformedData] = useState<any>();
  const [listingPercentage, setListingPercentage] = useState<any>();
  const [loader, setLoader] = useState<any>(false);
  const [totalCreatorFee, setTotalCreatorFree] = useState<any>();
  const handlePriceChange = (event: any) => {
    const inputValue = event.target.value;
    const limitedValue = inputValue.slice(0, 18);
    setPrice(limitedValue);
  };
  interface CreatorFee {
    walletAddress: string;
    percentage: number;
  }

  interface CollaboratorData {
    collaboratorAddress: string[];
    collaboratorAmount: string[];
  }

  const transformCreatorFeeData = (data: CreatorFee[]): CollaboratorData => {
    const collaboratorAddress: string[] = [];
    const collaboratorAmount: string[] = [];
    if (!data || data.length === 0) {
      return {
        collaboratorAddress,
        collaboratorAmount,
      };
    }
    data.forEach((fee) => {
      collaboratorAddress.push(fee.walletAddress);
      const amount = calculateCollaboratorAmount(fee.percentage);
      collaboratorAmount.push(amount);
    });

    return {
      collaboratorAddress,
      collaboratorAmount,
    };
  };
  const convertToWei = (valueInEther: string): string => {
    // Convert the input value to a BigNumber object
    const valueInBigNumber = ethers.utils.parseEther(String(valueInEther));

    // Convert the BigNumber to Wei
    const valueInWei = ethers.utils.formatUnits(valueInBigNumber, "wei");

    // Return the value in Wei as a string
    return valueInWei;
  };

  const calculateCollaboratorAmount = (percentage: number): string => {
    const totalAmount = convertToWei(String(price)); // Total amount to be distributed

    const amount = (percentage / 100) * parseFloat(totalAmount);

    return amount.toString();
  };

  useEffect(() => {
    if (Number(price) > 0) {
      const transformed: CollaboratorData = transformCreatorFeeData(
        nftData?.collection?.creatorFee
      );
      setTransformedData(transformed);
    }
  }, [price]);

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

  const params: ListedItemParams = {
    seller: account,
    erc721: nftData?.minting_contract_address,
    tokenId: nftData?.tokenId,
    price: Number(price),
    duration: datee,
    collaboratorAddress: transformedData?.collaboratorAddress,
    collaboratorAmount: transformedData?.collaboratorAmount,
    collectionId: nftData?.collectionId,
  };
  const { mutate } = useMutation<any>({
    method: POST,
    url: ApiUrl?.LIST_FOR_SALE,
    token: true,
    successMessage: "Item listed for sale successfully",
    showSuccessToast: true,
    onSuccess: async (data) => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_NFT_DETAIL]);
      setLoader(false);
      onClose();
    },
  });

  const approveNFT = async (contractAddress: any) => {
    if (provider) {
      const ethProvider = new ethers.providers.Web3Provider(
        provider?.provider as any
      );

      const contractInstance = new ethers.Contract(
        String(contractAddress),
        erc721Abi,
        ethProvider.getSigner()
      );

      if (contractInstance) {
        try {
          const isApproved = await contractInstance.isApprovedForAll(
            account,
            process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
          );
          console.log("Approval status:", isApproved);
          if (!isApproved) {
            const getApproval = await contractInstance
              .setApprovalForAll(
                process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
                true
              )
              .then((res: any) => {
                if (res) handleListing();
              })
              .catch((err: Error) => {
                if (err) {
                  setLoader(false);
                  return;
                }
              });
          } else {
            handleListing();
          }

          // Handle the returned result here
        } catch (error) {
          console.error(error);
          // Handle errors here
        }
      }
    }
  };
  const totalCreator = () => {
    let totalFee = 0;
    for (let i = 0; i < nftData?.collection?.creatorFee.length; i++) {
      totalFee = totalFee + nftData?.collection?.creatorFee[i].percentage;
    }
    setTotalCreatorFree(String(totalFee));
  };

  const getListingPercent = async () => {
    let listingPercent = 0;
    if (contractInst) {
      listingPercent = await contractInst.listingPercent();
      setListingPercentage(String(listingPercent));
    }
  };
  const getDate = (date: any) => {
    const datee = parseInt((date.getTime() / 1000).toFixed(0));
    setDatee(datee);
  };

  useEffect(() => {
    getListingPercent();
    totalCreator();
  }, [nftData]);

  const handleListing = async () => {
    if (params.price === 0) {
      showToaster("Price must be greater than 0.", "warning");
      return;
    }
    const sign = await signMessage(params, provider, account, chainId).catch(
      (err) => {
        console.log("Sign Err", err);
      }
    );

    if (sign) {
      mutate({ ...params, signature: sign, nftId: nftData?.id });
    } else {
      setLoader(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="708px">
          <ModalHeader>List For Sale</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Text fontSize="20px" fontWeight="700" mb="16px">
                Set Price
              </Text>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Enter price for this item"
                  onChange={handlePriceChange}
                  type="number"
                  min="0"
                  maxLength={18}
                  onKeyPress={(event: any) => {
                    if (
                      event.key === "-" ||
                      event.key === "+" ||
                      event.key === "_"
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
                <InputRightAddon fontSize="14px" color="#393F59" bg="#6F6BF34D">
                  MATIC
                </InputRightAddon>
              </InputGroup>
            </FormControl>

            <FormControl mt={4} mb="24px">
              <FormLabel>Set Duration</FormLabel>
              <InputGroup
                border="1px solid #e2e8f0"
                alignItems="center"
                w="100%"
                h="42px"
                borderRadius="md"
                pl="10px"
              >
                <DatePickerReact getDate={getDate} />
                <InputRightElement color="#756C99">
                  <i className="icon-calendar"></i>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Divider />
            <Text
              as={"h4"}
              mt="20px"
              fontWeight="700"
              fontSize="24px"
              color="#393F59"
            >
              Summary
            </Text>
            <Text mb="40px">
              Listing is free. Once sold, the following fees will be deducted.
            </Text>
            <Box>
              <Flex mb="24px" justifyContent="space-between">
                <Text color="#393F59">Listing Price</Text>
                <Text color="#393F59" mb="auto">
                  {price ? price : "0"} MATIC
                </Text>
              </Flex>
              <Flex mb="24px" justifyContent="space-between">
                <Text color="#393F59">Service Fee</Text>
                <Text color="#393F59" mb="auto">
                  {listingPercentage ? listingPercentage / 10 : null} %
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="24px">
                <Text color="#393F59">Creator Fee</Text>
                <Text color="#393F59" mb="auto">
                  {totalCreatorFee ? totalCreatorFee : null} %
                </Text>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between" flexWrap="wrap" mt="16px">
                <Text
                  fontWeight="600"
                  fontSize={{ base: "20px", sm: "24px" }}
                  color="#393F59"
                >
                  Total Potential Earnings
                </Text>
                <Text
                  fontWeight="600"
                  fontSize={{ base: "20px", sm: "24px" }}
                  color="#393F59"
                  mb="auto"
                >
                  {price &&
                    listingPercentage &&
                    String(
                      Number(price) -
                        ((Number(price) * (listingPercentage / 10)) / 100 +
                          (Number(price) * totalCreatorFee) / 100)
                    )}
                </Text>
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="primary"
              w="100%"
              isLoading={loader}
              onClick={() => {
                approveNFT(nftData?.minting_contract_address);
                setLoader(true);
              }}
            >
              List For Sale
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListNftModal;
