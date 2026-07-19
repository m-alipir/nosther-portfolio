"use client";

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
}: ProjectCardProps) {
  const title = project.title[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlaybackRef = useRef(false);
  const playbackAttemptRef = useRef(0);
  const allowVideo = useVideoPlaybackPolicy(true);
  const [sourceRequested, setSourceRequested] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasPreview = Boolean(project.previewVideoPath);
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

  const maintainPointerIntent = useCallback(() => {
    if (!wantsPlaybackRef.current) {
      requestPreview();
      return;
    }

    if (videoRef.current?.paused) {
      void startPreview();
    }
  }, [requestPreview, startPreview]);

  useEffect(() => {
    if (sourceRequested && wantsPlaybackRef.current) {
      void startPreview();
    }
  }, [sourceRequested, startPreview]);

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
            src={
              sourceRequested && allowVideo
                ? (project.previewVideoPath ?? undefined)
                : undefined
            }
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
          />
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

      {project.externalUrl ? (
        <span className={styles.action} data-project-action>
          {dictionary.work.externalAction}
          <span className="external-arrow" aria-hidden="true">
            ↗
          </span>
        </span>
      ) : null}
    </div>
  );

  if (project.externalUrl) {
    return (
      <a
        className={cardClassName}
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        data-project-card
        data-project-index={index}
        data-project-featured={project.featuredRank ? "true" : undefined}
        data-project-rank={project.featuredRank ?? undefined}
        data-project-layout={layoutKind}
        data-cursor-project
        data-preview-policy={allowVideo ? "enabled" : "poster-only"}
        data-preview-source={sourceRequested ? "requested" : "idle"}
        onPointerEnter={requestPreview}
        onPointerMove={maintainPointerIntent}
        onPointerLeave={stopPreview}
        onFocus={requestPreview}
        onBlur={stopPreview}
      >
        {media}
        {body}
      </a>
    );
  }

  return (
    <article
      className={cardClassName}
      aria-labelledby={`${project.id}-title`}
      tabIndex={hasPreview ? 0 : undefined}
      data-project-card
      data-project-index={index}
      data-project-featured={project.featuredRank ? "true" : undefined}
      data-project-rank={project.featuredRank ?? undefined}
      data-project-layout={layoutKind}
      data-preview-policy={allowVideo ? "enabled" : "poster-only"}
      data-preview-source={sourceRequested ? "requested" : "idle"}
      onPointerEnter={requestPreview}
      onPointerMove={maintainPointerIntent}
      onPointerLeave={stopPreview}
      onFocus={requestPreview}
      onBlur={stopPreview}
    >
      {media}
      {body}
    </article>
  );
}
