"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { Dictionary } from "@/content/dictionaries";
import { heroReelMedia } from "@/content/media";
import { useVideoPlaybackPolicy } from "@/hooks/media/use-video-playback-policy";
import { useHeroTilt } from "@/hooks/motion/use-hero-tilt";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";
import { lineWidthStagger } from "@/lib/motion/line-stagger";
import {
  consumeHeroIntroLocaleTransition,
  hasHeroIntroPlayed,
  markHeroIntroPlayed,
} from "@/lib/motion/hero-intro";
import styles from "./hero.module.css";

export function Hero({ dictionary }: { dictionary: Dictionary }) {
  const rootRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useHeroTilt(rootRef);
  const playbackAllowed = useVideoPlaybackPolicy(true);
  const [isNarrowViewport, setIsNarrowViewport] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  // The reel always plays through its full loop; only the glass copy card is
  // gated by this, mirroring where `currentTime` sits in the loop — no
  // separate timer to keep in sync with the loop.
  const [cardRevealed, setCardRevealed] = useState(true);
  // The hide-then-reappear cycle is a one-time flourish, not a repeating
  // loop: once the card has come back from its first hide, it stays up for
  // good and `onTimeUpdate` below stops touching `cardRevealed` entirely.
  const [cardLockedOpen, setCardLockedOpen] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(
    heroReelMedia.copyCardWindowSeconds,
  );
  const allowVideo = playbackAllowed && !isNarrowViewport;
  // With no video, there's nothing for the card to be revealing — keep it
  // permanently visible rather than cycling CTAs in and out for no reason.
  const showCopyCard = !allowVideo || cardRevealed;
  const showCountdown = allowVideo && cardRevealed && !cardLockedOpen;

  // Video re-mounts fresh (currentTime back to 0) whenever `allowVideo`
  // flips on, so the one-time reveal cycle should start over with it rather
  // than staying stuck on whatever state a previous mount left behind. Reset
  // during render (React's documented pattern for this) rather than in an
  // effect, since there's no external system to subscribe to here.
  const [prevAllowVideo, setPrevAllowVideo] = useState(allowVideo);
  if (allowVideo !== prevAllowVideo) {
    setPrevAllowVideo(allowVideo);
    if (!allowVideo) {
      setCardRevealed(true);
      setCardLockedOpen(false);
      setCountdownSeconds(heroReelMedia.copyCardWindowSeconds);
    }
  }

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsNarrowViewport(query.matches);

    updateViewport();
    query.addEventListener("change", updateViewport);
    return () => query.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const reel = reelRef.current;
    const video = videoRef.current;
    if (!reel || !video || !allowVideo || videoFailed) {
      return;
    }

    video.muted = true;

    const updatePlayback = (isVisible: boolean) => {
      if (document.hidden || !isVisible) {
        video.pause();
        setVideoPlaying(false);
        return;
      }

      void video.play().catch(() => setVideoPlaying(false));
    };

    // Don't wait on the observer's own async first callback to start
    // playback — the reel is at the top of the page, so it's on-screen the
    // moment this effect runs. IntersectionObserver only needs to take over
    // from here for scroll-driven pause/resume.
    let isVisible = true;
    updatePlayback(isVisible);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        updatePlayback(isVisible);
      },
      { threshold: 0.18 },
    );
    const handleVisibility = () => updatePlayback(isVisible);

    observer.observe(reel);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
    };
  }, [allowVideo, videoFailed]);

  // Pointer parallax drives two custom properties on the section; only the
  // blurred background light fields read them, so nothing reflows.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const canReact = () =>
      pointerQuery.matches && !motionQuery.matches && !connection?.saveData;
    const renderShift = () => {
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;
      root.style.setProperty("--coastal-shift-x", `${currentX.toFixed(2)}px`);
      root.style.setProperty("--coastal-shift-y", `${currentY.toFixed(2)}px`);

      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        frame = requestAnimationFrame(renderShift);
      } else {
        frame = 0;
      }
    };
    const requestShift = () => {
      if (!frame) {
        frame = requestAnimationFrame(renderShift);
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!canReact()) {
        return;
      }

      const bounds = root.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
      requestShift();
    };
    const resetShift = () => {
      targetX = 0;
      targetY = 0;
      requestShift();
    };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", resetShift);
    motionQuery.addEventListener("change", resetShift);
    pointerQuery.addEventListener("change", resetShift);

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", resetShift);
      motionQuery.removeEventListener("change", resetShift);
      pointerQuery.removeEventListener("change", resetShift);
      cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let setupGeneration = 0;
    let disposeAnimations: (() => void) | undefined;

    const clearAnimations = () => {
      disposeAnimations?.();
      disposeAnimations = undefined;
      root.dataset.heroMotion = "ready";
    };

    const setupAnimations = () => {
      const currentGeneration = ++setupGeneration;
      clearAnimations();
      const isLocaleTransition = consumeHeroIntroLocaleTransition();

      if (motionQuery.matches) {
        markHeroIntroPlayed();
        return;
      }

      const skipIntro = hasHeroIntroPlayed() || isLocaleTransition;

      if (skipIntro) {
        markHeroIntroPlayed();
      } else {
        root.dataset.heroMotion = "preparing";
      }

      void Promise.all([ensureGsapRegistered(), document.fonts.ready])
        .then(([{ gsap, ScrollTrigger }]) => {
          if (
            cancelled ||
            currentGeneration !== setupGeneration ||
            motionQuery.matches
          ) {
            root.dataset.heroMotion = "ready";
            return;
          }

          const eyebrow = root.querySelector<HTMLElement>(
            "[data-hero-eyebrow]",
          );
          const title = root.querySelector<HTMLElement>("[data-hero-title]");
          const lead = root.querySelector<HTMLElement>("[data-hero-lead]");
          const actions = root.querySelector<HTMLElement>(
            "[data-hero-actions]",
          );
          const actionLinks =
            root.querySelectorAll<HTMLElement>("[data-hero-action]");
          const media = root.querySelector<HTMLElement>("[data-hero-media]");
          const scrollCue = root.querySelector<HTMLElement>(
            "[data-hero-scroll-cue]",
          );
          const copy = root.querySelector<HTMLElement>("[data-hero-copy]");
          const sweepBand = root.querySelector<HTMLElement>("[data-hero-sweep]");
          const titleLines = Array.from(
            root.querySelectorAll<HTMLElement>(
              "[data-hero-title] > span > span",
            ),
          );

          if (
            !eyebrow ||
            !title ||
            !lead ||
            !actions ||
            !media ||
            !copy ||
            titleLines.length === 0
          ) {
            root.dataset.heroMotion = "ready";
            return;
          }

          const context = gsap.context(() => {
            if (skipIntro) {
              return;
            }

            const isMobile = window.matchMedia("(max-width: 767px)").matches;
            const isTablet = window.matchMedia(
              "(min-width: 768px) and (max-width: 1023px)",
            ).matches;
            const intro = isMobile
              ? {
                  line: 0.5,
                  stagger: 0.055,
                  y: 68,
                  soft: 0.3,
                  mediaClip: 4,
                  mediaDur: 0.48,
                  mediaScale: 0.986,
                }
              : isTablet
                ? {
                    line: 0.62,
                    stagger: 0.07,
                    y: 88,
                    soft: 0.38,
                    mediaClip: 5,
                    mediaDur: 0.58,
                    mediaScale: 0.98,
                  }
                : {
                    line: 0.74,
                    stagger: 0.085,
                    y: 104,
                    soft: 0.44,
                    mediaClip: 6,
                    mediaDur: 0.68,
                    mediaScale: 0.972,
                  };

            gsap.set(eyebrow, { autoAlpha: 0, y: 14 });
            gsap.set(titleLines, { yPercent: intro.y });
            gsap.set(lead, { autoAlpha: 0, y: 20 });
            gsap.set(actionLinks, { autoAlpha: 0, y: 16 });
            gsap.set(copy, { autoAlpha: 0, y: 18 });
            gsap.set(media, {
              autoAlpha: 0,
              clipPath: `inset(${intro.mediaClip}% 0%)`,
              scale: intro.mediaScale,
            });
            if (scrollCue) {
              gsap.set(scrollCue, { autoAlpha: 0, y: 10 });
            }

            root.dataset.heroMotion = "running";
            markHeroIntroPlayed();

            // The copy plate lives inside the reel, so the reel has to arrive
            // first — animating the text while its ancestor is still hidden
            // would just burn the reveal.
            const timeline = gsap
              .timeline({ paused: true, defaults: { ease: "power3.out" } })
              .to(media, {
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: intro.mediaDur,
                scale: 1,
              })
              .to(copy, { autoAlpha: 1, duration: intro.soft, y: 0 }, "-=0.34")
              .to(
                eyebrow,
                { autoAlpha: 1, duration: intro.soft, y: 0 },
                "-=0.18",
              )
              .to(
                titleLines,
                {
                  duration: intro.line,
                  stagger: lineWidthStagger(intro.stagger),
                  yPercent: 0,
                },
                "-=0.16",
              )
              .to(
                lead,
                { autoAlpha: 1, duration: intro.soft + 0.08, y: 0 },
                "-=0.38",
              )
              .to(
                actionLinks,
                { autoAlpha: 1, duration: intro.soft, stagger: 0.07, y: 0 },
                "-=0.22",
              );

            if (scrollCue) {
              timeline.to(
                scrollCue,
                { autoAlpha: 1, duration: 0.34, y: 0 },
                "-=0.18",
              );
            }

            if (sweepBand) {
              timeline.to(
                sweepBand,
                { duration: 1.4, ease: "power2.inOut", xPercent: 380 },
                "-=0.5",
              );
            }

            timeline.eventCallback("onComplete", () => {
              title.setAttribute("aria-label", dictionary.hero.title);
              root.dataset.heroMotion = "ready";
              ScrollTrigger.refresh();
            });

            timeline.play();
          }, root);

          const responsiveMotion = gsap.matchMedia();

          responsiveMotion.add("(min-width: 1024px)", () => {
            const timeline = gsap.timeline({
              defaults: { ease: "none", duration: 1 },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });

            // No separate y on the copy: it is a child of the reel now, so
            // moving both would compound.
            timeline
              .to(title, { filter: "blur(3px)", opacity: 0.3 }, 0)
              .to([eyebrow, lead, actions], { opacity: 0.45 }, 0)
              .to(media, { scale: 0.975, y: 40 }, 0);

            if (scrollCue) {
              timeline.to(scrollCue, { opacity: 0, y: -10, duration: 0.22 }, 0);
            }
          });

          ScrollTrigger.refresh();
          disposeAnimations = () => {
            responsiveMotion.revert();
            context.revert();
            title.setAttribute("aria-label", dictionary.hero.title);
          };
        })
        .catch(() => {
          root.dataset.heroMotion = "ready";
        });
    };

    setupAnimations();
    motionQuery.addEventListener("change", setupAnimations);

    return () => {
      cancelled = true;
      motionQuery.removeEventListener("change", setupAnimations);
      clearAnimations();
    };
  }, [dictionary.hero.title]);

  const stage = dictionary.hero.stage;

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-labelledby="hero-title"
      data-motion-section="hero"
    >
      <div className={styles.shell}>
        <div
          ref={reelRef}
          role="group"
          aria-label={stage.ariaLabel}
          data-hero-media
          data-video-policy={allowVideo ? "preview-enabled" : "poster-only"}
        >
          <div className={styles.stage} data-hero-tilt>
            <div className={styles.reelFrame}>
              <div
                className={styles.scene}
                role="img"
                aria-label={stage.mediaAlt}
              >
                <div className={styles.sceneFallback} aria-hidden="true">
                  <span>{stage.editType}</span>
                  <strong>{stage.roleLabel}</strong>
                </div>
                <Image
                  data-hero-critical-poster
                  alt=""
                  src={heroReelMedia.posterPath}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1023px) 96vw, 88vw"
                />

                {allowVideo && !videoFailed ? (
                  <video
                    data-hero-critical-video
                    ref={videoRef}
                    className={styles.video}
                    data-playing={videoPlaying}
                    poster={heroReelMedia.posterPath}
                    preload="metadata"
                    muted
                    playsInline
                    loop
                    aria-hidden="true"
                    tabIndex={-1}
                    onPlaying={() => setVideoPlaying(true)}
                    onPause={() => setVideoPlaying(false)}
                    onWaiting={() => setVideoPlaying(false)}
                    onStalled={() => setVideoPlaying(false)}
                    onTimeUpdate={(event) => {
                      // Locked open for good after the one reveal cycle —
                      // stop tracking currentTime against the window
                      // entirely so later loops can't re-trigger it.
                      if (cardLockedOpen) {
                        return;
                      }

                      const currentTime = event.currentTarget.currentTime;
                      const revealed =
                        currentTime < heroReelMedia.copyCardWindowSeconds;

                      if (!cardRevealed && revealed) {
                        setCardLockedOpen(true);
                      }
                      setCardRevealed(revealed);
                      if (revealed) {
                        setCountdownSeconds(
                          Math.max(
                            0,
                            Math.ceil(
                              heroReelMedia.copyCardWindowSeconds -
                                currentTime,
                            ),
                          ),
                        );
                      }
                    }}
                    onError={() => {
                      setVideoPlaying(false);
                      setVideoFailed(true);
                    }}
                  >
                    {heroReelMedia.videoSources.map((source) => (
                      <source
                        key={source.src}
                        src={source.src}
                        type={source.type}
                      />
                    ))}
                  </video>
                ) : null}
              </div>

              <div className={styles.reelLabel} aria-hidden="true">
                {stage.editType}
              </div>
            </div>

            <div className={styles.tiltStage} data-hero-tilt-inner>
              <div
                className={styles.copy}
                data-hero-copy
                data-card-revealed={showCopyCard}
              >
                {showCountdown ? (
                  <p className={styles.countdown} aria-hidden="true">
                    <span>{dictionary.hero.stage.countdownLabel}</span>
                    <strong>
                      {countdownSeconds}
                      {dictionary.hero.stage.countdownUnit}
                    </strong>
                  </p>
                ) : null}
                <p className={styles.eyebrow} data-hero-eyebrow>
                  <strong>ALI / N0STHER</strong>
                  <span aria-hidden="true" />
                  {dictionary.hero.eyebrow}
                </p>

              <h1
                id="hero-title"
                className={styles.title}
                aria-label={dictionary.hero.title}
                data-hero-title
              >
                {/* Masks are authored here instead of generated by SplitText.
                    Per-line styling then survives (SplitText rebuilds the
                    children and drops it), and the mask can carry headroom
                    for Turkish diacritics. */}
                {dictionary.hero.titleLines.map((line) => (
                  <span
                    key={line}
                    className={styles.titleLine}
                    aria-hidden="true"
                  >
                    <span className={styles.titleLineInner}>{line}</span>
                  </span>
                ))}
              </h1>

              <div className={styles.meta}>
                <p className={styles.lead} data-hero-lead>
                  {dictionary.hero.lead}
                </p>
                <div className={styles.actions} data-hero-actions>
                  <a
                    className="button"
                    href="#work"
                    data-magnetic
                    data-hero-action
                    tabIndex={showCopyCard ? undefined : -1}
                    aria-hidden={showCopyCard ? undefined : true}
                  >
                    <span data-magnetic-content>{dictionary.hero.workCta}</span>
                  </a>
                  <a
                    className="button button-secondary"
                    href="mailto:contact@nosther.site"
                    data-magnetic
                    data-hero-action
                    tabIndex={showCopyCard ? undefined : -1}
                    aria-hidden={showCopyCard ? undefined : true}
                  >
                    <span data-magnetic-content>
                      {dictionary.hero.contactCta}
                    </span>
                  </a>
                </div>
              </div>

              {/* One light pass over the plate as it enters, then still —
                  not a loop. plus-lighter only ever adds brightness, so it
                  never dips the text's contrast the way a normal blend or a
                  darkening overlay would. */}
              <div className={styles.sweep} aria-hidden="true">
                <span className={styles.sweepBand} data-hero-sweep />
              </div>
              </div>
            </div>
          </div>

          <p className={styles.disclosure}>{stage.disclosure}</p>
        </div>
      </div>

      <a className={styles.scrollCue} href="#work" data-hero-scroll-cue>
        <span aria-hidden="true" />
        {dictionary.hero.scrollCue}
      </a>
    </section>
  );
}
