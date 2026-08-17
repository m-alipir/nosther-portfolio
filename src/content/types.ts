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

/**
 * One craft area of a project's process, as shown in the lightbox side rail.
 * `contributions` stays the short chip list on the card itself; this is the
 * long form — what was actually done in Premiere/After Effects/Audition and
 * why — so the two are deliberately separate fields rather than one reused
 * list at two lengths.
 *
 * Every line here must describe work that genuinely happened. No invented
 * durations, counts, clients, or outcomes (see docs/nosther-content-agent.md).
 */
export interface ProjectBreakdownGroup {
  /** Craft area, e.g. "Editing", "Sound", "Motion & VFX". */
  label: LocalizedText;
  /** Concrete steps taken, one per line. */
  items: LocalizedText[];
}

export interface Project {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  /**
   * Long-form process notes for the lightbox. `null` falls the side rail back
   * to `contributions`, so a project without a written breakdown still
   * renders rather than showing an empty panel.
   */
  breakdown: ProjectBreakdownGroup[] | null;
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
