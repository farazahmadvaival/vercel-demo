import {
  Container,
  Image,
  Text,
  Flex,
  Heading,
  Box,
  VStack,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/table";
import { NextPage } from "next";
import { ReactSelect } from "../src/components/common";
import { useInfiniteQuery } from "../src/hooks/useInfiniteQuery";
import { QUERY_KEYS } from "../src/hooks/queryKeys";
import { ApiUrl } from "../src/apis/apiUrl";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../src/components/Loader";
import { convertToQueryParam, dayJs } from "../src/utils";
import { ActivitySideFilter } from "../src/components/SidebarFilter/ActivitySideFilter";
import { useEffect, useState } from "react";
import { filters } from "../src/types";
import { useDebounce } from "../src/hooks/useDebounce";
import { ActivityTable } from "../src/components/Table/ActivityTable";
import { DrawerFilter } from "../src/components/SidebarFilter/DrawerFilter";

const Categories: NextPage = () => {
  const [filters, setFilters] = useState<filters>({ sort: "ASC", search: "" });
  const [search, setSearch] = useState<string>();
  const debounceValue = useDebounce(search, 1000);
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);
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
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<any>(
    {
      queryKey: [
        QUERY_KEYS.GET_ACTIVITIES,
        filters || isFilterChanged || debounceValue,
      ],
      url: ApiUrl.GET_ACTIVITIES,
      params: {
        ...filters,
      },
    }
  );

  const searchHandler = (e: any) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setFilters({ ...filters, search: debounceValue });
  }, [debounceValue]);
  return (
    <>
      <Container maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}>
        <Box pr={{ base: "0", md: "50px" }} >
          <Heading
            as="h1"
            fontSize={{
              base: "26px",
              sm: "36px",
              lg: "42px",
              xl: "56px",
            }}
            mb={{ base: "10px", lg: "36px" }}
          >
            Activity
          </Heading>
        </Box>
        <Flex pt="20px" gap="24px">
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
              mb="25px"
              flexWrap="wrap"
            >
              <Box order="1">
                <IconButton
                  variant="outline"
                  colorScheme="primary"
                  aria-label="Send email"
                  icon={<i className="icon-funnel"></i>}
                  onClick={() => setToggleActivityFilter(!toggleActivityFilter)}
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
                  marginBottom={{ base: "3", md: "initial", xl: "initial" }}
                >
                  <Input
                    placeholder="Search by Collections…"
                    _hover={{ background: '#6863f305' }}
                    _focus={{border:'1px solid #6863F3'}}
                    onChange={(e) => searchHandler(e)}
                    value={search}
                  />
                  <InputLeftElement>
                    <img src="/assets/images/search.svg" />
                  </InputLeftElement>
                </InputGroup>
              </Box>
              <Box width="150px" ml="8px" order={{ base: "2", sm: "3" }}>
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
              data={data}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isLoading={isLoading}
            />
          </Box>
        </Flex>
      </Container>
    </>
  );
};
export default Categories;
