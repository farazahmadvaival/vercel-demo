import { Container, Box, Flex, Text, Heading, Image, Button } from '@chakra-ui/react';

const SkeletonLoader = () => {
  return (
    <Container
    h="400px"
    position="relative"
    backgroundColor="gray.200"
    borderRadius="16px"
    p={{ base: "24px", sm: "24px 40px", md: "48px" }}
    >
      <Box w="100px" h="100px" borderRadius="16px" backgroundColor="gray.100" mt="75px" />
      <Flex alignItems={{ base: "baseline", md: "center" }} flexDirection={{ base: "column", md: "row" }}>
        <Box>
          <Text color="gray.100" backgroundColor="gray.100" borderRadius="md" marginTop="12px" fontSize={{ base: "14px", md: "16px" }}>Loading...</Text>
          <Heading color="gray.100" backgroundColor="gray.100" borderRadius="md" marginTop="8px" marginBottom="10px" fontSize={{ base: "24px", sm: "28px", lg: "40px" }}>Loading...</Heading>
          <Flex gap="6" alignItems="center">
            <Text color="gray.100" backgroundColor="gray.100" borderRadius="md" fontSize={{ base: "14px", md: "16px" }}>Loading...</Text>
            <Text color="gray.100" backgroundColor="gray.100" borderRadius="md" fontSize={{ base: "14px", md: "16px" }}>Loading...</Text>
          </Flex>
        </Box>
        <Box w="220px" ml={{ base: 'initial', md: 'auto' }}>
          <Button
            as={Box}
            size={{ base: "md", lg: "lg" }}
            mt={{ base: "20px", md: "60px" }}
            fontWeight='600'
            color="gray.100"
            p={{ base: "18px 26px", md: "32px" }}
            fontSize='16px'
            backgroundColor="gray.100"
          >
            View Collection
          </Button>
        </Box>
      </Flex>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
        animation="shimmer 1s infinite"
        />
    </Container>
  );
};

export default SkeletonLoader;
