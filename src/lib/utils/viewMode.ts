"use client";

export type ViewMode = "list" | "grid";

/**
 * 페이지 새로고침 시마다 50% 확률로 뷰 모드를 랜덤하게 결정합니다.
 */
export const getViewMode = (): ViewMode => {
  return Math.random() < 0.5 ? "list" : "grid";
};
