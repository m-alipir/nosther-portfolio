"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/motion/use-prefers-reduced-motion";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";

type MotionSetup = (
  gsap: typeof import("gsap").gsap,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger,
) => void;

export function useGsapScope(
  scope: RefObject<HTMLElement | null>,
  setup: MotionSetup,
) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let context:
      | ReturnType<typeof import("gsap").gsap.context>
      | undefined;

    if (prefersReducedMotion) {
      return;
    }

    void ensureGsapRegistered()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !scope.current) {
          return;
        }

        context = gsap.context(() => setup(gsap, ScrollTrigger), scope);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [prefersReducedMotion, scope, setup]);
}
