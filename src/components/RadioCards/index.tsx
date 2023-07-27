import { Box, useRadio } from "@chakra-ui/react";

const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderColor="#6863F3"
        borderRadius="8px"
        color="#6863F3"
        fontSize="14px"
        fontWeight="600"
        bg="#FFF"
        _checked={{
          bg: "#6863F3",
          color: "white",
          borderColor: "#6863F3",
        }}
        _hover={{
          bg: "#6863F3",
          color: "white",
          borderColor: "#6863F3",
          transform: 'translateY(-3px) scale(1.01) translateZ(0px)',
          transition:'all .3s ease',
        }}
        px={props.type == "small" ? "16px" : 5}
        py={props.type == "small" ? "9px" : 3}
      >
        {props.children}
      </Box>
    </Box>
  );
};
export default RadioCard;
