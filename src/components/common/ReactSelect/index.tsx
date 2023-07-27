import React, { useEffect, useState } from "react";
import {
  ReactSelectTypes as customTypes,
  ReactSelectPropsTypes,
} from "./types";
import Select, { components } from "react-select";
import { FormLabel, Flex, Text } from "@chakra-ui/react";
// import CreatableSelect from "react-select/creatable";

const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <Text fontSize="10px">
        <i className="icon-close"></i>
      </Text>
    </components.MultiValueRemove>
  );
};

const ReactSelect = ({
  options,
  isMultiple,
  getSelectedData,
  identifier,
  label,
  placeholder,
  nftName,
  setNftName,
  nftDesc,
  setNftDesc,
  defaultValue,
}: ReactSelectPropsTypes) => {
  const [value, setValue] = useState<customTypes | null | undefined>(
    () => defaultValue || null
  );
  const [isSelected, setIsselected] = useState<boolean>(true);

  const handleChangeCategory = (cat: any) => {
    setIsselected(false);
    getSelectedData(cat, identifier);
    setValue(cat);
    getSelectedData(cat, identifier);
    setValue(cat);
    nftName && setNftName(nftName);
    nftDesc && setNftDesc(nftDesc);
  };

  useEffect(() => {
    isSelected && setValue(defaultValue);
    // identifier == "tag" && getSelectedData("tag", identifier);
  }, [defaultValue]);

  return (
    <>
      {label && (
        <Flex alignItems="center">
          <FormLabel>{label}</FormLabel>
        </Flex>
      )}
      <Select
        isClearable
        isMulti={isMultiple}
        onChange={(newValue) => handleChangeCategory(newValue)}
        options={options}
        value={value}
        placeholder={placeholder}
        styles={{
          indicatorsContainer: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",
            ":focus":{border:'1px solid #6863F3'}
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#6863F3" : "#6f6bf366",
            padding: "0.07rem",
            boxShadow: "none",
            width: "100%",
            borderRadius: "6px",
            ":hover":{border:'1px solid #6863F3'},
            cursor: "text",

          }),
          indicatorSeparator: () => ({}),
          multiValue: (styles, { data }) => ({
            ...styles,
            backgroundColor: "rgba(104, 99, 243, 0.3)",
            borderRadius: "6px",
            border: "1px solid #6f6bf366",
            height: "40px",
            alignItems: "center",
            paddingRight: "11px",
            paddingLeft: "11px",
            paddingTop: "9px",
            paddingBottom: "9px",
            

          }),
          multiValueLabel: (styles, { data }) => ({
            ...styles,
            fontSize: "12px",
            color: "#393F59",
            paddingRight: "8px",
          }),
          multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "#393F59",
            ":hover": {
              backgroundColor: "transparent",
            },
          }),
        }}
        components={{ MultiValueRemove }}
      />
    </>
  );
};

export default ReactSelect;
