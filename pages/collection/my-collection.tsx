import type { NextPage } from "next";
import { Header } from "../../src/components/Header";
import CollectionCard from "../../src/components/Cards/CollectionCard";
import { Box, Container, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useQuery } from "../../src/hooks/useQuery";
import { Loader } from "../../src/components/Loader";
import { useInfiniteQuery } from "../../src/hooks/useInfiniteQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApiUrl } from "../../src/apis/apiUrl";
import { QUERY_KEYS } from "../../src/hooks/queryKeys";
import { collectionType } from "../../src/types";

const MyCollection: NextPage = (props) => {
  const router = useRouter();
  const { data, error, fetchNextPage, status, hasNextPage, isLoading } =
    useInfiniteQuery<collectionType[]>({
      queryKey: [QUERY_KEYS.GET_MY_COLLECTION],
      url: ApiUrl.GET_MY_COLLECTION,
      token: true,
    });
  return (
    <div>
      <Box>
        <Container maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}>
          <Box pt="30px" pb="40px" px={{ base: "0", sm: "17px" }}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              textAlign={{ base: "center", md: "initial" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box pr={{ base: "0", md: "50px" }}>
                <Heading
                  as="h1"
                  fontSize={{
                    base: "26px",
                    sm: "36px",
                    lg: "42px",
                    xl: "56px",
                  }}
                  mb={{ base: "10px", lg: "24px" }}
                >
                  My Collections
                </Heading>
                <Text fontSize={{ base: "18px", md: "24px" }}>
                  Create, curate, and manage collections of unique NFTs to share
                  and sell.
                </Text>
              </Box>
              <Box>
                <Button
                  variant="primary"
                  textTransform="uppercase"
                  fontSize="14px"
                  mt={{ base: "30px", lg: "0" }}
                  onClick={() => {
                    router.push("/collection/create");
                  }}
                >
                  Create Collection
                </Button>
              </Box>
            </Flex>
          </Box>
        </Container>
        <Container
          maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
          pb={{ xl: "100px", md: "50px" }}
        >
          <Box px={{ base: "0", sm: "17px" }}>
            <InfiniteScroll
              dataLength={data ? data.length : 0}
              next={() => fetchNextPage()}
              hasMore={!!hasNextPage}
              loader={
                <Flex
                  width="100%"
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Loader />
                </Flex>
              }
            >
              <Flex
                direction={["column", "row"]}
                flexWrap={{
                  base: "nowrap",
                  sm: "wrap",
                  md: "wrap",
                  lg: "wrap",
                  xl: "wrap",
                }}
              >
                {isLoading && (
                  <Flex
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Loader />
                  </Flex>
                )}
                {data && data?.length <= 0 ? (
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
                ) : (
                  data?.map((nftCollection: any, index: number) => {
                    return (
                      <Box
                        w={{ xl: "25%", md: "50%", sm: "100%" }}
                        display="initial"
                        cursor="pointer"
                        key={index}
                        onClick={() =>
                          router.push(`/collection/${nftCollection?.id}`)
                        }
                      >
                        <CollectionCard
                          isEditAble={true}
                          key={index}
                          type="withBody"
                          isShowLogoImage={true}
                          isShowFeatureImage={true}
                          logoImage={nftCollection.logoImageUrl}
                          featureImage={nftCollection.bannerImageUrl}
                          name={nftCollection.name}
                          volume="-.-"
                          price="-.-"
                          nftCollectionId={nftCollection?.id}
                        />
                      </Box>
                    );
                  })
                )}
                {/* <Loader /> */}
              </Flex>
              {/* <Flex
                direction={["column", "row"]}
                flexWrap={{
                  base: "nowrap",
                  sm: "wrap",
                  md: "wrap",
                  lg: "wrap",
                  xl: "wrap",
                }}
              >
                {isLoading && data === undefined ? (
                  <Flex
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Loader />
                  </Flex>
                ) : (
                  data?.map((nftCollection: any, index: number) => {
                    return (
                      <Box
                        w={{ xl: "25%", md: "50%", sm: "100%" }}
                        key={index}
                        display="initial"
                      >
                        <CollectionCard
                          key={index}
                          type="withBody"
                          logoImage={nftCollection.logoImageUrl}
                          featureImage={nftCollection.bannerImageUrl}
                          name={nftCollection.name}
                          volume="-.-"
                          price="-.-"
                          nftCollectionId={nftCollection?._id}
                        />
                      </Box>
                    );
                  })
                )}
              </Flex> */}
            </InfiniteScroll>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default MyCollection;
