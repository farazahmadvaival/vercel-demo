import React, { useEffect, useRef, useState } from "react";

import {
  FormControl,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  InputProps as ChakraUIInputProps,
  FormControlProps,
  Text,
  Flex,
  FormLabelProps,
  FormLabel,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react";
import { SearchIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export type InputProps = ChakraUIInputProps & {
  label?: string;
  fontSize?: string;
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  type?: React.HTMLInputTypeAttribute | "search";
  errorText?: string;
  icon?: JSX.Element;
  ref?: string;
  copyValue?: string;
  ispercent?:boolean;
};

const InputField = ({
  label,
  type,
  placeholder,
  name,
  onChange,
  formControlProps,
  formLabelProps,
  icon,
  size,
  errorText,
  width,
  maxLength,
  fontSize = "16px!important",
  ref,
  minLength,
  copyValue,
  ispercent,
  ...restProps
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const [showPassword, setShowPassword] = useState(false);
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  useEffect(() => {
    setValue(copyValue ? copyValue : "");
  }, [copyValue]);
  return (
    <FormControl width={width} {...formControlProps}>
      {label && (
        <Flex alignItems="center">
          <FormLabel mb="16px" fontSize={fontSize} {...formLabelProps}>
            {label}
          </FormLabel>
        </Flex>
      )}
      <InputGroup size={size ?? "lg"}>
        <Input
          isInvalid={!!errorText}
          errorBorderColor="red.700"
          type={!showPassword ? type : "text"}
          color="gray.600"
          placeholder={placeholder}
          name={name}
          _focus={{border:'1px solid #6863F3'}}
          _hover={{border:'1px solid #6863F3'}}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
            setValue(e.target.value);
          }}
          fontSize={fontSize ?? "1rem"}
          fontWeight="medium"
          maxLength={maxLength}
          minLength={minLength}
          ref={ref ?? inputRef}
          variant="custom"
          _placeholder={
            type === "password"
              ? {
                  color: "gray.500",
                  position: "absolute",
                  top: "12px",
                  fontWeight: "500",
                }
              : {
                  color: "gray.500",
                }
          }
          {...restProps}
          autoComplete="off"
        />
        {type === "copy" && (
          <Tooltip
            label="Copied"
            placement="bottom"
            isOpen={hasCopied}
            hasArrow
            arrowSize={15}
            bg="green.500"
          >
            <InputRightElement
              color="#6863F3"
              cursor="pointer"
              onClick={onCopy}
              h="100%"
            >
              <i className="icon-copy"></i>
            </InputRightElement>
          </Tooltip>
        )}
         {ispercent  && (
      
            <InputRightElement
              color="#6863F3"
              cursor="pointer"
              h="100%"
            >
             <Text color='#393F59'>%</Text> 
            </InputRightElement>
        )}
        {type === "password" && (
          <InputRightElement>
            <Button
              display={!!errorText ? "none" : "block"}
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? (
                <ViewIcon color="black" />
              ) : (
                <ViewOffIcon color="black" />
              )}
            </Button>
          </InputRightElement>
        )}
        {type === "search" && (
          <InputRightElement>
            <SearchIcon color="gray.500" />
          </InputRightElement>
        )}

        {icon && <InputRightElement>{icon}</InputRightElement>}
      </InputGroup>
      {!!errorText && (
        <Text
          color="red.700"
          mt="8px"
          fontSize={fontSize ?? "14px"}
          fontWeight="medium"
        >
          {errorText}
        </Text>
      )}
    </FormControl>
  );
};

export default InputField;
