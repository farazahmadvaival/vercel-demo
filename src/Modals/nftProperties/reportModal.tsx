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
  Text,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { POST } from "../../../src/hooks/consts";
import { useMutation } from "../../../src/hooks/useMutation";
import { ApiUrl } from "../../../src/apis/apiUrl";

const ReportModal = ({
  isOpen,
  onClose,
  nftId,
}: {
  isOpen?: any;
  onClose?: any;
  onOpen?: any;
  nftId: string;
}) => {
  const [textareaValue, setTextareaValue] = useState("");

  const { mutate, isLoading } = useMutation<{ nftId: string; detail: string }>({
    method: POST,
    url: ApiUrl.REPORT_NFT,
    token: true,
    successMessage: "Nft reported successfuly!",
    onSuccess: ()=> onClose(),
  });

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextareaValue(event.target.value);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="508px">
          <ModalHeader>Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={6}>
            <FormControl mb='0'>
              <FormLabel fontSize={{base:'21px!important', md:'28px!important'}} mb='5px'>Why are you Reporting</FormLabel>
              <Text>Describe to us why you reporting about this NFT.</Text>
              <Textarea
                h="120px"
                mt="12px"
                mb="18px"
                placeholder="Please Describe here..."
                value={textareaValue}
                onChange={handleTextareaChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap='12px' pt='0' pb='20px' flexDirection={{base:'column', md:'row'}} >
            <Button
              variant="primary"
              w="100%"
              textTransform="uppercase"
              isLoading={isLoading}
              isDisabled={
                textareaValue?.length < 5 || textareaValue?.length > 500
              }
              onClick={() => mutate({ nftId: nftId, detail: textareaValue })}
            >
              Report
            </Button>

            <Button variant="secondary" w="100%" textTransform="uppercase" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportModal;
