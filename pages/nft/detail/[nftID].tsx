import { Button, IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import {
  Container,
  Flex,
  Box,
  Stack,
  Text,
  Heading,
  VStack,
  HStack,
  Grid,
} from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/stat";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
const abiDecoder = require("abi-decoder");
import { useDisclosure } from "@chakra-ui/react";
import { ApiUrl } from "../../../src/apis/apiUrl";
import CollectionCard from "../../../src/components/Cards/CollectionCard";
import { SlickSlider } from "../../../src/components/ReactSlick";
import { QUERY_KEYS } from "../../../src/hooks/queryKeys";
import { useQuery } from "../../../src/hooks/useQuery";
import { nftType } from "../../../src/types";
import { useWeb3React } from "@web3-react/core";
import ListNftModal from "../../../src/Modals/nftProperties/listNft";
import ReportModal from "../../../src/Modals/nftProperties/reportModal";
import { useEffect, useState } from "react";
import { Loader } from "../../../src/components/Loader";
import { dayJs } from "../../../src/utils";
import { currencySymbol } from "../../../src/constants";
import Link from "next/link";
import { useMutation } from "../../../src/hooks/useMutation";
import { PATCH, POST } from "../../../src/hooks/consts";
import { marketContractAbi } from "../../../src/connectors/marketContractAbi";
import { ethers } from "ethers";
import { useContract } from "../../../src/connectors/marketProvider";
import SocialShare from "../../../src/components/SocialShare";
import { useRouter } from "next/router";
import { showToaster } from "../../../src/components/Toaster";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "../../../src/hooks/useDebounce";
import NextImage from "next/image";

const NftDetail = ({ param }: any) => {
  const { provider, account, chainId } = useWeb3React();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [totalCreatorFee, setTotalCreatorFree] = useState<any>();
  const [search, setSearch] = useState<string>();
  const {
    isOpen: isReportModalOpen,
    onOpen: onReportModalOpen,
    onClose: onReportModalClose,
  } = useDisclosure();

  const queryClient = useQueryClient();
  const [nftData, setNftData] = useState<any>({});
  const [loader, setLoader] = useState<any>(false);
  const debounceValue = useDebounce(search, 500);
  const router = useRouter();
  const currentUrl = router.asPath;

  const { data } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_NFT_DETAIL],
    url: ApiUrl.GET_NFT_DETAIL,
    params: { nftId: param?.nftID },
    token: true,
    onSuccess: async (data) => {
      console.log("🚀 ~ file: [nftID].tsx:47 ~ onSuccess: ~ data:", data);
      setNftData(data);
    },
  });
  const totalCreator = () => {
    let totalFee = 0;
    for (let i = 0; i < data?.collection?.creatorFee.length; i++) {
      totalFee = totalFee + data?.collection?.creatorFee[i].percentage;
    }
    setTotalCreatorFree(String(totalFee));
  };

  useEffect(() => {
    totalCreator();
  }, [data]);

  const { data: moreNftSByCollection } = useQuery<nftType[]>({
    queryKey: [QUERY_KEYS.GET_MORE_NFTS_BY_COLLECTION],
    url: ApiUrl.GET_MORE_NFTS_BY_COLLECTION,
    params: { collectionId: data?.collectionId },
    enabled: data?.collectionId ? true : false,
    token: true,
  });

  const { data: activities, isLoading: isLoadingActivities } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_NFT_ACTIVITIES, debounceValue],
    url: `${ApiUrl.GET_NFT_ACTIVITIES}/${param?.nftID}`,
    params: {
      search: debounceValue,
    },
  });

  const contractInst = useContract();
  interface BuyItemParams {
    seller: string | undefined;
    erc721: string;
    tokenId: number;
    price: string;
    duration: number;
    signature: string;
    collaboratorAddress: string[];
    collaboratorAmount: string[];
    collectionId: string;
  }

  const params: BuyItemParams = {
    seller: data?.owner,
    erc721: data?.minting_contract_address,
    tokenId: data?.tokenId,
    price: data?.listings[0]?.price,
    duration: data?.listings[0]?.duration,
    signature: data?.listings[0]?.signature,
    collaboratorAddress: data?.listings[0]?.collaboratorAddress,
    collaboratorAmount: data?.listings[0]?.collaboratorAmount,
    collectionId: data?.collectionId,
  };

  const convertToWei = (valueInEther: string): string => {
    const valueInBigNumber = ethers.utils.parseEther(valueInEther);
    const valueInWei = ethers.utils.formatUnits(valueInBigNumber, "wei");
    return valueInWei;
  };

  const { mutate: updateNFTSale } = useMutation<any>({
    method: POST,
    url: ApiUrl.UPDATE_NFT_SALE_DATA,
    token: true,
    onSuccess: async (data) => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_NFT_DETAIL]);
    },
  });
  const { mutate: updatePending } = useMutation<any>({
    method: POST,
    url: ApiUrl.UPDATE_PENDING_TRANSACTIONS,
    token: true,
  });

  const { mutate: cancelList } = useMutation<any>({
    method: POST,
    url: ApiUrl?.CANCEL_LISTING,
    token: true,
    onSuccess: async (data) => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_NFT_DETAIL]);
    },
  });

  const buy = async () => {
    if (contractInst) {
      const valueInWei = convertToWei(params?.price);

      try {
        const result = await contractInst.buy(
          params?.seller,
          params?.erc721,
          params?.tokenId,
          valueInWei,
          params?.duration,
          params?.signature,
          params?.collaboratorAddress,
          params?.collaboratorAmount,
          params?.collectionId,
          {
            value: valueInWei,
          }
        );
        if (result) {
          showToaster(
            "Transaction submitted successfuly. Wait for confirmation.",
            "success"
          );

          const ethProvider = new ethers.providers.Web3Provider(
            provider?.provider as any
          );
          const pendingParams = {
            hash: result?.hash,
            status: "pending",
            type: "buy",
            nonce: result?.nonce,
          };
          updatePending(pendingParams);
          const receipt = await ethProvider.waitForTransaction(result.hash);
          if (receipt.status == 1) {
            setLoader(false);
            showToaster("NFT bought successfully", "success");
            abiDecoder.addABI(marketContractAbi);
            const decodedLogs = abiDecoder.decodeLogs(receipt.logs);

            const data = {
              tokenId: Number(decodedLogs[0]?.events[0]?.value),
              signature: decodedLogs[0]?.events[1]?.value,
              buyerWallet: decodedLogs[0]?.events[2]?.value,
              contractAddress: decodedLogs[0]?.events[4]?.value,
            };
            updateNFTSale(data);
          }
        }
      } catch (error) {
        setLoader(false);
        console.error("Buy Error", error);
      }
    }
  };

  const cancelListing = async () => {
    if (contractInst) {
      try {
        const result = await contractInst.cancelListing(params?.signature);
        if (result) {
          showToaster(
            "Transaction submitted successfuly. Wait for confirmation.",
            "success"
          );

          const ethProvider = new ethers.providers.Web3Provider(
            provider?.provider as any
          );
          const pendingParams = {
            hash: result?.hash,
            status: "pending",
            type: "cancel",
            nonce: result?.nonce,
          };
          updatePending(pendingParams);
          const receipt = await ethProvider.waitForTransaction(result.hash);
          if (receipt.status == 1) {
            queryClient.invalidateQueries([QUERY_KEYS.GET_NFT_DETAIL]);
            setLoader(false);
            showToaster("Listing cancelled successfully.", "success");
            abiDecoder.addABI(marketContractAbi);
            const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
            const data = {
              signature: decodedLogs[0]?.events[0]?.value,
            };

            cancelList(data);
          }
        }
      } catch (error) {
        setLoader(false);
        console.error("Cancel Error", error);
      }
    }
  };
  const [maticPrice, setMaticPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
        );
        const data = await response.json();
        const maticPrice = data["matic-network"].usd;
        setMaticPrice(maticPrice);
      } catch (error) {
        console.error("Error fetching Matic price:", error);
      }
    };

    fetchPrice();
  }, []);

  const saleEndUnixSeconds = data?.listings[0]?.duration;
  const saleEndUnixMilliseconds = saleEndUnixSeconds * 1000;
  const saleEndDate = new Date(saleEndUnixMilliseconds);

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    };
    return date.toLocaleString("en-US", options);
  };

  interface RemainingTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }
  const [remainingTime, setRemainingTime] = useState<RemainingTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDifference = data?.listings[0]?.duration - currentTime;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (60 * 60 * 24));
        const hours = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
        const seconds = Math.floor(timeDifference % 60);

        setRemainingTime({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);
  return (
    <>
      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        pt={{ base: "20px", sm: "40px" }}
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: "18px", md: "48px" }}
        >
          <Box
            w={{ base: "100%", lg: "50%" }}
            maxH={{ base: "initial", md: "500px", lg: "600px" }}
            minH={{ base: "initial", md: "500px", lg: "400px" }}
            borderRadius="16px"
            position="relative"
          >
            <Box w="100%" h="100%" borderRadius="lg">
              <NextImage
                src={`${process.env.NEXT_PUBLIC_IMG_BASE_URL}${data?.ipfsImageUrl}`}
                layout="fill"
                objectFit="cover"
                objectPosition="center center"
                alt="nft image"
                style={{ borderRadius: "16px" }}
              />
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "50%" }}>
            <Box
              paddingBottom={{ base: "20px", sm: "28px" }}
              borderBottom="1px solid"
              borderColor="#35353533"
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                marginBottom="7px"
              >
                <Box>
                  <Text fontSize="16px">{data?.collection?.name}</Text>
                </Box>
                <Box display="flex" alignItems="center" gap="8px">
                  <Box textAlign="center">
                    <SocialShare
                      title="Check this link"
                      url={`https://ibanera-launchpad.bloxbytes.com${currentUrl}`}
                    />
                  </Box>
                  {account && (
                    <Box textAlign="center">
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          color="#756C99"
                          ml={{ base: "5px", sm: "0px" }}
                          mb={{ base: "8px", sm: "0" }}
                          variant="outline"
                          aria-label="Send"
                          fontSize="20px"
                          border="1px solid #c4c3f9"
                          bg="#fff"
                          icon={<i className="icon-menu"></i>}
                        ></MenuButton>
                        <MenuList w="191px" minW="191px" p="8px">
                          <MenuItem>
                            <Box
                              width="100%"
                              color="#393F59"
                              onClick={onReportModalOpen}
                            >
                              Report
                            </Box>
                          </MenuItem>
                          <ReportModal
                            isOpen={isReportModalOpen}
                            onClose={onReportModalClose}
                            onOpen={onReportModalOpen}
                            nftId={`${param?.nftID}`}
                          />
                        </MenuList>
                      </Menu>
                    </Box>
                  )}
                </Box>
              </Flex>
              <Heading fontSize="32px" marginBottom="10px">
                {data?.name}
              </Heading>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Flex mr="24px" fontSize="16px">
                  <Text mr="5px">Owned By</Text>
                  <Text color="#6863F3" fontWeight="600">
                    {data?.owner?.slice(0, 5) +
                      "..." +
                      data?.owner?.slice(37, 42)}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="14px" mr="24px">
                    <i className="icon-document-eye"></i> {data?.views} Views
                  </Text>
                </Flex>
              </Stack>
            </Box>
            {data?.listings[0]?.listingStatus == "listed" &&
            data?.listings[0]?.duration > Math.floor(Date.now() / 1000) ? (
              <>
                <Box
                  paddingBottom={{ base: "20px", sm: "28px" }}
                  borderBottom="1px solid"
                  borderColor="#35353533"
                >
                  <Text fontSize="16px" color="#393F59" pt="24px" pb="16px">
                    Sale ends {formatDate(saleEndDate)}
                  </Text>
                  <HStack gap={{ base: "30px", md: "40px" }} color="#393F59">
                    <Box>
                      <Text fontSize="24px">{remainingTime.days}</Text>
                      <Text fontSize="14px" color="#756C99">
                        Days
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="24px"> {remainingTime.hours}</Text>
                      <Text fontSize="14px" color="#756C99">
                        Hours
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="24px"> {remainingTime.minutes}</Text>
                      <Text fontSize="14px" color="#756C99">
                        Minutes
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="24px"> {remainingTime.seconds}</Text>
                      <Text fontSize="14px" color="#756C99">
                        Seconds
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </>
            ) : null}

            <ListNftModal
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              nftData={nftData}
            />

            <Box>
              {data?.listings[0]?.listingStatus == "listed" &&
              data?.listings[0]?.duration > Math.floor(Date.now() / 1000) ? (
                <>
                  <Text fontSize="16px" color="#393F59" pt="24px" pb="16px">
                    Current Price
                  </Text>
                  <HStack gap="8px" color="#393F59" display="flex">
                    <Text
                      fontSize={{ base: "32px", md: "40px" }}
                      fontWeight="700"
                    >
                      {data?.listings[0]?.price} MATIC
                    </Text>
                    <Text fontSize="16px" color="#51608B" mt="10px">
                      ({" "}
                      {maticPrice &&
                        String(maticPrice * data?.listings[0]?.price).slice(
                          0,
                          7
                        )}
                      {""}
                      $)
                    </Text>
                  </HStack>
                </>
              ) : null}

              {data &&
              account &&
              data.owner?.toLowerCase() === account?.toLowerCase() &&
              (data?.listings[0]?.listingStatus == "sold" ||
                data?.listings[0]?.listingStatus == "canceled" ||
                data?.listings[0]?.duration < Math.floor(Date.now() / 1000) ||
                data?.listings.length == 0) ? (
                <Button
                  onClick={onOpen}
                  variant="primary"
                  textTransform="uppercase"
                  mt="16px"
                  p="20px 64px"
                >
                  List For Sale
                </Button>
              ) : data &&
                data.owner === account?.toLowerCase() &&
                data?.listings[0]?.listingStatus == "listed" &&
                data?.listings[0]?.duration > Math.floor(Date.now() / 1000) ? (
                <Button
                  isLoading={loader}
                  onClick={() => {
                    cancelListing();
                    setLoader(true);
                  }}
                  variant="primary"
                  mt="16px"
                  p="20px 64px"
                  textTransform="uppercase"
                >
                  Cancel Listing
                </Button>
              ) : (data?.owner != account?.toLowerCase() &&
                  data?.listings[0]?.listingStatus == "sold") ||
                data?.listings[0]?.listingStatus == "canceled" ||
                data?.listings[0]?.duration <
                  Math.floor(Date.now() / 1000) ? null : (
                <Button
                  onClick={() => {
                    buy();
                    setLoader(true);
                  }}
                  variant="primary"
                  mt="16px"
                  textTransform="uppercase"
                  p="20px 64px"
                  isLoading={loader}
                >
                  Buy Now
                </Button>
              )}
            </Box>

            <Box paddingTop={{ base: "20px", sm: "32px" }}>
              <Heading fontSize="18px" marginBottom="16px">
                Description
              </Heading>

              <Text>{data?.description}</Text>
            </Box>
          </Box>
        </Stack>
        <Stack
          spacing={{ base: "0px", sm: "48px" }}
          direction={{ base: "column-reverse", lg: "row" }}
          marginTop={{ base: "0px", lg: "40px" }}
        >
          <Box w={{ base: "100%", lg: "55%" }}>
            <Heading fontSize="24px" marginBottom="16px">
              Attributes
            </Heading>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap="3"
            >
              {data?.collection?.collectionProperties?.map(
                (property: any, index: number) => {
                  return (
                    <Stat p="14px" key={index}>
                      <StatLabel>{property?.name}</StatLabel>
                      <StatNumber
                        fontSize="18px"
                        fontWeight="700"
                        display="flex"
                        alignItems="center"
                      >
                        {property?.propertyValues[0]?.value}
                      </StatNumber>
                    </Stat>
                  );
                }
              )}
            </Grid>
          </Box>
          <Box
            w={{ base: "100%", lg: "55%" }}
            marginTop={{ base: "20px", lg: "0" }}
          >
            <Heading fontSize="24px" marginBottom="16px">
              Description
            </Heading>
            <Box fontSize="16px">
              <Flex justifyContent="space-between" mb="8px">
                <Text color="#756C99">Contract Address</Text>
                <Text color="#6863F3" fontWeight="700" mb="auto">
                  {data?.minting_contract_address?.slice(0, 7) +
                    "..." +
                    data?.minting_contract_address?.slice(35, 42)}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="8px">
                <Text color="#756C99">Token ID</Text>
                <Text color="#6863F3" fontWeight="700" mb="auto">
                  {data?.tokenId}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="8px">
                <Text color="#756C99">Token Standard</Text>
                <Text color="#393F59" fontWeight="700" mb="auto">
                  ERC 721
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="8px">
                <Text color="#756C99">Chain</Text>
                <Text color="#393F59" fontWeight="700" mb="auto">
                  {chainId}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="8px">
                <Text color="#756C99">Metadata</Text>
                <Text color="#393F59" fontWeight="700" mb="auto">
                  Decentralized
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="8px">
                <Text color="#756C99">Creator Earnings</Text>
                <Text color="#393F59" fontWeight="700" mb="auto">
                  {totalCreatorFee} %
                </Text>
              </Flex>
            </Box>
          </Box>
        </Stack>
        <Flex
          justifyContent="space-between"
          alignItems={{ base: "flex-start", sm: "center" }}
          marginBottom="16px"
          marginTop="80px"
          flexWrap="wrap"
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Heading mb={{ base: "20px", sm: "0" }} fontSize="24px">
            Item Activity
          </Heading>
          <InputGroup variant="custom" w="286px">
            <InputLeftElement pointerEvents="none">
              <i className="icon-search"></i>
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Box>
          <TableContainer
            border="1px solid"
            borderColor="rgba(111, 107, 243, 0.4)"
            boxShadow="2px 2px 8px rgba(13, 13, 13, 0.1)"
            backdropFilter="blur(30px)"
            borderRadius="16px"
          >
            <Table variant="bordered">
              <Thead>
                <Tr>
                  <Th>Event</Th>
                  {/* <Th textAlign="right">Price</Th> */}
                  <Th textAlign="right">From</Th>
                  <Th textAlign="right">To</Th>
                  <Th textAlign="right">Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoadingActivities && (
                  <Tr>
                    <Td colSpan={5}>
                      <Flex
                        width="100%"
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Loader />
                      </Flex>
                    </Td>
                  </Tr>
                )}
                {activities && activities?.length <= 0 && (
                  <Tr>
                    <Td colSpan={5}>
                      <Flex
                        width="100%"
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Heading p="75px 0" fontSize="20px" color="#0d0d0d">
                          Record Not Found
                        </Heading>
                      </Flex>
                    </Td>
                  </Tr>
                )}
                {activities &&
                  activities?.map((activity: any, index: number) => {
                    return (
                      <Tr key={index}>
                        <Td
                          p={{ base: "12px", md: "17px 25px" }}
                          display="flex"
                          alignItems="center"
                        >
                          <Box color="#6863F3" mr="8px">
                            {activity?.activityType === "buy" && (
                              <i className="icon-transfer"></i>
                            )}
                            {activity?.activityType === "list" && (
                              <i className="icon-list"></i>
                            )}
                            {activity?.activityType === "mint" && (
                              <i className="icon-transfer"></i>
                            )}
                          </Box>
                          {activity?.activityType === "list" && (
                            <Text fontWeight="700" flex="15%">
                              List
                            </Text>
                          )}
                          {activity?.activityType.toLowerCase() === "buy" && (
                            <Text fontWeight="700" flex="15%">
                              Buy
                            </Text>
                          )}
                          {activity?.activityType.toLowerCase() === "mint" && (
                            <Text fontWeight="700" flex="15%">
                              Mint
                            </Text>
                          )}
                        </Td>
                        {/* <Td
                          p={{ base: "12px", md: "17px 25px" }}
                          textAlign="right"
                        >
                          {`${
                            activity?.price ? activity?.price : 0
                          } ${currencySymbol}`}
                        </Td> */}
                        <Td
                          p={{ base: "12px", md: "17px 25px" }}
                          textAlign="right"
                        >
                          {activity?.fromAddress?.slice(0, 7) +
                            "..." +
                            activity?.fromAddress?.slice(35, 42)}
                        </Td>
                        <Td
                          p={{ base: "12px", md: "17px 25px" }}
                          textAlign="right"
                        >
                          {activity?.toAddress == "Marketplace"
                            ? "Marketplace"
                            : activity?.toAddress?.slice(0, 7) +
                              "..." +
                              activity?.toAddress?.slice(35, 42)}
                        </Td>
                        <Td
                          p={{ base: "12px", md: "17px 25px" }}
                          textAlign="right"
                        >
                          {dayJs(activity?.insertedDate).fromNow()}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>

          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb={{ base: "20px", lg: "40px" }}
            mt={{ base: "40px", lg: "80px" }}
          >
            <Heading fontSize={{ base: "24px", md: "36px", xl: "48px" }}>
              More from this Collections
            </Heading>
            <Button
              p={{ base: "5px 20px", md: "20px 32px" }}
              as={Link}
              href="/categories"
              variant="primary"
            >
              VIEW ALL
            </Button>
          </Flex>
          <SlickSlider>
            {moreNftSByCollection &&
              moreNftSByCollection?.map((nft: any, index: number) => {
                return (
                  <Box
                    key={index}
                    onClick={() => router.push(`/nft/detail/${nft?.id}`)}
                    cursor="pointer"
                  >
                    <CollectionCard
                      type="withBody"
                      featureImage={`${process.env.NEXT_PUBLIC_IMG_BASE_URL}${nft?.ipfsImageUrl}`}
                      isShowFeatureImage={true}
                      isShowLogoImage={false}
                      name={nft?.name}
                      key={index}
                      identifier="nft"
                    />
                  </Box>
                );
              })}
          </SlickSlider>
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  // Fetch blog post data using the slug
  const param = context.params;
  return {
    props: {
      param: param,
    },
  };
};
export default NftDetail;
