import { useState } from "react";
import {
  Container,
  Flex,
  Image,
  VStack,
  Heading,
  Text,
  Button,
  Box,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { getFromLocalStorage } from "../../utils";
import { useRouter } from "next/router";
import ConnectionModal from "../../Modals/nftProperties/connectionModal";

export const Banner = () => {
  const [isVisible, setIsVisible] = useState<boolean>();
  const {
    isOpen: isConnectionModalOpen,
    onOpen: onConnectionModalOpen,
    onClose: onConnectionModalClose,
  } = useDisclosure();
  const router = useRouter();

  const over = () => {
    setIsVisible(true);
  };
  const out = () => {
    setIsVisible(false);
  };
  
  return (
    <Container
      variant="colorful"
      position="relative"
      padding={{ base: "25px", md: "25px 54px" }}
    >
      <Box position="absolute" bottom="0px" left="0px" opacity="0.4">
        <Image src="/assets/images/banner-lines.png" />
      </Box>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <VStack
          alignItems="start"
          width={{ base: "100%", xl: "60%" }}
          spacing={{ base: "4", lg: "6" }}
        >
          <Heading
            mt={{ md: "15px", xl: "28px" }}
            color="white"
            fontSize={{ base: "32px", md: "48px", xl: "64px" }}
            textShadow="10px 10px 20px rgba(13, 13, 13, 0.3)"
          >
            <span style={{ fontWeight: "500" }}>Mint</span> NFTs, Collections
          </Heading>
          <Text color="white" fontSize={{ md: "20px", xl: "24px" }}>
            We are an all-in-one innovative minting platform that provides you
            seamless and user-friendly blockchain experience.
          </Text>
          <Flex alignItems="center">
            <Button
              mt={{ md: "0px", xl: "50px" }}
              color="#6863F3"
              fontWeight="600"
              p={{ base: "18px 26px", md: "26px", lg: "32px" }}
              textTransform="uppercase"
              fontSize="16px"
              _hover={{
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
              onMouseOver={over}
              onMouseOut={out}
              onClick={() => {
                if (getFromLocalStorage("accessToken")) {
                  router.push("/nft/create");
                } else {
                  onConnectionModalOpen();
                }
              }}
            >
              Start Minting{" "}
              <Box
                ml="5px"
                color="#6863F3"
                transform={isVisible ? "translateX(5px)" : "translateX(-5px)"}
                display={isVisible ? "block" : "none"}
              >
                <i className="icon-right"></i>
              </Box>
            </Button>
            <ConnectionModal
              isOpen={isConnectionModalOpen}
              onOpen={onConnectionModalOpen}
              onClose={onConnectionModalClose}
            />
          </Flex>
        </VStack>
        <Box w="40%">
          <Box
            maxW="373px"
            maxH="350px"
            display={{ base: "none", xl: "block" }}
            ml="auto"
            mr="20px"
          >
            <Image
              display={{ base: "none", xl: "block" }}
              src="/assets/images/banner-block.png"
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
