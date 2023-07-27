import { useWeb3Context } from "../../context/Web3Provider";
import {
  Button,
  Stack,
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Image,
  useDisclosure,
  Switch,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Link,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import ConnectionModal from "../../Modals/nftProperties/connectionModal";
import { useWeb3React } from "@web3-react/core";
import { QUERY_KEYS } from "../../hooks/queryKeys";
import { signMessage } from "../../context/signMessage";
import { POST } from "../../hooks/consts";
import { ApiUrl } from "../../apis/apiUrl";
import { useMutation } from "../../hooks/useMutation";
import { useQuery } from "../../hooks/useQuery";
import {
  addEllipsis,
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils";
import { useEffect, useRef, useState } from "react";
import { setCookie } from "typescript-cookie";
import { bg } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";
import { showToaster } from "../Toaster";
import { boolean } from "yup";
import { useDebounce } from "../../hooks/useDebounce";
import { useRouter } from "next/router";

export const Header = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const debounceValue = useDebounce(search, 1000);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchBoxRef = useRef(null);
  const router = useRouter();


  useOutsideClick({
    ref: searchBoxRef,
    handler: () => setIsSearching(false),
  });
  const {
    isOpen: isConnectionModalOpen,
    onOpen: onConnectionModalOpen,
    onClose: onConnectionModalClose,
  } = useDisclosure();
  const { disconnect, disconnectWalletConnect } = useWeb3Context();
  const queryClient = useQueryClient();

  const { account, provider } = useWeb3React();

  const { mutate } = useMutation<any>({
    method: POST,
    url: ApiUrl?.SAVE_SIGNATURE,
    showToast: false,
    showSuccessToast: false,
    showErrorToast: false,
    onSuccess: (data: any) => {
      if (data?.data?.status == 220) {
        signature(data);
      } else if (data?.data?.status == 230) {
        showToaster("User is blocked", "warning");
        if (provider?.connection.url == "metamask") {
          disconnect("");
        } else {
          disconnectWalletConnect("");
        }
      } else {
        setToLocalStorage("accessToken", data?.data?.access_token);
        setCookie("accessToken", data?.data?.access_token);
      }
    },
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries([QUERY_KEYS.GET_SIGN]);
  };

  const { data: collectionSearch } = useQuery<any>({
    queryKey: [QUERY_KEYS?.GET_SEARCH_COLLECTIONS, debounceValue],
    url: ApiUrl?.GET_SEARCH_COLLECTIONS,
    params: {
      search: debounceValue,
    },
  });
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  // Function to handle account change
  const handleAccountChange = (accounts: string[]) => {
    const selectedAccount = accounts[0];
    setCurrentAccount(selectedAccount);
  };

  useEffect(() => {
    if (account) {
      setCurrentAccount(account);
    }
  }, [account]);

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", handleAccountChange);
    }

    return () => {
      if (provider) {
        provider.off("accountsChanged", handleAccountChange);
      }
    };
  }, [provider]);

  useEffect(() => {
    if (currentAccount) {
      invalidateQuery();
    }
  }, [currentAccount]);
  const handleSearch = (value: string) => {
    if (value.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    setSearch(value);
  };

  const handleSearchFocus = () => {
    if (search !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };
  const signature = async (savedSign: any) => {
    signMessage(provider).then((signature) => {
      if (signature.length == 0) {
        mutate({ walletAddress: account, walletHash: null });
        if (provider?.connection.url == "metamask") {
          disconnect("");
        } else {
          disconnectWalletConnect("");
        }
      } else mutate({ walletAddress: account, walletHash: signature });
    });
  };

  const { data: savedSign } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_SIGN],
    url: `${ApiUrl?.GET_SIGNATURE}/${account}`,
    onSuccess: (data: any) => {
      if (account == currentAccount) {
        if (data.status == 220) {
          signature(data);
        } else {
          mutate({ walletAddress: account });
        }
      }
    },
    enabled: account ? true : false,
  });

  return (
    <>
      <Container maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}>
        <Box pt="30px" pb={{base:'20px',md:'40px'}}>
          <Stack
            direction="row"
            alignItems={{ base: "flex-start", sm: "center", xl: "center" }}
            justifyContent={{ base: "flex-start", xl: "initial" }}
            flexWrap="wrap"
            gap={{ base: "0", md: "initial" }}
            zIndex="1"
            position="relative"
          >
            <Box
              pb="8px"
              order={{ base: "1", sm: "1" }}
              marginRight={{ base: "auto", md: "initial" }}
              as={NextLink}
              href="/"
            >
              <Image
                src="/assets/images/Logo.png"
                alt="logo"
                maxW="138"
                maxH="45px"
              />
            </Box>
            <Box
              order={{ base: "5", sm: "5", md: "6", lg: "2" }}
              w={{ base: "full", lg: "initial" }}
              pl={{ base: "0", lg: "10px", xl: "30px" }}
              pr={{ base: "0", lg: "15px", xl: "30px" }}
              pt={{ base: "5px" }}
              position="relative"
            >
              <InputGroup
                variant="custom"
                colorScheme="purple"
                w={{ base: "full", md: "full", lg: "200px", xl: "422px" }}
                marginBottom={{ base: "3", md: "initial", xl: "initial" }}
              >
                <Input
                  placeholder="Search..."
                  _hover={{ background: '#6863f305' }}
                  _focus={{border:'1px solid #6863F3',background: '#6863f305' }}
                  onChange={(e) => {
                    setIsSearching(true);
                    setSearch(e.target.value);
                  }}
                  onClick={() => setIsSearching(true)}
                />
                <InputLeftElement>
                  <img src="/assets/images/search.svg" />
                </InputLeftElement>
              </InputGroup>
              {search && isSearching ? (
                <Box
                  position="absolute"
                  top="50px"
                  boxShadow="2px 2px 8px 0px #0D0D0D1A"
                  background="rgba(255, 255, 255, 0.4)"
                  border="1px solid rgba(111, 107, 243, 0.4)"
                  backdropFilter="blur(30px)"
                  borderRadius="16px"
                  padding="8px"
                  pe={"0"}
                  bg="white"
                  zIndex={"9"}
                  w={{ base: "100%", lg: "90%" }}
                  ref={searchBoxRef}
                >
                  <Box
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "gray",
                        borderRadius: "24px",
                      },
                    }}
                    maxH="400px"
                    overflowY="scroll"
                  >
                    {collectionSearch && collectionSearch?.length > 0 ? (
                      collectionSearch?.map(
                        (collection: any, index: number) => {
                          return (
                            <Box
                              onClick={() => {
                                setIsSearching(false);
                                router.push(`/collection/${collection?.id}`);
                              }}
                              cursor="pointer"
                              key={index}
                            >
                              <Flex
                                alignItems="center"
                                gap="2"
                                pb="8px"
                                flex="85%"
                              >
                                <Image
                                  src={collection?.logoImageUrl}
                                  boxSize="100px"
                                  objectFit="cover"
                                  border="1px solid white"
                                  borderRadius="16px"
                                  w={{ base: "50px", md: "56px" }}
                                  h={{ base: "50px", md: "56px" }}
                                />
                                <VStack spacing="0.5" alignItems="start">
                                  <Heading fontSize="18px">
                                    {addEllipsis(collection?.name)}
                                  </Heading>
                                  <Text
                                    color="rgba(57, 63, 89, 1)"
                                    fontSize="14px"
                                  >
                                    Items {collection?.nftCount}
                                  </Text>
                                </VStack>
                              </Flex>
                            </Box>
                          );
                        }
                      )
                    ) : (
                      <Box onClick={()=>setIsSearching(false)}><Link as={NextLink}  href="/categories" textAlign="center"><Text p='10px'_hover={{bg:'gray.100'}}>Click here to view all Collections</Text></Link></Box>
                    )}

                    {/* <Link as={NextLink} _hover={{color:'#6863F3'}} href="/categories">
                      Explore
                    </Link> */}
                  </Box>
                </Box>
              ) : (
                ""
              )}
            </Box>
            <Box
              order={{ base: "4", sm: "4", md: "5", lg: "3" }}
              visibility={{
                base: toggleMenu ? "visible" : "hidden",
                lg: "initial",
              }}
              transform={{base: toggleMenu ? "translateY(5px)" : "translateY(-15px)" ,lg:'initial'}}
               h={{ base: toggleMenu ? "auto" : "0px", lg: "initial" }}
              // display={{ base: toggleMenu ? "block" : "none", lg: "initial" }}
              w={{ base: "100%", lg: "inherit" }}
              bg={{ base: "#ffdafe75", lg: "transparent" }}
              mt={{ base: "5px", lg: "initial" }}
              borderTopLeftRadius={{ base: "16px", lg: "0" }}
              borderTopRightRadius={{ base: "16px", lg: "0" }}
              transition={toggleMenu ? ".8s" : '0s'}
              position="relative"
              zIndex="1"
            >
              <HStack
                textTransform="uppercase"
                fontSize={{ base: "15px", xl: "16px" }}
                alignItems={{ base: "flex-start", lg: "center" }}
                fontWeight='500'
                flexDirection={{
                  base: "column",
                  sm: "column",
                  lg: "row",
                }}
                w={{ base: "100%", lg: "initial" }}
                spacing={{ base: "8px", lg: "11px", xl: "24px" }}
                p={{ base: "10px", lg: "0" }}
              >
                  <Link as={NextLink} href="/" _hover={{ color: "#6863f3" }}>
                    Home
                  </Link>
                <Link as={NextLink} href="/categories" _hover={{ color: "#6863f3" }}>
                  Explore
                </Link>

                <Menu>
                  <MenuButton
                    as={Button}
                    bg="transparent"
                    _active={{ bg: "transparent", color: "#6863f3" }}
                    _focusVisible={{ boxShadow: "transparent" }}
                    p={{ base: "0 0 8px 0", md: "0" }}
                    h="auto"
                    fontWeight='500'
                    lineHeight="1.5"
                    _hover={{ bg: "transparent", color: "#6863f3" }}
                    textTransform="uppercase"
                    fontSize={{ base: "15px", xl: "16px" }}
                    rightIcon={
                      <Box fontSize="8px">
                        <i className="icon-ChevronDown"></i>
                      </Box>
                    }
                  >
                    Stats
                  </MenuButton>
                  <MenuList
                    textTransform="capitalize"
                    w="109px"
                    minW="109px"
                    p=" 8px 16px"
                  >
                    <MenuItem
                      as={NextLink}
                      p="8px"
                      href="/collection/state"
                      _hover={{ color: "#6863f3" }}
                    >
                      Ranking
                    </MenuItem>
                    <MenuItem
                      as={NextLink}
                      p="8px"
                      href="/activity"
                      _hover={{ color: "#6863f3" }}
                    >
                      Activity
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Box>

            <Flex
              order={{ base: "6", sm: "6", md: "2", lg: "4" }}
              marginLeft={{ base: "auto", md: "auto !important" }}
              alignItems="center"
              justifyContent={{ sm: "flex-end" }}
              w={{ base: "full", md: "xs", xl: "initial" }}
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Menu autoSelect={false}>
                <ConnectionModal
                  isOpen={isConnectionModalOpen}
                  onOpen={onConnectionModalOpen}
                  onClose={onConnectionModalClose}
                />
                {!account ? null : (
                  <MenuButton
                    as={Button}
                    textTransform="uppercase"
                    fontSize="16px"
                    ml={{ base: "0", md: "30px", lg: "0" }}
                    mr={{ base: "0", sm: "25px", md: "0" }}
                    p={{ base: "initial", lg: "12px 16px" }}
                    variant="primary"
                    h="42px"
                    w={{ base: "full", sm: "50%", md: "75%", xl: "100px" }}
                    size="md"
                  >
                    Create
                  </MenuButton>
                )}
                <MenuList w="191px" minW="191px" p="16px 8px">
                  <MenuItem as={NextLink} href="/nft/create">
                    Create NFT
                  </MenuItem>
                  <MenuItem as={NextLink} href="/collection/create">
                    Create Collection
                  </MenuItem>
                </MenuList>
              </Menu>

              {!account ? (
                <Button
                  variant="secondary"
                  textTransform="uppercase"
                  mx={{ base: "0", md: "10px", lg: "16px" }}
                  fontSize="14px"
                  fontWeight="600"
                  w={{ base: "full", sm: "100%", md: "100%", xl: "initial" }}
                  size="md"
                  mt={{ base: "10px", sm: "0" }}
                  onClick={onConnectionModalOpen}
                >
                  Connect Wallet
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  textTransform="uppercase"
                  disabled={true}
                  mx={{ base: "0", md: "10px", lg: "16px" }}
                  fontSize="14px"
                  fontWeight="600"
                  letterSpacing="0.84px"
                  w={{ base: "full", sm: "50%", md: "100%", xl: "initial" }}
                  size="md"
                  mt={{ base: "10px", sm: "0" }}
                >
                  {account?.slice(0, 5) + "..." + account?.slice(37, 42)}
                </Button>
              )}
            </Flex>
            <Box
              order={{ base: "3", sm: "3", md: "4", lg: "5" }}
              display={{ base: "block", lg: "none" }}
            >
              <IconButton
                mr="0"
                ml="8px"
                colorScheme="purple"
                variant="outline"
                icon={<HamburgerIcon />}
                aria-label="Options"
                onClick={() => {
                  setToggleMenu(!toggleMenu);
                }}
              />
            </Box>
            <Box order={{ base: "2", sm: "2", md: "3", lg: "6" }}>
              <Menu>
                {!account ? null : (
                  <MenuButton
                    fontSize="20px"
                    color="#6F6BF3"
                    bg="#FFFFFF"
                    border="1px solid #6F6BF3"
                    borderRadius="50px"
                    height="40px"
                    w="40px"
                    as={IconButton}
                    _hover={{ bg: "#6F6BF3", color: "#fff" }}
                    _active={{ bg: "#6F6BF3", color: "#fff" }}
                    icon={<i className="icon-vector"></i>}
                    aria-label="Options"
                  />
                )}

                <MenuList w="191px" minW="191px" h="180px" p="16px 8px">
                  <MenuItem as={NextLink} href="/profile-created">
                    Profile
                  </MenuItem>
                  <MenuItem as={NextLink} href="/collection/my-collection">
                    My Collection
                  </MenuItem>
                  <MenuItem as={NextLink} href="/setting">
                    Settings
                  </MenuItem>

                  <MenuItem
                    onClick={(a) => {
                      if (provider?.connection.url == "metamask") {
                        disconnect("");
                      } else {
                        disconnectWalletConnect("");
                      }
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
