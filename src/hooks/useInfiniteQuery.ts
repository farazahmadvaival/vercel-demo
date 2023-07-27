import { useToast } from "@chakra-ui/toast";
import { GET } from "./consts";
import {
  QueryKey as QueryKeyHook,
  useInfiniteQuery as useRInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { getFromLocalStorage } from "../utils";

type useInfiniteQueryProps<T> = {
  url: string;
  data?: T;
  method?: string;
  queryKey: QueryKeyHook;
  showToast?: boolean;
  token?: boolean;
  onSuccess?: (data?: T) => void;
  enabled?: boolean;
  params?: { [key: string]: string | number | undefined };
  refetchInterval?: number;
};

type UseInfinteQueryReturn<T> = {
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
  error: string;
  fetchNextPage: () => void;
  status: boolean;
  hasNextPage: boolean;
};
export const useInfiniteQuery = <T>({
  url: endpoint,
  data,
  queryKey,
  method = GET,
  params,
  token,
  enabled = true,
}: useInfiniteQueryProps<T>): UseInfinteQueryReturn<T> => {
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

  const config = {
    method,
    data,
    headers,
  };

  const {
    data: fetchedData,
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isLoading,
  } = useRInfiniteQuery<any>(
    queryKey,
    ({ pageParam = 1 }) =>
      axios({
        ...config,
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}${
          queryString
            ? `${queryString}&currentPage=${pageParam}`
            : `?currentPage=${pageParam}`
        }`,
      }).then((res) => res.data),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage === 0) return false;
        return lastPage.nextPage;
      },
    }
  );
  const result = useMemo(
    () =>
      fetchedData?.pages?.reduce((prev, page) => {
        return {
          data: [...prev.data, ...page.data],
        };
      }),
    [fetchedData]
  );
  return { ...result, error, fetchNextPage, status, hasNextPage, isLoading };
};
