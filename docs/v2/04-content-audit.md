# Content audit

## Brand and positioning

The site consistently identifies `ALI` and “Creator behind N0STHER.” The primary positioning is independent video editing for creators and digital brands. Current service copy covers long-form YouTube work, short-form vertical content, motion graphics, titles, social cutdowns, and visual systems. Gaming and automotive appear as examples, although the current project set is dominated by those categories.

## Section inventory

| Section | Current content | Audit |
| --- | --- | --- |
| Header | ALI, creator-behind-N0STHER line, Work/Services/NoteZ/About/Contact, locale, CTA | Clear. Mobile behavior is accessible. The long TR secondary label needs visual line-break QA. |
| Hero | Independent Video Editor; creators/brands headline; long/short/motion lead; work/contact CTAs; automotive hero media | Positioning is broad, but the only visual proof is a temporary third-party-footage automotive edit. `media.ts` explicitly marks it temporary. |
| Selected Work | Four published N0STHER YouTube projects plus vertical/horizontal automotive personal edits | Real links/media exist. Portfolio range is narrower than the stated service range. |
| Services | Long-form, short-form, motion/social | Useful foundation, but tutorial/educational, audio cleanup, sound design, titles/VFX are not all explicit at list level. |
| NoteZ | In-development productivity experiment and GitHub link | Credible secondary experiment; currently receives a prominent full section. V2 should subordinate it to editing evidence. |
| About | ALI/N0STHER, broad positioning, rhythm/clarity philosophy, YouTube CTA | Clear and non-metric. Phase 4 approves `Logo-V2.png` as the future primary illustrated brand portrait; it is not a photograph. `Logo.png` remains secondary. |
| Contact | Verified-looking domain email, email copy, YouTube/GitHub/LinkedIn | Direct and useful. Destinations should be re-verified before release. |
| Footer | Identity, dynamic year, rights | Complete. |
| SEO | Localized titles/descriptions, OG copy, canonical/hreflang | Good bilingual base. “Brands” vs “digital brands” varies slightly but is not contradictory. |
| Structured data | WebSite and Person with name, job title, sameAs | Conservative. Person name casing (`Ali`) differs from brand casing (`ALI`); jobTitle is English for both locales. |

## Project-level findings

Four YouTube projects share the exact same generic description in each locale: “Published long-form work from the N0STHER YouTube channel.” This provides no project-specific evidence about the problem, edit decisions, format, duration, pacing, sound, motion, or result.

English localization gaps:

- All four YouTube titles remain Turkish in `title.en`.
- Gaming/Automotive tags remain English in TR; this may be intentional category language, but must be decided.
- TR NoteZ copy includes English product-language fragments such as “productivity” and “dashboard.”
- The fixed social-links aria label is English in both locales.
- Structured-data `jobTitle` is English for both locales.

Evidence gaps:

- No runtime/duration, editorial challenge, before/after, sequence excerpt, or project-specific contribution notes.
- No direct evidence for short-form creator/brand work beyond the personal automotive edit.
- No project evidence for tutorial/educational editing as a distinct capability, despite two tutorial-like YouTube titles.
- No project evidence for audio cleanup, sound design, motion graphics, titles, or VFX beyond role/tool labels.
- No client/commission classification; all visible linked work appears tied to N0STHER and personal projects.

## Claims and verification status

| Claim | Status | Required action |
| --- | --- | --- |
| Four named YouTube uploads and channel link | Externally linked and likely verifiable | Confirm ownership/contribution and retain URLs. |
| “Full Video Production, Recording, Editing & Sound Design” on four videos | Attributed in source but not independently evidenced by the site | Owner confirmation; add project-specific evidence where appropriate. |
| Adobe Premiere Pro 2026 / After Effects 2025 | Plausible source data | Confirm exact versions are useful and accurate; otherwise use durable tool names. |
| Project years 2025/2026 | Plausible source data | Verify against publication/source files. |
| Automotive edits use third-party footage | Explicitly disclosed | Preserve disclosure and record licensing/source status before V2 use. |
| NoteZ is in development with linked GitHub repository | Link provides evidence | Verify repository visibility and current status before release. |
| Editing for creators and digital brands | Positioning statement, not an outcome claim | Keep; do not add client/result implications without proof. |
| Metrics, client outcomes, testimonials | None present | Continue the no-invention rule. |

## Content priorities before visual implementation

1. Choose flagship projects and confirm ALI’s exact contribution.
2. Write project-specific TR/EN titles and descriptions; decide whether original Turkish video titles remain as subtitles.
3. Map each capability to real media evidence.
4. Confirm hero/showreel media licensing and the three coordinated sequence-stage crops.
5. Confirm the About portrait/identity asset and all contact/social destinations.
