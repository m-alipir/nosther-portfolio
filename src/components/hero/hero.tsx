"use client";

import { useLayoutEffect, useRef } from "react";

import type { Dictionary } from "@/content/dictionaries";
import { HeroSequenceStage } from "@/components/hero/hero-sequence-stage";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";
import {
  consumeHeroIntroLocaleTransition,
  hasHeroIntroPlayed,
  markHeroIntroPlayed,
} from "@/lib/motion/hero-intro";
import styles from "./hero.module.css";

export function Hero({ dictionary }: { dictionary: Dictionary }) {
  const rootRef = useRef<HTMLElement>(null);

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
        .then(([{ gsap, ScrollTrigger, SplitText }]) => {
          if (
            cancelled ||
            currentGeneration !== setupGeneration ||
            motionQuery.matches
          ) {
            root.dataset.heroMotion = "ready";
            return;
          }

          const eyebrow = root.querySelector<HTMLElement>("[data-hero-eyebrow]");
          const title = root.querySelector<HTMLElement>("[data-hero-title]");
          const lead = root.querySelector<HTMLElement>("[data-hero-lead]");
          const actions = root.querySelector<HTMLElement>("[data-hero-actions]");
          const actionLinks = root.querySelectorAll<HTMLElement>("[data-hero-action]");
          const media = root.querySelector<HTMLElement>("[data-hero-media]");
          const mediaStage = root.querySelector<HTMLElement>("[data-hero-media-stage]");
          const scrollCue = root.querySelector<HTMLElement>("[data-hero-scroll-cue]");
          const copy = root.querySelector<HTMLElement>("[data-hero-copy]");

          if (
            !eyebrow ||
            !title ||
            !lead ||
            !actions ||
            !media ||
            !mediaStage ||
            !scrollCue ||
            !copy
          ) {
            root.dataset.heroMotion = "ready";
            return;
          }

          let splitTitle: ReturnType<typeof SplitText.create> | undefined;
          const context = gsap.context(() => {
            if (!skipIntro) {
              const isMobile = window.matchMedia("(max-width: 767px)").matches;
              const isTablet = window.matchMedia(
                "(min-width: 768px) and (max-width: 1199px)",
              ).matches;
              const introMotion = isMobile
                ? {
                    actionDuration: 0.32,
                    actionY: 12,
                    eyebrowDuration: 0.28,
                    eyebrowY: 10,
                    leadDuration: 0.34,
                    leadY: 14,
                    lineDuration: 0.5,
                    lineStagger: 0.055,
                    lineY: 72,
                    mediaClip: 4,
                    mediaDuration: 0.48,
                    mediaScale: 0.985,
                  }
                : isTablet
                  ? {
                      actionDuration: 0.36,
                      actionY: 16,
                      eyebrowDuration: 0.34,
                      eyebrowY: 14,
                      leadDuration: 0.42,
                      leadY: 19,
                      lineDuration: 0.64,
                      lineStagger: 0.07,
                      lineY: 94,
                      mediaClip: 6,
                      mediaDuration: 0.6,
                      mediaScale: 0.977,
                    }
                  : {
                      actionDuration: 0.42,
                      actionY: 20,
                      eyebrowDuration: 0.42,
                      eyebrowY: 18,
                      leadDuration: 0.5,
                      leadY: 24,
                      lineDuration: 0.78,
                      lineStagger: 0.09,
                      lineY: 112,
                      mediaClip: 8,
                      mediaDuration: 0.72,
                      mediaScale: 0.965,
                    };

              splitTitle = SplitText.create(title, {
                type: "lines",
                mask: "lines",
                aria: "auto",
              });

              gsap.set(eyebrow, { autoAlpha: 0, y: introMotion.eyebrowY });
              gsap.set(splitTitle.lines, {
                autoAlpha: 0,
                yPercent: introMotion.lineY,
              });
              gsap.set(lead, { autoAlpha: 0, y: introMotion.leadY });
              gsap.set(actionLinks, { autoAlpha: 0, y: introMotion.actionY });
              gsap.set(media, {
                autoAlpha: 0,
                clipPath: `inset(${introMotion.mediaClip}% 0%)`,
                scale: introMotion.mediaScale,
              });
              gsap.set(scrollCue, { autoAlpha: 0, y: 12 });
              root.dataset.heroMotion = "running";
              markHeroIntroPlayed();

              gsap
                .timeline({ defaults: { ease: "power3.out" } })
                .to(eyebrow, {
                  autoAlpha: 1,
                  duration: introMotion.eyebrowDuration,
                  y: 0,
                })
                .to(
                  splitTitle.lines,
                  {
                    autoAlpha: 1,
                    duration: introMotion.lineDuration,
                    stagger: introMotion.lineStagger,
                    yPercent: 0,
                  },
                  "-=0.18",
                )
                .to(
                  lead,
                  { autoAlpha: 1, duration: introMotion.leadDuration, y: 0 },
                  "-=0.32",
                )
                .to(
                  actionLinks,
                  {
                    autoAlpha: 1,
                    duration: introMotion.actionDuration,
                    stagger: 0.08,
                    y: 0,
                  },
                  "-=0.26",
                )
                .to(
                  media,
                  {
                    autoAlpha: 1,
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: introMotion.mediaDuration,
                    scale: 1,
                  },
                  "-=0.18",
                )
                .to(scrollCue, { autoAlpha: 1, duration: 0.4, y: 0 }, "-=0.2")
                .eventCallback("onComplete", () => {
                  splitTitle?.revert();
                  splitTitle = undefined;
                  root.dataset.heroMotion = "ready";
                  ScrollTrigger.refresh();
                });
            }
          }, root);

          const responsiveMotion = gsap.matchMedia();

          responsiveMotion.add("(min-width: 1200px)", () => {
            gsap
              .timeline({
                defaults: { ease: "none", duration: 1 },
                scrollTrigger: {
                  trigger: root,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.65,
                  invalidateOnRefresh: true,
                },
              })
              .to(copy, { y: -64 }, 0)
              .to(title, { filter: "blur(3px)", opacity: 0.28 }, 0)
              .to([eyebrow, lead, actions], { opacity: 0.45 }, 0)
              .to(mediaStage, { scale: 0.97, y: 52 }, 0)
              .to(scrollCue, { opacity: 0, y: -12, duration: 0.22 }, 0);
          });

          responsiveMotion.add(
            "(min-width: 768px) and (max-width: 1199px)",
            () => {
              gsap
                .timeline({
                  defaults: { ease: "none", duration: 1 },
                  scrollTrigger: {
                    trigger: root,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                  },
                })
                .to(copy, { y: -36 }, 0)
                .to(title, { opacity: 0.62 }, 0)
                .to([eyebrow, lead, actions], { opacity: 0.72 }, 0)
                .to(mediaStage, { scale: 0.985, y: 24 }, 0)
                .to(scrollCue, { opacity: 0, y: -8, duration: 0.2 }, 0);
            },
          );

          ScrollTrigger.refresh();
          disposeAnimations = () => {
            responsiveMotion.revert();
            context.revert();
            splitTitle?.revert();
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

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-labelledby="hero-title"
      data-motion-section="hero"
    >
      <div className={"container " + styles.grid}>
        <div className={styles.copy} data-hero-copy>
          <p className="eyebrow" data-hero-eyebrow>
            {dictionary.hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className={styles.title}
            aria-label={dictionary.hero.title}
            data-hero-title
          >
            {dictionary.hero.titleLines.map((line) => (
              <span key={line} aria-hidden="true">
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.lead} data-hero-lead>
            {dictionary.hero.lead}
          </p>
          <div className={styles.actions} data-hero-actions>
            <a className="button" href="#work" data-magnetic data-hero-action>
              <span data-magnetic-content>{dictionary.hero.workCta}</span>
            </a>
            <a
              className="button button-secondary"
              href="mailto:contact@nosther.site"
              data-magnetic
              data-hero-action
            >
              <span data-magnetic-content>{dictionary.hero.contactCta}</span>
            </a>
          </div>
        </div>

        <div className={styles.mediaStage} data-hero-media-stage>
          <HeroSequenceStage copy={dictionary.hero.stage} />
        </div>

        <a className={styles.scrollCue} href="#work" data-hero-scroll-cue>
          <span aria-hidden="true" />
          {dictionary.hero.scrollCue}
        </a>
      </div>
    </section>
  );
}
