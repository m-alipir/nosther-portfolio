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
      .then(({ ScrollTrigger }) => {
        if (cancelled) {
          return;
        }

        const lenis = new Lenis({
          duration: 0.78,
          smoothWheel: true,
          autoRaf: false,
        });
        const updateScrollTrigger = () => ScrollTrigger.update();
        let frame = 0;
        let idleFrames = 0;

        // GSAP's global ticker never sleeps while a callback is registered.
        // Driving Lenis from it kept a full-page rAF loop alive even while the
        // page was idle. Wake Lenis only when wheel/touch input begins and let
        // the loop stop as soon as interpolation settles.
        const updateLenis = (time: number) => {
          lenis.raf(time);

          if (lenis.isScrolling || Math.abs(lenis.velocity) > 0.01) {
            idleFrames = 0;
          } else {
            idleFrames += 1;
          }

          if (idleFrames < 2 && !document.hidden) {
            frame = window.requestAnimationFrame(updateLenis);
          } else {
            frame = 0;
          }
        };
        const startLenis = () => {
          idleFrames = 0;
          if (!frame && !document.hidden) {
            frame = window.requestAnimationFrame(updateLenis);
          }
        };
        const stopWhenHidden = () => {
          if (document.hidden && frame) {
            window.cancelAnimationFrame(frame);
            frame = 0;
          }
        };

        lenis.on("scroll", updateScrollTrigger);
        lenis.on("virtual-scroll", startLenis);
        document.addEventListener("visibilitychange", stopWhenHidden);
        dispose = () => {
          window.cancelAnimationFrame(frame);
          lenis.off("scroll", updateScrollTrigger);
          lenis.off("virtual-scroll", startLenis);
          document.removeEventListener("visibilitychange", stopWhenHidden);
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
