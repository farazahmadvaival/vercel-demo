import React, { useEffect, useState } from "react";
import { validateFile } from "../../../utils";
import { FileType, UploadFileOnServer } from "./types";
import { useDropzone } from "react-dropzone";
import { useMutation } from "../../../hooks/useMutation";
import { POST } from "../../../hooks/consts";
import { ApiUrl } from "../../../apis/apiUrl";
import {
  Box,
  FormLabel,
  FormHelperText,
  Flex,
  Text,
  Image,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { Loader } from "../../Loader";

const FileUpload = ({
  label,
  detail,
  imgFor,
  imgUrl,
  height,
  width,
  onlyIcon,
  editAbleUrl,
  maxFileSize,
}: FileType) => {
  const [fileError, setFileError] = useState<string>("");
  const [preview, setPreview] = useState<any>([]);
  const [showImgPreview, setShowImgPreview] = useState<boolean>(false);

  const { mutate: uploadFileOnServerFunc, isLoading: imgUploadLoading } =
    useMutation<UploadFileOnServer>({
      method: POST,
      url: ApiUrl?.UPLOAD_FILE_TO_SERVER,
      showSuccessToast: false,
      isFileData: true,
      onSuccess: (data) => {
        setShowImgPreview(true);
        imgUrl({
          imgFor,
          url: data?.data?.path,
        });
      },
    });

  const setInitialPreview = () => {
    setPreview(editAbleUrl);
    setShowImgPreview(true);
  };

  useEffect(() => {
    if (editAbleUrl) {
      setInitialPreview();
    }
  }, [editAbleUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileChange(acceptedFiles);
    },
  });

  const handleFileChange = async (acceptedFiles: any) => {
    const selectedFile = acceptedFiles?.[0];

    const isValidatedFile = await validateFile(
      selectedFile,
      maxFileSize && maxFileSize
    );
    if (isValidatedFile !== "ok") {
      setFileError(isValidatedFile);
    } else if (imgFor !== "nft") {
      setPreview(
        acceptedFiles.map((upFile: any) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
      uploadFileOnServerFunc({ photo: selectedFile, label: imgFor });
    } else {
      imgUrl(selectedFile);
      setShowImgPreview(true);
      setPreview(
        acceptedFiles.map((upFile: any) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    }
  };
  useEffect(() => {
    console.log("editAbleUrl", editAbleUrl);
    if (editAbleUrl === undefined) {
      setPreview([]);
      setShowImgPreview(false);
      imgUrl({
        imgFor,
        url: "",
      });
    }
  }, [editAbleUrl]);
  return (
    <>
      <Box color="#756C99">
        {label && (
          <FormLabel
            color="#0D0D0D"
            fontSize="24px!important"
            fontWeight="700"
            marginBottom="16px"
          >
            {label}
          </FormLabel>
        )}
        {detail && (
          <FormHelperText marginBottom="16px">{detail}</FormHelperText>
        )}
        {preview && showImgPreview ? (
          <>
            <Box position="relative" w={width} h={height}>
              <Image
                src={preview[0]?.preview || editAbleUrl}
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius="16px"
              ></Image>
              <IconButton
                onClick={() => {
                  setPreview([]);
                  setShowImgPreview(false);
                  imgUrl({
                    imgFor,
                    url: "",
                  });
                }}
                aria-label="close"
                position="absolute"
                top="10px"
                right="10px"
                bg="#8a8e8e5c"
                _hover={{ bg: "#798c8c5c" }}
                icon={<i className="icon-close"></i>}
              />
            </Box>
          </>
        ) : (
          <Box color="#756C99">
            {
              <Flex
                {...getRootProps()}
                maxH="300px"
                justifyContent="center"
                alignItems="center"
                h={height ? height : "300px"}
                maxW={width ? width : "952px"}
                border="1px solid rgba(111, 107, 243, 0.4)"
                background="rgba(255, 255, 255, 0.4)"
                boxShadow="2px 2px 8px rgba(13, 13, 13, 0.1)"
                backdrop-filter="blur(30px)"
                borderRadius="16px"
                cursor="pointer"
                _hover={{border:'1px solid #6863F3'}}                

              >
                {imgUploadLoading && (
                  <Box position="relative">
                    <Loader />
                  </Box>
                )}
                <input {...getInputProps()} />

                {isDragActive ? (
                  <p>Drop Image Here</p>
                ) : (
                  preview?.length === 0 && (
                    <>
                      <Flex
                        direction="column"
                        alignItems="center"
                        fontSize="48px"
                        width="200px"
                        textAlign="center"
                      >
                        <i className="icon-image"></i>
                        {!onlyIcon ? (
                          <Text fontSize="16px">
                            Drag and drop image or upload from device
                          </Text>
                        ) : (
                          ""
                        )}
                      </Flex>
                    </>
                  )
                )}
              </Flex>
            }
            {fileError && <p>{fileError}</p>}
          </Box>
        )}
      </Box>
    </>
  );
};

export default FileUpload;
