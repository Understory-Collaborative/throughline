# Design system

The shared visual and verbal language for Throughline. It keeps the product
consistent, accessible, and warm.

## Contents

- `voice-and-tone.md` how we sound, and the writing rules in practice
- `accessibility.md` the WCAG 2.2 AA commitment and working checklist

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

Design tokens (color, type scale, spacing) will live alongside the Tailwind
theme in `app/src/index.css` under the `@theme` block. As the system grows, keep
this directory and that block in sync, and record any token decisions here.

**To do:** define the color palette and type scale with the team, checked for
contrast against WCAG 2.2 AA.
