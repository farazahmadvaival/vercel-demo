import React, { useState } from "react";
import {
  FileUpload,
  ReactSelect,
  ImgUrlFunParam,
} from "../../src/components/common";
import { createnft, nftDetail } from "../../src/constants";
import { useQuery } from "../../src/hooks/useQuery";
import { ApiUrl } from "../../src/apis/apiUrl";
import { QUERY_KEYS } from "../../src/hooks/queryKeys";
import { Field, Form, Formik, FieldArray } from "formik";
import InputField from "../../src/components/InputField";
import ChakraTextarea from "../../src/components/Textarea";
import {
  Button,
  Container,
  FormControl,
  Heading,
  Stack,
  Text,
  useDisclosure,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  IconButton,
  FormLabel,
} from "@chakra-ui/react";
import { nftSchema } from "../../src/schemas";
import { POST } from "../../src/hooks/consts";
import { useMutation } from "../../src/hooks/useMutation";
import { ReactSelectCatMap } from "../../src/components/common/ReactSelect/types";
import NftPropertiesModal from "../../src/Modals/nftProperties";
import { PropertyTypes } from "../../src/types";
import { Header } from "../../src/components/Header";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { getFromLocalStorage } from "../../src/utils";
import ConnectionModal from "../../src/Modals/nftProperties/connectionModal";
import { erc721Abi } from "../../src/connectors/erc721Abi";
import { showToaster } from "../../src/components/Toaster";
const abiDecoder = require("abi-decoder");

const CreateNFT = () => {
  const [collectionId, setCollectionId] = useState<string>("");
  const [collectionAddress, setCollectionAddress] = useState<string>("");
  const [nftName, setNftName] = useState<string>("");
  const [nftDesc, setNftDesc] = useState<string>("");
  const [nftFile, setNftFile] = useState<any>();
  const [loader, setLoader] = useState<any>(false);
  const [properties, setProperties] = useState<PropertyTypes[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { account, provider } = useWeb3React<Web3Provider>();
  const router = useRouter();

  const { data: collections } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_COLLECTIONS_NAME],
    url: ApiUrl?.GET_COLLECTIONS_NAME,
    showToast: false,
    token: true,
  });
  const { mutate: updatePending } = useMutation<any>({
    method: POST,
    url: ApiUrl.UPDATE_PENDING_TRANSACTIONS,
    token: true,
  });

  const minting = async (uri: string, contractAddress: any) => {
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
          const result = await contractInstance.safeMint(account, uri);
          if (result) {
            showToaster(
              "Transaction submitted successfuly. Wait for confirmation.",
              "success"
            );
            const pendingParams = {
              hash: result?.hash,
              status: "pending",
              type: "mint",
              nonce: result?.nonce,
            };
            updatePending(pendingParams);
            const receipt = await ethProvider.waitForTransaction(result.hash);
            if (receipt.status == 1) {
              setLoader(false);
              abiDecoder.addABI(erc721Abi);
              const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
              const data = {
                contractAddress: receipt?.to,
                tokenId: Number(decodedLogs[0]?.events[2]?.value),
                fromAddress: decodedLogs[0]?.events[0]?.value,
                toAddress: decodedLogs[0]?.events[1]?.value,
                activityType: "mint",
                transactionId: receipt?.transactionHash,
              };
              updateNFT(data);
              showToaster("NFT Minted Successfully.", "success");

              router.push("/profile-created");
            }
          }
        } catch (error) {
          console.error(error);
          setLoader(false);
        }
      }
    }
  };
  const { mutate: updateNFT } = useMutation<any>({
    method: POST,
    url: ApiUrl.UPDATE_NFT_MINT_DATA,
    token: true,
  });

  const { mutate } = useMutation<any>({
    method: POST,
    url: ApiUrl?.CREATE_NFT,
    isFileData: true,
    token: true,
    showSuccessToast: true,
    showErrorToast: true,
    onError: (data) => {
      if (data?.status !== 200) {
        setLoader(false);
        showToaster(`${data?.message}`, "error");
      }
    },
    onSuccess: async (data) => {
      console.log("🚀 ~ file: create.tsx:146 ~ onSuccess: ~ data:", data);
      const ipfsJsonUrl = data?.data?.ipfsJsonUrl;
      const prefixedUrl = "ipfs://" + ipfsJsonUrl;
      await minting(prefixedUrl, collectionAddress);
    },
  });

  const filtredCollections =
    collections &&
    collections?.map((collection: any) => ({
      label: collection?.name,
      value: collection?.id,
      contractAddress: collection?.contractAddress,
    }));

  const getImgUrl = (imgUrl: ImgUrlFunParam) => {
    if ("url" in imgUrl) {
      setNftFile("");
    } else {
      setNftFile(imgUrl);
    }
  };

  const getSelectedData = (selectedValue: any, identifier: string) => {
    setCollectionId(selectedValue?.value);
    setCollectionAddress(selectedValue?.contractAddress);
  };

  const initialValues = {
    photo: nftFile,
    name: nftName,
    description: nftDesc,
    collectionId: collectionId,
    properties: properties || [],
  };

  return (
    <>
      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "952px" }}
        px={{ base: "17px", sm: "34px", xl: "17px" }}
      >
        <Heading as="h1" mb={{ base: "20px", xl: "45px" }} pt={"30px"}>
          Create New Item
        </Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={nftSchema}
          enableReinitialize
          onSubmit={(values) => {
            mutate({
              ...values,
              properties: JSON.stringify(properties),
              photo: nftFile,
              collectionId: collectionId,
              minting_contract_address: collectionAddress,
            });
            setLoader(true);
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              <FormLabel m="0" display="flex" fontSize="16px" color="#393F59">
                <Text mr="8px" color="#E53E3E">
                  *
                </Text>
                Required fields
              </FormLabel>
              <FormControl mt={{ base: "0px", sm: "auto" }}>
                <NftPropertiesModal
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  nftName={values?.name}
                  setNftName={setNftName}
                  nftDesc={values?.description}
                  setNftDesc={setNftDesc}
                  properties={properties}
                  setProperties={setProperties}
                />
                <Stack direction="column">
                  <FormControl isRequired>
                    <FileUpload
                      label="Image"
                      detail={createnft?.bannerImg}
                      height="300px"
                      imgFor="nft"
                      imgUrl={getImgUrl}
                      maxFileSize={11e6}
                    />
                    {touched["photo"] && errors["photo"] && (
                      <Text
                        marginTop={"0px!important"}
                        fontWeight={"500"}
                        color={"red.700"}
                      >
                        {errors["photo"] as React.ReactNode}
                      </Text>
                    )}
                  </FormControl>
                  <FormLabel
                    fontSize="24px!important"
                    fontWeight="700"
                    mb="0!important"
                  >
                    Details
                  </FormLabel>

                  <Field
                    as={InputField}
                    size="md"
                    label="Name"
                    type="text"
                    formControlProps={{ isRequired: true }}
                    placeholder="Name your NFT"
                    name="name"
                    errorText={
                      touched["name"] && errors["name"]
                        ? errors["name"]
                        : undefined
                    }
                    maxLength={50}
                  />
                  <Field
                    name="description"
                    component={ChakraTextarea}
                    label="Description"
                    placeholder="Describe your collection, 1000 characters are allowed."
                  />

                  <FormLabel
                    fontSize="24px!important"
                    mt="30px"
                    fontWeight="700"
                    mb="0!important"
                  >
                    Collection
                  </FormLabel>
                  <Text color="#393F59">
                    This is the collection where your item will appear.
                  </Text>

                  <ReactSelect
                    options={filtredCollections}
                    isMultiple={false}
                    getSelectedData={getSelectedData}
                    identifier="collection"
                    label=""
                    placeholder="Select Collection"
                    nftName={values?.name}
                    setNftName={setNftName}
                    nftDesc={values?.description}
                    setNftDesc={setNftDesc}
                  />
                  {touched["collectionId"] && errors["collectionId"] && (
                    <Text
                      marginTop={"0px!important"}
                      fontWeight={"500"}
                      color={"red.700"}
                    >
                      {errors["collectionId"] as React.ReactNode}
                    </Text>
                  )}
                  <Flex
                    justifyContent="space-between"
                    mt="38px"
                    alignItems="center"
                  >
                    <Box>
                      <Heading fontSize={"24px"}>Properties</Heading>
                      <Text fontSize={"16px"} mt="16px" color="#393F59">
                        Textual traits that show up as rectangles
                      </Text>
                    </Box>
                    <Box mt={{ base: "25px", md: "0" }}>
                      <IconButton
                        color=" #756C99"
                        mt={{ base: "8px", sm: "0" }}
                        mb={{ base: "8px", sm: "0" }}
                        ml={{ base: "5px", sm: "0" }}
                        variant="outline"
                        colorScheme="#6863F3"
                        aria-label="Send"
                        fontSize="20px"
                        onClick={onOpen}
                        icon={<i className="icon-plus"></i>}
                      />
                    </Box>
                  </Flex>
                  <Box>
                    <Flex flexWrap={"wrap"}>
                      {properties &&
                        properties?.length > 0 &&
                        properties?.map((items: any) => (
                          <>
                            <Stat
                              flexBasis={"22%"}
                              flex={"0% 1 0%)"}
                              margin={"12px 12px 12px 0"}
                            >
                              <StatLabel>{items?.name}</StatLabel>
                              <StatNumber>{items?.value}</StatNumber>
                            </Stat>
                          </>
                        ))}
                      <Button
                        display="none"
                        color="#6863F3"
                        fontSize="14px"
                        fontWeight="bold"
                        bg="transparent"
                        p="0"
                        variant="link"
                        onClick={onOpen}
                        mt="5"
                      >
                        +Create Properties
                      </Button>
                    </Flex>
                  </Box>
                </Stack>
              </FormControl>

              <Button
                isLoading={loader}
                type="submit"
                variant="primary"
                textTransform="uppercase"
              >
                Create NFT
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default CreateNFT;
