"use client";

import { useLayoutEffect, useRef } from "react";

import { ProjectCard } from "@/components/project-card/project-card";
import type { Dictionary } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { useProjectCardTilt } from "@/hooks/motion/use-project-card-tilt";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";
import styles from "./selected-work.module.css";

interface SelectedWorkProps {
  dictionary: Dictionary;
  locale: Locale;
}

type WorkCardKind = "featured" | "standard" | "portrait" | "wide";

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

function getCardKind(index: number): WorkCardKind {
  if (index === 0) return "featured";
  if (index === 4) return "portrait";
  if (index === 5) return "wide";
  return "standard";
}

const desktopProfile: WorkMotionProfile = {
  cardGroups: [[0], [1, 2], [3], [4], [5]],
  cardTimings: {
    featured: { end: "center 56%", scrub: 0.86, start: "top 88%" },
    portrait: { end: "center 60%", scrub: 0.84, start: "top 90%" },
    standard: { end: "center 58%", scrub: 0.76, start: "top 89%" },
    wide: { end: "center 56%", scrub: 0.8, start: "top 88%" },
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
    featured: { end: "center 60%", scrub: 0.74, start: "top 88%" },
    portrait: { end: "center 64%", scrub: 0.76, start: "top 90%" },
    standard: { end: "center 62%", scrub: 0.68, start: "top 89%" },
    wide: { end: "center 60%", scrub: 0.72, start: "top 88%" },
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
  cardGroups: [[0], [1], [2], [3], [4], [5]],
  cardTimings: {
    featured: { end: "center 64%", scrub: 0.64, start: "top 89%" },
    portrait: { end: "center 66%", scrub: 0.68, start: "top 90%" },
    standard: { end: "center 65%", scrub: 0.6, start: "top 90%" },
    wide: { end: "center 64%", scrub: 0.64, start: "top 89%" },
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
  useProjectCardTilt(rootRef);

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

          const heading = root.querySelector<HTMLElement>("[data-work-heading]");
          const eyebrow = root.querySelector<HTMLElement>("[data-work-eyebrow]");
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
                  onSplit: (split) =>
                    gsap
                      .timeline({
                        defaults: { ease: "power2.out" },
                        scrollTrigger: {
                          trigger: heading,
                          start: profile.headingStart,
                          end: profile.headingEnd,
                          scrub: profile.headingScrub,
                          invalidateOnRefresh: true,
                        },
                      })
                      .fromTo(
                        eyebrow,
                        { autoAlpha: 0, y: profile.isMobile ? 10 : 16 },
                        { autoAlpha: 1, duration: 0.28, y: 0 },
                        0,
                      )
                      .fromTo(
                        split.lines,
                        { autoAlpha: 0, yPercent: profile.titleY },
                        {
                          autoAlpha: 1,
                          duration: 0.62,
                          stagger: profile.isMobile ? 0.045 : 0.065,
                          yPercent: 0,
                        },
                        0.12,
                      )
                      .fromTo(
                        intro,
                        { autoAlpha: 0, y: profile.introY },
                        { autoAlpha: 1, duration: 0.44, y: 0 },
                        0.5,
                      ),
                });

                profile.cardGroups.forEach((group) => {
                  const groupCards = group
                    .map((index) => cards[index])
                    .filter((card): card is HTMLElement => Boolean(card));
                  const triggerCard = groupCards[0];

                  if (!triggerCard) {
                    return;
                  }

                  const triggerIndex = Number(
                    triggerCard.dataset.projectIndex ?? 0,
                  );
                  const timing = profile.cardTimings[getCardKind(triggerIndex)];

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
                    defaults: { ease: "power2.out" },
                    scrollTrigger: {
                      trigger: triggerCard,
                      start: timing.start,
                      end: timing.end,
                      scrub: timing.scrub,
                      invalidateOnRefresh: true,
                      onRefresh: (self) => syncRevealState(self.progress),
                      onUpdate: (self) => syncRevealState(self.progress),
                    },
                  });

                  groupCards.forEach((card, groupIndex) => {
                    const index = Number(card.dataset.projectIndex ?? 0);
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
                      card.querySelector<HTMLElement>("[data-project-tags]"),
                      card.querySelector<HTMLElement>("[data-project-action]"),
                    ].filter((target): target is HTMLElement => Boolean(target));
                    const isFeatured = index === 0;
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

                      timeline.fromTo(
                          secondaryContent,
                          { opacity: 0 },
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

                    timeline.fromTo(
                        secondaryContent,
                        { opacity: 0 },
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

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              dictionary={dictionary}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
