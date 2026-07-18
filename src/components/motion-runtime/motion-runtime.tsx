"use client";

import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/motion/use-prefers-reduced-motion";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";

export function MotionRuntime() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!prefersReducedMotion) {
      void ensureGsapRegistered().catch(() => undefined);
    }
  }, [prefersReducedMotion]);

  return null;
}
