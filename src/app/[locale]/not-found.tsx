import type { Metadata } from "next";
import Link from "next/link";

import styles from "../global-not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found | ALI",
  robots: { follow: false, index: false },
};

export default function LocaleNotFound() {
  return (
    <main className={styles.page}>
      <title>Page not found | ALI</title>
      <div className={styles.content}>
        <p className={styles.mark}>404 / Not found</p>
        <h1 className={styles.title}>Cut missing.</h1>
        <p className={styles.copy}>
          This page is not in the timeline. / Bu sayfa zaman çizelgesinde yok.
        </p>
        <div className={styles.actions}>
          <Link className={styles.link} href="/en">
            Back to English
          </Link>
          <Link className={styles.link} href="/tr">
            Türkçe ana sayfa
          </Link>
        </div>
      </div>
    </main>
  );
}
