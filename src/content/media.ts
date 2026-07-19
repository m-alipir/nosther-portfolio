export type HeroSequenceSurface = "dominant" | "cutaway" | "detail";

export interface HeroSequenceFrame {
  surface: HeroSequenceSurface;
  posterPath: string;
  posterWidth: number;
  posterHeight: number;
  sourceProjectId: string;
  sourcePreviewPath: string;
  sourceSeconds: number;
  sourceTimecode: string;
  crop: string;
}

export const heroSequenceMedia: Record<
  HeroSequenceSurface,
  HeroSequenceFrame
> = {
  dominant: {
    surface: "dominant",
    posterPath: "/media/hero/beamng-performance-wide.webp",
    posterWidth: 1280,
    posterHeight: 720,
    sourceProjectId: "youtube-w0ZkuiOucCo",
    sourcePreviewPath: "/media/projects/youtube-01-preview.mp4",
    sourceSeconds: 5.3,
    sourceTimecode: "00:00:05:07",
    crop: "Full 1280×720 source frame",
  },
  cutaway: {
    surface: "cutaway",
    posterPath: "/media/hero/assetto-setup-cutaway.webp",
    posterWidth: 480,
    posterHeight: 720,
    sourceProjectId: "youtube-q47Fa_4U9Q0",
    sourcePreviewPath: "/media/projects/youtube-02-preview.mp4",
    sourceSeconds: 13.7,
    sourceTimecode: "00:00:13:17",
    crop: "480×720 crop at x=400, y=0 from the 1280×720 source frame",
  },
  detail: {
    surface: "detail",
    posterPath: "/media/hero/beamng-cargo-detail.webp",
    posterWidth: 800,
    posterHeight: 600,
    sourceProjectId: "youtube-dnbg1JSiAQQ",
    sourcePreviewPath: "/media/projects/youtube-04-preview.mp4",
    sourceSeconds: 8.7,
    sourceTimecode: "00:00:08:17",
    crop: "960×720 crop at x=160, y=0, reduced to 800×600",
  },
};

export const heroSequencePreview = {
  videoPath: heroSequenceMedia.dominant.sourcePreviewPath,
  posterPath: heroSequenceMedia.dominant.posterPath,
} as const;
