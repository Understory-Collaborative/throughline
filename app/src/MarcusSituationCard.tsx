/**
 * Marcus situation card.
 *
 * A quiet, warm typography card that tells one person's situation in plain
 * words. No photo, no illustration of a face, no stated race. The human part is
 * his story, not a stand-in face, so the card never assumes what a formerly
 * incarcerated person looks like. See product/personas/marcus.md and
 * product/design-system/brand-direction.md.
 *
 * It is reusable in the app and is the same markup rendered by the video export
 * page at app/public/exports/marcus-card.html, which is what gets brought into
 * Final Cut Pro.
 */

interface Fact {
  /** Short label, e.g. "Has". Optional, for the calm two-line facts. */
  label: string
  /** The plain-language line a person reads. */
  text: string
}

export interface MarcusSituationCardProps {
  /** First name. Defaults to Marcus. */
  name?: string
  /** Age in years. Defaults to 34. */
  age?: number
  /** The lead sentence under the name. */
  intro?: string
  /** The calm list of facts. Lead with what he has, per the brand. */
  facts?: Fact[]
}

const defaultIntro =
  'He left TDCJ three weeks ago, after a four-year sentence. He has a job lined up if he can get an I-9 done.'

const defaultFacts: Fact[] = [
  { label: 'Where he sleeps', text: "His sister's couch in Arlington." },
  { label: 'What he has', text: 'His old paper Social Security card.' },
  { label: 'What expired', text: 'His state ID, during his sentence.' },
  { label: "What's gone", text: 'His birth certificate.' },
  { label: 'What it costs', text: 'He cannot afford the bus to DPS twice.' },
]

export function MarcusSituationCard({
  name = 'Marcus',
  age = 34,
  intro = defaultIntro,
  facts = defaultFacts,
}: MarcusSituationCardProps) {
  return (
    <article
      role="group"
      aria-label={`${name}'s situation`}
      className="mx-auto max-w-2xl rounded-3xl border border-line bg-surface/80 px-8 py-10 text-ink shadow-sm sm:px-12 sm:py-14"
    >
      <p className="text-sm font-semibold tracking-wide text-mahogany uppercase">
        Meet {name}
      </p>

      <p className="mt-3 font-display text-3xl leading-tight font-semibold sm:text-4xl">
        He is {age}.
      </p>

      <p className="mt-4 text-lg leading-relaxed text-support sm:text-xl">
        {intro}
      </p>

      <dl className="mt-8 space-y-4">
        {facts.map((fact) => (
          <div
            key={fact.text}
            className="border-l-2 border-leather/50 pl-4 sm:pl-5"
          >
            <dt className="text-xs font-semibold tracking-wide text-leather uppercase">
              {fact.label}
            </dt>
            <dd className="mt-0.5 text-lg leading-snug sm:text-xl">
              {fact.text}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
