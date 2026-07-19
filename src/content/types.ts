export type Locale = "en" | "tr";

export type LocalizedText = Record<Locale, string>;

export type ProjectStatus = "ready";

export type ProjectEditorialClass = "featured" | "supporting";

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
  previewVideoPath: string | null;
  externalUrl: string | null;
  status: ProjectStatus;
  orientation: "landscape" | "portrait";
}

export interface Service {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
}
