import type { Locale } from "@/content/types";

export interface Dictionary {
  localeName: string;
  skipLink: string;
  header: {
    secondary: string;
    menuOpen: string;
    menuClose: string;
    navLabel: string;
    nav: {
      work: string;
      services: string;
      notez: string;
      about: string;
      contact: string;
    };
    contactCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    workCta: string;
    contactCta: string;
    mediaLabel: string;
    mediaTitle: string;
    mediaDescription: string;
    scrollCue: string;
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    externalAction: string;
    roleLabel: string;
    yearLabel: string;
    toolsLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
  };
  notez: {
    eyebrow: string;
    status: string;
    title: string;
    body: string;
    action: string;
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    action: string;
    mediaLabel: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    emailAction: string;
    copyAction: string;
    copied: string;
  };
  cursor: {
    project: string;
    copy: string;
    copied: string;
  };
  footer: {
    identity: string;
    rights: string;
  };
}

const en: Dictionary = {
  localeName: "English",
  skipLink: "Skip to main content",
  header: {
    secondary: "Creator behind N0STHER",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    navLabel: "Primary navigation",
    nav: {
      work: "Work",
      services: "Services",
      notez: "NoteZ",
      about: "About",
      contact: "Contact",
    },
    contactCta: "Contact",
  },
  hero: {
    eyebrow: "Independent Video Editor",
    title: "VIDEO EDITING FOR CREATORS & BRANDS",
    lead:
      "Long-form stories, short-form cuts, and motion-led social content—edited with pace, clarity, and intent.",
    workCta: "View Work",
    contactCta: "Contact",
    mediaLabel: "Hero montage",
    mediaTitle: "Cinematic automotive edit",
    mediaDescription:
      "A cinematic automotive edit created from third-party footage, focused on pacing, motion, and music synchronization.",
    scrollCue: "Selected work below",
  },
  work: {
    eyebrow: "Selected Work",
    title: "Edits built to hold attention.",
    intro:
      "A selection of long-form YouTube work and automotive edits across vertical and horizontal formats.",
    externalAction: "Watch on YouTube",
    roleLabel: "Role",
    yearLabel: "Year",
    toolsLabel: "Tools",
  },
  services: {
    eyebrow: "Services",
    title: "Editing shaped around the platform and the story.",
  },
  notez: {
    eyebrow: "Tools & Experiments",
    status: "In Development",
    title: "NoteZ",
    body:
      "A personal, desktop-first productivity tool for capturing tasks, organizing them, and surfacing reminders. It is a work in progress and a small window into how I think about creative workflows.",
    action: "View on GitHub",
    imageAlt: "NoteZ productivity dashboard showing daily and weekly task progress.",
  },
  about: {
    eyebrow: "About",
    title: "ALI, creator behind N0STHER.",
    body:
      "I edit video for creators and digital brands. Gaming and automotive projects are part of my visual world, but the work is not limited to one category. I care about rhythm, clarity, and making every cut serve the idea.",
    action: "Visit N0STHER on YouTube",
    mediaLabel: "Portrait of ALI",
  },
  contact: {
    eyebrow: "Start a conversation",
    title: "Have something worth shaping? Let’s talk.",
    body:
      "For project inquiries, availability, and collaboration, email is the best place to start.",
    emailAction: "Email ALI",
    copyAction: "Copy email",
    copied: "Email copied",
  },
  cursor: {
    project: "VIEW",
    copy: "COPY",
    copied: "COPIED",
  },
  footer: {
    identity: "ALI — Creator behind N0STHER",
    rights: "All rights reserved.",
  },
};

const tr: Dictionary = {
  localeName: "Türkçe",
  skipLink: "Ana içeriğe geç",
  header: {
    secondary: "N0STHER’ın arkasındaki içerik üreticisi",
    menuOpen: "Navigasyonu aç",
    menuClose: "Navigasyonu kapat",
    navLabel: "Ana navigasyon",
    nav: {
      work: "İşler",
      services: "Hizmetler",
      notez: "NoteZ",
      about: "Hakkımda",
      contact: "İletişim",
    },
    contactCta: "İletişim",
  },
  hero: {
    eyebrow: "Bağımsız Video Editörü",
    title: "İÇERİK ÜRETİCİLERİ VE MARKALAR İÇİN VİDEO KURGU",
    lead:
      "Uzun anlatılar, kısa format videolar ve hareket odaklı sosyal içerikler—tempo, netlik ve amaç gözetilerek kurgulanır.",
    workCta: "İşleri Gör",
    contactCta: "İletişim",
    mediaLabel: "Hero montajı",
    mediaTitle: "Sinematik otomotiv editi",
    mediaDescription:
      "Üçüncü taraf görüntülerle hazırlanan; tempo, hareket ve müzik senkronuna odaklanan sinematik otomotiv editi.",
    scrollCue: "Seçili işler aşağıda",
  },
  work: {
    eyebrow: "Seçili İşler",
    title: "Dikkati korumak için kurgulanan işler.",
    intro:
      "Uzun format YouTube çalışmalarıyla dikey ve yatay formatlardaki otomotiv editlerinden bir seçki.",
    externalAction: "YouTube’da İzle",
    roleLabel: "Rol",
    yearLabel: "Yıl",
    toolsLabel: "Araçlar",
  },
  services: {
    eyebrow: "Hizmetler",
    title: "Platforma ve anlatıya göre şekillenen kurgu.",
  },
  notez: {
    eyebrow: "Araçlar ve Deneyler",
    status: "Geliştiriliyor",
    title: "NoteZ",
    body:
      "Görevleri hızlıca kaydetmek, düzenlemek ve hatırlatıcıları doğru zamanda öne çıkarmak için geliştirdiğim masaüstü odaklı kişisel productivity aracı. Henüz geliştirme aşamasında ve yaratıcı iş akışlarına nasıl yaklaştığıma dair küçük bir pencere sunuyor.",
    action: "GitHub’da Gör",
    imageAlt: "Günlük ve haftalık görev ilerlemesini gösteren NoteZ productivity dashboard’u.",
  },
  about: {
    eyebrow: "Hakkımda",
    title: "ALI, N0STHER’ın arkasındaki içerik üreticisi.",
    body:
      "İçerik üreticileri ve dijital markalar için video kurguluyorum. Gaming ve automotive projeler görsel dünyamın bir parçası; fakat çalışmalarım tek bir kategoriyle sınırlı değil. Ritime, netliğe ve her kesmenin fikre hizmet etmesine önem veriyorum.",
    action: "N0STHER YouTube kanalına git",
    mediaLabel: "ALI portresi",
  },
  contact: {
    eyebrow: "Bir konuşma başlatalım",
    title: "Şekillendirmeye değer bir fikrin mi var? Konuşalım.",
    body:
      "Proje talepleri, uygunluk ve iş birlikleri için en iyi başlangıç noktası e-posta.",
    emailAction: "ALI’ye E-posta Gönder",
    copyAction: "E-postayı kopyala",
    copied: "E-posta kopyalandı",
  },
  cursor: {
    project: "İNCELE",
    copy: "KOPYALA",
    copied: "KOPYALANDI",
  },
  footer: {
    identity: "ALI — N0STHER’ın arkasındaki içerik üreticisi",
    rights: "Tüm hakları saklıdır.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, tr };
