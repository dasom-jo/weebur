"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onIntersect: () => void;
}

/**
 * 요소가 뷰포트와 교차하는지 관찰하는 훅
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  onIntersect,
}: UseIntersectionObserverProps) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersectRef.current();
          }
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin]);

  return setRef;
};
