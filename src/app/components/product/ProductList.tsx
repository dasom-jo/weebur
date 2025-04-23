"use client";

import {
  useState,
  useCallback,
  RefCallback,
  FormEvent,
  useEffect,
} from "react";
import { useInfiniteProducts } from "@/service/queries";
import ProductItem from "./ProductItem";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { useViewMode } from "@/lib/hooks/useViewMode";
import styles from "./ProductList.module.scss";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ProductList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 쿼리 파라미터에서 초기값 가져오기
  const initialSearch = searchParams.get("q") || "";
  const initialSortOrder =
    (searchParams.get("order") as "asc" | "desc" | null) || "desc";

  // 검색어 입력값과 실제 검색에 사용할 검색어 분리
  const [inputValue, setInputValue] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSortOrder);
  const [sortingActive, setSortingActive] = useState(false);
  // 커스텀 훅을 사용하여 viewMode 관리
  const viewMode = useViewMode();
  const limit = 20;

  // URL 쿼리 파라미터 업데이트
  useEffect(() => {
    if (!searchQuery && !sortingActive) return;
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }

    if (sortingActive) {
      params.set("order", sortOrder);
    } else {
      params.delete("order");
    }

    router.push(`?${params.toString()}`);
  }, [searchQuery, sortOrder, sortingActive, router, searchParams]);

  // 무한 스크롤을 지원하는 상품 데이터 조회
  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteProducts({
      limit,
      select: "title,description,price,discountPercentage,rating,thumbnail",
      q: searchQuery,
      ...(sortingActive ? { sortBy: "rating", order: sortOrder } : {}),
    });

  // 정렬 순서 토글
  const toggleSortOrder = () => {
    setSortingActive(true);
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  // 모든 필터 초기화
  const resetAllFilters = () => {
    setInputValue("");
    setSearchQuery("");
    setSortOrder("desc");
    setSortingActive(false);
    router.push(pathname); // 쿼리 파라미터 없이 기본 URL로 이동
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const observerRef = useIntersectionObserver({
    onIntersect: loadMore,
    threshold: 0.1,
    rootMargin: "200px",
  });

  const products = data?.pages.flatMap((page) => page.products) || [];

  if (viewMode === null) {
    return null;
  }

  const isAnyFilterActive = searchQuery || sortingActive;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>상품 목록</h1>

        <div className={styles.filters}>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
              type="text"
              name="search"
              placeholder="상품 검색..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              검색
            </button>
          </form>

          <div className={styles.filterButtons}>
            <button
              onClick={toggleSortOrder}
              className={`${styles.sortButton} ${sortingActive ? styles.active : ""}`}
              type="button"
            >
              별점 {sortOrder === "desc" ? "내림차순 ↓" : "오름차순 ↑"}
            </button>

            {isAnyFilterActive && (
              <button
                onClick={resetAllFilters}
                className={styles.resetButton}
                type="button"
              >
                초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {isPending && <div className={styles.loading}>로딩 중...</div>}

      {products.length > 0 ? (
        <div className={`${styles.productList} ${styles[viewMode]}`}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        !isPending && (
          <div className={styles.empty}>일치하는 결과가 없습니다.</div>
        )
      )}

      <div
        ref={observerRef as RefCallback<HTMLDivElement>}
        className={styles.loadingContainer}
      >
        {isFetchingNextPage && (
          <div className={styles.loading}>더 불러오는 중...</div>
        )}
        {!hasNextPage && products.length > 0 && (
          <div className={styles.endMessage}>
            더 이상 불러올 상품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
