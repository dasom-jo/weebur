import { api } from "@/lib/api";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductsParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  q?: string;
}

/**
 * 상품 목록을 조회합니다.
 */
export const getProducts = async (
  params: ProductsParams = {}
): Promise<ProductsResponse> => {
  // 검색어가 있으면 search 엔드포인트 사용
  if (params.q) {
    const { data } = await api.get<ProductsResponse>(`/products/search`, {
      params,
    });
    return data;
  }

  // 일반 조회
  const { data } = await api.get<ProductsResponse>("/products", { params });
  return data;
};
