const LOCALE_SKIP_KEY = "nosther_skip_hero_intro";
const INTRO_PLAYED_KEY = "nosther_v2_hero_intro_played";

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
  if (hasPlayedHeroIntro) {
    return true;
  }

  try {
    return window.sessionStorage.getItem(INTRO_PLAYED_KEY) === "true";
  } catch {
    return false;
  }
}

export function markHeroIntroPlayed() {
  hasPlayedHeroIntro = true;
  try {
    window.sessionStorage.setItem(INTRO_PLAYED_KEY, "true");
  } catch {
    // In-memory state still prevents repeat intros when storage is unavailable.
  }
}
