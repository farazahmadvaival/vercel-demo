import {
  Container,
  HStack,
  Image,
  Text,
  Flex,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { ApiUrl } from "../src/apis/apiUrl";
import ExploreInfoHeaderSkeleton from '../src/components/Seketons/infoHeader/Explore'
import CollectionCard from "../src/components/Cards/CollectionCard";
import { QUERY_KEYS } from "../src/hooks/queryKeys";
import { useQuery } from "../src/hooks/useQuery";
import Link from "next/link";
import { useInfiniteQuery } from "../src/hooks/useInfiniteQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../src/components/Loader";
import { collectionType, nftType } from "../src/types";
import { GridView } from "../src/views/GridView";
import {
  categoriesFilterOptions,
  currencySymbol,
  timeFilterOptions,
} from "../src/constants";
import { HorizentalButtonFilter } from "../src/components/HorizentalButtonFilters";
import { categoriesAndTagsTypes } from "../src/types/collection";
import { useState } from "react";

const Categories: NextPage = () => {
  const { data: bannerCollection } = useQuery<collectionType>({
    queryKey: [QUERY_KEYS],
    url: ApiUrl.GET_BANNER_COLLECTION,
    token: false,
  });
  const [catFilter, setCatFilter] = useState<string>();
  const {
    data: allCollections,
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isLoading: isLoadingAllCollections,
  } = useInfiniteQuery<(collectionType & nftType)[]>({
    queryKey: [QUERY_KEYS.GET_ALL_COLLECTIONS, catFilter],
    url: ApiUrl.GET_ALL_COLLECTIONS,
    params: {
      catid: catFilter,
    },
  });
  const { isLoading, data: categories } = useQuery<categoriesAndTagsTypes>({
    queryKey: [QUERY_KEYS.GET_CAT],
    url: ApiUrl?.GET_CATEGORIES,
    showToast: false,
  });
  const categoriesOptions = categories && categoriesFilterOptions(categories);
  const [isVisible, setIsVisible] = useState<boolean>();

  const over = () => {
    setIsVisible(true);
  };
  const out = () => {
    setIsVisible(false);
  };
  return (
    <>
      <Flex justifyContent="center" >
        <Box  mt={{ base: "20px" }} px={{base:'12px', md:'0'}}>
          {isLoading ? (
          <HStack position="relative" flexWrap="wrap" justifyContent='center'>
          {[...Array(4)]?.map((counter, index) => (
            <Box key={index} color="gray.200" bg="gray.200" borderRadius="md" py="12px" px="20px">
              <Text fontSize="14px" fontWeight="600" color="gray.200" bg="gray.200" rounded="md">
                Loading...
              </Text>
            </Box>
          ))}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
            animation="shimmer 1s infinite"
          />
          </HStack>
          ) : (
        <HorizentalButtonFilter
          options={categoriesOptions?.options}
          onChange={(value: string) => setCatFilter(value)}
          type={categoriesOptions?.type}
          defaultValue={"defaultValue"}
        />
        )}
        </Box>
       
      </Flex>
      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        mt={{ base: "60px" }}
      >
        <Box>
          {isLoading ? (
            <ExploreInfoHeaderSkeleton />
          ): (
            <Container
            p={{ base: "24px", sm: "24px 40px", md: "48px" }}
            variant="colorful"
            position="relative"
            bgSize="cover"
            bgImage={bannerCollection?.bannerImageUrl}
            backgroundRepeat="no-repeat"
            h="400px"
            bgPos="center"
          >
            <Image
              src={bannerCollection?.logoImageUrl}
              boxSize="100px"
              objectFit="cover"    
              mt="75px"
              border="1px solid white"
              borderRadius="16px"
            />
            <Flex
              alignItems={{ base: "baseline", md: "center" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box>
                <Text
                  color="white"
                  marginTop="12px"
                  fontSize={{ base: "14px", md: "16px" }}
                >
                  By{" "}
                  {bannerCollection?.user?.userName
                    ? bannerCollection?.user?.userName
                    : bannerCollection?.user?.walletAddress?.slice(0, 5) +
                      "..." +
                      bannerCollection?.user?.walletAddress?.slice(37, 42)}
                </Text>
                <Heading
                  color="white"
                  marginTop="8px"
                  marginBottom="10px"
                  fontSize={{ base: "24px", sm: "28px", lg: "40px" }}
                >
                  {bannerCollection?.name}
                </Heading>
                <Flex gap="6" alignItems="center">
                  <Text color="white" fontSize={{ base: "14px", md: "16px" }}>
                    {bannerCollection?.nftCount ?? 0} items
                  </Text>
                  <Text color="white" fontSize={{ base: "14px", md: "16px" }}>
                    {bannerCollection?.price ?? 0} {currencySymbol}
                  </Text>
                </Flex>
              </Box>
              <Box w='220px' ml={{base:'initial',md:'auto'}}>
                <Button
                  as={Link}
                  href={`collection/${bannerCollection?.id}`}
                  size={{ base: "md", lg: "lg" }}
                  mt={{ base: "20px", md: "60px" }}
                  fontWeight='600'
                  color="purple.500"
                  p={{ base: "18px 26px", md: "32px" }}
                  fontSize='16px'
                  textTransform='uppercase'
                  _hover={{
                    transitionDuration: "0.2s",
                    transitionTimingFunction: "ease-in-out",
                  
                  }}
                  onMouseOver={over}
                  onMouseOut={out}
                >
                  View Collection{" "}
                  <Box
                    ml="8px"
                    color="#6863F3"
                    transform={isVisible ? "translateX(0px)" : "translateX(5px)"}
                    display={isVisible ? "block" : "none"}
                  >
                    <i className="icon-right"></i>
                  </Box>
                </Button>
              </Box>
            </Flex>
          </Container>
          )}
        </Box>
      </Container>

      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        mt={{ base: "40px", lg: "80px" }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          px={{ base: "0", sm: "12px" }}
        >
          <Heading fontSize={{ base: "24px", md: "36px", xl: "48px" }}>
            Featured Collections
          </Heading>
        </Flex>
          <GridView
            isLoading={isLoadingAllCollections}
            data={allCollections}
            type="collection"
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
      </Container>
    </>
  );
};
export default Categories;
