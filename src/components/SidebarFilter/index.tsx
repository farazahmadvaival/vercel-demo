import {
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Stack,
  Checkbox,
  RadioGroup,
  Radio,
  Input,
  AccordionIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type sidebarFilterProps = {
  filterGroups: {
    name: string;
    showQuantity?: boolean;
    border?: boolean;
    hasFilters?: boolean;
    label?: string;
    filterType?: string;
    filters?: filtersProps[];
  }[];
  onFilterChange: (selectedFilters: any) => void;
  children?: any;
};
type filtersProps = {
  name: string;
  type: string;
  label: string | string[];
  options?: string[];
};
export const SidebarFilter = ({
  filterGroups,
  onFilterChange,
  children,
}: sidebarFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<any>({});

  const handleFilterChange = (
    groupName: string,
    filterName: string,
    isChecked: boolean,
    type: string,
    isSingle: boolean
  ) => {
    setSelectedFilters((prevFilters: any) => {
      if (isChecked) {
        if (isSingle) {
          return {
            ...prevFilters,
            [groupName]: filterName,
          };
        } else {
          if (type === "properties") {
            return {
              ...prevFilters,
              [type]: {
                ...prevFilters[type],
                [groupName]: [
                  ...((prevFilters[type] && prevFilters[type][groupName]) ||
                    []),
                  filterName,
                ],
              },
            };
          } else {
            return {
              ...prevFilters,
              [groupName]: [...(prevFilters[groupName] || []), filterName],
            };
          }
          return;
        }
      } else {
        let updatedGroupFilters = [];
        if (type === "properties") {
          prevFilters[type][groupName] = prevFilters[type][groupName].filter(
            (value: any) => value !== filterName
          );
        } else {
          updatedGroupFilters = (prevFilters[groupName] || []).filter(
            (filter: any) => filter !== filterName
          );
        }
        const propFilterKeys = prevFilters[type]
          ? Object.keys(prevFilters[type])
          : [];

        if (!propFilterKeys.includes(groupName)) {
          return {
            ...prevFilters,
            [groupName]: updatedGroupFilters.length
              ? updatedGroupFilters
              : undefined,
          };
        } else {
          return { ...prevFilters };
        }
      }
    });
  };

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters]);

  const renderFilterElement = (
    groupName: any,
    filter: any,
    filterType: any
  ) => {
    switch (filter.type) {
      case "checkbox":
        return (
          <Checkbox
            key={filter.label}
            onChange={(event) =>
              handleFilterChange(
                groupName,
                filter.name,
                event.target.checked,
                filterType,
                false
              )
            }
            value={filter.name}
          >
            {filter.label}
          </Checkbox>
        );
      case "radio":
        return (
          <RadioGroup
            key={filter.label}
            onChange={(value) =>
              handleFilterChange(
                groupName,
                value,
                (selectedFilters[groupName] || []).includes(filter.name)
                  ? false
                  : true,
                "",
                true
              )
            }
            // value={selectedFilters[groupName]?.[filter.name] ?? ""}
          >
            <Stack spacing={1}>
              {filter.options.map((option: any, index: number) => (
                <Radio key={option} value={option}>
                  {filter.label[index]}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Box
        border="1px solid rgba(111, 107, 243, 0.40)"
        width={{ base: "", sm: "", md: "", lg: "220px" }}
        borderRadius="16px"
        background="rgba(255, 255, 255, 0.40)"
        flexShrink="0"
        backdropFilter="blur(30px)"
        pt="17px"
        pb="17px"
        alignSelf="flex-start"
      >
        <Accordion allowMultiple>
          {filterGroups &&
            filterGroups?.map((group, index) => (
              <>
                {group && !group?.hasFilters ? (
                  <AccordionItem
                    key={group.name}
                    isDisabled={true}
                    borderBottom={"none"}
                  >
                    <h2>
                      <AccordionButton _disabled={{ color: "black" }}>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="18px"
                          color="#393F59"
                        >
                          {group && group?.label}
                        </Box>
                      </AccordionButton>
                    </h2>
                  </AccordionItem>
                ) : (
                  <AccordionItem
                    color="#756C99"
                    key={group?.name}
                    borderBottom={
                      group && !group?.border ? "none" : "1px solid #6863f34d"
                    }
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="18px"
                          color="#393F59"
                        >
                          {group?.label}
                        </Box>
                        
                        {group && group?.showQuantity ? (
                          <span style={{ fontWeight: "normal" }}>
                            {group?.filters && group?.filters?.length}
                          </span>
                        ) : (
                          ""
                        )}
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                    <Box css={{
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
                           
                            maxH="300px"
                            overflowY="scroll"
                            overflowX="hidden"
                           
                          >
                      <Stack spacing={2} ml='5px'>
                        {group?.filters &&
                          group?.filters?.map((filter) =>
                            renderFilterElement(
                              group.name,
                              filter,
                              group.filterType
                            )
                          )}
                      </Stack>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                )}
              </>
            ))}
        </Accordion>
        {children && children}
      </Box>
    </>
  );
};
