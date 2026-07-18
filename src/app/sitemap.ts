import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_ORIGIN}/en`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_ORIGIN}/en`,
          tr: `${SITE_ORIGIN}/tr`,
          "x-default": `${SITE_ORIGIN}/en`,
        },
      },
    },
    {
      url: `${SITE_ORIGIN}/tr`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_ORIGIN}/en`,
          tr: `${SITE_ORIGIN}/tr`,
          "x-default": `${SITE_ORIGIN}/en`,
        },
      },
    },
  ];
}
