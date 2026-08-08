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
    // Previews ship as a WebM/VP9 + MP4/H.264 pair, so either decoder is
    // enough — builds without the proprietary H.264 decoder (some Linux
    // Firefox packages) still get playback through the WebM encode.
    const probe = document.createElement("video");
    const supportsPreviewCodec = Boolean(
      probe.canPlayType("video/mp4") || probe.canPlayType("video/webm"),
    );

    const updatePolicy = () => {
      setIsAllowed(
        !prefersReducedMotion &&
          !connection?.saveData &&
          supportsPreviewCodec &&
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
