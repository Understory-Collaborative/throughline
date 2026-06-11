# Throughline app

The web application for Throughline. The first feature is First Step Out, a
plain-language guide to getting your Texas ID back after leaving TDCJ.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Pendo for anonymous product analytics (no PII)

No backend yet. The starting build keeps all user state on the device with
`localStorage`. There is no account and no login. See the root `CLAUDE.md` for
the reasoning and the rules.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # run eslint
```

## Where things live

- `src/` application code
- `src/analytics.ts` the Pendo wrapper. It captures funnel shape only, which
  screen a person reached and whether they finished. It never sends what a
  person answered. The event union is the only way to call `track`, so there is
  no field for answer content.
- `index.html` page shell and the Pendo snippet
- Product direction, personas, pillars, and the design system live in
  `../product`. Read those before changing copy or flow.
