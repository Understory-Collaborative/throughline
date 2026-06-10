# First Step Out

The first Throughline feature. A plain-language guide to getting your Texas ID
back after leaving TDCJ. It is the dignity-first version of the Texas DPS REAL
ID Checklist, trimmed to what people actually need.

## The job it does

Help someone walk into DPS with the right plan. Answer a short set of plain
questions, then get a personalized printable. Here is what to bring. Here is
what you have. Here is what you still need. Here is where to get it.

See the demo persona in `../personas/marcus.md`.

## Honest scope for v1

- It helps the person arrive at DPS prepared, so they do not waste a trip.
- It does not fetch documents for them. When something is missing, such as a
  birth certificate, it says so plainly and points to where to get it.
- It hands off to real people where a person should help. We are building a
  tool, not a community.

## How it works

1. **Short question flow.** Ask only what changes the answer. Identity,
   citizenship, and residency, in plain words. One question per screen.
2. **Personalized result.** Map the person's answers to what counts, what they
   already have, and the gaps.
3. **Printable plan.** A clear list to bring to DPS, plus where to fill gaps.
   Printable and saveable, since not everyone has reliable data.

## Content model (to build)

The question tree and checklist content live as version-controlled data in the
app so collaborators, including formerly incarcerated reviewers, can read and
correct the words. Planned shape:

- **Questions.** Id, plain-language prompt, help text, answer options, and which
  next question or outcome each answer leads to.
- **Documents.** What DPS accepts for identity, citizenship, and residency, in
  plain language, with notes on common edge cases such as a residency gap.
- **Outcomes.** The personalized "bring this, get that" content assembled from
  answers.

**To do:** confirm the current Texas DPS requirements with a trustworthy source
and a named owner who keeps them accurate. State rules change, and the steps we
give have to be right.

## Open questions

- The exact trimmed question set, validated with the community.
- Print and save format that works on a cheap phone and a library computer.
- How and where we hand off to real people and organizations.
