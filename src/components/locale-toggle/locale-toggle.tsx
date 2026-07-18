"use client";

import { usePathname } from "next/navigation";

import type { Locale } from "@/content/types";
import { markHeroIntroLocaleTransition } from "@/lib/motion/hero-intro";
import styles from "./locale-toggle.module.css";

function persistLocalePreference(locale: Locale) {
  window.localStorage.setItem("nosther_locale", locale);
  document.cookie =
    "nosther_locale=" +
    locale +
    "; Path=/; Max-Age=31536000; SameSite=Lax";
}

export function LocaleToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className={styles.toggle} aria-label="Language selection">
      {(["en", "tr"] as Locale[]).map((option) => {
        const localizedPath = pathname.replace(
          /^\/(en|tr)(?=\/|$)/,
          "/" + option,
        );

        return (
          <a
            className={styles.option}
            data-active={locale === option}
            href={localizedPath}
            key={option}
            aria-current={locale === option ? "page" : undefined}
            aria-label={
              option === "en" ? "Switch to English" : "Türkçeye geç"
            }
            onClick={(event) => {
              if (option === locale) {
                event.preventDefault();
                return;
              }

              persistLocalePreference(option);
              markHeroIntroLocaleTransition();
              event.currentTarget.href = localizedPath + window.location.hash;
            }}
          >
            {option.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
