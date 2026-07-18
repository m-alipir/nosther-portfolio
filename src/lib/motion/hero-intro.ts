const LOCALE_SKIP_KEY = "nosther_skip_hero_intro";

let hasPlayedHeroIntro = false;

export function markHeroIntroLocaleTransition() {
  try {
    window.sessionStorage.setItem(LOCALE_SKIP_KEY, "true");
  } catch {
    // Storage can be unavailable in hardened browsing modes; navigation still works.
  }
}

export function consumeHeroIntroLocaleTransition() {
  try {
    const shouldSkip = window.sessionStorage.getItem(LOCALE_SKIP_KEY) === "true";
    window.sessionStorage.removeItem(LOCALE_SKIP_KEY);
    return shouldSkip;
  } catch {
    return false;
  }
}

export function hasHeroIntroPlayed() {
  return hasPlayedHeroIntro;
}

export function markHeroIntroPlayed() {
  hasPlayedHeroIntro = true;
}
