import type { Locale } from "@/content/types";
import {
  SEO_COPY,
  SITE_NAME,
  SITE_ORIGIN,
  SOCIAL_PROFILES,
} from "@/lib/seo/site";

interface StructuredDataProps {
  locale: Locale;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: SITE_ORIGIN,
        name: SITE_NAME,
        description: SEO_COPY[locale].description,
        inLanguage: ["en", "tr"],
      },
      {
        "@type": "Person",
        "@id": `${SITE_ORIGIN}/#person`,
        name: "Ali",
        jobTitle: "Video Editor",
        url: SITE_ORIGIN,
        sameAs: SOCIAL_PROFILES,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
