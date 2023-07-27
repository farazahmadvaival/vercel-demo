import axios from "axios";
import { GET } from "./consts";
import {
  QueryKey as QueryKeyHook,
  useQuery as useRQuery,
} from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { getFromLocalStorage } from "../utils";

type UseQueryReturn<T> = {
  data?: T;
  _metadata?: {
    message: string;
    numOfRecords: number;
    outcome: string;
    outcomeCode: number;
  };
  errors?:
    | Array<{
        map: string;
        message: string;
      }>
    | string
    | {
        message: string;
      };
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

type ApiResult<T> = {
  _metadata: {
    message: string;
    numOfRecords: number;
    outcome: string;
    outcomeCode: number;
  };
  data: T;
  errors:
    | Array<{
        map: string;
        message: string;
      }>
    | string
    | { message: string };
};

type UseQueryProps<T> = {
  url: string;
  data?: T;
  method?: string;
  token?: boolean;
  queryKey: QueryKeyHook;
  showToast?: boolean;
  onSuccess?: (data?: T) => void;
  enabled?: boolean;
  params?: { [key: string]: string | number | undefined };
  refetchInterval?: number;
};

export const useQuery = <T>({
  url: endpoint,
  data,
  method = GET,
  token,
  queryKey,
  showToast = true,
  onSuccess,
  enabled = true,
  params,
  refetchInterval,
}: UseQueryProps<T>): UseQueryReturn<T> => {
  const toast = useToast();
  const headers = {
    Accept: "application/json",
    Authorization: token
      ? `Bearer ${getFromLocalStorage("accessToken")}`
      : null,
  };

  let queryString = "";

  if (params) {
    queryString = `?${Object.keys(params)
      .filter((key) => params[key] !== undefined && params[key] !== "")
      .map(
        (key) =>
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(params[key] as string)
      )
      .join("&")}`;
  }

  const url = endpoint + queryString;

  const config = {
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
    data,
    headers,
  };

  const {
    data: fetchedData,
    isLoading,
    isFetching,
    refetch,
  } = useRQuery<ApiResult<T>>(
    queryKey,
    () => axios(config).then((res) => res.data),
    {
      enabled,
      refetchInterval,
      onError: () => {
        if (showToast) {
          toast({
            title: "Something went wrong",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        }
      },
      onSuccess: ({ errors, data }) => {
        if (typeof errors === "string") {
          toast({
            title: errors ?? "Something went wrong",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        }

        if (Array.isArray(errors)) {
          errors.map((error) =>
            toast({
              title: error.message ?? "Something went wrong",
              status: "error",
              isClosable: true,
              position: "top-right",
            })
          );
        }

        if (
          typeof errors === "object" &&
          !Array.isArray(errors) &&
          errors !== null
        ) {
          toast({
            title: errors.message ?? "Something went wrong",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        }

        onSuccess && onSuccess(data);
      },
    }
  );

  let results = undefined;

  if (fetchedData) {
    // Extract "records" and rename to "data"
    const { data: data, ...rest } = fetchedData;
    results = { data, ...rest };
    // const responsedData = results?.data;
    // onSuccess && onSuccess({ ...responsedData });
  }
  return { ...results, isLoading, isFetching, refetch };
};
