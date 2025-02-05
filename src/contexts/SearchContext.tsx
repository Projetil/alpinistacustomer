/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useRef } from "react";

type UseDebounceReturn = {
  debouncedFunction: (...args: any[]) => void;
};

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
): UseDebounceReturn => {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFunction = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return {
    debouncedFunction,
  };
};
