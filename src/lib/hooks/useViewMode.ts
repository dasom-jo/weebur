"use client";

import { useState, useEffect } from "react";
import { getViewMode, type ViewMode } from "@/lib/utils/viewMode";

// viewMode 만료 시간 (24시간)
const VIEW_MODE_EXPIRY = 24 * 60 * 60 * 1000;

/**
 * viewMode를 관리하는 커스텀 훅
 * 24시간 후에 자동으로 viewMode가 변경됩니다.
 */
export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode | null>(null);

  useEffect(() => {
    // 현재 시간
    const now = Date.now();

    // 세션 스토리지에서 만료 시간과 viewMode 가져오기
    const expiryTime = sessionStorage.getItem("viewModeExpiryTime");
    const savedViewMode = sessionStorage.getItem("viewMode") as ViewMode | null;

    // viewMode가 있고, 만료 시간이 남아있는 경우
    if (savedViewMode && expiryTime && now < Number(expiryTime)) {
      setViewMode(savedViewMode);
    } else {
      // 새로운 viewMode 결정
      const newMode = getViewMode();
      setViewMode(newMode);

      // 24시간 후의 만료 시간 계산
      const newExpiryTime = now + VIEW_MODE_EXPIRY;

      // 새로운 값을 세션 스토리지에 저장
      sessionStorage.setItem("viewMode", newMode);
      sessionStorage.setItem("viewModeExpiryTime", newExpiryTime.toString());
    }

    // 24시간 후에 자동으로 viewMode 변경을 위한 타이머 설정
    const timerId = setTimeout(() => {
      // 만료 시간이 지나면 새로운 viewMode 설정
      const newMode = getViewMode();
      setViewMode(newMode);

      // 새로운 만료 시간 설정
      const newExpiryTime = Date.now() + VIEW_MODE_EXPIRY;
      sessionStorage.setItem("viewMode", newMode);
      sessionStorage.setItem("viewModeExpiryTime", newExpiryTime.toString());
    }, VIEW_MODE_EXPIRY);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timerId);
  }, []);

  return viewMode;
}
