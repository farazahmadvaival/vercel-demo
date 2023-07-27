import { Container, Box, Skeleton } from '@chakra-ui/react';

const SkeletonLoader = () => {
    return (
        <Container
            zIndex="-1"
            position="relative"
            backgroundColor="gray.200"
            h={{ base: "220px", md: "400px" }}
            pl={{ base: "24px", md: "54px" }}
            borderRadius='16px'
        >
            <Box position="absolute" transform="translateY(-50%)" bottom="-35%" backgroundColor="gray.100" height={{ base: "100px", md: "200px" }} width={{ base: "100px", md: "200px" }} borderRadius="16px" />
        </Container>
    );
};

export default SkeletonLoader;
