import { Container, Box, Card, CardBody } from '@chakra-ui/react';

const SkeletonLoader = () => {
  return (
    <Container py="12px" px={{ base: "0", sm: "12px" }}>
    <Card
      maxW="sm"
      justifyContent="center"
      overflow="hidden"
      p={{ base: "0!important", sm: "12px" }}
    >
      <CardBody
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="relative"
          height={{ base: "225px", md: "250px", xl: "342px" }}
          maxW="100%"
          w="100%"
          bg="gray.200"
        >
        <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
            animation="shimmer 1s infinite"
          />
        </Box>
      </CardBody>
    </Card>
    </Container>
  );
};

export default SkeletonLoader;
