# Design system

The shared visual and verbal language for Throughline. It keeps the product
consistent, accessible, and warm.

## Contents

- `brand-direction.md` the belief, the feel, and the look in words
- `voice-and-tone.md` how we sound, and the writing rules in practice
- `accessibility.md` the WCAG 2.2 AA commitment and working checklist
- `tokens.md` the canvas for our own design tokens, still to design

## Living style guide

The visual style guide is a real page in the app. Source is at
`app/public/styleguide.html`. Run the app and open `/styleguide.html` to see the
palette, type, and components together. It is a draft for review.

## A note on the exemplar

`/design_system/example` holds the Intelligent Hoodlums design system. It is a
reference for how thorough and opinionated a finished system can be. We are
designing our own for Throughline. We do not reuse its look or its voice.

## Principles

- **Calm and clear.** Lots of breathing room. One main action per screen. Never
  crowd a person who is reading under stress.
- **Mobile first.** Design for a small, cheap phone first, then scale up.
- **Big, tappable targets.** Generous touch areas and spacing.
- **Plain words, plain shapes.** Simple layouts. No decoration that competes
  with the task.
- **Accessible by default.** Every pattern here meets WCAG 2.2 AA. See
  `accessibility.md`.

## Tokens

Design tokens (color, type scale, spacing) live in `tokens.md` and, once
decided, in the Tailwind theme in `app/src/index.css` under the `@theme` block.
Keep the two in sync.

**To do:** design the palette and type scale with the team and the community,
with contrast checked against WCAG 2.2 AA. The token canvas is in `tokens.md`.
