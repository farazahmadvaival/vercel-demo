import type { NextPage } from "next";
import { Header } from "../src/components/Header";
import CollectionCards from "../src/components/Cards/CollectionCard";
import BannerImage from "../src/components/BannerImage/";
import SocialIcon from "../src/components/SocialIcon/";
import RectangularIcon from "../src/components/RectangularVal/";
import Tabx from "../src/components/Tabs/";
import ConnectionBar from "../src/components/ConnectionBar/";
import { colors } from "../src/theme/colors";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { GenericTable } from "../src/components/Table";

const myCollection: NextPage = () => {
  const columns = [
    {
      key: "select",
      title: "",
      actions: [
        // {
        //   type: "button",
        //   label: "Edit",
        //   icon: <i className="icon-internet"></i>,
        //   onClick: (id: number) => console.log(id),
        // },
        {
          type: "checkbox",
          label: "Select",
          onChange: (id: number, checked: boolean) => console.log(id, checked),
        },
      ],
    },
    { key: "name", title: "Name" },
    {
      key: "actions",
      title: "Actions",
      actions: [
        {
          type: "menu",
          label: "Options",
          icon: <i className="icon-menu"></i>,
          options: [
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 },
          ],
          onSelect: (id: number, value: string) => console.log(id, value),
        },
      ],
    },
  ];
  const data = [
    { id: "1", name: "shoaib" },
    { id: "2", name: "shoaib" },
  ];
  return (
    <div>
      <Box>
        <Container maxW={{ sm: "4xl", lg: "6xl", xl: "8xl" }}>
          <Box pt="30px" pb="40px">
            <BannerImage />
            <Box>
              <SocialIcon />
            </Box>
            <Flex alignItems="center" pt="60px">
              <Heading as="h4" fontSize="32px">
                Evelyn Gutierrez
              </Heading>
              <Box mx="12px" color="#6863F3">
                <i className="icon-tick"></i>
              </Box>
              <Box>
                <Button
                  color="#393F59"
                  bg="transparent"
                  borderRadius="xl"
                  p="7px 8px"
                  fontSize="12px"
                  height="initial"
                  border="2px solid #6863F3"
                >
                  <Text mr="8px">0x797970 … 8080</Text>{" "}
                  <i className="icon-copy"></i>
                </Button>
              </Box>
            </Flex>
            <Flex
              flexDirection={{
                base: "column",
                md: "column",
                lg: "row",
                xl: "row",
              }}
            >
              <Box>
                <Box>
                  <Flex flexWrap="wrap">
                    <Box
                      display="flex"
                      alignItems="center"
                      fontSize="14px"
                      mr="24px"
                      pt="20px"
                      pb="24px"
                    >
                      <Text>Joined:</Text>
                      <Text fontWeight="bold"> Dec 2021</Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      fontSize="14px"
                      mr="24px"
                    >
                      <Text>Created:</Text>
                      <Text fontWeight="bold"> Dec 2021</Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      fontSize="14px"
                      mr="24px"
                    >
                      <Text>Created:</Text>
                      <Text fontWeight="bold"> Dec 2021</Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      fontSize="14px"
                      mr="24px"
                    >
                      <Text>Creator Fee:</Text>
                      <Text fontWeight="bold"> 10%</Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      fontSize="14px"
                      mr="24px"
                    >
                      <Text>Chain:</Text>
                      <Text fontWeight="bold"> Ethereum</Text>
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Text maxW={{ sm: "100%", xl: "90%" }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et…
                  </Text>
                </Box>
              </Box>
              <Box>
                <RectangularIcon />
              </Box>
            </Flex>
          </Box>

          <Box pt="30px" pb="40px">
            <Tabx />
          </Box>

          <Box>
            <Flex justifyContent={"end"}>
              <IconButton
                variant="outline"
                colorScheme="primary"
                aria-label="Send email"
                icon={<i className="icon-funnel"></i>}
              />
              <Box
                pl={{ base: "0", sm: "0", md: "20px" }}
                pt={{ base: "20px", md: "0", xl: "0" }}
              >
                <InputGroup
                  variant="custom"
                  colorScheme="purple"
                  w={{ base: "full", sm: "md", xl: "sm" }}
                  marginBottom={{ base: "3", md: "initial", xl: "initial" }}
                >
                  <Input placeholder="Search..."
                    _focus={{ border: '1px solid #6863F3' }} _hover={{ background: '#6863f305' }} />

                  <InputLeftElement>
                    <img src="/assets/images/search.svg" />
                  </InputLeftElement>
                </InputGroup>
              </Box>
              <Box px={"8px"}>
                <Menu>
                  <MenuButton
                    as={Button}
                    iconSpacing={"30px"}
                    rightIcon={<i className="icon-Chevron"></i>}
                    p={"15px"}
                    border={"1px solid #6863F3"}
                  >
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <IconButton
                  variant="outline"
                  colorScheme="primary"
                  aria-label="Send email"
                  icon={<i className="icon-list"></i>}
                />
              </Box>
              <Box>
                <IconButton
                  variant="outline"
                  colorScheme="primary"
                  aria-label="Send email"
                  icon={<i className="icon-grid"></i>}
                />
              </Box>
            </Flex>
          </Box>

          <Flex pt="30px" pb="40px">
            <ConnectionBar />
            <Box w={"auto"}>
              <Flex
                direction={["column", "row"]}
                flexWrap={{
                  base: "nowrap",
                  sm: "wrap",
                  md: "wrap",
                  lg: "wrap",
                  xl: "wrap",
                }}
              >
                <Box w={{ xl: "25%", md: "50%", sm: "100%" }} display="initial">
                  <CollectionCards />
                </Box>
                <Box w={{ xl: "25%", md: "50%", sm: "100%" }} display="initial">
                  <CollectionCards />
                </Box>
                <Box w={{ xl: "25%", md: "50%", sm: "100%" }} display="initial">
                  <CollectionCards />
                </Box>
                <Box w={{ xl: "25%", md: "50%", sm: "100%" }} display="initial">
                  <CollectionCards />
                </Box>
                <Box w={{ xl: "25%", md: "50%", sm: "100%" }} display="initial">
                  <CollectionCards />
                </Box>
                <Box w={{ xl: "25%", md: "50%", sm: "100%" }} display="initial">
                  <CollectionCards />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      <GenericTable columns={columns} data={data} />
    </div>
  );
};

export default myCollection;
