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

export function ProjectCard({
  project,
  locale,
  dictionary,
  index,
}: ProjectCardProps) {
  const title = project.title[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlaybackRef = useRef(false);
  const allowVideo = useVideoPlaybackPolicy(true);
  const [sourceRequested, setSourceRequested] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasPreview = Boolean(project.previewVideoPath);
  const platform = project.platform[locale];
  const role = project.role?.[locale];
  const hasDetails = Boolean(
    role || project.year || project.tools.length > 0,
  );

  const cardClassName = [
    styles.card,
    index === 0 ? styles.featured : "",
    index === 3 ? styles.landscapeLead : "",
    project.orientation === "portrait" ? styles.portrait : "",
    index === 5 ? styles.wide : "",
  ]
    .filter(Boolean)
    .join(" ");

  const stopPreview = useCallback(() => {
    wantsPlaybackRef.current = false;
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
    resetVideo(video);

    try {
      await video.play();
      if (!wantsPlaybackRef.current) {
        resetVideo(video);
      }
    } catch {
      if (wantsPlaybackRef.current) {
        setVideoFailed(true);
      }
      stopPreview();
    }
  }, [allowVideo, stopPreview, videoFailed]);

  const requestPreview = useCallback(() => {
    if (!hasPreview || !allowVideo || videoFailed) {
      return;
    }

    wantsPlaybackRef.current = true;
    if (!sourceRequested) {
      setSourceRequested(true);
      return;
    }

    void startPreview();
  }, [allowVideo, hasPreview, sourceRequested, startPreview, videoFailed]);

  const maintainPointerIntent = useCallback(() => {
    if (!wantsPlaybackRef.current) {
      requestPreview();
    }
  }, [requestPreview]);

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
    <div className={styles.media} data-project-media>
      <div className={styles.mediaVisual} data-project-media-visual>
        <Image
          alt=""
          src={project.posterPath}
          fill
          loading={index === 0 ? "eager" : "lazy"}
          sizes={
            index === 0
              ? "(max-width: 768px) 100vw, 85vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
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
              if (wantsPlaybackRef.current) {
                setIsPlaying(true);
              }
            }}
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
      <div className={styles.meta} data-project-meta>
        <span>{project.format[locale]}</span>
        <span>{platform}</span>
      </div>
      <h3 data-project-title>{title}</h3>
      <p data-project-description>{project.description[locale]}</p>

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
        data-project-featured={index === 0 ? "true" : undefined}
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
      aria-label={title}
      data-project-card
      data-project-index={index}
      data-project-featured={index === 0 ? "true" : undefined}
      data-preview-policy={allowVideo ? "enabled" : "poster-only"}
      data-preview-source={sourceRequested ? "requested" : "idle"}
      onPointerEnter={requestPreview}
      onPointerMove={maintainPointerIntent}
      onPointerLeave={stopPreview}
    >
      {media}
      {body}
    </article>
  );
}
