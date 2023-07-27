import React, { useEffect, useState } from "react";
import {
  FileUpload,
  ReactSelect,
  ImgUrlFunParam,
} from "../../src/components/common";
import { useQuery } from "../../src/hooks/useQuery";
import { ApiUrl } from "../../src/apis/apiUrl";
import { QUERY_KEYS } from "../../src/hooks/queryKeys";
import { Field, Form, Formik, FieldArray, ErrorMessage } from "formik";
import InputField from "../../src/components/InputField";
import ChakraTextarea from "../../src/components/Textarea";
import { collectionDetail } from "../../src/constants";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collectionSchema } from "../../src/schemas";
import { PATCH, POST } from "../../src/hooks/consts";
import { useMutation } from "../../src/hooks/useMutation";
import { ReactSelectCatMap } from "../../src/components/common/ReactSelect/types";
import { useRouter } from "next/router";
const abiDecoder = require("abi-decoder");
import {
  collectionByIdTypes,
  categoriesAndTagsTypes,
  collectionStateTypes,
  createCollectionTypes,
} from "../../src/types/collection";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useContract } from "../../src/connectors/marketProvider";
import { marketContractAbi } from "../../src/connectors/marketContractAbi";
import { showToaster } from "../../src/components/Toaster";
import { useQueryClient } from "@tanstack/react-query";

const CreateCollection = () => {
  const [collection, setCollection] = useState<collectionStateTypes>();
  const [nftName, setNftName] = useState<string>("");
  const [nftDesc, setNftDesc] = useState<string>("");
  const [catID, setCatId] = useState<any>("");
  const [tagArr, setTagArr] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [images, setImages] = useState<any>({
    logoImageUrl: "",
    featureImageUrl: "",
    bannerImageUrl: "",
  });
  const router = useRouter();
  const contractInst = useContract();
  const { account, provider } = useWeb3React<Web3Provider>();
  abiDecoder.addABI(marketContractAbi);
  const queryClient = useQueryClient();

  const { data: getCollectionById, isLoading: getCollectionByIdLoading } =
    useQuery<collectionByIdTypes>({
      queryKey: [QUERY_KEYS.GET_COLLECTION],
      url: `${ApiUrl?.GET_COLLECTION}/${router?.query?.id}`,
      showToast: false,
      enabled: router?.query?.id ? true : false,
      token: true,
      onSuccess: (data) => {
        setCatId(data?.category?.id);
        setImages({
          ...images,
          logoImageUrl: data?.logoImageUrl,
          featureImageUrl: data?.featureImageUrl,
          bannerImageUrl: data?.bannerImageUrl,
        });
        data?.tags?.length > 0 &&
          setTagArr(data?.tags?.map((items: any) => items?.id));
      },
    });

  const { mutate: updatePending } = useMutation<any>({
    method: POST,
    url: ApiUrl.UPDATE_PENDING_TRANSACTIONS,
    token: true,
  });

  // Call the contract

  const deployy = async (name: string) => {
    if (contractInst) {
      try {
        const result = await contractInst.deploy(name, "TOKEN");
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
            type: "collection",
            nonce: result?.nonce,
          };
          updatePending(pendingParams);
          const receipt = await ethProvider.waitForTransaction(result.hash);
          if (receipt.status == 1) {
            setLoader(false);
            const decodedLogs = abiDecoder.decodeLogs(receipt?.logs);
            const data = {
              contractAddress: decodedLogs[2]?.events[1]?.value,
              collectionName: decodedLogs[2]?.events[0]?.value,
            };
            update(data);
            showToaster("Collection Created Successfully.", "success");

            router.push("/profile-created");
          }
        }
      } catch (error) {
        setLoader(false);
        console.error(error);
      }
    }
  };

  const { mutate: update } = useMutation<any>({
    method: PATCH,
    url: ApiUrl.UPDATE_COLLECTION_ADDRESS,
    token: true,
  });

  const { data: categories } = useQuery<categoriesAndTagsTypes>({
    queryKey: [QUERY_KEYS.GET_CAT],
    url: ApiUrl?.GET_CATEGORIES,
    showToast: false,
  });

  const { data: tags } = useQuery<categoriesAndTagsTypes>({
    queryKey: [QUERY_KEYS.GET_TAGS],
    url: ApiUrl?.GET_TAGS,
    showToast: false,
  });

  const { mutate } = useMutation<createCollectionTypes>({
    method: POST,
    url: getCollectionById?.id
      ? `${ApiUrl?.CREATE_COLLECTION}/${getCollectionById?.id}`
      : ApiUrl?.CREATE_COLLECTION,
    showSuccessToast: true,
    onError: (data) => {
      if (data?.status !== 200) {
        setLoader(false);
      }
    },
    token: true,
    onSuccess: async (data) => {
      if (account && !router?.query?.id) {
        await deployy(data?.data?.name);
      } else if (router?.query?.id) {
        router.push(`/collection/${router?.query?.id}`);
        showToaster("Collection Updated Successfully.", "success");
        setLoader(false);
      }
    },
  });

  const filtredCat =
    categories &&
    categories?.map((cat: categoriesAndTagsTypes) => ({
      label: cat?.name,
      value: cat?.id,
    }));

  const filtredTags =
    tags &&
    tags?.map((cat: categoriesAndTagsTypes) => ({
      label: cat?.name,
      value: cat?.id,
    }));

  const filtredTagsById =
    getCollectionById?.tags &&
    getCollectionById?.tags?.map((tag: categoriesAndTagsTypes) => ({
      label: tag?.name,
      value: tag?.id,
    }));

  const getImgUrl = (imgUrlProp: ImgUrlFunParam) => {
    if (imgUrlProp?.imgFor === "logo") {
      setImages({ ...images, logoImageUrl: imgUrlProp?.url });
    } else if (imgUrlProp?.imgFor === "featured") {
      setImages({ ...images, featureImageUrl: imgUrlProp?.url });
    }
    if (imgUrlProp?.imgFor === "banner") {
      setImages({ ...images, bannerImageUrl: imgUrlProp?.url });
    }
  };

  const getSelectedData = (
    selectedValue: ReactSelectCatMap,
    identifier: string
  ) => {
    if (identifier == "cat") {
      setCatId(selectedValue?.value);
      setShowError(false);
    } else {
      setTagArr(
        selectedValue?.length > 0
          ? selectedValue?.map((category) => category?.value)
          : []
      );
    }
  };
  useEffect(() => {
    if (router?.query?.id === undefined) {
      console.log("here", getCollectionById);
      setCollection({});
      setNftName("");
      setNftDesc("");
      setCatId("");
      setTagArr([]);
      setLoader(false);
      setShowError(false);
      setImages({});
      queryClient.resetQueries([QUERY_KEYS.GET_COLLECTION]);
    }
  }, [router?.query?.id]);

  const initialValues = {
    logoImageUrl:
      collection?.logoImageUrl || getCollectionById?.logoImageUrl || "",
    bannerImageUrl:
      collection?.bannerImageUrl || getCollectionById?.bannerImageUrl || "",
    featureImageUrl:
      collection?.featureImageUrl || collectionDetail?.featuredImg || "",
    name: getCollectionById?.name || nftName || "",
    description: getCollectionById?.description || nftDesc || "",
    category: getCollectionById?.category?.id || collection?.category,
    tags: collection?.tags,
    website_url: getCollectionById?.website_url || "",
    etherscan: getCollectionById?.etherscan || "",
    telegram: getCollectionById?.telegram || "",
    twitter: getCollectionById?.twitter || "",
    instagram: getCollectionById?.instagram || "",
    Discord_id: getCollectionById?.Discord_id || "",
    creatorFee: getCollectionByIdLoading
      ? [{ walletAddress: "", percentage: null }]
      : getCollectionById?.creatorFee,
    collectionId: getCollectionById?.id || undefined,
  };

  return (
    <Container
      maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "952px" }}
      px={{ base: "17px", sm: "34px", xl: "17px" }}
      pt={{ base: "10px", xl: "30px" }}
    >
      <Heading mb={{ base: "18px", md: "45px" }} as="h1">
        Create Collection
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={collectionSchema}
        enableReinitialize
        onSubmit={(values) => {
          if (!catID || !images?.logoImageUrl) {
            setShowError(true);
          } else {
            mutate({ ...values, category: catID, tags: tagArr, ...images });
            setLoader(true);
          }
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
            <FormControl>
              <Stack direction="column">
                <FormControl isRequired>
                  <Box mb="40px">
                    <FileUpload
                      label="Logo Image"
                      detail={collectionDetail?.logoDetail}
                      imgFor="logo"
                      imgUrl={getImgUrl}
                      width="220px"
                      height="220px"
                      onlyIcon={true}
                      editAbleUrl={getCollectionById?.logoImageUrl}
                    />
                    {!images?.logoImageUrl && showError && (
                      <Text
                        marginTop={"10px!important"}
                        marginLeft={"5px!important"}
                        fontWeight={"500"}
                        color={"red.700"}
                      >
                        Logo image is required
                      </Text>
                    )}
                  </Box>
                </FormControl>
                <Box mb="40px">
                  <FileUpload
                    label="Featured Image"
                    detail={collectionDetail?.featuredImg}
                    imgFor="featured"
                    height="300px"
                    imgUrl={getImgUrl}
                    editAbleUrl={getCollectionById?.featureImageUrl}
                  />
                </Box>
                <Box mb="30px">
                  <FileUpload
                    label="Banner Image"
                    detail={collectionDetail?.bannerImg}
                    imgFor="banner"
                    height="300px"
                    imgUrl={getImgUrl}
                    editAbleUrl={getCollectionById?.bannerImageUrl}
                  />
                </Box>
                <FormLabel fontSize="24px!important" fontWeight="700">
                  Details
                </FormLabel>
                <FormControl mt={{ base: "0", md: "auto" }}>
                  <Field
                    readOnly={router?.query?.id ? true : false}
                    as={InputField}
                    size="md"
                    label="Name"
                    type="text"
                    placeholder="Name your collection"
                    name="name"
                    formControlProps={{ isRequired: true }}
                    errorText={
                      touched["name"] && errors["name"]
                        ? errors["name"]
                        : undefined
                    }
                    maxLength={50}
                  />
                </FormControl>
                <FormControl mt="0">
                  <Field
                    name="description"
                    component={ChakraTextarea}
                    
                    label="Description"
                    placeholder="Describe your collection, 1000 characters are allowed."
                  />
                  {touched["description"] && errors["description"] && (
                    <Text
                      marginTop={"8px!important"}
                      fontWeight={"500"}
                      color={"red.700"}
                    >
                      {errors["description"] as React.ReactNode}
                    </Text>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <ReactSelect
                    options={filtredCat}
                    isMultiple={false}
                    getSelectedData={getSelectedData}
                    identifier="cat"
                    label="Category"
                    placeholder="Select category"
                    nftName={values?.name}
                    setNftName={setNftName}
                    nftDesc={values?.description}
                    setNftDesc={setNftDesc}
                    defaultValue={{
                      label: getCollectionById?.category?.name,
                      value: getCollectionById?.category?.id,
                    }}
                  />
                  {showError && (
                    <Text
                      marginTop={"0px!important"}
                      fontWeight={"500"}
                      color={"red.700"}
                    >
                      Category is required
                    </Text>
                  )}
                </FormControl>
                <ReactSelect
                  options={filtredTags}
                  isMultiple={true}
                  getSelectedData={getSelectedData}
                  identifier="tag"
                  label="Tags"
                  placeholder="Select Tag"
                  nftName={values?.name}
                  setNftName={setNftName}
                  nftDesc={values?.description}
                  setNftDesc={setNftDesc}
                  defaultValue={router?.query?.id && filtredTagsById}
                />
              </Stack>

              <Box>
                <Heading fontSize={"24px"} mt="38px">
                  Social Links
                </Heading>
                <Text fontSize={"16px"} my="16px" color="#393F59">
                  Add your existing social links to build a stronger reputation.
                </Text>
                <Flex
                  gap={"10"}
                  display={{ base: "block", sm: "flex" }}
                  justifyContent={{
                    base: "initial",
                    sm: "space-between",
                    xl: "space-between",
                  }}
                >
                  <Field
                    as={InputField}
                    size="md"
                    label="Website URL"
                    type="text"
                    placeholder="https://"
                    name="website_url"
                    errorText={
                      touched["website_url"] && errors["website_url"]
                        ? errors["website_url"]
                        : undefined
                    }
                    maxLength={50}
                  />
                  <Field
                    as={InputField}
                    size="md"
                    label="Etherscan"
                    type="text"
                    placeholder="https://"
                    name="etherscan"
                    errorText={
                      touched["etherscan"] && errors["etherscan"]
                        ? errors["etherscan"]
                        : undefined
                    }
                    maxLength={50}
                  />
                </Flex>
                <Flex
                  gap={"10"}
                  display={{ base: "block", sm: "flex" }}
                  justifyContent={{
                    base: "initial",
                    sm: "space-between",
                    xl: "space-between",
                  }}
                >
                  <Field
                    as={InputField}
                    size="md"
                    label="Telegram"
                    type="text"
                    placeholder="https://"
                    name="telegram"
                    errorText={
                      touched["telegram"] && errors["telegram"]
                        ? errors["telegram"]
                        : undefined
                    }
                    maxLength={50}
                  />
                  <Field
                    as={InputField}
                    size="md"
                    label="Twitter"
                    type="text"
                    placeholder="https://"
                    name="twitter"
                    errorText={
                      touched["twitter"] && errors["twitter"]
                        ? errors["twitter"]
                        : undefined
                    }
                    maxLength={50}
                  />
                </Flex>
                <Flex
                  gap={"10"}
                  display={{ base: "block", sm: "flex" }}
                  justifyContent={{
                    base: "initial",
                    sm: "space-between",
                    xl: "space-between",
                  }}
                >
                  <Field
                    as={InputField}
                    size="md"
                    label="Instagram"
                    type="text"
                    placeholder="https://"
                    name="instagram"
                    errorText={
                      touched["instagram"] && errors["instagram"]
                        ? errors["instagram"]
                        : undefined
                    }
                    maxLength={50}
                  />
                  <Field
                    as={InputField}
                    size="md"
                    label="Discord"
                    type="text"
                    placeholder="https://"
                    name="Discord_id"
                    errorText={
                      touched["Discord_id"] && errors["Discord_id"]
                        ? errors["Discord_id"]
                        : undefined
                    }
                    maxLength={50}
                  />
                </Flex>
              </Box>
              <Box>
                <Heading fontSize={"24px"} mt="38px">
                  Creator Fees
                </Heading>
                <Text fontSize={"16px"} mt="16px" color="#393F59">
                  Collection owners can collect creator earnings when a user
                  re-sells an item they created. Contact the collection owner to
                  change the collection earnings percentage or the payout
                  address.
                </Text>
              </Box>

              <FieldArray name="creatorFee">
                {({ push, remove }: { push: any; remove: any }) => (
                  <>
                    {values &&
                      values?.creatorFee?.map((field: any, index: number) => (
                        <div key={index}>
                          <Flex
                            gap={{ base: "0", sm: "6" }}
                            alignItems={{
                              base: "flex-start",
                              sm: "baseline",
                            }}
                            flexDirection={{
                              base: "column",
                              sm: "row",
                              xl: "row",
                            }}
                            w={"100%"}
                          >
                            <Box
                              w={{ base: "100%", sm: "80%", xl: "80%" }}
                              display="flex"
                              alignItems="baseline"
                              flexDirection="column"
                            >
                              <FormControl isRequired mb="0">
                                <Field
                                  as={InputField}
                                  size="md"
                                  label="Wallet Address"
                                  type="text"
                                  formControlProps={{ isRequired: true }}
                                  maxLength={50}
                                  placeholder="e.g: 0x1dff … 3845"
                                  name={`creatorFee.${[index]}.walletAddress`}
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
                              </FormControl>
                              <Text
                                marginTop={"0px!important"}
                                fontWeight={"500"}
                                color={"red.700"}
                              >
                                <ErrorMessage
                                  name={`creatorFee.${[index]}.walletAddress`}
                                  component="div"
                                />
                              </Text>
                            </Box>

                            <Box w={{ base: "100%", sm: "20%", xl: "20%" }}>
                              <Field
                                as={InputField}
                                size="md"
                                label="Percentage"
                                type="number"
                                ispercent={true}
                                formControlProps={{ isRequired: true }}
                                placeholder="0"
                                maxLength={2}
                                name={`creatorFee.${[index]}.percentage`}
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
                              <Text
                                marginTop={"0px!important"}
                                fontWeight={"500"}
                                color={"red.700"}
                              >
                                <ErrorMessage
                                  name={`creatorFee.${[index]}.percentage`}
                                  component="div"
                                />
                              </Text>
                            </Box>
                            <Box ml={3}>
                              <IconButton
                                aria-label="close"
                                bg="#6863F34D"
                                mb={{ base: "10px", sm: "-80px" }}
                                ml={{ base: "0", sm: "10px" }}
                                type="button"
                                color="#6863F3"
                                border="1px solid #6863F3"
                                onClick={() => remove(index)}
                                icon={<i className="icon-remove"></i>}
                                visibility={index > 0 ? "visible" : "hidden"}
                              />
                            </Box>
                          </Flex>
                        </div>
                      ))}
                    {values?.creatorFee
                      ?.map((item: any) => item?.percentage)
                      ?.reduce((partialSum: any, a: any) => partialSum + a, 0) >
                      10 && (
                      <Text color={"red.700"} fontWeight={"500"}>
                        Percentage must be less than 10
                      </Text>
                    )}
                    <FormControl>
                      <Text
                        marginTop={"0px!important"}
                        fontWeight={"500"}
                        color={"red.700"}
                      >
                        {typeof errors["creatorFee"] === "string" && (
                          <ErrorMessage name={"creatorFee"} component="div" />
                        )}
                      </Text>
                    </FormControl>

                    {values?.creatorFee && values?.creatorFee?.length < 5 && (
                      <Button
                        color="#6863F3"
                        fontSize="14px"
                        fontWeight="600"
                        bg="transparent"
                        p="0"
                        type="button"
                        textDecoration="none"
                        variant="link"
                        onClick={() =>
                          push({ walletAddress: "", percentage: 0 })
                        }
                      >
                        <Box color="#6863F3" mr="8px">
                          <i className="icon-plus"></i>
                        </Box>{" "}
                        Add Address
                      </Button>
                    )}
                  </>
                )}
              </FieldArray>
            </FormControl>

            <Button
              isDisabled={
                values?.creatorFee
                  ?.map((item: any) => item?.percentage)
                  ?.reduce((partialSum: any, a: any) => partialSum + a, 0) >
                  10 && true
              }
              isLoading={loader}
              type="submit"
              variant="primary"
              textTransform="uppercase"
              mt="20px"
            >
              {router?.query?.id ? "Update Colection" : "Create Collection"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateCollection;
