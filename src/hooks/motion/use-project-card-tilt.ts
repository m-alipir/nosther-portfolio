"use client";

import { useEffect, type RefObject } from "react";

import { usePointerMotionPolicy } from "@/hooks/motion/use-pointer-motion-policy";

const MAX_ROTATION = 1.5;

export function useProjectCardTilt(scope: RefObject<HTMLElement | null>) {
  const isEnabled = usePointerMotionPolicy();

  useEffect(() => {
    const root = scope.current;
    if (!root || !isEnabled) {
      return;
    }

    let activeCard: HTMLElement | null = null;
    let frame = 0;
    let nextRotateX = 0;
    let nextRotateY = 0;

    const resetCard = (card = activeCard) => {
      if (!card) {
        return;
      }

      const visual = card.querySelector<HTMLElement>("[data-project-media-visual]");
      visual?.style.setProperty("--project-tilt-x", "0deg");
      visual?.style.setProperty("--project-tilt-y", "0deg");
      card.removeAttribute("data-tilt-active");

      if (activeCard === card) {
        activeCard = null;
      }
    };

    const applyTilt = () => {
      frame = 0;
      const visual = activeCard?.querySelector<HTMLElement>(
        "[data-project-media-visual]",
      );
      if (!visual) {
        return;
      }

      visual.style.setProperty("--project-tilt-x", `${nextRotateX.toFixed(3)}deg`);
      visual.style.setProperty("--project-tilt-y", `${nextRotateY.toFixed(3)}deg`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const card = target?.closest<HTMLElement>("[data-project-card]");
      if (!card || !root.contains(card)) {
        resetCard();
        return;
      }

      if (activeCard && activeCard !== card) {
        resetCard(activeCard);
      }

      const visual = card.querySelector<HTMLElement>("[data-project-media-visual]");
      if (!visual) {
        return;
      }

      activeCard = card;
      card.dataset.tiltActive = "true";

      const bounds = visual.getBoundingClientRect();
      const normalizedX = Math.min(
        1,
        Math.max(0, (event.clientX - bounds.left) / bounds.width),
      );
      const normalizedY = Math.min(
        1,
        Math.max(0, (event.clientY - bounds.top) / bounds.height),
      );

      nextRotateX = (0.5 - normalizedY) * MAX_ROTATION * 2;
      nextRotateY = (normalizedX - 0.5) * MAX_ROTATION * 2;

      if (!frame) {
        frame = requestAnimationFrame(applyTilt);
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!activeCard) {
        return;
      }

      const nextTarget =
        event.relatedTarget instanceof Node ? event.relatedTarget : null;
      if (!nextTarget || !activeCard.contains(nextTarget)) {
        resetCard();
      }
    };

    const resetWhenHidden = () => {
      if (document.hidden) {
        resetCard();
      }
    };
    const resetActiveCard = () => resetCard();

    root.addEventListener("pointermove", handlePointerMove, { passive: true });
    root.addEventListener("pointerout", handlePointerOut, { passive: true });
    root.addEventListener("pointerleave", resetActiveCard, { passive: true });
    window.addEventListener("blur", resetActiveCard);
    window.addEventListener("scroll", resetActiveCard, { passive: true });
    document.addEventListener("visibilitychange", resetWhenHidden);

    return () => {
      cancelAnimationFrame(frame);
      resetCard();
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerout", handlePointerOut);
      root.removeEventListener("pointerleave", resetActiveCard);
      window.removeEventListener("blur", resetActiveCard);
      window.removeEventListener("scroll", resetActiveCard);
      document.removeEventListener("visibilitychange", resetWhenHidden);
    };
  }, [isEnabled, scope]);
}
