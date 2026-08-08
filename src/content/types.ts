export type Locale = "en" | "tr";

export type LocalizedText = Record<Locale, string>;

export type ProjectStatus = "ready";

export type ProjectEditorialClass = "featured" | "supporting";

/**
 * One encode per codec, listed in the order the browser should try them.
 * WebM/VP9 is the smaller encode and wins wherever it is supported; the
 * H.264 MP4 is the universal fallback (Safari, older iOS, embedded WebViews).
 */
export interface VideoSource {
  src: string;
  /** Full MIME + codecs string, so `canPlayType` can answer precisely. */
  type: string;
}

export interface Project {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  disclosure: LocalizedText | null;
  editorialClass: ProjectEditorialClass;
  featuredRank: 1 | 2 | 3 | null;
  format: LocalizedText;
  contributions: LocalizedText[];
  platform: LocalizedText;
  role: LocalizedText | null;
  sourceTitle: string | null;
  year: string | null;
  tools: string[];
  tags: LocalizedText[];
  posterPath: string;
  posterAlt: LocalizedText;
  posterWidth: number;
  posterHeight: number;
  previewVideoSources: VideoSource[] | null;
  externalUrl: string | null;
  status: ProjectStatus;
  orientation: "landscape" | "portrait";
}

export interface Service {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
}
