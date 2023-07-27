import { Flex, Box, Heading } from "@chakra-ui/layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../components/Loader";
import Link from "next/link";
import CollectionCard from "../components/Cards/CollectionCard";
import { collectionType, nftType } from "../types";
import CardCollectionSkeleton from "../components/Seketons/Collection";

type dataType = collectionType & nftType;
type nftGridViewPropType = {
  data: dataType[] | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  type: string;
  isLoading: boolean | undefined;
};
export const GridView = ({
  data,
  fetchNextPage,
  hasNextPage,
  type,
  isLoading,
}: nftGridViewPropType) => {
  return (
    <>
      <InfiniteScroll
        dataLength={data ? data?.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<CardCollectionSkeleton />}
      >
        <Flex flexWrap="wrap" rowGap="16px" pt="24px">
          {isLoading && <CardCollectionSkeleton />}
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
            data &&
            data?.map((nft: dataType, index: number) => {
              return (
                <Box
                  flex={{ base: "100%", sm: "50%", lg: "33%", xl: "25%" }}
                  flexShrink={{ xl: "1" }}
                  flexGrow={{ xl: "0" }}
                  key={index}
                >
                  <Link
                    href={
                      type === "nft"
                        ? `/nft/detail/${nft?.id}`
                        : `/collection/${nft?.id}`
                    }
                  >
                    <CollectionCard
                      type="withBody"
                      name={nft?.name}
                      featureImage={
                        nft?.ipfsImageUrl
                          ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${nft?.ipfsImageUrl}`
                          : nft?.logoImageUrl
                      }
                      price={nft?.price}
                      isShowFeatureImage={true}
                      isShowLogoImage={false}
                    />
                  </Link>
                </Box>
              );
            })
          )}
        </Flex>
      </InfiniteScroll>
    </>
  );
};
