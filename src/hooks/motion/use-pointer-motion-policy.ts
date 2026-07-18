"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/motion/use-prefers-reduced-motion";

export function usePointerMotionPolicy() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const updatePolicy = () => {
      setIsEnabled(!prefersReducedMotion && pointerQuery.matches);
    };

    updatePolicy();
    pointerQuery.addEventListener("change", updatePolicy);

    return () => {
      pointerQuery.removeEventListener("change", updatePolicy);
    };
  }, [prefersReducedMotion]);

  return isEnabled;
}
