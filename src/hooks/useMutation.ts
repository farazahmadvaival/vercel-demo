import axios from "axios";
import { DELETE, PATCH, POST, PUT } from "./consts";
import {
  UseMutateFunction,
  useMutation as useRMutation,
} from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { getFromLocalStorage } from "../utils";
import { showToaster } from "../components/Toaster";

type UseMutationReturn<T, K> = {
  data?: K;
  isLoading: boolean;
  mutate: UseMutateFunction<ApiResult<K>, unknown, T, unknown>;
};

export type ApiResult<K> = {
  ipfsJsonUrl: string;
  data?: any;
  _metadata: {
    message: string;
    numOfRecords: number;
    outcome: string;
    outcomeCode: number;
    Message?: string;
  };
  records: K;
  errors?: Array<string>;
  status?: number;
  Message?: string;
  message?: string;
};

type UseMutationProps<T, K> = {
  url: string;
  data?: T;
  method?: typeof POST | typeof DELETE | typeof PUT | typeof PATCH;
  token?: boolean;
  showToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
  onSuccess?: (data: ApiResult<K>) => void;
  onError?: (data: ApiResult<K>) => void;
  errorMessage?: string;
  isFileData?: boolean;
  showErrorToast?: boolean;
};

export const useMutation = <T, K = T>({
  url,
  data,
  method = POST,
  token,
  showToast,
  successMessage,
  onSuccess,
  onError,
  errorMessage,
  isFileData,
  showSuccessToast = true,
  showErrorToast = true,
}: UseMutationProps<T, K>): UseMutationReturn<T, K> => {
  const toast = useToast();

  const headers = {
    Accept: isFileData && "multipart/form-data",
    "Content-Type": isFileData && "multipart/form-data",
    Authorization: token
      ? `Bearer ${getFromLocalStorage("accessToken")}`
      : null,
  };

  const config = {
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
    data,
    headers,
  };

  const {
    data: fetchedData,
    isLoading,
    mutate,
  } = useRMutation<ApiResult<K>, unknown, T>(
    async (data: T) => {
      if (method === DELETE) {
        config.url = `${config.url}/${data}`;
      }

      const res = await axios({ ...config, data });
      return res.data;
    },
    {
      onSuccess: (newData) => {
        if (newData?.data || newData?.status == 200) {
          showSuccessToast &&
            showToaster(
              successMessage ? successMessage : newData?.data?.message,
              "success"
            );

          onSuccess && onSuccess(newData);
        }
        onError && onError(newData);
      },
      onError: (newData: any) => {
        onError && onError(newData);
        showErrorToast &&
          showToaster(
            `${
              errorMessage
                ? errorMessage
                : Array.isArray(newData?.response?.data?.message)
                ? newData?.response?.data?.message[0]
                : newData?.response?.data?.message
            }`,
            "error"
          );
      },
    }
  );

  return { ...fetchedData, isLoading, mutate };
};
