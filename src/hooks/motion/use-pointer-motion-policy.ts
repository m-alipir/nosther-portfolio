"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/motion/use-prefers-reduced-motion";

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean;
}

interface NavigatorWithCapabilities extends Navigator {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
}

export function usePointerMotionPolicy() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const navigatorWithCapabilities = navigator as NavigatorWithCapabilities;
    const connection = navigatorWithCapabilities.connection;
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const isLowPower =
      (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2) ||
      (navigatorWithCapabilities.deviceMemory !== undefined &&
        navigatorWithCapabilities.deviceMemory <= 2);

    const updatePolicy = () => {
      setIsEnabled(
        !prefersReducedMotion &&
          pointerQuery.matches &&
          !connection?.saveData &&
          !isLowPower,
      );
    };

    updatePolicy();
    pointerQuery.addEventListener("change", updatePolicy);
    connection?.addEventListener("change", updatePolicy);

    return () => {
      pointerQuery.removeEventListener("change", updatePolicy);
      connection?.removeEventListener("change", updatePolicy);
    };
  }, [prefersReducedMotion]);

  return isEnabled;
}
