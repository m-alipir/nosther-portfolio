"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/content/types";
import { LocaleToggle } from "@/components/locale-toggle/locale-toggle";
import styles from "./site-header.module.css";

interface SiteHeaderProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function SiteHeader({ dictionary, locale }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const links = [
    { href: "#work", label: dictionary.header.nav.work },
    { href: "#services", label: dictionary.header.nav.services },
    { href: "#notez", label: dictionary.header.nav.notez },
    { href: "#about", label: dictionary.header.nav.about },
    { href: "#contact", label: dictionary.header.nav.contact },
  ];

  useEffect(() => {
    if (!isOpen || !menuRef.current) {
      return;
    }

    const menu = menuRef.current;
    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    );
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    focusable[0]?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#main-content" aria-label="ALI home">
          <strong>ALI</strong>
          <span>{dictionary.header.secondary}</span>
        </a>

        <nav
          className={styles.desktopNav}
          aria-label={dictionary.header.navLabel}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} data-link-interaction>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <LocaleToggle locale={locale} />
          <a className={styles.contactButton} href="#contact" data-magnetic>
            <span data-magnetic-content>{dictionary.header.contactCta}</span>
          </a>
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isOpen ? dictionary.header.menuClose : dictionary.header.menuOpen
            }
            onClick={() => setIsOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            ref={menuRef}
            id="mobile-navigation"
            className={styles.mobileNav}
            aria-label={dictionary.header.navLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className={styles.mobileLinks}>
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025, duration: 0.18 }}
                >
                  <span>0{index + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
