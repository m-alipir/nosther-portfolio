import type { Service } from "@/content/types";

export const services: Service[] = [
  {
    id: "long-form",
    title: { en: "Long-form Video Editing", tr: "Uzun Video Kurgusu" },
    description: {
      en: "Narrative structure, pacing, clean assembly, and motion support for YouTube videos and creator-led formats.",
      tr: "YouTube videoları ve içerik üreticisi odaklı formatlar için anlatı yapısı, tempo, temiz kurgu ve motion desteği.",
    },
  },
  {
    id: "short-form",
    title: { en: "Short-form Content", tr: "Kısa Format İçerik" },
    description: {
      en: "Focused vertical edits for Shorts, Reels, and TikTok—built around a clear hook and concise progression.",
      tr: "Net bir açılış ve kısa, anlaşılır ilerleyiş etrafında kurgulanan Shorts, Reels ve TikTok videoları.",
    },
  },
  {
    id: "motion-social",
    title: { en: "Motion & Social Content", tr: "Motion ve Sosyal İçerik" },
    description: {
      en: "Motion graphics, titles, social cutdowns, and visual systems that extend a piece across digital channels.",
      tr: "Bir içeriği dijital kanallara taşıyan motion grafikler, başlıklar, sosyal medya versiyonları ve görsel sistemler.",
    },
  },
];
