import type { Locale } from "@/content/types";

export const SITE_ORIGIN = "https://nosther.site";
export const SITE_NAME = "ALI — Video Editor for Creators & Brands";

export const SEO_COPY: Record<
  Locale,
  { description: string; ogAlt: string; title: string }
> = {
  en: {
    title: "ALI — Video Editor for Creators & Brands",
    description:
      "Video editing for creators and digital brands, including long-form YouTube videos, short-form content, reels and motion-driven edits.",
    ogAlt: "ALI — Video Editing for Creators & Brands",
  },
  tr: {
    title: "ALI — İçerik Üreticileri ve Markalar İçin Video Editörü",
    description:
      "İçerik üreticileri ve dijital markalar için uzun YouTube videoları, kısa format içerikler, Reels ve motion odaklı video kurgu hizmetleri.",
    ogAlt: "ALI — İçerik Üreticileri ve Markalar İçin Video Editörü",
  },
};

export const SOCIAL_PROFILES = [
  "https://www.youtube.com/@n0stheryt",
  "https://github.com/m-alipir",
  "https://www.linkedin.com/in/muhammed-ali-pir-07012933a/",
] as const;

export function getLocaleUrl(locale: Locale) {
  return `${SITE_ORIGIN}/${locale}`;
}
