import "@fontsource-variable/archivo/index.css";
import "@fontsource-variable/instrument-sans/index.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@/app/globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
} from "@/lib/i18n/config";
import { SEO_COPY, SITE_NAME, SITE_ORIGIN } from "@/lib/seo/site";
import { AtmosphereDefs } from "@/components/atmosphere/atmosphere-defs";
import { ClientProviders } from "@/providers/client-providers";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = SEO_COPY[locale];

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: "/" + locale,
      languages: {
        en: "/en",
        tr: "/tr",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      title: copy.title,
      description: copy.description,
      url: "/" + locale,
      siteName: SITE_NAME,
      images: [
        {
          url: "/og.png",
          width: 1536,
          height: 1024,
          alt: copy.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [
        {
          url: "/og.png",
          alt: copy.ogAlt,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const resolvedLocale = isLocale(locale) ? locale : defaultLocale;
  const dictionary = getDictionary(resolvedLocale);

  return (
    <html lang={resolvedLocale} suppressHydrationWarning>
      <body>
        <AtmosphereDefs />
        <ClientProviders cursorLabels={dictionary.cursor}>{children}</ClientProviders>
      </body>
    </html>
  );
}
