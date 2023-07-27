import { Tabs, TabList, Tab, Box } from '@chakra-ui/react';

const SkeletonLoader = () => {
  return (
    <Tabs position="relative">
    <TabList
      overflowX={{ base: 'auto', md: 'initial' }}
      overflowY={{ base: 'hidden', md: 'initial' }}
      gap={{ base: '15px', md: '22px' }}
      borderBottom={{ base: '0px solid rgba(53, 53, 53, 0.2)', sm: '1px solid rgba(53, 53, 53, 0.2)' }}
      pl="0"
      mx="17px"
    >
      {[...Array(5)].map((counter, _index) => (
        <Tab
          key={counter}
          color="gray.200" bg="gray.200" rounded="md"
          _selected={{color:"gray.200", backgroundColor:"gray.200"}}
          p="0 8px"
          mb="6px"
        >
          Loading..
        </Tab>
      ))}
    </TabList>
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
      animation="shimmer 1s infinite"
      />
    </Tabs>
  );
};

export default SkeletonLoader;