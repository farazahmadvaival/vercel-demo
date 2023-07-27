import React from "react";
import InputField from "../InputField";

interface Props {
  value: string;
}

const CopyWalletAddress: React.FC<Props> = ({ value }) => {
  const handleCopyClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length);
      document.execCommand("copy");
      document.body.removeChild(input);
      input.contentEditable = 'false';
    } catch (error) {
      console.error("Failed to copy value to clipboard:", error);
    }
  };

  return (
    <InputField
      size="md"
      type="copy"
      placeholder="0X00000"
      formControlProps={{
        marginTop: "0px",
        marginBottom: "0px",
      }}
      value={value && `${value?.slice(0, 5)}...${value?.slice(37, 42)}`}
      name="walletAddress"
      formLabelProps={{
        fontWeight: "500!important",
      }}
      borderRadius="xl"
      p="7px 8px"
      _hover={{ bg: "transparent" }}
      m={{ base: "10px 0", md: "initial" }}
      fontSize="12px"
      height="initial"
      border="1px solid #6863F3"
      color="#393F59"
      maxLength={50}
      h="100%"
      isReadOnly={true}
      copyValue={value}
    />
  );
};

export default CopyWalletAddress;
