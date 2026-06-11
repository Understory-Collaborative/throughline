# Design tokens

**Status: To design.** This is the canvas for Throughline's own design system.
The choices here are yours to make, with the team and the community. Nothing
below is decided yet.

The structure follows the rigor of the exemplar in `/design_system/example`. We
borrow its thoroughness only. We do not borrow its look or voice.

The app reads these tokens from the Tailwind `@theme` block in
`app/src/index.css`. When a decision lands here, encode it there too, and keep
the two in sync.

## Constraints that hold regardless of style

These come from the pillars and the accessibility commitment, not from taste.

- **WCAG 2.2 AA contrast** on every text and control pairing. Verify each one.
- **Mobile first.** Design for a small, cheap phone first.
- **Calm under stress.** Generous spacing and large, readable body text.
- **Bandwidth aware.** Weigh the cost of custom fonts and heavy assets for
  people on limited data. If we ship custom fonts, it is a deliberate choice.

## Color

Decide the palette. For each token, set a name, a hex, and a clear role. Note
the WCAG contrast for every pairing you intend to use.

| Token | Name | Hex | Role |
| ----- | ---- | --- | ---- |
|       |      |     |      |

Semantic colors to decide: success, caution, danger, and any info state. Color
is never the only signal.

## Type

Decide the font choice (and the bandwidth tradeoff if custom), then the scale.

| Role    | Size (mobile) | Weight | Line height | Use |
| ------- | ------------- | ------ | ----------- | --- |
| Display |               |        |             |     |
| Heading |               |        |             |     |
| Body    |               |        |             |     |
| Small   |               |        |             |     |

Keep body at 16px or larger. Text must stay usable at 200 percent zoom.

## Spacing

Decide the spacing scale. A consistent step (for example 4px based) keeps
layouts calm and predictable.

## Radius

Decide corner styling. Soft or sharp is a real brand signal. Record the values.

## Elevation

Decide how raised surfaces read. Shadow, border, or flat. Record the values.

## Targets

Interactive targets are at least 44 by 44px so they are easy to tap. Primary
actions are larger. This is a floor, not a style choice.

## Motion

Decide motion style. Keep transitions short and respect
`prefers-reduced-motion`. Record durations and easing.

## How to fill this in

- Bring a draft to the community and react to what they feel, not only what they
  say.
- Land one category at a time. Encode it in the app theme as you go.
- When this doc is filled, it becomes the source of truth alongside the app
  theme.
