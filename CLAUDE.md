# CLAUDE.md

How to work in this codebase. Read this before you write code or copy.

## What Throughline is

Throughline is a companion for people leaving incarceration. It walks with them
through the moments that decide whether reentry holds together. The first
feature is First Step Out, a plain-language guide to getting your Texas ID back
after leaving TDCJ. It is the friendlier, dignity-first version of the Texas DPS
REAL ID Checklist, trimmed to what people actually need.

The first state is Texas. The current build is for a hackathon, so favor small,
working steps over big architecture.

## Repository layout

- `app/` the web application (Vite + React + TypeScript + Tailwind)
- `product/` how the product should be built (pillars, personas, design system,
  feature briefs). Read the relevant doc here before changing flow or copy.
- `.claude/` skills and settings that make developing with Claude easy

## Tech stack and why

- **Vite + React + TypeScript.** Matches the team's strongest skills and builds
  to a static bundle we can host for free.
- **Tailwind CSS v4.** Fast to move in, mobile first, easy to encode the design
  system.
- **On-device only, for now.** State lives in `localStorage`. No account, no
  login, no PII. Our audience has good reason to be careful with personal
  information, so we collect the least we can.
- **No backend yet.** The core flow runs in the browser with content stored as
  version-controlled data. We will add a backend (Supabase is the leading
  option) only when a real need appears, such as cross-device progress or admin
  editing of content.
- **Content as data.** The question tree and checklist copy live in the repo as
  structured data so collaborators, including formerly incarcerated reviewers,
  can read and correct the actual words.

## Product principles

The full set is in `product/pillars/product-pillars.md`. The ones that shape
daily decisions:

- Dignity first. We are building a tool, not a community. Software supports the
  work. It cannot deliver it. Point to real people where a person should help.
- Built with, not just for. We collaborate with formerly incarcerated
  individuals through design and building.
- Privacy as safety. Collect the least we can. Explain plainly before
  collecting more.

## Writing rules (house style)

These apply to user-facing copy, docs, commit messages, and PR text.

- **No em dashes.** Use a period, a comma, or rewrite the sentence.
- **No negative parallelism.** Avoid the "it is not this, but that" pattern.
  State the thing directly.
- **No clause-colon-clause sentences.** Do not join two full thoughts with a
  colon. Use two sentences.
- **Avoid filler and hype.** Skip "in conclusion", "the bottom line is", and
  "moat". Cut throat-clearing.
- **Plain language for users.** Aim for a 3rd to 4th grade reading level in
  anything a person leaving incarceration will read. Write for someone reading
  under stress.
- **Run the humanizer.** Use the `/humanizer` skill on drafts to catch AI
  writing patterns before they ship.

## Accessibility

We meet **WCAG 2.2 AA**. Details and the working checklist are in
`product/design-system/accessibility.md`. In short: real semantic HTML,
keyboard support, visible focus, sufficient contrast, labels on every control,
and content that survives text scaling up to 200 percent.

## Engineering practices

- **Test-driven development.** Write a failing test first, make it pass, then
  refactor. New behavior arrives with tests. Bug fixes start with a test that
  reproduces the bug. We use Vitest and React Testing Library. Run `npm test`.
- **Modern best practices.** Favor current, well-supported patterns over clever
  or dated ones.
- **Event-driven.** React to events. Do not poll when an event or subscription
  can tell you what changed.
- **No padding sleeps.** Never add a `sleep` or `wait` to pad a response time or
  to dodge a collision between calls. Fix the ordering or use a real
  synchronization primitive instead.
- **Async where it fits.** Use async approaches for I/O and anything that would
  otherwise block. Keep work non-blocking.
- **Avoid unnecessary calls.** No needless polling, no repeat calls for data you
  already have. Cache and reuse. Coalesce where you can.
- **Steward the person's resources.** Be careful with their data, privacy,
  security, and bandwidth. Send less, store less, ask for less. This matters
  more for our audience, who often have limited data and good reason to guard
  their information.

## How we commit

- Small, logical commits. One idea per commit.
- Clear messages that follow the writing rules above.
- Develop on the assigned feature branch. Do not push to `main` without
  explicit permission.
- Do not open a pull request unless asked.

## Dev commands

```bash
cd app
npm install
npm run dev      # dev server
npm run build    # type-check and build
npm run lint     # eslint
```
