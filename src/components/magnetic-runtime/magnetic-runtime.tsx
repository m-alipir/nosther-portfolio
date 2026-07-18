"use client";

import { useEffect } from "react";

import { usePointerMotionPolicy } from "@/hooks/motion/use-pointer-motion-policy";

export function MagneticRuntime() {
  const isEnabled = usePointerMotionPolicy();

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    let activeTarget: HTMLElement | null = null;
    let activeRect: DOMRect | null = null;
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const resetTarget = () => {
      if (!activeTarget) {
        return;
      }

      activeTarget.dataset.magneticActive = "false";
      activeTarget.style.setProperty("--magnetic-x", "0px");
      activeTarget.style.setProperty("--magnetic-y", "0px");
      activeTarget.style.setProperty("--magnetic-content-x", "0px");
      activeTarget.style.setProperty("--magnetic-content-y", "0px");
      activeTarget = null;
      activeRect = null;
    };

    const applyTransform = () => {
      frame = 0;
      if (!activeTarget) {
        return;
      }

      activeTarget.style.setProperty("--magnetic-x", `${nextX}px`);
      activeTarget.style.setProperty("--magnetic-y", `${nextY}px`);
      activeTarget.style.setProperty(
        "--magnetic-content-x",
        `${nextX * 0.28}px`,
      );
      activeTarget.style.setProperty(
        "--magnetic-content-y",
        `${nextY * 0.28}px`,
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        resetTarget();
        return;
      }

      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-magnetic]")
          : null;

      if (!target) {
        resetTarget();
        return;
      }

      if (target !== activeTarget) {
        resetTarget();
        activeTarget = target;
        activeRect = target.getBoundingClientRect();
        activeTarget.dataset.magneticActive = "true";
      }

      if (!activeRect) {
        return;
      }

      const normalizedX =
        (event.clientX - (activeRect.left + activeRect.width / 2)) /
        (activeRect.width / 2);
      const normalizedY =
        (event.clientY - (activeRect.top + activeRect.height / 2)) /
        (activeRect.height / 2);
      const distance = Math.min(1, Math.hypot(normalizedX, normalizedY));
      const strength = (1 - distance * 0.35) * 8;

      nextX = Math.max(-8, Math.min(8, normalizedX * strength));
      nextY = Math.max(-8, Math.min(8, normalizedY * strength));

      if (!frame) {
        frame = requestAnimationFrame(applyTransform);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        resetTarget();
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (
        activeTarget &&
        event.relatedTarget instanceof Node &&
        activeTarget.contains(event.relatedTarget)
      ) {
        return;
      }
      resetTarget();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("blur", resetTarget);
    window.addEventListener("resize", resetTarget);
    window.addEventListener("scroll", resetTarget, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", resetTarget);
      window.removeEventListener("resize", resetTarget);
      window.removeEventListener("scroll", resetTarget);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frame) {
        cancelAnimationFrame(frame);
      }
      resetTarget();
    };
  }, [isEnabled]);

  return null;
}
