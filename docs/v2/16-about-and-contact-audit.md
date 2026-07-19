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

`public/media/portrait/Logo-V2.png` is the approved future primary N0STHER identity portrait / brand portrait. Visual inspection confirms a square blue illustrated N0STHER mark; it contains no photographic portrait of Ali and must not receive photographic semantics. Technical audit: PNG, 1024×1024, RGBA container, sampled alpha min/max 255 (fully opaque), 1,019,018 bytes / 0.972 MiB, SHA-256 `EC7FB3E1C0347EDE4A2FB81CE340D0713F3EE72CBA26E4CBE3705604F3A67BF1`.

The square composition is suitable for responsive About crops. Preserve the master PNG; for delivery, create responsive WebP/AVIF derivatives or use the existing optimized image pipeline because the source is heavy for repeated small displays. Do not unnecessarily rewrite the source. `public/media/portrait/Logo.png` remains an older secondary identity mark and must not be the main About visual. AI-generated and stock editor portraits remain prohibited.

Phase 4 registers and tracks `Logo-V2.png` only. About layout, copy, semantics, and media rendering remain deferred to Phase 5.

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
