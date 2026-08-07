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
    let scrollFrame = 0;
    let nextRotateX = 0;
    let nextRotateY = 0;
    let lastClientX = 0;
    let lastClientY = 0;

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

    const computeTiltFor = (visual: HTMLElement, clientX: number, clientY: number) => {
      const bounds = visual.getBoundingClientRect();
      const normalizedX = Math.min(
        1,
        Math.max(0, (clientX - bounds.left) / bounds.width),
      );
      const normalizedY = Math.min(
        1,
        Math.max(0, (clientY - bounds.top) / bounds.height),
      );

      nextRotateX = (0.5 - normalizedY) * MAX_ROTATION * 2;
      nextRotateY = (normalizedX - 0.5) * MAX_ROTATION * 2;

      if (!frame) {
        frame = requestAnimationFrame(applyTilt);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      lastClientX = event.clientX;
      lastClientY = event.clientY;

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
      computeTiltFor(visual, event.clientX, event.clientY);
    };

    // The pointer stays put on screen while the page scrolls beneath it, so
    // the card's position relative to the cursor keeps changing. Resetting
    // the tilt here (as before) made it snap flat mid-hover and stay flat
    // until the next pointermove — read as the hover animation finishing and
    // not coming back. Recomputing from the last known cursor position keeps
    // it live through the scroll instead.
    //
    // Lenis fires a 'scroll' event on every animation frame while the page is
    // smooth-scrolling, and each one used to run getBoundingClientRect
    // synchronously — a forced layout read stacked on top of Lenis's own
    // per-frame work, right as the backdrop-filter glass on the card was
    // repainting. That combination is what read as janky/stuttering scroll
    // whenever the cursor sat over a card. Folding the read into a single
    // rAF-gated update caps it at once per frame regardless of how many
    // 'scroll' events land in between.
    const handleScroll = () => {
      if (!activeCard || scrollFrame) {
        return;
      }

      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        if (!activeCard) {
          return;
        }

        const visual = activeCard.querySelector<HTMLElement>(
          "[data-project-media-visual]",
        );
        if (!visual) {
          return;
        }

        const bounds = visual.getBoundingClientRect();
        const stillOver =
          lastClientX >= bounds.left &&
          lastClientX <= bounds.right &&
          lastClientY >= bounds.top &&
          lastClientY <= bounds.bottom;

        if (stillOver) {
          computeTiltFor(visual, lastClientX, lastClientY);
        } else {
          resetCard();
        }
      });
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", resetWhenHidden);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      resetCard();
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerout", handlePointerOut);
      root.removeEventListener("pointerleave", resetActiveCard);
      window.removeEventListener("blur", resetActiveCard);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", resetWhenHidden);
    };
  }, [isEnabled, scope]);
}
