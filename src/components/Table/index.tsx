import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../Loader";
import { useRouter } from "next/router";
import { useState } from "react";

interface Action {
  type: string;
  label: string;
  icon?: React.ReactElement | JSX.Element;
  onClick?: (id: number) => void;
  onChange?: (id: number, checked: boolean) => void;
  options?: { label: string; value: any }[];
  onSelect?: (id: number, value: any) => void;
}

interface Column {
  key: string;
  title: string;
  isNumeric?: boolean;
  actions?: Action[];
}

interface Item {
  id: number;
  [key: string]: any;
}

interface GenericTableProps {
  data: any;
  columns: Column[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean | undefined;
  variant?: string;
  tableName?: string;
  ActivityTab?: boolean;
}

export const GenericTable = ({
  data,
  columns,
  fetchNextPage,
  hasNextPage,
  isLoading,
  variant,
  tableName,
  ActivityTab,
}: GenericTableProps) => {
  const router = useRouter();

  const handleClick = (e: any, id: string) => { 
    if (tableName === "topTen" || tableName === "stateTable") {
      router.push(`/collection/${id}`);
    }
  };

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <InfiniteScroll
      dataLength={data ? data?.length : 0}
      next={() => fetchNextPage && fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={
        <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Loader />
        </Flex>
      }
    >
      <TableContainer>
        <Table variant={variant ? variant : "simple"}>
          <Thead>
            <Tr>
              {columns?.map((column: Column, index: number) => (
                <Th
                  textTransform="uppercase"
                  key={column?.key}
                  style={{ textAlign: (index == 0 || (ActivityTab && index == 1)) ? "initial" : "right", paddingLeft: '17px' }}
                >
                  {column?.title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <Tr>
                <Td colSpan={columns?.length}>
                  <Flex
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Loader />
                  </Flex>
                </Td>
              </Tr>
            )}
            {data && (!isLoading && data?.length) <= 0 && (
              <Tr>
                <Td colSpan={columns?.length}>
                  <Flex
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Heading p="75px 0" fontSize="20px" color="#0d0d0d">
                      Record Not Found
                    </Heading>
                  </Flex>
                </Td>
              </Tr>
            )}
            {data &&
              data?.map((item: any, index: any) => (
                <Tr
                  _hover={{ background: 'gray.100' }}
                  bg={selectedRow === index ? 'gray.200' : 'transparent'}
                 borderRadius='16px'
                  key={item?.id}
                  cursor={tableName === "topTen" || tableName === "stateTable" ? "pointer" : "default"}
                  onClick={(e) => {
                    setSelectedRow(index);
                     handleClick(e, item?.id)}}
                >
                  {columns?.map((column, index: number) => (
                    <Td
                      key={`${item?.id}-${column?.key}`}
                      isNumeric={column?.isNumeric}
                      style={{ textAlign: index! == 0 ? "initial" : "right" }}
                    >
                      {column?.actions
                        ? column?.actions?.map((action) => {
                          switch (action.type) {
                            case "button":
                              return (
                                <IconButton
                                  key={action.label}
                                  aria-label={action.label}
                                  icon={action.icon}
                                  bg="transparent"
                                  textAlign="center"
                                  _hover={{
                                    bg: "transparent",
                                    color: "#6863F3",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick && action.onClick(item.id);
                                  }}
                                  mr={2}
                                />
                              );
                            case "checkbox":
                              return (
                                <Checkbox
                                  key={action?.label}
                                  defaultChecked={item[column?.key]}
                                  onChange={(e) =>
                                    action?.onChange &&
                                    action?.onChange(
                                      item.id,
                                      e.target.checked
                                    )
                                  }
                                >
                                  {action?.label}
                                </Checkbox>
                              );
                            case "menu":
                              return (
                                <Menu key={action?.label}>
                                  <MenuButton
                                    as={IconButton}
                                    aria-label={action?.label}
                                    bg="transparent"
                                    textAlign="center"
                                    _hover={{ bg: "transparent" }}
                                    icon={action.icon}
                                    mr={2}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  />
                                  <MenuList>
                                    {action?.options &&
                                      action?.options?.map((option) => (
                                        <MenuItem
                                          key={option?.value}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            action.onSelect &&
                                              action.onSelect(
                                                item?.id,
                                                option?.value
                                              );
                                          }}
                                        >
                                          {option?.label}
                                        </MenuItem>
                                      ))}
                                  </MenuList>
                                </Menu>
                              );
                            default:
                              return null;
                          }
                        })
                        : item[column?.key]}
                    </Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );
};
