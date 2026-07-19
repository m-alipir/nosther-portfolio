# About asset and contact audit

## Approved About direction

The initial V2 About is identity-led and uses no photography. A real portrait or workspace image is optional future enrichment, not a Phase 2 or Phase 3 blocker. The section must allow that image to be added later without a complete structural rewrite.

Approved evidence:

- video editor for creators and digital brands
- long-form and short-form editing
- self-produced YouTube work
- Adobe Premiere Pro and After Effects
- Turkish and English capability

No statistics, client implications, outcomes, awards, or availability claims may be invented.

`public/media/portrait/Logo.png` is a 1254×1254 N0STHER identity mark, not a portrait of Ali. It may remain a secondary identity asset and must not receive portrait semantics. AI-generated and stock editor portraits are prohibited.

## Contact and social status

| Destination | Status | Decision |
| --- | --- | --- |
| `https://nosther.site` | Required web DNS is not live. | Keep as canonical source value. Does not block Phase 2/3; blocks final Preview acceptance and launch. |
| `contact@nosther.site` | Required mail DNS/delivery is not verified. | Keep as public source value. Configure MX and test real send/receive before launch. |
| YouTube / GitHub / NoteZ | Public destinations returned HTTP 200 during Phase 1 audit. | Retain. |
| LinkedIn | Endpoint returned anti-automation status 999. | Retain repository URL; manually verify during Preview QA. |
| Four YouTube project URLs | Public destinations returned HTTP 200 and titles matched source records. | Retain. |

Before final Preview acceptance and production launch:

1. connect `nosther.site` to the deployment and verify the live origin;
2. configure MX and any required mail authentication records;
3. test incoming and outgoing delivery for `contact@nosther.site`;
4. recheck canonical, sitemap, structured data, and contact behavior against the live domain.

The Lovable screenshot's `hello@nosther.co`, generic handles, statistics, and booking/turnaround claims remain rejected placeholders.
