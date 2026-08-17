"use client";

import type React from "react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/content/dictionaries";
import type { Locale, Project } from "@/content/types";
import { useVideoPlaybackPolicy } from "@/hooks/media/use-video-playback-policy";
import styles from "./project-card.module.css";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  dictionary: Dictionary;
  index: number;
  projectNumber: string;
  onOpenLightbox?: (projectId: string, trigger: HTMLElement) => void;
}

interface ActivePreview {
  video: HTMLVideoElement;
  stop: () => void;
}

let activePreview: ActivePreview | null = null;

function resetVideo(video: HTMLVideoElement) {
  video.pause();
  try {
    video.currentTime = 0;
  } catch {
    // A source may not have loaded enough metadata to seek yet.
  }
}

function isExpectedPlaybackInterruption(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function reportPlaybackFailure(error: unknown, title: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`Preview playback failed for "${title}".`, error);
  }
}

export function ProjectCard({
  project,
  locale,
  dictionary,
  index,
  projectNumber,
  onOpenLightbox,
}: ProjectCardProps) {
  const title = project.title[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlaybackRef = useRef(false);
  const playbackAttemptRef = useRef(0);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const allowVideo = useVideoPlaybackPolicy(true);
  const [sourceRequested, setSourceRequested] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const previewSources = project.previewVideoSources;
  const hasPreview = Boolean(previewSources?.length);
  const platform = project.platform[locale];
  const role = project.role?.[locale];
  const hasDetails = Boolean(
    role || project.year || project.tools.length > 0,
  );
  const editorialLabel =
    project.featuredRank === 1
      ? dictionary.work.flagshipLabel
      : project.featuredRank === 2
        ? dictionary.work.majorLabel
        : project.featuredRank === 3
          ? dictionary.work.narrativeLabel
          : dictionary.work.supportingLabel;
  const layoutKind =
    project.featuredRank === 1
      ? "flagship"
      : project.featuredRank === 2
        ? "major"
        : project.featuredRank === 3
          ? "narrative"
          : project.orientation === "portrait"
            ? "supporting-portrait"
            : project.disclosure
              ? "supporting-study"
              : "supporting-editorial";
  const ProjectHeading =
    project.editorialClass === "supporting" ? "h4" : "h3";

  const cardClassName = [
    styles.card,
    project.featuredRank === 1 ? styles.flagship : "",
    project.featuredRank === 2 ? styles.major : "",
    project.featuredRank === 3 ? styles.narrative : "",
    project.editorialClass === "supporting" ? styles.supporting : "",
    project.editorialClass === "supporting" && !project.disclosure
      ? styles.supportingEditorial
      : "",
    project.disclosure ? styles.study : "",
    project.orientation === "portrait" ? styles.portrait : "",
  ]
    .filter(Boolean)
    .join(" ");

  const stopPreview = useCallback(() => {
    wantsPlaybackRef.current = false;
    playbackAttemptRef.current += 1;
    const video = videoRef.current;

    if (video) {
      resetVideo(video);
      if (activePreview?.video === video) {
        activePreview = null;
      }
    }

    setIsPlaying(false);
  }, []);

  const startPreview = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !allowVideo || videoFailed || !wantsPlaybackRef.current) {
      return;
    }

    if (activePreview && activePreview.video !== video) {
      const previous = activePreview;
      activePreview = null;
      previous.stop();
    }

    activePreview = { video, stop: stopPreview };
    const attempt = playbackAttemptRef.current + 1;
    playbackAttemptRef.current = attempt;

    try {
      await video.play();
      if (
        playbackAttemptRef.current !== attempt ||
        !wantsPlaybackRef.current ||
        activePreview?.video !== video
      ) {
        resetVideo(video);
      }
    } catch (error) {
      const isStale =
        playbackAttemptRef.current !== attempt ||
        !wantsPlaybackRef.current ||
        activePreview?.video !== video;

      if (isStale || isExpectedPlaybackInterruption(error)) {
        return;
      }

      setIsPlaying(false);
      if (activePreview?.video === video) {
        activePreview = null;
      }
      reportPlaybackFailure(error, title);
    }
  }, [allowVideo, stopPreview, title, videoFailed]);

  const requestPreview = useCallback(() => {
    if (!hasPreview || !allowVideo || videoFailed) {
      return;
    }

    const hadPlaybackIntent = wantsPlaybackRef.current;
    wantsPlaybackRef.current = true;
    if (!hadPlaybackIntent) {
      setIsPlaying(false);
    }
    if (!sourceRequested) {
      setSourceRequested(true);
      return;
    }

    void startPreview();
  }, [allowVideo, hasPreview, sourceRequested, startPreview, videoFailed]);

  const maintainPointerIntent = useCallback(
    (event: React.PointerEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };

      if (!wantsPlaybackRef.current) {
        requestPreview();
        return;
      }

      if (videoRef.current?.paused) {
        void startPreview();
      }
    },
    [requestPreview, startPreview],
  );

  const trackPointerEnter = useCallback(
    (event: React.PointerEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      requestPreview();
    },
    [requestPreview],
  );

  // `<source>` children are inert until the element is told to re-select one,
  // so the lazy mount that swaps them in has to be followed by `load()` —
  // unlike a plain `src` swap, which the browser picks up on its own.
  useEffect(() => {
    if (sourceRequested && allowVideo) {
      videoRef.current?.load();
    }
  }, [sourceRequested, allowVideo]);

  useEffect(() => {
    if (sourceRequested && wantsPlaybackRef.current) {
      void startPreview();
    }
  }, [sourceRequested, startPreview]);

  // The pointer stays put on screen while a wheel/trackpad scroll moves the
  // page beneath it, and neither triggers a native pointerleave — Chrome
  // only reconciles hover state once scrolling settles. Without this, a
  // preview that scrolled out from under a stationary cursor kept playing
  // until the browser caught up, which read as the hover state snapping
  // back once you stopped scrolling.
  useEffect(() => {
    const handleScroll = () => {
      if (!wantsPlaybackRef.current) {
        return;
      }

      const video = videoRef.current;
      const pointer = lastPointerRef.current;
      if (!video || !pointer) {
        return;
      }

      const bounds = video.getBoundingClientRect();
      const stillOver =
        pointer.x >= bounds.left &&
        pointer.x <= bounds.right &&
        pointer.y >= bounds.top &&
        pointer.y <= bounds.bottom;

      if (!stillOver) {
        stopPreview();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stopPreview]);

  useEffect(() => {
    if (!allowVideo) {
      wantsPlaybackRef.current = false;
      const video = videoRef.current;
      if (video) {
        resetVideo(video);
        if (activePreview?.video === video) {
          activePreview = null;
        }
      }
    }
  }, [allowVideo]);

  useEffect(() => {
    const stopWhenHidden = () => {
      if (document.hidden) {
        stopPreview();
      }
    };

    window.addEventListener("blur", stopPreview);
    document.addEventListener("visibilitychange", stopWhenHidden);

    return () => {
      window.removeEventListener("blur", stopPreview);
      document.removeEventListener("visibilitychange", stopWhenHidden);
      stopPreview();
    };
  }, [stopPreview]);

  const media = (
    <div
      className={styles.media}
      data-project-media
      data-poster-failed={posterFailed ? "true" : "false"}
    >
      <div className={styles.mediaVisual} data-project-media-visual>
        <span
          className={styles.posterFallback}
          aria-hidden={posterFailed ? undefined : true}
          role={posterFailed ? "img" : undefined}
          aria-label={posterFailed ? project.posterAlt[locale] : undefined}
        >
          <span>{projectNumber}</span>
          {dictionary.work.posterFallback}
        </span>
        <Image
          alt={posterFailed ? "" : project.posterAlt[locale]}
          src={project.posterPath}
          fill
          loading="lazy"
          sizes={
            project.featuredRank === 1
              ? "(max-width: 767px) 100vw, (max-width: 1199px) 92vw, 64vw"
              : project.editorialClass === "featured"
                ? "(max-width: 767px) 100vw, (max-width: 1199px) 92vw, 58vw"
                : "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          }
          onLoad={() => setPosterFailed(false)}
          onError={() => setPosterFailed(true)}
        />
        {hasPreview && !videoFailed ? (
          <video
            ref={videoRef}
            className={styles.previewVideo}
            data-playing={isPlaying && allowVideo}
            poster={project.posterPath}
            preload="metadata"
            muted
            playsInline
            loop
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => {
              const video = videoRef.current;
              if (
                video &&
                wantsPlaybackRef.current &&
                activePreview?.video === video
              ) {
                setIsPlaying(true);
              } else if (video) {
                resetVideo(video);
              }
            }}
            onCanPlay={() => {
              if (wantsPlaybackRef.current && videoRef.current?.paused) {
                void startPreview();
              }
            }}
            onPause={() => setIsPlaying(false)}
            onWaiting={() => setIsPlaying(false)}
            onStalled={() => setIsPlaying(false)}
            onError={() => {
              setVideoFailed(true);
              stopPreview();
            }}
          >
            {sourceRequested && allowVideo
              ? previewSources?.map((source) => (
                  <source
                    key={source.src}
                    src={source.src}
                    type={source.type}
                  />
                ))
              : null}
          </video>
        ) : null}
      </div>
    </div>
  );

  const body = (
    <div className={styles.body} data-project-body>
      <div className={styles.editorialMeta} data-project-meta>
        <span className={styles.projectNumber}>{projectNumber}</span>
        <span>{editorialLabel}</span>
      </div>
      <div className={styles.meta}>
        <span>{project.format[locale]}</span>
        <span aria-hidden="true">·</span>
        <span>{platform}</span>
      </div>
      <ProjectHeading id={`${project.id}-title`} data-project-title>
        {title}
      </ProjectHeading>
      <p data-project-description>{project.description[locale]}</p>

      {project.sourceTitle ? (
        <p className={styles.sourceTitle} data-project-source-title>
          <span>{dictionary.work.sourceTitleLabel}</span>
          <cite lang="tr">{project.sourceTitle}</cite>
        </p>
      ) : null}

      <div className={styles.contributions} data-project-contributions>
        <span>{dictionary.work.contributionLabel}</span>
        <ul>
          {project.contributions.map((contribution) => (
            <li key={contribution.en}>{contribution[locale]}</li>
          ))}
        </ul>
      </div>

      {hasDetails ? (
        <dl className={styles.details} data-project-details>
          {role ? (
            <>
              <dt>{dictionary.work.roleLabel}</dt>
              <dd>{role}</dd>
            </>
          ) : null}
          {project.year ? (
            <>
              <dt>{dictionary.work.yearLabel}</dt>
              <dd>{project.year}</dd>
            </>
          ) : null}
          {project.tools.length > 0 ? (
            <>
              <dt>{dictionary.work.toolsLabel}</dt>
              <dd>{project.tools.join(", ")}</dd>
            </>
          ) : null}
        </dl>
      ) : null}

      <div className={styles.tags} data-project-tags>
        {project.tags.map((tag) => (
          <span key={tag.en}>{tag[locale]}</span>
        ))}
      </div>

      {project.disclosure ? (
        <p className={styles.disclosure} data-project-disclosure>
          {project.disclosure[locale]}
        </p>
      ) : null}

    </div>
  );

  // One <article> for every card. The card used to become an <a> straight to
  // YouTube when it had an externalUrl, but the lightbox trigger has to be a
  // button and a button cannot live inside a link — so the whole card is now
  // the trigger and the YouTube link moved into the lightbox itself.
  return (
    <article
      className={cardClassName}
      aria-labelledby={`${project.id}-title`}
      data-project-card
      data-project-index={index}
      data-project-featured={project.featuredRank ? "true" : undefined}
      data-project-rank={project.featuredRank ?? undefined}
      data-project-layout={layoutKind}
      data-cursor-project={hasPreview ? "" : undefined}
      data-preview-policy={allowVideo ? "enabled" : "poster-only"}
      data-preview-source={sourceRequested ? "requested" : "idle"}
      onPointerEnter={trackPointerEnter}
      onPointerMove={maintainPointerIntent}
      onPointerLeave={stopPreview}
      onFocus={requestPreview}
      onBlur={stopPreview}
    >
      {media}
      {body}
      {hasPreview && onOpenLightbox ? (
        <button
          type="button"
          className={styles.trigger}
          aria-label={`${dictionary.work.lightboxOpen}: ${title}`}
          onClick={(event) => onOpenLightbox(project.id, event.currentTarget)}
        />
      ) : null}
    </article>
  );
}
