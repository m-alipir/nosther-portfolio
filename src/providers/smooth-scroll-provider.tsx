"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/motion/use-prefers-reduced-motion";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let dispose: (() => void) | undefined;

    void ensureGsapRegistered()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled) {
          return;
        }

        const lenis = new Lenis({
          duration: 1,
          smoothWheel: true,
          autoRaf: false,
        });
        const updateScrollTrigger = () => ScrollTrigger.update();
        const updateLenis = (time: number) => lenis.raf(time * 1000);

        lenis.on("scroll", updateScrollTrigger);
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        dispose = () => {
          gsap.ticker.remove(updateLenis);
          lenis.off("scroll", updateScrollTrigger);
          lenis.destroy();
        };
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [prefersReducedMotion]);

  return children;
}
