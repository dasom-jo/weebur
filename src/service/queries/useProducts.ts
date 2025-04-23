"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getProducts, type ProductsParams } from "../api/products";

/**
 * 상품 목록을 조회하는 훅
 */
export const useInfiniteProducts = (initialParams: ProductsParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["infiniteProducts", initialParams],
    queryFn: ({ pageParam = 0 }) => {
      return getProducts({
        ...initialParams,
        skip: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.products.length < (initialParams.limit || 20)) {
        return null;
      }
      return lastPageParam + lastPage.products.length;
    },
  });
};
