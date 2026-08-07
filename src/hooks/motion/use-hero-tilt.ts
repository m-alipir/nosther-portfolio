"use client";

import { useEffect, type RefObject } from "react";

/**
 * Cursor-tracked 3D tilt for the hero's copy plate — restrained on purpose:
 * a max of ~5.5°/7° rotation, eased over 500ms (see .tiltStage's
 * transition) so it always reads as heavier and slower than the cursor,
 * never a snappy UI response. Only the plate rotates; the footage behind it
 * stays flat. Fine-pointer and motion-safe only — touch and
 * prefers-reduced-motion never see a transform.
 */
const MAX_ROTATE_X = 5.5;
const MAX_ROTATE_Y = 7;

export function useHeroTilt(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const canReact = () => pointerQuery.matches && !motionQuery.matches;

    const getInner = () =>
      root.querySelector<HTMLElement>("[data-hero-tilt-inner]");

    const render = () => {
      frame = 0;
      const inner = getInner();
      if (!inner) {
        return;
      }

      const bounds = inner.getBoundingClientRect();
      const dx = (lastX - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
      const dy = (lastY - (bounds.top + bounds.height / 2)) / (bounds.height / 2);
      const cx = Math.max(-1, Math.min(1, dx));
      const cy = Math.max(-1, Math.min(1, dy));

      inner.style.transform =
        `rotateX(${(-cy * MAX_ROTATE_X).toFixed(2)}deg) ` +
        `rotateY(${(cx * MAX_ROTATE_Y).toFixed(2)}deg)`;
    };

    const resetTilt = () => {
      const inner = getInner();
      if (inner) {
        inner.style.transform = "";
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canReact()) {
        return;
      }

      lastX = event.clientX;
      lastY = event.clientY;
      if (!frame) {
        frame = requestAnimationFrame(render);
      }
    };

    const onPointerLeave = () => resetTilt();
    const onVisibilityChange = () => {
      if (document.hidden) {
        resetTilt();
      }
    };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave);
    motionQuery.addEventListener("change", resetTilt);
    pointerQuery.addEventListener("change", resetTilt);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      motionQuery.removeEventListener("change", resetTilt);
      pointerQuery.removeEventListener("change", resetTilt);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resetTilt();
    };
  }, [rootRef]);
}
