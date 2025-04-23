import ProductList from "./components/product/ProductList";
import Spinner from "@/app/components/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "상품 목록 | DummyJSON",
  description: "DummyJSON API를 사용한 상품 목록 예제",
};

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Spinner size="large" color="#2563eb" />}>
        <ProductList />
      </Suspense>
    </main>
  );
}
