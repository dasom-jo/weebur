"use client";

import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export default function Spinner({ size = "medium", color }: SpinnerProps) {
  return (
    <div className={styles.spinnerContainer}>
      <div
        className={`${styles.spinner} ${styles[size]}`}
        style={{ borderTopColor: color }}
      />
      <p className={styles.loadingText}>로딩 중...</p>
    </div>
  );
}
