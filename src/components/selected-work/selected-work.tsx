"use client";

import type React from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/project-card/project-card";
import type { Dictionary } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { useProjectCardTilt } from "@/hooks/motion/use-project-card-tilt";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";
import { lineWidthStagger } from "@/lib/motion/line-stagger";
import styles from "./selected-work.module.css";

interface SelectedWorkProps {
  dictionary: Dictionary;
  locale: Locale;
}

type WorkCardKind = "flagship" | "major" | "narrative" | "supporting";

interface WorkCardTiming {
  end: string;
  scrub: number;
  start: string;
}

interface WorkMotionProfile {
  cardGroups: number[][];
  cardTimings: Record<WorkCardKind, WorkCardTiming>;
  headingEnd: string;
  headingStart: string;
  headingScrub: number;
  introY: number;
  isMobile: boolean;
  mediaClip: number;
  mediaScale: number;
  mediaY: number;
  titleY: number;
}

function getCardKind(card: HTMLElement): WorkCardKind {
  const layout = card.dataset.projectLayout;
  if (layout === "flagship" || layout === "major" || layout === "narrative") {
    return layout;
  }
  return "supporting";
}

const desktopProfile: WorkMotionProfile = {
  cardGroups: [[0, 1, 2], [3], [4, 5]],
  cardTimings: {
    flagship: { end: "center 56%", scrub: 0.86, start: "top 88%" },
    major: { end: "center 58%", scrub: 0.76, start: "top 89%" },
    narrative: { end: "center 59%", scrub: 0.76, start: "top 89%" },
    supporting: { end: "center 60%", scrub: 0.8, start: "top 90%" },
  },
  headingEnd: "top 52%",
  headingStart: "top 84%",
  headingScrub: 0.7,
  introY: 22,
  isMobile: false,
  mediaClip: 13,
  mediaScale: 1.04,
  mediaY: 28,
  titleY: 104,
};

const tabletProfile: WorkMotionProfile = {
  ...desktopProfile,
  cardTimings: {
    flagship: { end: "center 60%", scrub: 0.74, start: "top 88%" },
    major: { end: "center 62%", scrub: 0.68, start: "top 89%" },
    narrative: { end: "center 63%", scrub: 0.7, start: "top 89%" },
    supporting: { end: "center 64%", scrub: 0.76, start: "top 90%" },
  },
  headingEnd: "top 56%",
  headingStart: "top 85%",
  headingScrub: 0.58,
  introY: 18,
  mediaClip: 10,
  mediaScale: 1.025,
  mediaY: 22,
  titleY: 88,
};

const mobileProfile: WorkMotionProfile = {
  ...tabletProfile,
  cardGroups: [[0, 1, 2], [3], [4], [5]],
  cardTimings: {
    flagship: { end: "center 64%", scrub: 0.64, start: "top 89%" },
    major: { end: "center 65%", scrub: 0.6, start: "top 90%" },
    narrative: { end: "center 65%", scrub: 0.62, start: "top 90%" },
    supporting: { end: "center 66%", scrub: 0.68, start: "top 90%" },
  },
  headingEnd: "top 58%",
  headingStart: "top 85%",
  headingScrub: 0.45,
  introY: 14,
  isMobile: true,
  mediaClip: 0,
  mediaScale: 1,
  mediaY: 18,
  titleY: 68,
};

export function SelectedWork({ dictionary, locale }: SelectedWorkProps) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const featuredProjects = projects
    .filter((project) => project.featuredRank !== null)
    .sort((a, b) => (a.featuredRank ?? 0) - (b.featuredRank ?? 0));
  const supportingProjects = projects.filter(
    (project) => project.editorialClass === "supporting",
  );
  useProjectCardTilt(rootRef);

  const slideCount = featuredProjects.length;

  // The deck wraps, so stepping is modular rather than clamped.
  const step = useCallback(
    (delta: number) =>
      setActiveSlide(
        (previous) => (previous + delta + slideCount) % slideCount,
      ),
    [slideCount],
  );

  // Horizontal drag on the deck. The threshold keeps a vertical page scroll
  // that happens to wobble sideways from flipping the card.
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    dragStart.current = { x: event.clientX, y: event.clientY };
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      const start = dragStart.current;
      dragStart.current = null;
      if (!start) {
        return;
      }

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) {
        return;
      }

      step(dx < 0 ? 1 : -1);
    },
    [step],
  );

  const handleTrackKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    },
    [step],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let cancelled = false;
    let setupGeneration = 0;
    let disposeAnimations: (() => void) | undefined;

    const clearAnimations = () => {
      disposeAnimations?.();
      disposeAnimations = undefined;
      root.dataset.workMotion = "ready";
    };

    const setupAnimations = () => {
      const currentGeneration = ++setupGeneration;
      clearAnimations();

      if (reducedMotionQuery.matches) {
        return;
      }

      root.dataset.workMotion = "preparing";

      void Promise.all([ensureGsapRegistered(), document.fonts.ready])
        .then(([{ gsap, ScrollTrigger, SplitText }]) => {
          if (
            cancelled ||
            currentGeneration !== setupGeneration ||
            reducedMotionQuery.matches
          ) {
            root.dataset.workMotion = "ready";
            return;
          }

          const heading = root.querySelector<HTMLElement>(
            "[data-work-heading]",
          );
          const eyebrow = root.querySelector<HTMLElement>(
            "[data-work-eyebrow]",
          );
          const title = root.querySelector<HTMLElement>("[data-work-title]");
          const intro = root.querySelector<HTMLElement>("[data-work-intro]");
          const cards = Array.from(
            root.querySelectorAll<HTMLElement>("[data-project-card]"),
          );

          if (!heading || !eyebrow || !title || !intro || cards.length === 0) {
            root.dataset.workMotion = "ready";
            return;
          }

          let responsiveMotion: ReturnType<typeof gsap.matchMedia> | undefined;

          const context = gsap.context(() => {
            responsiveMotion = gsap.matchMedia();

            const addProfile = (query: string, profile: WorkMotionProfile) => {
              responsiveMotion?.add(query, () => {
                cards.forEach((card) => {
                  card.dataset.cardReveal = "pending";
                });

                const splitTitle = SplitText.create(title, {
                  type: "lines",
                  mask: "lines",
                  aria: "auto",
                  autoSplit: true,
                  // A staggered fromTo only renders the first target's start
                  // state immediately, so the remaining lines stayed visible
                  // until the timeline ran. Set them explicitly instead.
                  onSplit: (split) => {
                    gsap.set(split.lines, {
                      autoAlpha: 0,
                      yPercent: profile.titleY,
                    });
                    return gsap
                      .timeline({
                        defaults: { ease: "power2.out", immediateRender: true },
                        scrollTrigger: {
                          trigger: heading,
                          start: profile.headingStart,
                          toggleActions: "play none none reverse",
                          invalidateOnRefresh: true,
                        },
                      })
                      .fromTo(
                        eyebrow,
                        { autoAlpha: 0, y: profile.isMobile ? 10 : 16 },
                        { autoAlpha: 1, duration: 0.28, y: 0 },
                        0,
                      )
                      .to(
                        split.lines,
                        {
                          autoAlpha: 1,
                          duration: 0.62,
                          stagger: lineWidthStagger(
                            profile.isMobile ? 0.045 : 0.065,
                          ),
                          yPercent: 0,
                        },
                        0.12,
                      )
                      .fromTo(
                        intro,
                        { autoAlpha: 0, y: profile.introY },
                        { autoAlpha: 1, duration: 0.44, y: 0 },
                        0.5,
                      );
                  },
                });

                profile.cardGroups.forEach((group) => {
                  const groupCards = group
                    .map((index) => cards[index])
                    .filter((card): card is HTMLElement => Boolean(card));
                  const triggerCard = groupCards[0];

                  if (!triggerCard) {
                    return;
                  }

                  const timing = profile.cardTimings[getCardKind(triggerCard)];

                  const syncRevealState = (progress: number) => {
                    const state =
                      progress >= 0.985
                        ? "complete"
                        : progress <= 0.001
                          ? "pending"
                          : "running";
                    groupCards.forEach((card) => {
                      card.dataset.cardReveal = state;
                    });
                  };

                  const timeline = gsap.timeline({
                    defaults: { ease: "power2.out", immediateRender: true },
                    scrollTrigger: {
                      trigger: triggerCard,
                      start: timing.start,
                      toggleActions: "play none none reverse",
                      invalidateOnRefresh: true,
                      onRefresh: (self) => syncRevealState(self.progress),
                      onUpdate: (self) => syncRevealState(self.progress),
                    },
                  });

                  groupCards.forEach((card, groupIndex) => {
                    const media = card.querySelector<HTMLElement>(
                      "[data-project-media]",
                    );
                    const body = card.querySelector<HTMLElement>(
                      "[data-project-body]",
                    );
                    const cardTitle = card.querySelector<HTMLElement>(
                      "[data-project-title]",
                    );
                    const description = card.querySelector<HTMLElement>(
                      "[data-project-description]",
                    );
                    const secondaryContent = [
                      card.querySelector<HTMLElement>("[data-project-meta]"),
                      card.querySelector<HTMLElement>("[data-project-details]"),
                      card.querySelector<HTMLElement>(
                        "[data-project-source-title]",
                      ),
                      card.querySelector<HTMLElement>(
                        "[data-project-contributions]",
                      ),
                      card.querySelector<HTMLElement>("[data-project-tags]"),
                      card.querySelector<HTMLElement>(
                        "[data-project-disclosure]",
                      ),
                      card.querySelector<HTMLElement>("[data-project-action]"),
                    ].filter((target): target is HTMLElement =>
                      Boolean(target),
                    );
                    const isFeatured = card.dataset.projectRank === "1";
                    const offset = groupIndex * (profile.isMobile ? 0 : 0.07);

                    if (profile.isMobile) {
                      timeline
                        .fromTo(
                          media,
                          {
                            autoAlpha: 0,
                            clipPath: "inset(0% 0% 6% 0%)",
                            y: 10,
                          },
                          {
                            autoAlpha: 1,
                            clipPath: "inset(0% 0% 0% 0%)",
                            duration: 0.72,
                            y: 0,
                          },
                          offset,
                        )
                        .fromTo(
                          card,
                          { autoAlpha: 0.12, y: 18 },
                          { autoAlpha: 1, duration: 0.78, y: 0 },
                          offset + 0.06,
                        )
                        .fromTo(
                          body,
                          { autoAlpha: 0, y: 14 },
                          { autoAlpha: 1, duration: 0.58, y: 0 },
                          offset + 0.24,
                        )
                        .fromTo(
                          cardTitle,
                          { opacity: 0 },
                          { duration: 0.34, opacity: 1 },
                          offset + 0.32,
                        );

                      if (description) {
                        timeline.fromTo(
                          description,
                          { opacity: 0 },
                          { duration: 0.34, opacity: 1 },
                          offset + 0.4,
                        );
                      }

                      gsap.set(secondaryContent, { opacity: 0 });
                      timeline.to(
                        secondaryContent,
                        { duration: 0.32, opacity: 1, stagger: 0.035 },
                        offset + 0.48,
                      );
                      return;
                    }

                    timeline
                      .fromTo(
                        media,
                        {
                          autoAlpha: 0,
                          clipPath: `inset(0% 0% ${
                            isFeatured ? 17 : profile.mediaClip
                          }% 0%)`,
                          scale: isFeatured ? 1.05 : profile.mediaScale,
                          y: isFeatured ? 34 : profile.mediaY,
                        },
                        {
                          autoAlpha: 1,
                          clipPath: "inset(0% 0% 0% 0%)",
                          duration: isFeatured ? 0.82 : 0.72,
                          scale: 1,
                          y: 0,
                        },
                        offset,
                      )
                      .fromTo(
                        card,
                        { opacity: 0.28 },
                        { duration: 0.48, opacity: 1 },
                        offset + 0.08,
                      )
                      .fromTo(
                        body,
                        {
                          autoAlpha: 0,
                          y: isFeatured ? 30 : profile.introY,
                        },
                        { autoAlpha: 1, duration: 0.58, y: 0 },
                        offset + (isFeatured ? 0.3 : 0.24),
                      )
                      .fromTo(
                        cardTitle,
                        { opacity: 0 },
                        { duration: 0.34, opacity: 1 },
                        offset + (isFeatured ? 0.38 : 0.32),
                      );

                    if (description) {
                      timeline.fromTo(
                        description,
                        { opacity: 0 },
                        { duration: 0.34, opacity: 1 },
                        offset + (isFeatured ? 0.46 : 0.4),
                      );
                    }

                    gsap.set(secondaryContent, { opacity: 0 });
                    timeline.to(
                      secondaryContent,
                      { duration: 0.34, opacity: 1, stagger: 0.04 },
                      offset + (isFeatured ? 0.54 : 0.48),
                    );
                  });
                });

                root.dataset.workMotion = "running";

                return () => {
                  splitTitle.revert();
                  cards.forEach((card) => {
                    card.removeAttribute("data-card-reveal");
                  });
                };
              });
            };

            addProfile("(min-width: 1200px)", desktopProfile);
            addProfile(
              "(min-width: 768px) and (max-width: 1199px)",
              tabletProfile,
            );
            addProfile("(max-width: 767px)", mobileProfile);
          }, root);

          ScrollTrigger.refresh();
          disposeAnimations = () => {
            responsiveMotion?.revert();
            context.revert();
            cards.forEach((card) => {
              card.removeAttribute("data-card-reveal");
            });
          };
        })
        .catch(() => {
          root.dataset.workMotion = "ready";
        });
    };

    setupAnimations();
    reducedMotionQuery.addEventListener("change", setupAnimations);

    return () => {
      cancelled = true;
      reducedMotionQuery.removeEventListener("change", setupAnimations);
      clearAnimations();
    };
  }, [dictionary.work.title, locale]);

  return (
    <section
      ref={rootRef}
      id="work"
      className={styles.section}
      aria-labelledby="work-title"
      data-motion-section="work"
    >
      <svg className="atmosphere atmosphere--current" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <rect width="100%" height="100%" filter="url(#fx-current)" />
      </svg>

      <div className="container">
        <div className={styles.heading} data-work-heading>
          <div>
            <p className="eyebrow" data-work-eyebrow>
              {dictionary.work.eyebrow}
            </p>
            <h2 id="work-title" className="section-title" data-work-title>
              {dictionary.work.title}
            </h2>
          </div>
          <p className="section-intro" data-work-intro>
            {dictionary.work.intro}
          </p>
        </div>

        <div className={styles.featured}>
          {/* data-lenis-prevent keeps the smooth-scroll wheel handler off this
              horizontal track so trackpad swipes reach it natively. */}
          <div
            ref={trackRef}
            className={styles.featuredTrack}
            role="group"
            aria-roledescription="carousel"
            aria-label={dictionary.work.carouselLabel}
            tabIndex={0}
            data-lenis-prevent
            onKeyDown={handleTrackKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              dragStart.current = null;
            }}
          >
            {featuredProjects.map((project, slideIndex) => {
              const index = projects.indexOf(project);
              const depth =
                (slideIndex - activeSlide + slideCount) % slideCount;
              return (
                <div
                  key={project.id}
                  className={styles.slide}
                  data-depth={depth}
                  aria-hidden={depth === 0 ? undefined : true}
                  inert={depth === 0 ? undefined : true}
                >
                  <ProjectCard
                    project={project}
                    locale={locale}
                    dictionary={dictionary}
                    index={index}
                    projectNumber={`0${project.featuredRank}`}
                  />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className={styles.navPrev}
            onClick={() => step(-1)}
            aria-label={dictionary.work.carouselPrev}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={styles.navNext}
            onClick={() => step(1)}
            aria-label={dictionary.work.carouselNext}
          >
            <span aria-hidden="true">→</span>
          </button>

          <p className={styles.featuredStatus} aria-live="polite">
            {String(activeSlide + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            {String(featuredProjects.length).padStart(2, "0")}
          </p>
        </div>

        <div
          className={styles.supportingArea}
          role="group"
          aria-labelledby="supporting-work-title"
        >
          <div className={styles.supportingHeading}>
            <div>
              <p className={styles.supportingLabel}>
                {dictionary.work.supportingLabel}
              </p>
              <h3 id="supporting-work-title">
                {dictionary.work.supportingTitle}
              </h3>
            </div>
            <p>{dictionary.work.supportingIntro}</p>
          </div>
          <div className={styles.supportingGrid}>
            {supportingProjects.map((project, supportingIndex) => {
              const index = projects.indexOf(project);
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  dictionary={dictionary}
                  index={index}
                  projectNumber={`S0${supportingIndex + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
