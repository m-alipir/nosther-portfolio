import { notFound } from "next/navigation";

import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { NotezFeature } from "@/components/notez-feature/notez-feature";
import { Phase2DMotion } from "@/components/phase-2d-motion/phase-2d-motion";
import { SelectedWork } from "@/components/selected-work/selected-work";
import { Services } from "@/components/services/services";
import { SiteHeader } from "@/components/site-header/site-header";
import { StructuredData } from "@/components/structured-data/structured-data";
import { getDictionary, isLocale } from "@/lib/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <>
      <StructuredData locale={locale} />
      <a className="skip-link" href="#main-content">
        {dictionary.skipLink}
      </a>
      <SiteHeader dictionary={dictionary} locale={locale} />
      <main id="main-content">
        <Hero dictionary={dictionary} />
        <SelectedWork dictionary={dictionary} locale={locale} />
        <Services dictionary={dictionary} locale={locale} />
        <NotezFeature dictionary={dictionary} />
        <About dictionary={dictionary} />
        <Phase2DMotion locale={locale} />
        <Contact dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}
