import React from 'react';
import { Textarea, Button, FormControl, FormLabel, FormErrorMessage, Text, TextareaProps } from '@chakra-ui/react';

  const ChakraTextarea: React.FC<TextareaProps> = ({ field, form, label, placeholder, descp,  ...rest }: any) => {
    return (
      <FormControl my='0' isInvalid={form.errors[field.name] && form.touched[field.name]}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Textarea _hover={{border:'1px solid #6863F3'}}  _focusVisible={{border:'1px solid #6863F3'}} h='160px' {...field} {...rest} placeholder={placeholder}  borderRadius='6px' border='1px solid #6F6BF366'/>
        {descp && <Text>{descp}</Text>}
        {/* <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage> */}
      </FormControl>
    );
  };
  
  export default ChakraTextarea