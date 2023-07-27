import { Image } from "@chakra-ui/image";
import { Flex, Heading, Text, VStack, Box } from "@chakra-ui/layout";
import { isNumeric } from "@chakra-ui/utils";
import { useQueryClient } from "@tanstack/react-query";
import { GenericTable } from ".";
import { ApiUrl } from "../../apis/apiUrl";
import { currencySymbol } from "../../constants";
import { POST } from "../../hooks/consts";
import { QUERY_KEYS } from "../../hooks/queryKeys";
import { useInfiniteQuery } from "../../hooks/useInfiniteQuery";
import { useMutation } from "../../hooks/useMutation";
import NextImage from "next/image";

export const CollectionWatchListTable = ({
  refresh,
  dayFilter,
  catFilter,
}: {
  refresh: boolean;
  dayFilter: string;
  catFilter: string;
}) => {
  const queryClient = useQueryClient();
  const {
    data: collectionStatsWatchList,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery<any>({
    queryKey: [QUERY_KEYS.GET_WATCHLIST, dayFilter, catFilter, refresh],
    url: ApiUrl.GET_WATCHLIST,
    params: {
      day: dayFilter,
      catid: catFilter,
    },
    token: true,
  });
  const { mutate: removeFromWatchlist } = useMutation<any>({
    method: POST,
    url: ApiUrl.REMOVE_FROM_WATCHLIST,
    showSuccessToast: true,
    successMessage: "Removed from watchlist",
    token: true,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_WATCHLIST]);
    },
  });
  const columns = [
    { key: "collection", title: "Collection" },
    { key: "volume", title: "Volume", isNumeric: true },
    { key: "floorPrice", title: "Floor Price", isNumeric: true },
    { key: "Sales", title: "Sales", isNumeric: true },
    { key: "uniqueOwner", title: "% Unique Owners", isNumeric: true },
    { key: "itemlisted", title: "% Items listed", isNumeric: true },
    {
      key: "state_action",
      title: "",
      actions: [
        {
          type: "menu",
          label: "remove to watchlist",
          icon: <i className="icon-menu"></i>,
          options: [{ label: "Remove From Watchlist", value: 1 }],
          onSelect: (id: number) => {
            removeFromWatchlist({ collectionId: id });
          },
        },
      ],
    },
  ];
  const data =
    collectionStatsWatchList &&
    collectionStatsWatchList?.map((collectionStat: any, index: number) => {
      return {
        id: collectionStat?.id,
        collection: (
          <Flex gap="2" alignItems="center" mr="48px">
            <Box
              w={{ base: "50px", md: "64px" }}
              h={{ base: "50px", md: "64px" }}
              boxSize="100px"
              position="relative"
            >
              <NextImage
                src={collectionStat?.logoImageUrl}
                alt="watchlist images"
                loading="lazy"
                fill
                style={{ border: "1px solid white", borderRadius: "16px", objectFit:"cover" }}
              />
            </Box>
            <VStack spacing="0.5">
              <Heading fontSize="18px">
                {collectionStat?.name &&
                  collectionStat?.name?.substring(0, 16) + "..."}
              </Heading>
            </VStack>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9375 3.16615C15.9278 3.17883 15.9173 3.19085 15.906 3.20212L6.24726 13.157C6.17032 13.2346 6.06669 13.2804 5.95713 13.2853C5.84758 13.2903 5.74019 13.2539 5.65649 13.1836L0.133175 8.02475C0.0580879 7.96287 0.0107815 7.87397 0.00162672 7.77753C-0.00752805 7.68109 0.0222157 7.58498 0.0843373 7.51027L0.11742 7.47587L2.18118 5.50241C2.26316 5.42719 2.36989 5.38414 2.48148 5.38126C2.59307 5.37838 2.70191 5.41588 2.78771 5.48677L5.36347 8.13421C5.44717 8.20455 5.55455 8.24089 5.66411 8.23596C5.77366 8.23103 5.8773 8.18519 5.95424 8.10763L13.116 0.848661C13.1947 0.770237 13.2995 0.722878 13.4107 0.715399C13.522 0.70792 13.6323 0.740829 13.7209 0.808003L15.8477 2.6548C15.8869 2.68302 15.9202 2.71864 15.9455 2.75962C15.9709 2.8006 15.9878 2.84613 15.9954 2.89362C16.003 2.94111 16.0011 2.98963 15.9898 3.03639C15.9786 3.08315 15.9581 3.12725 15.9296 3.16615H15.9375Z"
                fill="#6863F3"
              />
            </svg>
          </Flex>
        ),
        volume: `${collectionStat?.volume ?? ""} ${currencySymbol}`,

        floorPrice: (
          <Text>{`${collectionStat?.floor_price} ${currencySymbol}`}</Text>
        ),
        Sales: <Text>{collectionStat?.sale}</Text>,
        uniqueOwner: <Text>{`${collectionStat?.uniqueOwner}`}</Text>,
        itemlisted: <Text>{`${collectionStat?.itemListedCount}`}</Text>,
      };
    });
  return (
    <GenericTable
      columns={columns}
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      tableName="stateTable"
    />
  );
};
