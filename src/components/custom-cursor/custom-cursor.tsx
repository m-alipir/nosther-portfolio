"use client";

import { useEffect, useRef } from "react";

import type { Dictionary } from "@/content/dictionaries";
import { usePointerMotionPolicy } from "@/hooks/motion/use-pointer-motion-policy";
import { cursorCopyStateEvent } from "@/lib/motion/pointer-events";
import styles from "./custom-cursor.module.css";

type CursorState = "default" | "interactive" | "project" | "copy";

export function CustomCursor({ labels }: { labels: Dictionary["cursor"] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const followerRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const isEnabled = usePointerMotionPolicy();

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!isEnabled || !root || !dot || !follower || !label) {
      document.documentElement.removeAttribute("data-custom-cursor");
      return;
    }

    let frame = 0;
    let hasPosition = false;
    let targetX = 0;
    let targetY = 0;
    let followerX = 0;
    let followerY = 0;
    let activeTarget: Element | null = null;
    let currentState: CursorState = "default";

    const setVisible = (visible: boolean) => {
      root.dataset.visible = String(visible);
      if (visible) {
        document.documentElement.dataset.customCursor = "active";
      } else {
        document.documentElement.removeAttribute("data-custom-cursor");
      }
    };

    const setCursorState = (target: Element | null) => {
      if (target === activeTarget) {
        return;
      }

      activeTarget = target;
      const project = target?.closest("[data-cursor-project]");
      const copyTarget = target?.closest<HTMLElement>("[data-cursor-copy]");
      const interactive = target?.closest(
        "a, button, [role='button'], [data-cursor-interactive]",
      );

      let nextState: CursorState = "default";
      let nextLabel = "";

      if (project) {
        nextState = "project";
        nextLabel = labels.project;
      } else if (copyTarget) {
        nextState = "copy";
        nextLabel =
          copyTarget.dataset.cursorCopyState === "copied"
            ? labels.copied
            : labels.copy;
      } else if (interactive) {
        nextState = "interactive";
      }

      if (nextState !== currentState) {
        currentState = nextState;
        root.dataset.state = nextState;
      }
      label.textContent = nextLabel;
    };

    const render = () => {
      frame = 0;
      followerX += (targetX - followerX) * 0.18;
      followerY += (targetY - followerY) * 0.18;

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

      if (
        Math.abs(targetX - followerX) > 0.1 ||
        Math.abs(targetY - followerY) > 0.1
      ) {
        frame = requestAnimationFrame(render);
      }
    };

    const requestRender = () => {
      if (!frame && !document.hidden) {
        frame = requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        setVisible(false);
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasPosition) {
        followerX = targetX;
        followerY = targetY;
        hasPosition = true;
      }

      setCursorState(event.target instanceof Element ? event.target : null);
      setVisible(true);
      requestRender();
    };

    const hideCursor = () => {
      setVisible(false);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        hideCursor();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        hideCursor();
      }
    };

    const onCopyState = (event: Event) => {
      const copyTarget = activeTarget?.closest<HTMLElement>("[data-cursor-copy]");
      if (!copyTarget) {
        return;
      }

      const { copied } = (event as CustomEvent<{ copied: boolean }>).detail;
      label.textContent = copied ? labels.copied : labels.copy;
    };

    try {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerOut, { passive: true });
      window.addEventListener("blur", hideCursor);
      window.addEventListener(cursorCopyStateEvent, onCopyState);
      document.addEventListener("visibilitychange", onVisibilityChange);
    } catch {
      hideCursor();
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", hideCursor);
      window.removeEventListener(cursorCopyStateEvent, onCopyState);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frame) {
        cancelAnimationFrame(frame);
      }
      document.documentElement.removeAttribute("data-custom-cursor");
    };
  }, [isEnabled, labels]);

  return (
    <div
      ref={rootRef}
      className={styles.cursor}
      data-state="default"
      data-visible="false"
      data-custom-cursor-root
      aria-hidden="true"
    >
      <span ref={dotRef} className={styles.dot} />
      <span ref={followerRef} className={styles.follower}>
        <span ref={labelRef} className={styles.label} />
      </span>
    </div>
  );
}
