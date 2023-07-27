import { HStack } from "@chakra-ui/layout";
import { useRadioGroup } from "@chakra-ui/radio";
import RadioCard from "../RadioCards";
import { Container } from "@chakra-ui/react";

export const HorizentalButtonFilter = ({
  options,
  defaultValue,
  onChange,
  type,
}: any) => {
  const { value, getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: defaultValue,
    onChange: onChange,
  });

  const group = getRootProps();
  return (
    <>
      
      <HStack {...group} flexWrap="wrap" justifyContent='center'>
        {options &&
          options?.map((option: any, index: number) => {
            const radio = getRadioProps({ value: option?.name });
            return (
              <RadioCard key={option?.name} type={type} {...radio}>
                {option?.label}
              </RadioCard>
            );
          })}
      </HStack>
    </>
  );
};
