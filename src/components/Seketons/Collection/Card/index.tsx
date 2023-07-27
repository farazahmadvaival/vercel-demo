import {
    Container,
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    CardFooter,
    SimpleGrid,
    Box,
  } from "@chakra-ui/react";

const Index = () => {
    return (
    <Container py="12px" px={{ base: "0", sm: "12px" }}>
      <Box>
        <Card
          position="relative"
          maxH={{ base: "359px", xl: "459px" }}
          overflow="hidden"
          justifyContent="center"
          p={{ base: "0!important", sm: "12px" }}
        >
          <CardBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box
              height={{ base: "225px", md: "250px", xl: "342px" }}
              borderBottomRadius={8}
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
            <Stack
              pt="24px"
              spacing="3"
              px={{ base: "24px", sm: "16px", lg: "24px" }}
              pb="24px"
            >
              <Heading size="20px" fontWeight="700" color="gray.200" bg="gray.200" rounded="md">
                Loading...
              </Heading>
              <SimpleGrid columns={[2, null, 2]} spacing="40px">
                <Box>
                  <Text fontSize="14px" color="gray.200" bg="gray.200" rounded="md" mb="8px">
                    Loading...
                  </Text>
                  <Text fontSize="20px" fontWeight="500" color="gray.200" bg="gray.200" rounded="md">
                    Loading...
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="14px" color="gray.200" bg="gray.200" rounded="md" mb="8px">
                    Loading...
                  </Text>
                  <Text fontSize="20px" fontWeight="500" color="gray.200" bg="gray.200" rounded="md">
                    Loading...
                  </Text>
                </Box>
              </SimpleGrid>
            </Stack>
          </CardBody>
          <CardFooter
          />
        </Card>
      </Box>
    </Container>
    );
  };

  export default Index;