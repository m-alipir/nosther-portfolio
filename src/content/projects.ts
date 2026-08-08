import { previewVideoSources } from "@/content/media";
import type { Project } from "@/content/types";

const tutorialRole = {
  en: "Full production & editing",
  tr: "Tüm prodüksiyon ve kurgu",
};

const entertainmentRole = {
  en: "Full production & editing",
  tr: "Tüm prodüksiyon ve kurgu",
};

const automotiveRole = {
  en: "Editing & Visual Effects",
  tr: "Kurgu ve Görsel Efektler",
};

const tutorialContributions = [
  { en: "Full video production", tr: "Tüm video prodüksiyonu" },
  { en: "Recording", tr: "Kayıt" },
  { en: "Screen & game capture", tr: "Ekran ve oyun kaydı" },
  { en: "Editing", tr: "Kurgu" },
  { en: "Tutorial structure", tr: "Rehber yapısı" },
  { en: "Captions & callouts", tr: "Altyazılar ve açıklamalar" },
];

const entertainmentContributions = [
  { en: "Full video production", tr: "Tüm video prodüksiyonu" },
  { en: "Recording", tr: "Kayıt" },
  { en: "Game capture", tr: "Oyun kaydı" },
  { en: "Editing", tr: "Kurgu" },
  { en: "Captions & callouts", tr: "Altyazılar ve açıklamalar" },
];

const automotiveContributions = [
  { en: "Editing", tr: "Kurgu" },
  { en: "Visual effects", tr: "Görsel efektler" },
];

const automotiveDisclosure = {
  en: "Edited using third-party footage; editing and visual effects by Ali.",
  tr: "Üçüncü taraf görüntüler kullanılarak kurgulandı; kurgu ve görsel efektler Ali tarafından hazırlandı.",
};

export const projects: Project[] = [
  {
    id: "youtube-q47Fa_4U9Q0",
    title: {
      en: "Assetto Corsa Content Manager & Mod Setup Guide",
      tr: "Assetto Corsa Content Manager ve Mod Kurulum Rehberi",
    },
    description: {
      en: "A structured long-form guide moving from desktop setup and Content Manager configuration to clear in-game verification.",
      tr: "Masaüstü kurulumu ve Content Manager yapılandırmasını anlaşılır oyun içi kontrollerle birleştiren yapılandırılmış uzun format rehber.",
    },
    disclosure: null,
    editorialClass: "featured",
    featuredRank: 1,
    format: { en: "Long-form Tutorial", tr: "Uzun Format Rehber" },
    contributions: tutorialContributions,
    platform: { en: "YouTube", tr: "YouTube" },
    role: tutorialRole,
    sourceTitle:
      "Assetto Corsa Detaylı Content Manager ve Mod Kurulum Rehberi | Güncel 2026 |",
    year: "2026",
    tools: ["Adobe Premiere Pro 2026"],
    tags: [{ en: "Tutorial", tr: "Rehber" }],
    posterPath: "/media/projects/youtube-02-poster.webp",
    posterAlt: {
      en: "Assetto Corsa Content Manager setup guide showing the recorded desktop workflow and in-game verification.",
      tr: "Kaydedilmiş masaüstü iş akışını ve oyun içi kontrolü gösteren Assetto Corsa Content Manager kurulum rehberi.",
    },
    posterWidth: 1280,
    posterHeight: 720,
    previewVideoSources: previewVideoSources(
      "/media/projects/youtube-02-preview",
    ),
    externalUrl: "https://www.youtube.com/watch?v=q47Fa_4U9Q0",
    status: "ready",
    orientation: "landscape",
  },
  {
    id: "youtube-w0ZkuiOucCo",
    title: {
      en: "BeamNG Performance Settings Guide",
      tr: "BeamNG Performans ve FPS Ayarları Rehberi",
    },
    description: {
      en: "A performance-focused tutorial using settings capture, side-by-side comparisons, and gameplay evidence to keep technical choices clear.",
      tr: "Teknik tercihleri anlaşılır kılmak için ayar kayıtlarını, yan yana karşılaştırmaları ve oynanış kanıtını kullanan performans odaklı rehber.",
    },
    disclosure: null,
    editorialClass: "featured",
    featuredRank: 2,
    format: { en: "Long-form Tutorial", tr: "Uzun Format Rehber" },
    contributions: [
      ...tutorialContributions,
      { en: "Comparison graphics", tr: "Karşılaştırma grafikleri" },
    ],
    platform: { en: "YouTube", tr: "YouTube" },
    role: tutorialRole,
    sourceTitle:
      "Beamng En iyi FPS Ayarları | Ayarlar, Tavsiyeler ve Açıklamalar | Güncel 2026 |",
    year: "2026",
    tools: ["Adobe Premiere Pro 2026"],
    tags: [{ en: "Tutorial", tr: "Rehber" }],
    posterPath: "/media/projects/youtube-01-poster.webp",
    posterAlt: {
      en: "BeamNG settings guide with recorded performance comparisons, FPS labels, and gameplay evidence.",
      tr: "Kaydedilmiş performans karşılaştırmaları, FPS etiketleri ve oynanış kanıtı içeren BeamNG ayar rehberi.",
    },
    posterWidth: 1280,
    posterHeight: 720,
    previewVideoSources: previewVideoSources(
      "/media/projects/youtube-01-preview",
    ),
    externalUrl: "https://www.youtube.com/watch?v=w0ZkuiOucCo",
    status: "ready",
    orientation: "landscape",
  },
  {
    id: "youtube-dnbg1JSiAQQ",
    title: {
      en: "BeamNG Cargo Run Without Fuel",
      tr: "BeamNG'de Benzinsiz Yük Taşıdım",
    },
    description: {
      en: "A self-produced entertainment edit shaped through multi-view game capture, captions, callouts, and narrative pacing.",
      tr: "Farklı açılardan oyun kaydı, altyazılar, açıklamalar ve anlatı temposuyla şekillenen, bağımsız üretilmiş eğlence videosu.",
    },
    disclosure: null,
    editorialClass: "featured",
    featuredRank: 3,
    format: { en: "Long-form Entertainment", tr: "Uzun Format Eğlence" },
    contributions: entertainmentContributions,
    platform: { en: "YouTube", tr: "YouTube" },
    role: entertainmentRole,
    sourceTitle: "Beamng'de Benzinsiz Yük Taşıdım (Çalıştım)",
    year: "2026",
    tools: ["Adobe Premiere Pro 2026"],
    tags: [{ en: "Entertainment", tr: "Eğlence" }],
    posterPath: "/media/projects/youtube-04-poster.webp",
    posterAlt: {
      en: "BeamNG cargo-run episode showing a recorded gameplay beat from the long-form narrative.",
      tr: "Uzun format anlatıdan kaydedilmiş bir oynanış anını gösteren BeamNG yük taşıma bölümü.",
    },
    posterWidth: 1280,
    posterHeight: 720,
    previewVideoSources: previewVideoSources(
      "/media/projects/youtube-04-preview",
    ),
    externalUrl: "https://www.youtube.com/watch?v=dnbg1JSiAQQ",
    status: "ready",
    orientation: "landscape",
  },
  {
    id: "youtube-FzZYNCiZrNg",
    title: {
      en: "Why Does This Car Handle Like This? | AC Rally #3",
      tr: "Bu Araba Neden Böyle? | AC Rally #3",
    },
    description: {
      en: "A self-produced rally episode built from game capture, summary framing, captions, and gameplay pacing.",
      tr: "Oyun kaydı, özet kurgusu, altyazılar ve oynanış temposuyla hazırlanan bağımsız rally bölümü.",
    },
    disclosure: null,
    editorialClass: "supporting",
    featuredRank: null,
    format: { en: "Long-form Entertainment", tr: "Uzun Format Eğlence" },
    contributions: entertainmentContributions,
    platform: { en: "YouTube", tr: "YouTube" },
    role: entertainmentRole,
    sourceTitle: null,
    year: "2026",
    tools: ["Adobe Premiere Pro 2026"],
    tags: [{ en: "Entertainment", tr: "Eğlence" }],
    posterPath: "/media/projects/youtube-03-poster.webp",
    posterAlt: {
      en: "Assetto Corsa rally episode poster showing a recorded off-road gameplay sequence.",
      tr: "Kaydedilmiş arazi oynanış sekansını gösteren Assetto Corsa rally bölümü posteri.",
    },
    posterWidth: 1280,
    posterHeight: 720,
    previewVideoSources: previewVideoSources(
      "/media/projects/youtube-03-preview",
    ),
    externalUrl: "https://www.youtube.com/watch?v=FzZYNCiZrNg",
    status: "ready",
    orientation: "landscape",
  },
  {
    id: "automotive-vertical",
    title: { en: "Vertical Automotive Motion Edit", tr: "Dikey Otomotiv Kurgusu" },
    description: {
      en: "A fast-paced short-form study of rhythm, transitions, and visual effects.",
      tr: "Ritim, geçişler ve görsel efektlere odaklanan hızlı tempolu kısa format çalışma.",
    },
    disclosure: automotiveDisclosure,
    editorialClass: "supporting",
    featuredRank: null,
    format: { en: "Short-form", tr: "Kısa Format" },
    contributions: automotiveContributions,
    platform: { en: "Personal Project", tr: "Kişisel Proje" },
    role: automotiveRole,
    sourceTitle: null,
    year: "2025",
    tools: ["Adobe After Effects 2025"],
    tags: [{ en: "Supporting Work", tr: "Destekleyici İş" }],
    posterPath: "/media/automotive/automotive-vertical-poster.webp",
    posterAlt: {
      en: "Vertical automotive motion edit with a third-party car shot and particle effects.",
      tr: "Üçüncü taraf otomobil görüntüsü ve parçacık efektleri içeren dikey otomotiv kurgusu.",
    },
    posterWidth: 720,
    posterHeight: 1280,
    previewVideoSources: previewVideoSources(
      "/media/automotive/automotive-vertical-preview",
    ),
    externalUrl: null,
    status: "ready",
    orientation: "portrait",
  },
  {
    id: "automotive-horizontal",
    title: { en: "Cinematic Automotive Motion Edit", tr: "Sinematik Otomotiv Kurgusu" },
    description: {
      en: "A cinematic pacing and visual-effects study built around shot scale, motion, and stylized transitions.",
      tr: "Plan ölçeği, hareket ve stilize geçişler etrafında kurulan sinematik tempo ve görsel efekt çalışması.",
    },
    disclosure: automotiveDisclosure,
    editorialClass: "supporting",
    featuredRank: null,
    format: { en: "Motion & Social", tr: "Hareketli Grafik ve Sosyal" },
    contributions: automotiveContributions,
    platform: { en: "Personal Project", tr: "Kişisel Proje" },
    role: automotiveRole,
    sourceTitle: null,
    year: "2025",
    tools: ["Adobe After Effects 2025"],
    tags: [{ en: "Supporting Work", tr: "Destekleyici İş" }],
    posterPath: "/media/automotive/automotive-horizontal-poster.webp",
    posterAlt: {
      en: "Cinematic automotive motion edit with a third-party close-up and stylized visual effects.",
      tr: "Üçüncü taraf yakın plan otomobil görüntüsü ve stilize görsel efektler içeren sinematik otomotiv kurgusu.",
    },
    posterWidth: 1280,
    posterHeight: 546,
    previewVideoSources: previewVideoSources(
      "/media/automotive/automotive-horizontal-preview",
    ),
    externalUrl: null,
    status: "ready",
    orientation: "landscape",
  },
];
