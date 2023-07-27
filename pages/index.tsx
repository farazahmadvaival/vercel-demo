import type { NextPage } from "next";

import {
  Container,
  Heading,
  Flex,
  Button,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  VStack,
  Td,
  Text,
  Image,
} from "@chakra-ui/react";
// skeletons
import TabsSkeleton from "../src/components/Seketons/Tabs";
import CardCollectionSkeleton from "../src/components/Seketons/Collection";
import CardWOBodyCollectionSkeleton from "../src/components/Seketons/Collection/WithOutBody";

import { SlickSlider } from "../src/components/ReactSlick";
import { Banner } from "../src/components/Banner";
import { FilterTabs } from "../src/components/FilterTabs";
import CustomSlider from "../src/components/Slider";
import { useQuery } from "../src/hooks/useQuery";
import { QUERY_KEYS } from "../src/hooks/queryKeys";
import { ApiUrl } from "../src/apis/apiUrl";
import { categoriesType, collectionType } from "../src/types";
import Link from "next/link";
import { dashboardApiType } from "../src/types/response.type";
import { Loader } from "../src/components/Loader";
import { ReactSelect } from "../src/components/common";
import React, { useState } from "react";
import { HorizentalButtonFilter } from "../src/components/HorizentalButtonFilters";
import CollectionCard from "../src/components/Cards/CollectionCard";
import { timeFilterOptions } from "../src/constants";
import { TopTenTable } from "../src/components/Table/TopTenTable";

const Home: NextPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const filters = ["trending", "top"];
  const [day, setDay] = useState<string>("30");
  const { data, isLoading } = useQuery<dashboardApiType>({
    queryKey: [QUERY_KEYS.GET_DASHBOARD_COLLECTIONS],
    url: ApiUrl.GET_DASHBOARD_COLLECTION,
    showToast: false,
  });
  const { data: categories, isLoading: isLoadingBrowsByCat } = useQuery<
    categoriesType[]
  >({
    queryKey: [QUERY_KEYS.GET_CAT],
    url: ApiUrl.GET_CATEGORIES,
  });
  const { data: topTenData, isLoading: isTopTenLoading } = useQuery<
    categoriesType[]
  >({
    queryKey: [QUERY_KEYS.GET_TOPTEN_COLLECTIONS, filters[tabIndex], day],
    url: ApiUrl.GET_TOPTEN_COLLECTIONS,
    params: {
      type: filters[tabIndex],
      day: day,
    },
  });

  return (
    <div>
      <Box position="relative">
        <Box
          bgImage="/assets/images/bg-lines.png"
          position="absolute"
          left="0"
          right="0"
          bottom="-60px"
          w="100%"
          h="100%"
          bgSize="cover"
          bgPosition="bottom"
        ></Box>
        <Container maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}>
          <Box>
            <Banner />
          </Box>
        </Container>
      </Box>

      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        mt={{ base: "40px", lg: "80px" }}
      >
        <Heading
          px={{ base: "0", md: "12px" }}
          fontSize={{ base: "24px", md: "36px", xl: "48px" }}
        >
          Featured Collections
        </Heading>
        {isLoading && data === undefined ? (
          <CardWOBodyCollectionSkeleton />
        ) : (
          <SlickSlider>
            {data?.featured &&
              data?.featured.map((item: collectionType, index: number) => (
                <Link href={`collection/${item?.id}`} key={index}>
                  <CollectionCard
                    type="withoutBody"
                    featureImage={item?.logoImageUrl}
                    isShowFeatureImage={true}
                    isShowLogoImage={false}
                    name={item?.name}
                  />
                </Link>
              ))}
          </SlickSlider>
        )}
      </Container>
      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        mt={{ base: "40px", lg: "80px" }}
      >
        <Tabs onChange={(index) => setTabIndex(index)}>
          <TabList pl="0" alignItems="center" flexWrap="wrap">
            <Tab fontSize={{ base: "20px", md: "24px" }} fontWeight="700">
              Trending
            </Tab>
            <Tab fontSize={{ base: "20px", md: "24px" }} fontWeight="700">
              Top
            </Tab>

            <Flex
              alignItems="center"
              ml={{ base: "initial", sm: "auto" }}
              pb="8px"
              flexWrap="wrap"
              gap="8px"
              mt={{ base: "28px", md: "0" }}
            >
              <HorizentalButtonFilter
                options={timeFilterOptions?.options}
                onChange={(value: string) => setDay(value)}
                type={timeFilterOptions?.type}
                defaultValue={timeFilterOptions?.defaultValue}
              />
              <Button
                p={{ base: "15px", md: "20px 32px" }}
                as={Link}
                href="/categories"
                variant="primary"
                textTransform="uppercase"
              >
                View All
              </Button>
            </Flex>
          </TabList>

          <TabPanels>
            <TabPanel p="0" pb="25px" borderBottom="1px solid #35353533">
              <Box display={{ base: "none", md: "block" }}>
                <Flex gap="33px">
                  <Box w="50%">
                    <TopTenTable
                      isLoading={isTopTenLoading}
                      data={topTenData && topTenData?.slice(0, 5)}
                    />
                  </Box>
                  <Box w="50%">
                    <TopTenTable
                      isLoading={isTopTenLoading}
                      data={topTenData && topTenData?.slice(5, 10)}
                    />
                  </Box>
                </Flex>
              </Box>
              <Box w="100%" display={{ base: "block", md: "none" }}>
                <TopTenTable
                  isLoading={isTopTenLoading}
                  data={topTenData && topTenData?.slice(0, 10)}
                />
              </Box>
            </TabPanel>
            <TabPanel p="0">
              <Box display={{ base: "none", md: "block" }}>
                <Flex gap="33px">
                  <Box w="50%">
                    <TopTenTable
                      isLoading={isTopTenLoading}
                      data={topTenData && topTenData?.slice(0, 5)}
                    />
                  </Box>
                  <Box w="50%">
                    <TopTenTable
                      isLoading={isTopTenLoading}
                      data={topTenData && topTenData?.slice(5, 10)}
                    />
                  </Box>
                </Flex>
              </Box>

              <Box w="100%" display={{ base: "block", md: "none" }}>
                <TopTenTable
                  isLoading={isTopTenLoading}
                  data={topTenData && topTenData?.slice(0, 10)}
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        mt={{ base: "40px", lg: "80px" }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={{ base: "10px", sm: "30px" }}
          px={{ base: "0", md: "12px" }}
        >
          <Heading
            fontSize={{ base: "28px", sm: "32px", md: "36px", xl: "56px" }}
          >
            Browse by Categories
          </Heading>
          <Button
            p={{ base: "22px", md: "20px 32px" }}
            as={Link}
            href="/categories"
            variant="primary"
            textTransform="uppercase"
          >
            View All
          </Button>
        </Flex>
        {isLoadingBrowsByCat ? (
          <>
            <TabsSkeleton />
            <CardCollectionSkeleton />
          </>
        ) : (
          <FilterTabs
            tabsList={categories}
            getTabIndex={(index) => console.log(index)}
          />
        )}
      </Container>
      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        mt={{ base: "40px", lg: "80px" }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={{ base: "20px", lg: "40px" }}
          px={{ base: "0", md: "12px" }}
        >
          <Heading fontSize={{ base: "24px", md: "36px", xl: "48px" }}>
            Trending Collections
          </Heading>
          <Button
            p={{ base: "15px", md: "20px 32px" }}
            as={Link}
            href="/categories"
            variant="primary"
            textTransform="uppercase"
          >
            View All
          </Button>
        </Flex>
        {isLoading && data === undefined ? (
          <CardCollectionSkeleton />
        ) : (
          <SlickSlider>
            {data?.trending?.map((item: collectionType, index: number) => {
              return (
                <Link href={`collection/${item?.id}`} key={index}>
                  <CollectionCard
                    type="withBody"
                    featureImage={item?.logoImageUrl}
                    isShowFeatureImage={true}
                    isShowLogoImage={false}
                    name={item.name}
                  />
                </Link>
              );
            })}
          </SlickSlider>
        )}
      </Container>
      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        mt={{ base: "40px", lg: "80px" }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={{ base: "20px", lg: "40px" }}
          px={{ base: "0", md: "12px" }}
        >
          <Heading fontSize={{ base: "24px", md: "36px", xl: "48px" }}>
            Trending in Art
          </Heading>
          <Button
            p={{ base: "15px", md: "20px 32px" }}
            as={Link}
            href="/categories"
            variant="primary"
            textTransform="uppercase"
          >
            View All
          </Button>
        </Flex>
        {isLoading && data === undefined ? (
          <CardCollectionSkeleton />
        ) : (
          <SlickSlider>
            {data?.trendingInArt?.map((item: collectionType, index: number) => {
              return (
                <Link href={`collection/${item?.id}`} key={index}>
                  <CollectionCard
                    type="withBody"
                    featureImage={item.logoImageUrl}
                    isShowFeatureImage={true}
                    isShowLogoImage={false}
                    name={item.name}
                  />
                </Link>
              );
            })}
          </SlickSlider>
        )}
      </Container>
      <Container
        maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}
        mt={{ base: "40px", lg: "80px" }}
      >
        <Heading
          fontSize={{ base: "24px", md: "36px", xl: "48px" }}
          px={{ base: "0", md: "12px" }}
        >
          Recent Collections
        </Heading>
        {isLoading && data === undefined ? (
          <CardCollectionSkeleton />
        ) : (
          <SlickSlider>
            {data?.recent?.map((item: collectionType, index: number) => {
              return (
                <Link href={`collection/${item?.id}`} key={index}>
                  <CollectionCard
                    type="withBody"
                    featureImage={item.logoImageUrl}
                    isShowFeatureImage={true}
                    isShowLogoImage={false}
                    name={item.name}
                  />
                </Link>
              );
            })}
          </SlickSlider>
        )}
      </Container>
    </div>
  );
};

export default Home;
