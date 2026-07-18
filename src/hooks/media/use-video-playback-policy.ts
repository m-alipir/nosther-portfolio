"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/motion/use-prefers-reduced-motion";

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike;
}

export function useVideoPlaybackPolicy(requireFineHover = false) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const supportsMp4 = Boolean(
      document.createElement("video").canPlayType("video/mp4"),
    );

    const updatePolicy = () => {
      setIsAllowed(
        !prefersReducedMotion &&
          !connection?.saveData &&
          supportsMp4 &&
          (!requireFineHover || hoverQuery.matches),
      );
    };

    updatePolicy();
    connection?.addEventListener("change", updatePolicy);
    hoverQuery.addEventListener("change", updatePolicy);

    return () => {
      connection?.removeEventListener("change", updatePolicy);
      hoverQuery.removeEventListener("change", updatePolicy);
    };
  }, [prefersReducedMotion, requireFineHover]);

  return isAllowed;
}
