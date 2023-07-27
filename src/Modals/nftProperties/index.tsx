import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  IconButton,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik, FieldArray, ErrorMessage } from "formik";
import InputField from "../../components/InputField";
import { propertiesSchema } from "../../schemas";

const NftPropertiesModal = ({
  isOpen,
  onOpen,
  onClose,
  nftName,
  setNftName,
  nftDesc,
  setNftDesc,
  properties,
  setProperties,
}: {
  isOpen?:any,
  onOpen?:any,
  onClose?:any,
  nftName?:any,
  setNftName?:any,
  nftDesc?:any,
  setNftDesc?:any,
  properties?:any,
  setProperties?:any,
}) => {

  const initialValues = {
    properties: properties?.length > 0 ? properties : [{ value: "", name: "" }],
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={{base:'20px', md:'0'}} maxW={"700px"}>
          <ModalHeader>Add Properties</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            validationSchema={propertiesSchema}
            enableReinitialize
            onSubmit={(values) => {
              setProperties(values?.properties);
              setNftName(nftName);
              setNftDesc(nftDesc);
              onClose();}}
          >
            {({ values }) => (
              <Form>
                <FormControl>
                  <ModalBody pb={6}>
                    <Text color="#393F59" fontSize="16px" mt="16px">
                      Properties show up underneath your item, are clickable and
                      can be filtered in your collections sidebar.
                    </Text>
                    <Flex mt='16px'>
                    
                     
                    </Flex>
                    <FieldArray name="properties">
                      {({ push, remove }: {push: any; remove:any}) => (
                        <>
                          {values?.properties?.map(
                            (field: any, index: number) => (
                              <div key={index}>
                                <Flex alignItems={{base:'flex-start',md:'self-start'}} flexDirection={{ base: 'column', sm: 'row' }} justifyContent={{ md: 'initial', xl: 'flex-start' }}>
                                  <div>
                                  <Text mb='0' w='42%' fontWeight='700'>Type</Text>
                                    <Field
                                      as={InputField}
                                      size="md"
                                      type="text"
                                      maxLength={50}
                                      placeholder="Enter property value"
                                      name={`properties.${[index]}.value`}
                                    />
                                    <ErrorMessage className="ErrorMessage"
                                      name={`properties.${[index]}.value`}
                                      component="div"
                                    />
                                  </div>
                                  <div>
                                    <Flex flexDirection='column' alignItems={'baseline'} ml={{ base: '0', sm: '10px' }}>
                                    <Text w='42%' alignItems='baseline' fontWeight='700'>Name</Text>
                                      <Field
                                        as={InputField}
                                        size="md"
                                        type="name"
                                        maxLength={50}
                                        placeholder="Enter property name"
                                        name={`properties.${[index]}.name`}
                                      />
                                      <ErrorMessage className='ErrorMessage'
                                        name={`properties.${[index]}.name`}
                                        component="div"
                                      />
                                    </Flex>
                                  </div>
                                  {index > 0 && (
                                    <>
                                      <IconButton aria-label='close' bg='#6863F34D' mb={{ base: '10px', sm: '0' }} mt={{ base: '10px', sm: '39px' }} ml={{ base: '0', sm: '10px' }} type='button' color='#6863F3' border='1px solid #6863F3' onClick={() => remove(index)} icon={<i className='icon-remove'></i>} />
                                    </>

                                  )}
                                </Flex>
                              </div>
                            )
                          )}
                          {values?.properties?.length < 12 && (

                            <Button color='#6863F3' fontSize='14px' fontWeight='bold' bg='transparent' p='0' type='button' textDecoration='none' variant='link' mt='10px'
                              onClick={() => push({ value: '', name: '' })} >
                              <Box color='#6863F3' mr='8px'><i className="icon-plus"></i></Box>Add Property</Button>

                          )}
                        </>
                      )}
                    </FieldArray>
                  </ModalBody>

                  <ModalFooter justifyContent="Center">
                    <Button
                      type="submit"
                      variant="primary"
                      width="full"
                      colorScheme="blue"
                      mr={3}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </FormControl>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NftPropertiesModal;
