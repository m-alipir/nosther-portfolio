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

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let resizeTimer = 0;

    const refresh = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (cancelled || prefersReducedMotion) {
            return;
          }

          void ensureGsapRegistered()
            .then(({ ScrollTrigger }) => {
              if (!cancelled) {
                ScrollTrigger.refresh();
                ScrollTrigger.update();
              }
            })
            .catch(() => undefined);
        });
      });
    };

    const refreshAfterResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 160);
    };
    const refreshAfterPageShow = () => refresh();
    const refreshAfterVisibility = () => {
      if (!document.hidden) {
        refresh();
      }
    };
    // Lazy media changes the document height after triggers are measured, and
    // stale positions make reveals fire at the wrong scroll offset. `load`
    // does not bubble, so this listens in the capture phase.
    const refreshAfterMedia = (event: Event) => {
      const target = event.target;
      if (
        target instanceof HTMLImageElement ||
        target instanceof HTMLVideoElement
      ) {
        refreshAfterResize();
      }
    };

    window.addEventListener("resize", refreshAfterResize, { passive: true });
    window.addEventListener("orientationchange", refreshAfterResize);
    window.addEventListener("pageshow", refreshAfterPageShow);
    window.addEventListener("hashchange", refreshAfterPageShow);
    document.addEventListener("visibilitychange", refreshAfterVisibility);
    document.addEventListener("load", refreshAfterMedia, true);
    document.addEventListener("loadeddata", refreshAfterMedia, true);
    void document.fonts.ready.then(refresh);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", refreshAfterResize);
      window.removeEventListener("orientationchange", refreshAfterResize);
      window.removeEventListener("pageshow", refreshAfterPageShow);
      window.removeEventListener("hashchange", refreshAfterPageShow);
      document.removeEventListener("visibilitychange", refreshAfterVisibility);
      document.removeEventListener("load", refreshAfterMedia, true);
      document.removeEventListener("loadeddata", refreshAfterMedia, true);
    };
  }, [prefersReducedMotion]);

  return null;
}
