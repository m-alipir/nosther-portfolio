export type Locale = "en" | "tr";

export type LocalizedText = Record<Locale, string>;

export type ProjectStatus = "ready";

export interface Project {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  format: LocalizedText;
  platform: LocalizedText;
  role: LocalizedText | null;
  year: string | null;
  tools: string[];
  tags: LocalizedText[];
  posterPath: string;
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
