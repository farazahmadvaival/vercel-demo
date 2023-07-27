import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { GenericTable } from ".";
import { currencySymbol } from "../../constants";
import NextImage from "next/image";

export const TopTenTable = ({
  isLoading,
  data,
}: {
  isLoading: any;
  data: any;
}) => {
  const fakeData = [1, 2, 3, 4];
  const columns = [
    { key: "collection", title: "Collection" },
    { key: "floorPrice", title: "Floor Price", isNumeric: true },
    { key: "volume", title: "Volume", isNumeric: true },
  ];

  const skeletonData = fakeData?.map((counter: number, _index: number) => {
    return {
      collection: (
        <Flex position="relative" alignItems="center" gap="24px">
          <Box
            w="96px"
            h="96px"
            borderRadius="16px"
            backgroundColor="gray.200"
          />
          <Heading
            fontSize="18px"
            color="gray.200"
            bg="gray.200"
            borderRadius="md"
          ></Heading>
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
            animation="shimmer 1s infinite"
          />
        </Flex>
      ),
      floorPrice: (
        <Text
          w="50%"
          fontSize="16px"
          color="gray.200"
          bg="gray.200"
          rounded="md"
          ml="auto"
        >
          loading
        </Text>
      ),
      volume: (
        <Text
          w="50%"
          fontSize="16px"
          color="gray.200"
          bg="gray.200"
          rounded="md"
          ml="auto"
        >
          loading
        </Text>
      ),
      id: counter,
    };
  });

  const tableData =
    data &&
    data?.map((collection: any, index: number) => {
      return {
        collection: (
          <Flex alignItems="center" gap="24px" flex="85%">
            <Box
              w={{ base: "50px", md: "96px" }}
              h={{ base: "50px", md: "96px" }}
              position="relative"
            >
              <NextImage
                src={collection?.logoImageUrl}
                alt="Picture of the author"
                // objectFit="cover"
                fill
                loading="lazy"
                style={{
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />
            </Box>
            {/* <Image
              src={collection?.logoImageUrl}
              boxSize="100px"
              objectFit="cover"
              border="1px solid white"
              borderRadius="16px"
            /> */}
            <VStack spacing="0.5">
              <Heading fontSize="18px">
                {collection?.name && collection?.name?.substring(0, 16) + "..."}
              </Heading>
            </VStack>
          </Flex>
        ),
        floorPrice: collection?.floor_price + " " + `${currencySymbol}`,
        volume: collection?.volume + " " + `${currencySymbol}`,
        id: collection?.id,
      };
    });
  return (
    <GenericTable
      data={isLoading ? skeletonData : tableData}
      columns={columns}
      variant="borderLess"
      tableName="topTen"
    />
  );
};
