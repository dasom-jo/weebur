"use client";

import Image from "next/image";
import { Product } from "@/service/api/products";
import styles from "./ProductItem.module.scss";

interface ProductItemProps {
  product: Product;
  viewMode: "list" | "grid";
}

export default function ProductItem({ product, viewMode }: ProductItemProps) {
  return (
    <div className={`${styles.productItem} ${styles[viewMode]}`}>
      <div className={styles.thumbnail}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <span>평점: {product.rating}</span>
          </div>
          <div className={styles.price}>
            <span>${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className={styles.discount}>
                {product.discountPercentage}% 할인
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
