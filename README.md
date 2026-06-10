# Throughline

Throughline is a companion that walks with people leaving incarceration through
the moments that decide whether reentry holds together. Getting your ID back,
staying on track, clearing your record, and knowing who to trust.

The first feature is **First Step Out**, a plain-language guide to getting your
Texas ID back after leaving TDCJ. It is the dignity-first version of the Texas
DPS REAL ID Checklist, trimmed to what people actually need and written for
someone reading under stress.

We are building a tool, not a community. Software supports the work. It cannot
deliver it. We collaborate with formerly incarcerated individuals through design
and building.

## Repository layout

- `app/` the web application (Vite + React + TypeScript + Tailwind). See
  `app/README.md`.
- `product/` how the product should be built: pillars, personas, design system,
  and feature briefs. Start at `product/README.md`.
- `.claude/` skills and a SessionStart hook that make developing with Claude
  easy.
- `CLAUDE.md` how to work in this codebase, including the house writing rules.

## Quick start

```bash
cd app
npm install
npm run dev
```

## Read first

- `CLAUDE.md` for the rules and the stack rationale.
- `product/pillars/product-pillars.md` for the principles that guide decisions.
