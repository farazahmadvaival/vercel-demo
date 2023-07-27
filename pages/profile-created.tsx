import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Container, Flex, Box, VStack, Heading, Text } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ApiUrl } from "../src/apis/apiUrl";
import CollectionCard from "../src/components/Cards/CollectionCard";
import { ReactSelect } from "../src/components/common";
import { Loader } from "../src/components/Loader";
import ProfileDetail from "../src/components/Profile/ProfileDetail";
import ProfileHeader from "../src/components/Profile/ProfileHeader";
import { SlickSlider } from "../src/components/ReactSlick";
import { ActivitySideFilter } from "../src/components/SidebarFilter/ActivitySideFilter";
import { UserCollectionSideFilter } from "../src/components/SidebarFilter/UserCollectionSideFilter";
import CustomSlider from "../src/components/Slider";
import { ActivityTable } from "../src/components/Table/ActivityTable";
import { QUERY_KEYS } from "../src/hooks/queryKeys";
import { useDebounce } from "../src/hooks/useDebounce";
import { useInfiniteQuery } from "../src/hooks/useInfiniteQuery";
import { useQuery } from "../src/hooks/useQuery";
import { collectionType, filters, nftType, profileType } from "../src/types";
import { convertPropertyObject, convertToQueryParam } from "../src/utils";
import { GridView } from "../src/views/GridView";
import ListView from "../src/views/ListView";
import { DrawerFilter } from "./../src/components/SidebarFilter/DrawerFilter";
import {
  FormControl,
  FormLabel,
  Icon,
  Progress,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProfilCreated: NextPage = () => {
  const [view, setView] = useState<string>("grid");
  const [filters, setFilters] = useState<filters>({ sort: "ASC", search: "" });
  const [search, setSearch] = useState<string>();
  const debounceValue = useDebounce(search, 500);
  const [propertyQuery, setPropertyQuery] = useState<{ property: any }>({
    property: {},
  });
  const [toggleSideFilter, setToggleSideFilter] = useState<boolean>(false);
  const [toggleActivityFilter, setToggleActivityFilter] =
    useState<boolean>(false);
  const filterBreakPoint = useBreakpointValue(
    {
      base: true,
      sm: true,
      md: true,
      lg: false,
    },
    {
      fallback: "lg",
    }
  );
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);
  const router = useRouter();

  const changeViewMode = (viewMode: string) => {
    setView(viewMode);
  };
  const searchHandler = (e: any) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setFilters({ ...filters, search: debounceValue });
  }, [debounceValue]);
  const { data, isLoading: isProfileLoading } = useQuery<profileType>({
    queryKey: [QUERY_KEYS.GET_USER],
    url: ApiUrl.GET_USER,
    token: true,
  });
  const { data: userCollections, isLoading: isLoadingUserCollection } =
    useQuery<collectionType[]>({
      queryKey: [QUERY_KEYS.GET_COLLECTION_BY_USER_ID],
      url: ApiUrl.GET_COLLECTION_BY_USER_ID,
      token: true,
    });
  const {
    data: userNfts,
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isLoading: isLoadingUserNfts,
  } = useInfiniteQuery<nftType[]>({
    queryKey: [QUERY_KEYS.GET_USER_NFTS, filters || isFilterChanged],
    url: ApiUrl.GET_USER_NFTS,
    params: { ...filters, ...propertyQuery?.property },
    token: true,
  });
  const {
    data: collectedNfts,
    fetchNextPage: fetchNextCollectedPage,
    hasNextPage: hasNextCollectedPage,
    isLoading: isLoadingCollectedNfts,
  } = useInfiniteQuery<nftType[]>({
    queryKey: [QUERY_KEYS.GET_COLLECTED_NFT, filters || isFilterChanged],
    url: ApiUrl.GET_COLLECTED_NFT,
    params: { ...filters, ...propertyQuery?.property },
    token: true,
  });
  const {
    data: activities,
    fetchNextPage: fetchNextPageActivities,
    hasNextPage: hasNextPageActivities,
    isLoading: isLoadingActivities,
  } = useInfiniteQuery<any>({
    queryKey: [QUERY_KEYS.GET_USER_ACTIVITES, filters],
    url: ApiUrl.GET_USER_ACTIVITES,
    params: {
      ...filters,
    },
    token: true,
  });
  const socialIcons = [
    { icon: "icon-internet", url: data?.websiteUrl ? data?.websiteUrl : "" },
    { icon: "icon-telegram", url: data?.telegram ? data?.telegram : "" },
    { icon: "icon-froggy", url: data?.discord ? data?.discord : "" },
    { icon: "icon-instagram", url: data?.instagram ? data?.instagram : "" },
    { icon: "icon-twitter", url: data?.twitter ? data?.twitter : "" },
    {
      icon: "icon-groupbar",
      url: data?.etherScanUrl ? data?.etherScanUrl : "",
    },
  ];

  return (
    <>
      <Container maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}>
        <Box px={{ base: "0", sm: "17px" }}>
          {isProfileLoading && data === undefined ? (
            <Flex
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Loader />
            </Flex>
          ) : (
            <ProfileHeader
              socialIcons={socialIcons}
              showSocialIcons={true}
              coverPhoto={data?.profileCoverURL}
              profilePhoto={data?.profileUrl}
              id={`${data?.id}`}
            />
          )}
        </Box>
        <Box mb={{ base: "12px", md: "35px" }}>
          <ProfileDetail
            showStats={false}
            data={{ ...data, description: data?.bio }}
            isCollection={false}
          />
        </Box>
      </Container>
      <Container maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}>
        <Box>
          <Tabs>
            <TabList ml="12px" pl="0">
              <Tab>Collected</Tab>
              <Tab>Created</Tab>
              <Tab>Activity</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <Flex
                  pt="20px"
                  borderTop={
                    collectedNfts?.length
                      ? "1px solid rgba(53, 53, 53, 0.2)"
                      : ""
                  }
                >
                  <DrawerFilter
                    isOpen={
                      filterBreakPoint
                        ? toggleSideFilter && filterBreakPoint
                        : false
                    }
                    onClose={() => {
                      setToggleSideFilter(false);
                    }}
                  >
                    <UserCollectionSideFilter
                      onChange={(filter: any) => {
                        setFilters({
                          ...filters,
                          status: filter?.status && filter?.status,
                          collections: filter?.collections,
                        });
                        setIsFilterChanged(!isFilterChanged);
                      }}
                    />
                  </DrawerFilter>
                  {toggleSideFilter && !filterBreakPoint ? (
                    <UserCollectionSideFilter
                      onChange={(filter: any) => {
                        setFilters({
                          ...filters,
                          status: filter?.status && filter?.status,
                          collections: filter?.collections,
                        });
                        setIsFilterChanged(!isFilterChanged);
                      }}
                    />
                  ) : (
                    ""
                  )}

                  <Box w="100%">
                    <Flex
                      mx="12px"
                      justifyContent={"end"}
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Box order="1">
                        <IconButton
                          variant="outline"
                          colorScheme="primary"
                          aria-label="Send email"
                          icon={<i className="icon-funnel"></i>}
                          onClick={() => setToggleSideFilter(!toggleSideFilter)}
                        />
                      </Box>
                      <Box
                        order={{ base: "4", sm: "2" }}
                        w={{ base: "100%", sm: "auto" }}
                        pl={{ base: "0", sm: "8px" }}
                        pt={{ base: "15px", md: "0", xl: "0" }}
                      >
                        <InputGroup
                          variant="custom"
                          colorScheme="purple"
                          w={{ base: "full", sm: "200px", md: "sm" }}
                          marginBottom={{
                            base: "3",
                            md: "initial",
                            xl: "initial",
                          }}
                        >
                          <Input
                            placeholder="Search..."
                            onChange={(e) => searchHandler(e)}
                            value={search}
                          />
                          <InputLeftElement>
                            <img src="/assets/images/search.svg" />
                          </InputLeftElement>
                        </InputGroup>
                      </Box>
                      <Box
                        width={{ base: "119px", sm: "150px" }}
                        ml="8px"
                        order={{ base: "2", sm: "3" }}
                      >
                        <ReactSelect
                          options={[
                            { label: "Ascending ", value: "ASC" },
                            { label: "Descending ", value: "DESC" },
                          ]}
                          placeholder="Sort By"
                          isMultiple={false}
                          identifier="filter"
                          getSelectedData={(selectedOption: any) =>
                            setFilters({
                              ...filters,
                              sort: selectedOption?.value,
                            })
                          }
                        />
                      </Box>
                      <ButtonGroup
                        order={{ base: "3", sm: "3" }}
                        size="md"
                        isAttached
                        variant="outline"
                        ml="8px"
                      >
                        <IconButton
                          variant="outline"
                          colorScheme="primary"
                          aria-label="Send email"
                          icon={<i className="icon-list"></i>}
                          onClick={() => changeViewMode("list")}
                          bg={view === "list" ? "rgba(111, 107, 243, 0.3)" : ""}
                          color={
                            view === "list"
                              ? "rgba(111, 107, 243, 0.3)"
                              : "#756C99"
                          }
                        />
                        <IconButton
                          variant="outline"
                          colorScheme="primary"
                          aria-label="Send email"
                          icon={<i className="icon-grid"></i>}
                          onClick={() => changeViewMode("grid")}
                          bg={view === "grid" ? "rgba(111, 107, 243, 0.3)" : ""}
                          color={
                            view === "grid"
                              ? "rgba(111, 107, 243, 0.3)"
                              : "#756C99"
                          }
                        />
                      </ButtonGroup>
                      <Box></Box>
                      <Box></Box>
                    </Flex>
                    {view === "grid" ? (
                      <GridView
                        data={collectedNfts}
                        fetchNextPage={fetchNextCollectedPage}
                        hasNextPage={hasNextCollectedPage}
                        type="nft"
                        isLoading={isLoadingCollectedNfts}
                      />
                    ) : (
                      userNfts !== undefined && (
                        <ListView
                          data={collectedNfts}
                          fetchNextPage={fetchNextCollectedPage}
                          hasNextPage={hasNextCollectedPage}
                        />
                      )
                    )}
                  </Box>
                </Flex>
              </TabPanel>

              <TabPanel p={0}>
                <Box>
                  {data?.collections && data.collections?.length <= 0 ? (
                    ""
                  ) : (
                    <SlickSlider>
                      {data?.collections?.map(
                        (collection: any, index: number) => {
                          return (
                            <Box
                              key={index}
                              onClick={() =>
                                router.push(`/collection/${collection?.id}`)
                              }
                              cursor="pointer"
                            >
                              <CollectionCard
                                type="withBody"
                                isEditAble={true}
                                key={index}
                                featureImage={collection?.bannerImageUrl}
                                logoImage={collection?.logoImageUrl}
                                isShowFeatureImage={true}
                                isShowLogoImage={true}
                                name={collection.name}
                                nftCollectionId={collection?.id}
                              />
                            </Box>
                          );
                        }
                      )}
                    </SlickSlider>
                  )}
                </Box>
                <Flex
                  pt="20px"
                  borderTop={
                    userCollections?.length
                      ? "1px solid rgba(53, 53, 53, 0.2)"
                      : ""
                  }
                >
                  <DrawerFilter
                    isOpen={
                      filterBreakPoint
                        ? toggleSideFilter && filterBreakPoint
                        : false
                    }
                    onClose={() => {
                      setToggleSideFilter(false);
                    }}
                  >
                    <UserCollectionSideFilter
                      onChange={(filter: any) => {
                        setFilters({
                          ...filters,
                          status: filter?.status && filter?.status,
                          collections: filter?.collections,
                        });
                        setIsFilterChanged(!isFilterChanged);
                      }}
                    />
                  </DrawerFilter>
                  {toggleSideFilter && !filterBreakPoint ? (
                    <UserCollectionSideFilter
                      onChange={(filter: any) => {
                        setFilters({
                          ...filters,
                          status: filter?.status && filter?.status,
                          collections: filter?.collections,
                        });
                        setIsFilterChanged(!isFilterChanged);
                      }}
                    />
                  ) : (
                    ""
                  )}

                  <Box w="100%">
                    <Flex
                      mx="12px"
                      justifyContent={"end"}
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Box order="1">
                        <IconButton
                          variant="outline"
                          colorScheme="primary"
                          aria-label="Send email"
                          icon={<i className="icon-funnel"></i>}
                          onClick={() => setToggleSideFilter(!toggleSideFilter)}
                        />
                      </Box>
                      <Box
                        order={{ base: "4", sm: "2" }}
                        w={{ base: "100%", sm: "auto" }}
                        pl={{ base: "0", sm: "8px" }}
                        pt={{ base: "15px", md: "0", xl: "0" }}
                      >
                        <InputGroup
                          variant="custom"
                          colorScheme="purple"
                          w={{ base: "full", sm: "200px", md: "sm" }}
                          marginBottom={{
                            base: "3",
                            md: "initial",
                            xl: "initial",
                          }}
                        >
                          <Input
                            placeholder="Search..."
                            onChange={(e) => searchHandler(e)}
                            value={search}
                          />
                          <InputLeftElement>
                            <img src="/assets/images/search.svg" />
                          </InputLeftElement>
                        </InputGroup>
                      </Box>
                      <Box
                        width={{ base: "119px", sm: "150px" }}
                        ml="8px"
                        order={{ base: "2", sm: "3" }}
                      >
                        <ReactSelect
                          options={[
                            { label: "Ascending ", value: "ASC" },
                            { label: "Descending ", value: "DESC" },
                          ]}
                          placeholder="Sort By"
                          isMultiple={false}
                          identifier="filter"
                          getSelectedData={(selectedOption: any) =>
                            setFilters({
                              ...filters,
                              sort: selectedOption?.value,
                            })
                          }
                        />
                      </Box>
                      <ButtonGroup
                        order={{ base: "3", sm: "3" }}
                        size="md"
                        isAttached
                        variant="outline"
                        ml="8px"
                      >
                        <IconButton
                          variant="outline"
                          colorScheme="primary"
                          aria-label="Send email"
                          icon={<i className="icon-list"></i>}
                          onClick={() => changeViewMode("list")}
                          bg={view === "list" ? "rgba(111, 107, 243, 0.3)" : ""}
                          color={
                            view === "list"
                              ? "rgba(111, 107, 243, 0.3)"
                              : "#756C99"
                          }
                        />
                        <IconButton
                          variant="outline"
                          colorScheme="primary"
                          aria-label="Send email"
                          icon={<i className="icon-grid"></i>}
                          onClick={() => changeViewMode("grid")}
                          bg={view === "grid" ? "rgba(111, 107, 243, 0.3)" : ""}
                          color={
                            view === "grid"
                              ? "rgba(111, 107, 243, 0.3)"
                              : "#756C99"
                          }
                        />
                      </ButtonGroup>
                      <Box></Box>
                      <Box></Box>
                    </Flex>
                    {view === "grid" ? (
                      <GridView
                        data={userNfts}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        type="nft"
                        isLoading={isLoadingUserNfts}
                      />
                    ) : (
                      userNfts !== undefined && (
                        <ListView
                          data={userNfts}
                          fetchNextPage={fetchNextPage}
                          hasNextPage={hasNextPage}
                        />
                      )
                    )}
                  </Box>
                </Flex>
              </TabPanel>

              <TabPanel pt="0">
                <Flex pt="20px" gap="4">
                  <DrawerFilter
                    isOpen={
                      filterBreakPoint
                        ? toggleActivityFilter && filterBreakPoint
                        : false
                    }
                    onClose={() => {
                      setToggleActivityFilter(false);
                    }}
                  >
                    <ActivitySideFilter
                      type="user"
                      onChange={(filter: any) => {
                        setFilters({
                          ...filters,
                          event: filters?.event,
                        });
                      }}
                    />
                  </DrawerFilter>
                  {toggleActivityFilter && !filterBreakPoint ? (
                    <ActivitySideFilter
                      type="user"
                      onChange={(filter: any) => {
                        setFilters({
                          ...filters,
                          event: filter?.event,
                          collections: filter?.collections,
                        });
                        setIsFilterChanged(!isFilterChanged);
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <Box w="100%">
                    <Flex
                      justifyContent={"end"}
                      alignItems="center"
                      pt="20px"
                      flexWrap="wrap"
                    >
                      <Box order="1">
                        <IconButton
                          variant="outline"
                          colorScheme="primary"
                          aria-label="Send"
                          icon={<i className="icon-funnel"></i>}
                          onClick={() =>
                            setToggleActivityFilter(!toggleActivityFilter)
                          }
                        />
                      </Box>
                      <Box
                        order={{ base: "3", sm: "2" }}
                        w={{ base: "100%", sm: "auto" }}
                        pl={{ base: "0", sm: "8px" }}
                        pt={{ base: "15px", md: "0", xl: "0" }}
                      >
                        <InputGroup
                          variant="custom"
                          colorScheme="purple"
                          w={{ base: "full", sm: "200px", md: "sm" }}
                          marginBottom={{
                            base: "3",
                            md: "initial",
                            xl: "initial",
                          }}
                        >
                          <Input
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                          <InputLeftElement>
                            <img src="/assets/images/search.svg" />
                          </InputLeftElement>
                        </InputGroup>
                      </Box>
                      <Box
                        width="150px"
                        ml="8px"
                        order={{ base: "2", sm: "3" }}
                      >
                        <ReactSelect
                          options={[
                            { label: "Ascending ", value: "ASC" },
                            { label: "Descending ", value: "DESC" },
                          ]}
                          isMultiple={false}
                          identifier="filter"
                          getSelectedData={(selectedOption: any) =>
                            setFilters({
                              ...filters,
                              sort: selectedOption?.value,
                            })
                          }
                          placeholder="Sort By"
                        />
                      </Box>
                    </Flex>
                    <ActivityTable
                      data={activities}
                      hasNextPage={hasNextPageActivities}
                      fetchNextPage={fetchNextPageActivities}
                      isLoading={isLoadingActivities}
                    />
                  </Box>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default ProfilCreated;
