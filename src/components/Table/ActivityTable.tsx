import { Image } from "@chakra-ui/image";
import { Flex, Heading, Text, VStack, Box } from "@chakra-ui/layout";
import { GenericTable } from ".";
import { addEllipsis, dayJs } from "../../utils";
import NextImage from "next/image";

export type tableType = {
  data: any;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean | undefined;
};
export const ActivityTable = ({
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: tableType) => {
  const columns = [
    { key: "status", title: "" },
    { key: "item", title: "Item" },
    { key: "from", title: "From" },
    { key: "to", title: "To" },
    { key: "time", title: "Time" },
  ];
  const getActivityStatus = (status: string) => {
    switch (status) {
      case "transfer":
        return (
          <Flex gap="2">
            <i className="icon-transfer" style={{ color: "#6863F3" }}></i>
            <Text fontWeight="700" flex="15%">
              Transfer
            </Text>
          </Flex>
        );
      case "list":
        return (
          <Flex gap="2">
            <i className="icon-list" style={{ color: "#6863F3" }}></i>
            <Text fontWeight="700" flex="15%">
              List
            </Text>
          </Flex>
        );
      case "sale":
        return (
          <Flex gap="2">
            <i className="icon-cart" style={{ color: "#6863F3" }}></i>
            <Text fontWeight="700" flex="15%">
              Sale
            </Text>
          </Flex>
        );
      case "mint":
        return (
          <Flex gap="2">
            <i className="icon-mint-nft" style={{ color: "#6863F3" }}></i>
            <Text fontWeight="700" flex="15%">
              Mint
            </Text>
          </Flex>
        );
      case "buy":
        return (
          <Flex gap="2">
            <i className="icon-cart" style={{ color: "#6863F3" }}></i>
            <Text fontWeight="700" flex="15%">
              Buy
            </Text>
          </Flex>
        );
    }
  };

  const tableData =
    data &&
    data?.map((activity: any, index: number) => {
      return {
        status: getActivityStatus(activity?.activityType?.toLowerCase()),
        item: (
          <Flex alignItems="center" gap="2" flex="85%">
            <Box
              w={{ base: "50px", md: "96px" }}
              h={{ base: "50px", md: "96px" }}
              boxSize="100px"
              flex={"none"}
              position="relative"
            >
              <NextImage
                src={
                  activity?.nft?.ipfsImageUrl
                    ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${activity?.nft?.ipfsImageUrl}`
                    : `/assets/images/fall-back-img.svg`
                }
                alt="activity page image"
                // style={{objectFit: activity?.nft?.ipfsImageUrl ? "cover" : "contain"}}
                fill
                loading="lazy"
                style={{
                  border: "1px solid white",
                  borderRadius: "16px",
                  objectFit: activity?.nft?.ipfsImageUrl ? "cover" : "contain",
                }}
                // objectFit={activity?.nft?.ipfsImageUrl ? "cover" : "contain"}
              />
            </Box>
            <VStack spacing="0.5">
              <Heading
                fontSize="18px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxWidth={{ base: "64px", md: "200px" }}
                mr={{ base: "28px", md: "auto" }}
              >
                {activity && addEllipsis(activity?.nft?.name)}
              </Heading>
              <Text color="rgba(57, 63, 89, 1)" fontSize="14px">
                {activity && activity?.collection?.name}
              </Text>
            </VStack>
          </Flex>
        ),
        from: activity?.fromAddress?.substring(0, 16) + "...",
        to: activity?.toAddress?.substring(0, 16) + "...",
        time: dayJs(activity?.insertedDate).fromNow(),
      };
    });
  return (
    <GenericTable
      data={tableData}
      columns={columns}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      ActivityTab={true}
    />
  );
};
