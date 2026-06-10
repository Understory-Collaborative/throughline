# THE INTELLIGENT HOODLUMS — DESIGN SYSTEM
**Brand Kit Vol.01 · LV · EST 2014 · NV**
*Last touched: April 2026*

---

## WHAT THIS IS

This is the working design system for **The Intelligent Hoodlums** — an instructional design and learning consultancy founded in 2014 by Mike Lang & Webs in Las Vegas, Nevada.

**Tagline:** When in Doubt, Trust a Hoodlum.
**Mission:** Design instruction. Disrupt the consultant-industrial complex. Deliver work that holds up under fluorescent lights.
**Pillars:** Design · Disrupt · Deliver

---

## SOURCE MATERIALS

| Asset | Path | Notes |
|---|---|---|
| Logo (primary badge) | `uploads/UpdatedHoodlumsLOGO.png` | PNG w/ transparency, 1902×1919 |
| Font: Avocado Sans Bold | `uploads/Avocado Sans Bold.otf` | Display / Splash role |
| Font: Avocado Sans Regular | `uploads/Avocado Sans Regular.otf` | Body role |
| Font: Avocado Sans Thin | `uploads/Avocado Sans Thin.otf` | Mono / Crew Talk role |
| Brand Kit PDF | `uploads/Hoodlums-Brand-Kit-Vol01.pdf` | 15-page brand worksheet, Vol.01 Issue 001 |

> The brand kit PDF is a working document ("not a finished guide"). Every decision has a number on it.
> Avocado Sans is by saltandpepperdesigns. **No Condensed or Expanded variant was supplied** — see font substitution note in VISUAL FOUNDATIONS.

---

## FILE INDEX

```
README.md                    ← This file
colors_and_type.css          ← CSS vars: palette, type scale, semantic tokens, page kit modules
SKILL.md                     ← Agent skill definition for Claude Code use

assets/
  HM-badge-full.png          ← Primary badge logo (transparent PNG)

fonts/
  AvocadoSans-Bold.otf
  AvocadoSans-Regular.otf
  AvocadoSans-Thin.otf

preview/
  colors-brand.html          ← Brand palette swatches
  colors-semantic.html       ← Semantic color mapping
  type-display.html          ← Display / Splash type specimens
  type-body.html             ← Body + Mono type specimens
  type-scale.html            ← Full type scale
  spacing-tokens.html        ← Spacing + radius + shadow tokens
  page-masthead.html         ← Masthead module
  page-title-plate.html      ← Title Plate + Caption Strip modules
  page-splash.html           ← Splash Panel module
  page-credits.html          ← Credits Box module
  components-badge.html      ← Badge / logo lockups
  components-buttons.html    ← Button system
  components-cards.html      ← Card components

ui_kits/
  brand/
    README.md
    index.html               ← Brand/consulting UI kit
    Header.jsx
    Hero.jsx
    PillarCards.jsx
    CaseStudy.jsx
    Footer.jsx
```

---

## CONTENT FUNDAMENTALS

### Voice: Three Registers

**01 · Director's Commentary**
*When to use:* Covers, hero pages, manifesto, social bios, business cards, swag.
*Sounds like:* Christopher Nolan writing a school improvement plan.
*Example:* "When in doubt, trust a Hoodlum."

**02 · Producer's Notes**
*When to use:* Case studies, proposals, decks, invoices, pitch one-pagers.
*Sounds like:* Agatha Christie laying out the case. Dry, specific, structural.
*Example:* "Design. Disrupt. Deliver."

**03 · Crew Talk**
*When to use:* Captions, footnotes, asides, sidebars. Always Mono type.
*Sounds like:* Liner notes on a Nas record.
*Example:* "PSA: if it can't survive a Tuesday, it's not a strategy."

### The Bars (Writing Rules)

1. **Lead with the verb.** Open with action: design, disrupt, deliver, build, ship. Never "we believe that perhaps…"
2. **Specifics over slogans.** "Six teachers. Three weeks." beats "transformative impact." No "world-class," "best-in-breed," "cutting-edge."
3. **Name the enemy.** Call out the CFL playbook when relevant. Don't punch down — teachers are not the problem.
4. **Cite the bars.** Use lyrics, film lines, book quotes as openers — but only if they're doing structural work. Ornamental quotes get cut.
5. **Finish on the hook.** Every page ends with a call-back line, a question, or a pivot. "In conclusion" is forbidden.
6. **Keep the badge clean.** Logo on Prussian, Bone, or Ink only. No drop shadows, no gradients, no rotation past ±4°.

### Tone & Copy Rules

- **Casing:** Title case for headings; sentence case for body. ALL CAPS for Splash/Masthead roles only.
- **Pronouns:** First person plural (we/our) in manifesto; second person (you) in directed copy. Never "I" in brand voice.
- **Emoji:** Never. Not part of the visual vocabulary.
- **Punctuation:** Em dashes, centered dots (·), and period-terminated fragments ("Design. Disrupt. Deliver.") are characteristic.
- **Forbidden phrases:** "world-class," "best-in-breed," "in conclusion," "to summarize," "we believe that perhaps," "cutting-edge," "transformative impact."
- **Signature phrases:** "When in doubt, trust a Hoodlum." / "If it can't survive a Tuesday, it's not a strategy." / "Design. Disrupt. Deliver."

---

## VISUAL FOUNDATIONS

### Colors

Six-color system. Default ratio 60/25/10/3/2:

| Token | Name | Hex | Role |
|---|---|---|---|
| HM-01 | Prussian Blue | `#0B2545` | Primary, authority, large fills |
| HM-02 | Rufous | `#B7280F` | Accent/alert — use sparingly (3%) |
| HM-03 | Tuscany | `#E0A458` | Crew marker, callout dots, labels |
| HM-04 | Bone Ivory | `#F2E8D5` | Paper — default background (60%) |
| HM-05 | Cadet Blue | `#8CA3B5` | Charts, mid-tone support |
| HM-06 | Ink | `#0F1419` | Type, rules, deep black |

- **Background default:** Bone Ivory — the "paper" surface.
- **Dark backgrounds:** Prussian Blue (authority) or Ink (maximum contrast/drama).
- No gradients. No gradient meshes. Flat color only.

### Typography

**One family: Avocado Sans. Five roles.**

| Role | Weight | Usage | Tracking |
|---|---|---|---|
| Display | Bold (700) | Headlines, title plates, pull quotes | +10–20/1000 |
| Splash | Bold (700) | Masthead, cover wordmark — ALL CAPS only | +40–80/1000 |
| Condensed | Regular (400)* | Section labels, taglines, credits | +60–120/1000 |
| Body | Regular (400) | Running text — 16–18px screen, 9–11pt print | leading 1.55–1.65 |
| Mono | Thin (100) | Captions, footnotes, Crew Talk | +0–20/1000 |

*Condensed variant not supplied — Regular at wide tracking is the stand-in. **Request Condensed OTF.**

- **No fallback serif.** Avocado Sans only. If unavailable, use a grotesque (not humanist, not geometric).
- The badge wordmark is a sealed mark — do not rebuild in Avocado Sans.

### Backgrounds & Texture

- **Default:** Bone Ivory `#F2E8D5` — warm paper feel.
- **Texture overlays:** Halftone field (ben-day dots), scanline overlay, kraft grain at 30–60% opacity.
- **Pattern tiles** (to be built): HM-tile-halftone.svg, HM-tile-benday.svg, HM-tile-scanline.svg, HM-tile-kraft.svg.
- **Full-bleed:** Ink `#0F1419` for Splash Panels. Prussian `#0B2545` for Masthead bands.
- **Photography style:** Classroom-first. Real rooms, real teachers, fluorescent light — unforgiving, honest. No stock smiles.
- **Illustration style:** Halftone fields, ben-day dots, comic-book grit on Bone. Badge is always the visual anchor.

### Layout & Grid

- **Page Kit modules** (mix-and-match grammar of every page):
  1. **Masthead** — full-width Prussian band, Bone type, vol/issue/LV·NV
  2. **Splash Panel** — full-bleed Ink, center skull or full badge, Director's tagline Bold
  3. **Caption Strip** — Bone field, Mono (Thin), Tuscany label, Ink value
  4. **Title Plate** — Condensed chapter tag + Bold title + Rufous rule
  5. **Credits Box** — Mono only, Tuscany labels, Bone values, left-aligned
  6. **Halftone Field** — ben-day tile at 30–60% opacity over Bone or Prussian
- **House pairings:**
  - Cover: Expanded Thick masthead + Thick title + Mono issue line
  - Section opener: Mono chapter tag + Thick H2 + Condensed lede
  - Body page: Condensed label + Regular body + Mono caption strip

### Borders & Rules

- **Default border:** 1px solid Ink — hard print aesthetic, no softening.
- **Accent rule:** 3px Rufous — used in Title Plate, sparingly.
- **Inner rules:** Rufous border on badge shield; Ink inner rule inside that.
- **Corner radius:** 0px (hard edges) everywhere except badge medallion pill elements.

### Shadows & Elevation

- **No drop shadows on type** (The Bars, rule 06).
- **No drop shadows on the badge.**
- **Hard offset shadow** (`3px 3px 0 Ink`) for cards — no blur, print-press aesthetic.
- **No box-shadow blur radius** on any element.

### Animation & Interaction

- **Motion:** Minimal. This is a print-first brand; animation is earned.
- **Hover states:** Color shift (Prussian → Prussian-80, or slight Bone tint lift). No scale transforms.
- **Press states:** Ink fill or offset shadow collapse (hard-press feel).
- **No easing bounces, elastic, or spring physics.** If animated: linear or ease-in-out, short duration (150–200ms).
- **No rotation past ±4°** on any element (The Bars, rule 06).

### Imagery Color

- Cool-leaning neutral. Fluorescent-lit classrooms. No warm Instagram filters.
- B&W or duotone (Prussian + Bone) acceptable for editorial images.
- Grain/texture overlay welcome.

### Cards

- Background: Bone or Prussian.
- Border: 1px solid Ink.
- Shadow: `3px 3px 0 Ink` (hard offset, no blur).
- Radius: 0px.
- No colored left-border-only accent style.

---

## ICONOGRAPHY

The Hoodlums icon system follows badge logic: **heraldic, bold, two-weight, Ink or Bone only.**

### Badge System (Primary Mark)

- **Shield:** Bone interior · Rufous border · Ink inner rule
- **Three skulls:** Left/right small+quiet · Center large+screaming
- **Crossed bats:** Prussian · behind the shield · ±32°
- **Lightning bolts:** Rufous · flanking the wordmark band
- **Wordmark:** INTELLIGENT/HOODLUMS · Prussian band · Rufous frame
- **Tagline plate:** "When in doubt…" · Rufous on Bone
- **Medallion:** LV · EST 2014 · NV
- **Min size:** 48px digital · 0.625in print

### Satellite Marks ✓ In `assets/`

| Mark | Filename | Size | Use |
|---|---|---|---|
| Social avatar | `assets/HM-avatar-1080.png` | 1080×1080, Ink bg | Instagram, X, LinkedIn |
| Favicon | `assets/HM-favicon-64.png` | 64×64 | Browser tabs, app icons |
| Wordmark strip | `assets/HM-wordmark-strip.png` | 1200×400, Ink bg | Email, YouTube, decks |
| Badge clean | `assets/HM-badge-clean.png` | 428×428 | General use, presentations |
| Single color | `assets/HM-single-color-bone-on-ink.png` | Bone on Ink | Embroidery, stamps, single-pass print |
| Primary badge (full color) | `assets/HM-badge-full.png` | 1902×1919, transparent | Default — all digital use |

### Core Marks (to be built)

- Lightning bolt (Rufous accent only)
- Crossed bats (Prussian)
- Shield outline (no skulls — sub-brand use)
- Center skull (avatar / favicon)
- "IH" monogram (stacked caps, sealed)

### Rules

- 2px stroke min at 24px
- No gradients. No shadows. No multi-color icons except the full badge.
- Tuscany for callout dots and timeline markers only.
- No emoji. No unicode icon substitutes.

### CDN Icons

No external icon library is specified. Brand relies on purpose-built marks. Use the badge assets in `assets/` and construct any needed marks per the rules above.

---

## PRODUCTS / SURFACES

The Intelligent Hoodlums operates as a consultancy, not a SaaS product. Primary surfaces:

1. **Brand / Marketing** — web presence, social, capabilities deck
2. **Workshop materials** — playbooks (5.5×8.5in saddle stitch), slide decks
3. **Case studies / proposals** — Producer's Notes register, 8.5×11in

UI kits live in `ui_kits/brand/` covering the brand/web surface.

---

## PRINT SPECS

- CMYK · PDF/X-1a:2003 · 300dpi minimum
- Color profile: US Web Coated (SWOP) v2
- Max total ink: 300% coated stock
- Bleed: 0.125in · Live area: 0.25in from trim

## SCREEN SPECS

- RGB · sRGB · 72–144dpi · 2× for retina
- PNG for marks · WebP for editorial · PDF for documents
