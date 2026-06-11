import { useEffect, useRef } from 'react'
import type { Result, ResultItem } from '../content/firstStepOut'
import { Icon } from './Icon'
import { Progress } from './Progress'
import { scrollToTop } from './scrollToTop'
import { track } from '../analytics'

interface ResultScreenProps {
  result: Result
  onBack: () => void
  onRestart: () => void
}

function Item({ item }: { item: ResultItem }) {
  const accent =
    item.kind === 'have'
      ? 'border-l-4 border-primary'
      : 'border-l-4 border-honey'
  const iconWrap =
    item.kind === 'have' ? 'bg-primary/10 text-primary' : 'bg-honey/15 text-mahogany'

  return (
    <li className={`flex items-start gap-3 rounded-r-2xl border border-line bg-surface p-4 ${accent}`}>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}>
        <Icon name={item.icon} className="h-4 w-4" />
      </span>
      <div>
        <p className="text-base font-medium text-ink">{item.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-support">{item.detail}</p>
      </div>
    </li>
  )
}

export function ResultScreen({ result, onBack, onRestart }: ResultScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
    scrollToTop()
    track({ name: 'fso_result_view' })
  }, [])

  return (
    <div>
      <Progress value={100} label="Done" />

      <div className="border-b border-line pb-6">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-3xl font-medium leading-snug text-ink outline-none"
        >
          {result.headline}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-support">{result.subtext}</p>
      </div>

      {result.have.length > 0 && (
        <section className="mt-6" aria-labelledby="have-label">
          <h2
            id="have-label"
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-support"
          >
            You already have this
          </h2>
          <ul className="flex flex-col gap-2">
            {result.have.map((item) => (
              <Item key={item.title} item={item} />
            ))}
          </ul>
        </section>
      )}

      {result.get.length > 0 && (
        <section className="mt-6" aria-labelledby="get-label">
          <h2
            id="get-label"
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-support"
          >
            {result.have.length > 0 ? 'Other options to get quickly' : 'Quick options to get one'}
          </h2>
          <ul className="flex flex-col gap-2">
            {result.get.map((item) => (
              <Item key={item.title} item={item} />
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg px-1 py-2 text-base text-support transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border border-leather px-5 py-3 text-base font-medium text-mahogany transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start over
        </button>
      </div>
    </div>
  )
}
