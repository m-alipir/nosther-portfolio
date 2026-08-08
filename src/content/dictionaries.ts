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
      about: string;
      contact: string;
    };
    contactCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleLines: string[];
    lead: string;
    workCta: string;
    contactCta: string;
    stage: {
      ariaLabel: string;
      roleLabel: string;
      editType: string;
      mediaAlt: string;
      disclosure: string;
      countdownLabel: string;
      countdownUnit: string;
    };
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
    sourceTitleLabel: string;
    contributionLabel: string;
    flagshipLabel: string;
    majorLabel: string;
    narrativeLabel: string;
    supportingLabel: string;
    supportingTitle: string;
    supportingIntro: string;
    posterFallback: string;
    carouselLabel: string;
    carouselPrev: string;
    carouselNext: string;
  };
  services: {
    eyebrow: string;
    title: string;
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
      about: "About",
      contact: "Contact",
    },
    contactCta: "Contact",
  },
  hero: {
    eyebrow: "Independent Video Editor",
    title: "STORIES SHAPED IN MOTION",
    titleLines: ["STORIES", "SHAPED IN", "MOTION."],
    lead:
      "Video editing for creators and digital brands—shaped through story, rhythm, and attention.",
    workCta: "View Work",
    contactCta: "Contact",
    stage: {
      ariaLabel: "Motion graphics showreel produced by ALI",
      roleLabel: "Produced by ALI",
      editType: "Motion Graphics · Full Production",
      mediaAlt:
        "Motion graphics reel opening with bold kinetic typography and closing on a computer mouse product reveal.",
      disclosure: "Independent motion graphics production.",
      countdownLabel: "Full reel in",
      countdownUnit: "s",
    },
    scrollCue: "Selected work below",
  },
  work: {
    eyebrow: "Selected Work",
    title: "Edits built to hold attention.",
    intro:
      "Self-produced long-form tutorials and entertainment work, supported by personal motion and visual-effects studies.",
    externalAction: "Watch on YouTube",
    roleLabel: "Role",
    yearLabel: "Year",
    toolsLabel: "Tools",
    sourceTitleLabel: "Original source title",
    contributionLabel: "Contribution",
    flagshipLabel: "Flagship project",
    majorLabel: "Major project",
    narrativeLabel: "Narrative project",
    supportingLabel: "Supporting work",
    supportingTitle: "More production and motion evidence.",
    supportingIntro:
      "A self-produced rally episode followed by smaller automotive editing and visual-effects studies.",
    posterFallback: "Project poster unavailable",
    carouselLabel: "Featured projects",
    carouselPrev: "Previous project",
    carouselNext: "Next project",
  },
  services: {
    eyebrow: "Services",
    title: "Editing shaped around the platform and the story.",
  },
  about: {
    eyebrow: "About",
    title: "ALI, creator behind N0STHER.",
    body:
      "I edit video for creators and digital brands. Gaming and automotive projects are part of my visual world, but the work is not limited to one category. I care about rhythm, clarity, and making every cut serve the idea.",
    action: "Visit N0STHER on YouTube",
    mediaLabel: "N0STHER logo",
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
      about: "Hakkımda",
      contact: "İletişim",
    },
    contactCta: "İletişim",
  },
  hero: {
    eyebrow: "Bağımsız Video Editörü",
    title: "HİKÂYELER HAREKETLE ŞEKİLLENİR",
    titleLines: ["HİKÂYELER", "HAREKETLE", "ŞEKİLLENİR."],
    lead:
      "İçerik üreticileri ve dijital markalar için; anlatı, ritim ve dikkat odağında video kurgu.",
    workCta: "İşleri Gör",
    contactCta: "İletişim",
    stage: {
      ariaLabel: "ALI tarafından üretilen hareketli grafik showreel’i",
      roleLabel: "ALI tarafından üretildi",
      editType: "Hareketli Grafik · Tam Prodüksiyon",
      mediaAlt:
        "Cesur devinimli tipografiyle açılan ve bir bilgisayar faresi ürün tanıtımıyla kapanan hareketli grafik kurgusu.",
      disclosure: "Bağımsız hareketli grafik prodüksiyonu.",
      countdownLabel: "Tam kayda",
      countdownUnit: "sn",
    },
    scrollCue: "Seçili işler aşağıda",
  },
  work: {
    eyebrow: "Seçili İşler",
    title: "Dikkati korumak için\nkurgulanan işler.",
    intro:
      "Bağımsız üretilmiş uzun format rehberler ve eğlence içerikleri; kişisel hareketli grafik ve görsel efekt çalışmalarıyla destekleniyor.",
    externalAction: "YouTube’da İzle",
    roleLabel: "Rol",
    yearLabel: "Yıl",
    toolsLabel: "Araçlar",
    sourceTitleLabel: "Orijinal kaynak başlığı",
    contributionLabel: "Katkı",
    flagshipLabel: "Amiral proje",
    majorLabel: "Öne çıkan proje",
    narrativeLabel: "Anlatı projesi",
    supportingLabel: "Destekleyici işler",
    supportingTitle: "Ek prodüksiyon ve hareketli grafik kanıtları.",
    supportingIntro:
      "Bağımsız üretilmiş bir rally bölümü ve ardından daha küçük otomotiv kurgu ve görsel efekt çalışmaları.",
    posterFallback: "Proje posteri kullanılamıyor",
    carouselLabel: "Öne çıkan projeler",
    carouselPrev: "Önceki proje",
    carouselNext: "Sonraki proje",
  },
  services: {
    eyebrow: "Hizmetler",
    title: "Platforma ve anlatıya göre şekillenen kurgu.",
  },
  about: {
    eyebrow: "Hakkımda",
    title: "ALI, N0STHER’ın arkasındaki içerik üreticisi.",
    body:
      "İçerik üreticileri ve dijital markalar için video kurguluyorum. Gaming ve automotive projeler görsel dünyamın bir parçası; fakat çalışmalarım tek bir kategoriyle sınırlı değil. Ritime, netliğe ve her kesmenin fikre hizmet etmesine önem veriyorum.",
    action: "N0STHER YouTube kanalına git",
    mediaLabel: "N0STHER logosu",
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
