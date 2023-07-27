import { Image } from "@chakra-ui/image";
import { Flex, Heading, Text, VStack, Box } from "@chakra-ui/layout";
import { GenericTable } from ".";
import fallbackImage from "../../../public/assets/images/fall-back-img.svg";
import NextImage from "next/image";
export const TopOwnerTable = ({ data }: { data: any }) => {
  const columns = [
    { key: "item", title: "ITEM" },
    { key: "wallet", title: "WALLET", isNumeric: true },
    { key: "owned", title: "OWNED", isNumeric: true },
    { key: "percentageOwned", title: "% OWNED", isNumeric: true },
  ];

  const tableData =
    data &&
    data?.map((owner: any, index: number) => {
      return {
        item: (
          <Flex alignItems="center" gap="24px" flex="85%" mr="70px">
            <Box
              w={{ base: "50px", md: "56px" }}
              h={{ base: "50px", md: "56px" }}
              boxSize="100px"
              position="relative"
            >
              <NextImage
                src={
                  owner?.userofi?.prleUrl
                    ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${owner?.userofi?.prleUrl}`
                    : `/assets/images/fall-back-img.svg`
                }
                
                alt="top owner images"
                fill
                loading="lazy"
                style={{
                  border: "1px solid white",
                  borderRadius: "16px",
                  objectFit: owner?.userofi?.prleUrl ? "cover" : "contain",
                }}
              />
            </Box>
            <VStack spacing="0.5">
              <Heading fontSize="18px">
                {owner?.user?.displayName &&
                  owner?.user?.displayName?.substring(0, 16) + "..."}
              </Heading>
            </VStack>
          </Flex>
        ),
        wallet:
          owner?.user?.walletAddress &&
          owner?.user?.walletAddress.substring(0, 6) +
            "..." +
            owner?.user?.walletAddress.substring(
              owner?.user?.walletAddress.length - 6,
              owner?.user?.walletAddress.length
            ),
        owned: owner?.user?.owned && owner?.user?.owned,
        percentageOwned: ((owner?.user?.owned / owner?.totalNft) * 100).toFixed(
          2
        ),
      };
    });
  return (
    <GenericTable data={tableData} columns={columns} variant="borderLess" />
  );
};
