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

/* Shared by every YouTube upload — the pipeline is the same one for tutorials
   and entertainment episodes alike, so it lives in one place rather than
   being restated four times. */
const youtubeBreakdown = [
  {
    label: { en: "Pre-production", tr: "Hazırlık" },
    items: [
      {
        en: "Topic research and framing the angle the episode will take.",
        tr: "Konu araştırması ve bölümün hangi açıdan anlatılacağının belirlenmesi.",
      },
      {
        en: "Thumbnail designed in Photoshop before the shoot.",
        tr: "Çekim öncesinde Photoshop'ta küçük resim (thumbnail) tasarımı.",
      },
      {
        en: "Recording the session end to end — roughly 50 minutes of raw footage.",
        tr: "Oturumun baştan sona kaydı — kabaca 50 dakikalık ham görüntü.",
      },
    ],
  },
  {
    label: { en: "Editing — Premiere Pro", tr: "Kurgu — Premiere Pro" },
    items: [
      {
        en: "Passing over the full take and cutting every dead spot and pause out by hand.",
        tr: "Kaydın tamamının taranıp her ölü an ve duraklamanın elle kesilmesi.",
      },
      {
        en: "Tightening what is left with jump cuts, kept on a rhythm rather than cut flat.",
        tr: "Kalan bölümlerin jump cut'larla sıkılaştırılması; düz değil, bir ritim gözetilerek.",
      },
      {
        en: "Transitions between sections rather than hard cuts throughout.",
        tr: "Bölümler arasında düz kesme yerine geçiş efektleri kullanılması.",
      },
      {
        en: "Cutting in supporting visuals and memes where a point needs illustrating.",
        tr: "Bir noktanın görselleşmesi gerektiğinde destekleyici görsellerin ve mem'lerin yerleştirilmesi.",
      },
      {
        en: "Pulling a highlight from later in the episode and placing it in the first 15 seconds as the hook.",
        tr: "Bölümün ilerisinden bir highlight çıkarılıp ilk 15 saniyeye kanca olarak yerleştirilmesi.",
      },
      {
        en: "Around 50 minutes of raw footage resolved into a 15–25 minute cut, at roughly seven hours of edit time per episode.",
        tr: "Yaklaşık 50 dakikalık ham görüntünün 15–25 dakikalık kurguya indirilmesi; bölüm başına kabaca yedi saatlik kurgu süresi.",
      },
    ],
  },
  {
    label: { en: "Sound", tr: "Ses" },
    items: [
      {
        en: "Microphone and game audio recorded to separate tracks, so each is treated on its own terms.",
        tr: "Mikrofon ve oyun sesinin ayrı kanallara kaydedilmesi; böylece her biri kendi başına işlenebiliyor.",
      },
      {
        en: "EQ and denoise on the voice track.",
        tr: "Konuşma kanalında EQ ve gürültü azaltma (denoise).",
      },
      {
        en: "Background music chosen to sit under the edit without fighting the voice.",
        tr: "Konuşmayla yarışmayacak, kurgunun altına oturacak arka plan müziğinin seçilmesi.",
      },
    ],
  },
];

/* Both automotive pieces are the same exercise at two aspect ratios. */
const automotiveBreakdown = [
  {
    label: { en: "Footage & prep", tr: "Görüntü ve hazırlık" },
    items: [
      {
        en: "Sourcing third-party car footage and selecting the usable takes.",
        tr: "Üçüncü taraf araba görüntülerinin bulunması ve kullanılabilir çekimlerin seçilmesi.",
      },
      {
        en: "Stabilisation pass over the selected shots.",
        tr: "Seçilen planlar üzerinde stabilizasyon geçişi.",
      },
    ],
  },
  {
    label: {
      en: "Editing & effects — After Effects",
      tr: "Kurgu ve efektler — After Effects",
    },
    items: [
      {
        en: "Cutting the sequence to the track so every hit lands on the beat.",
        tr: "Sekansın müziğe göre kesilmesi; her vuruşun ritme oturması.",
      },
      {
        en: "Speed ramping shaped by hand on speed graphs rather than fixed-rate slow motion.",
        tr: "Sabit oranlı ağır çekim yerine speed graph'lar üzerinde elle şekillendirilen hız rampaları.",
      },
      {
        en: "Camera shake and impact effects timed to the same rhythm.",
        tr: "Kamera sarsıntısı ve darbe efektlerinin aynı ritme göre zamanlanması.",
      },
    ],
  },
];

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
    breakdown: youtubeBreakdown,
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
    tools: ["Adobe Premiere Pro 2026", "Adobe Photoshop"],
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
    breakdown: youtubeBreakdown,
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
    tools: ["Adobe Premiere Pro 2026", "Adobe Photoshop"],
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
    breakdown: youtubeBreakdown,
    disclosure: null,
    editorialClass: "featured",
    featuredRank: 3,
    format: { en: "Long-form Entertainment", tr: "Uzun Format Eğlence" },
    contributions: entertainmentContributions,
    platform: { en: "YouTube", tr: "YouTube" },
    role: entertainmentRole,
    sourceTitle: "Beamng'de Benzinsiz Yük Taşıdım (Çalıştım)",
    year: "2026",
    tools: ["Adobe Premiere Pro 2026", "Adobe Photoshop"],
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
    breakdown: youtubeBreakdown,
    disclosure: null,
    editorialClass: "supporting",
    featuredRank: null,
    format: { en: "Long-form Entertainment", tr: "Uzun Format Eğlence" },
    contributions: entertainmentContributions,
    platform: { en: "YouTube", tr: "YouTube" },
    role: entertainmentRole,
    sourceTitle: null,
    year: "2026",
    tools: ["Adobe Premiere Pro 2026", "Adobe Photoshop"],
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
    breakdown: automotiveBreakdown,
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
    breakdown: automotiveBreakdown,
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
  {
    id: "hero-motion-reel",
    title: {
      en: "Product Reveal Motion Reel",
      tr: "Ürün Tanıtım Hareketli Grafik Kurgusu",
    },
    description: {
      en: "A motion graphics piece opening on kinetic typography and resolving into a modelled product reveal.",
      tr: "Devinimli tipografiyle açılıp modellenmiş bir ürün tanıtımıyla sonuçlanan hareketli grafik çalışması.",
    },
    breakdown: [
      {
        label: { en: "Modelling — Blender", tr: "Modelleme — Blender" },
        items: [
          {
            en: "The mouse modelled from scratch, working from a tutorial as the starting point and diverging into a personalised design.",
            tr: "Farenin sıfırdan modellenmesi; bir eğitim videosu başlangıç noktası alınıp kişiselleştirilmiş bir tasarıma dönüştürülmesi.",
          },
        ],
      },
      {
        label: { en: "Scene planning", tr: "Sahne planlama" },
        items: [
          {
            en: "Every scene planned out in advance — what appears where, and in what order — before any animation was set.",
            tr: "Animasyona başlamadan önce her sahnenin önceden planlanması: neyin nerede, hangi sırayla görüneceği.",
          },
        ],
      },
      {
        label: {
          en: "Animation — After Effects",
          tr: "Animasyon — After Effects",
        },
        items: [
          {
            en: "Model animation, typography, and background treatment built out scene by scene.",
            tr: "Model animasyonu, tipografi ve arka plan çalışmasının sahne sahne kurulması.",
          },
          {
            en: "Built across several days; the longest-running piece here.",
            tr: "Birkaç güne yayılan bir çalışma; buradaki en uzun soluklu iş.",
          },
        ],
      },
      {
        label: { en: "Sound", tr: "Ses" },
        items: [
          {
            en: "Sound effects were designed for the piece, but the published cut is silent — no music or voice-over.",
            tr: "Çalışma için ses efektleri tasarlandı, ancak yayınlanan sürüm sessizdir — müzik veya seslendirme yoktur.",
          },
        ],
      },
    ],
    disclosure: {
      en: "Self-initiated concept piece; the product and brand name are invented for the study, not a commissioned campaign.",
      tr: "Bağımsız başlatılmış konsept çalışma; ürün ve marka adı bu çalışma için kurgulanmıştır, sipariş edilmiş bir kampanya değildir.",
    },
    editorialClass: "supporting",
    featuredRank: null,
    format: { en: "Motion Graphics", tr: "Hareketli Grafik" },
    contributions: [
      { en: "3D modelling", tr: "3B modelleme" },
      { en: "3D animation", tr: "3B animasyon" },
      { en: "Motion graphics", tr: "Hareketli grafik" },
      { en: "Editing", tr: "Kurgu" },
    ],
    platform: { en: "Personal Project", tr: "Kişisel Proje" },
    role: { en: "Full production", tr: "Tüm prodüksiyon" },
    sourceTitle: null,
    year: "2026",
    tools: ["Blender", "Adobe After Effects 2026"],
    tags: [{ en: "Supporting Work", tr: "Destekleyici İş" }],
    posterPath: "/media/hero/hero-reel-poster.webp",
    posterAlt: {
      en: "Motion graphics reel frame showing a soft blue gradient field behind kinetic typography.",
      tr: "Devinimli tipografinin arkasında yumuşak mavi gradyan alanı gösteren hareketli grafik kurgusu karesi.",
    },
    posterWidth: 1920,
    posterHeight: 800,
    previewVideoSources: previewVideoSources("/media/hero/hero-reel"),
    externalUrl: null,
    status: "ready",
    orientation: "landscape",
  },
];
