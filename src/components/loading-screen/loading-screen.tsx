"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./loading-screen.module.css";

const SESSION_KEY = "nosther_v2_loading_seen";
const MAX_WAIT_MS = 6000;
// The wordmark rise finishes at ~1.15s and the specular sweep at ~2.2s, so a
// shorter minimum would cut the sequence off mid-reveal on a warm cache.
const MIN_VISIBLE_MS = 2000;
// Slightly longer than the exit animation so the element is never torn out
// mid-frame, which showed as a flash at the end of the wipe.
const EXIT_MS = 1260;
const WORDMARK = "N0STHER";

type LoaderState = "active" | "exiting" | "hidden";

function waitForImage(image: HTMLImageElement | null) {
  if (!image || (image.complete && image.naturalWidth > 0)) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const finish = () => {
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });
}

function waitForVideo(video: HTMLVideoElement | null) {
  if (!video || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const finish = () => {
      video.removeEventListener("loadeddata", finish);
      video.removeEventListener("canplay", finish);
      video.removeEventListener("error", finish);
      resolve();
    };

    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("canplay", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
  });
}

async function waitForHeroMedia() {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 220));
  const poster = document.querySelector<HTMLImageElement>(
    "[data-hero-critical-poster]",
  );
  const video = document.querySelector<HTMLVideoElement>(
    "[data-hero-critical-video]",
  );

  await Promise.all([waitForImage(poster), waitForVideo(video)]);
}

export function LoadingScreen() {
  const startedAt = useRef(0);
  const [progress, setProgress] = useState(0);
  const [loaderState, setLoaderState] = useState<LoaderState>("active");

  useEffect(() => {
    let shouldRun = true;
    try {
      shouldRun = window.sessionStorage.getItem(SESSION_KEY) !== "true";
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Hardened storage modes still receive one safe, timeout-bounded intro.
    }

    if (!shouldRun) {
      document.documentElement.removeAttribute("data-loading-screen");
      const hideFrame = window.requestAnimationFrame(() => {
        setLoaderState("hidden");
      });
      return () => window.cancelAnimationFrame(hideFrame);
    }

    startedAt.current = performance.now();
    const root = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const exitDuration = reducedMotion ? 200 : EXIT_MS;
    let cancelled = false;
    let finished = false;
    let exitTimer = 0;
    let minimumTimer = 0;
    let frame = 0;
    // Real readiness, which on a warm cache lands within a couple of hundred
    // milliseconds. Shown progress is this capped by elapsed time, otherwise
    // the bar sits at 100% for the whole minimum display window.
    let target = 0;

    const tickProgress = () => {
      const elapsed = performance.now() - startedAt.current;
      const ceiling = Math.min(100, (elapsed / MIN_VISIBLE_MS) * 100);
      const next = Math.min(target, ceiling);

      setProgress((previous) => (next > previous ? next : previous));

      if (!cancelled && next < 100) {
        frame = requestAnimationFrame(tickProgress);
      }
    };

    const advanceTo = (value: number) => {
      target = Math.max(target, value);
    };

    root.dataset.loadingScreen = "active";
    body.setAttribute("aria-busy", "true");

    const finish = () => {
      if (cancelled || finished) {
        return;
      }

      finished = true;
      advanceTo(100);
      const elapsed = performance.now() - startedAt.current;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      minimumTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }
        setLoaderState("exiting");
        root.dataset.loadingScreen = "exiting";
        body.removeAttribute("aria-busy");
        window.dispatchEvent(new Event("nosther:loading-complete"));
        exitTimer = window.setTimeout(() => {
          root.removeAttribute("data-loading-screen");
          setLoaderState("hidden");
        }, exitDuration);
      }, remaining);
    };

    const maximumTimer = window.setTimeout(finish, MAX_WAIT_MS);

    advanceTo(12);
    frame = requestAnimationFrame(tickProgress);

    void Promise.all([
      document.fonts.ready.then(() => advanceTo(48)),
      waitForHeroMedia().then(() => advanceTo(82)),
    ]).then(() => {
      window.clearTimeout(maximumTimer);
      finish();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(maximumTimer);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(exitTimer);
      root.removeAttribute("data-loading-screen");
      body.removeAttribute("aria-busy");
    };
  }, []);

  if (loaderState === "hidden") {
    return null;
  }

  const shown = Math.round(progress);
  const status =
    shown >= 100 ? "ready" : shown >= 48 ? "loading film" : "preparing reel";

  return (
    <div
      className={styles.loader}
      data-state={loaderState}
      role="status"
      aria-live="polite"
      aria-label="N0STHER portfolio loading"
    >
      <div className={styles.tide} aria-hidden="true" />
      <div className={styles.horizon} aria-hidden="true" />

      <div className={styles.stage}>
        <p className={styles.eyebrow}>Coastal Editorial Cinema</p>

        <div className={styles.wordmark}>
          <div className={styles.letters} aria-hidden="true">
            {WORDMARK.split("").map((letter, index) => (
              <span key={`${letter}-${index}`}>
                <span style={{ "--i": index } as React.CSSProperties}>
                  {letter}
                </span>
              </span>
            ))}
          </div>
          <div className={styles.sweep} aria-hidden="true" />
        </div>

        <div className={styles.readout}>
          <div className={styles.track} aria-hidden="true">
            <span style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          <p className={styles.status}>
            <span>{status}</span>
            <b>{shown.toString().padStart(2, "0")}%</b>
          </p>
        </div>
      </div>
    </div>
  );
}
