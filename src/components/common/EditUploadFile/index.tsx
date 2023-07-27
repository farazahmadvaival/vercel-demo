import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const EditUploadFile = ({
  image,
  id,
  onChange,
  isShowLabel,
  objectFit,
}: {
  image: string |undefined;
  objectFit: any;
  id: string;
  onChange: (e: any) => void;
  isShowLabel: boolean;
}) => {
  const [preview, setPreview] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>();
  const over = () => {
    setIsVisible(true);
  };
  const out = () => {
    setIsVisible(false);
  };
  const changeHandler = (e: any) => {
    onChange(e);
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Box
        p="0"
        position="relative"
        onMouseOver={over}
        onMouseOut={out}
        h="100%"
        border="1px solid rgba(111, 107, 243, 0.4)"
        background="rgba(255, 255, 255, 0.4)"
        boxShadow="2px 2px 8px rgba(13, 13, 13, 0.1)"
        backdrop-filter="blur(30px)"
        borderRadius="16px"
        objectFit={objectFit}
      >
        <Box overflow="hidden" borderRadius="16px" h="100%">
          <Image src={preview ? preview : image} w="100%" h='100%' objectFit={objectFit} />
        </Box>
        <FormControl
          display={isVisible ? "block" : "none"}
          h="100%"
          position="absolute"
          top="0"
          m="0"
          p="20px"
        >
          <FormLabel
            htmlFor={id}
            fontSize="48px"
            color="#fff"
            borderRadius="16px"
            width="100%"
            h="100%"
            bg="#6863f3cc"
            zIndex="999"
            m="0!important"
          >
            <Input
              type="file"
              id={id}
              w="100%"
              h="100%"
              border="0"
              hidden
              onChange={(e) => changeHandler(e)}
            />
            <Flex alignItems="center" justifyContent="center" h="100%">
              <Box
                textAlign="center"
                fontSize={{ base: "30px", md: "48px" }}
                color="#fff"
              >
                <i className="icon-image"></i>
                {isShowLabel && (
                  <Text fontSize={{ base: "15px", md: "20px" }}>
                    Edit Your Profile Cover
                  </Text>
                )}
              </Box>
            </Flex>
          </FormLabel>
        </FormControl>
      </Box>
    </>
  );
};
