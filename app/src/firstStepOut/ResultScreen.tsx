import { useEffect, useRef, useState } from 'react'
import type {
  AcceptedDocs,
  Category,
  CategoryId,
  Result,
  ResultDoc,
  Slot,
} from '../content/firstStepOut'
import { Icon } from './Icon'
import { Progress } from './Progress'
import { PrintableSheet } from './PrintableSheet'
import { scrollToTop } from './scrollToTop'
import { track } from '../analytics'

interface ResultScreenProps {
  result: Result
  onBack: () => void
  onRestart: () => void
}

/** The address a person can use to come back or pass along to a friend. */
function getReturnUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'throughline.app'
}

/** Map a resource link to a coarse, non-identifying analytics target. */
function linkTarget(href?: string): 'birth_cert' | 'snap' | 'other' {
  if (!href) return 'other'
  if (href.includes('order-birth-certificate')) return 'birth_cert'
  if (href.includes('yourtexasbenefits')) return 'snap'
  return 'other'
}

function DocItem({ doc, tone }: { doc: ResultDoc; tone: 'have' | 'get' }) {
  const accent = tone === 'have' ? 'border-l-4 border-primary' : 'border-l-4 border-honey'
  const iconWrap = tone === 'have' ? 'bg-primary/10 text-primary' : 'bg-honey/15 text-mahogany'

  return (
    <li className={`flex items-start gap-3 rounded-r-2xl border border-line bg-surface p-4 ${accent}`}>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}>
        <Icon name={doc.icon} className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-base font-medium text-ink">{doc.title}</p>
          {doc.tag && (
            <span className="rounded-full bg-paper px-2 py-0.5 text-xs font-semibold text-support">
              {doc.tag}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-support">{doc.detail}</p>
        {doc.href && (
          <a
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track({ name: 'fso_link', target: linkTarget(doc.href) })}
            className="mt-2 inline-flex items-center gap-1 rounded-md text-sm font-semibold text-primary underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {doc.linkLabel ?? 'Open the page'}
            <span className="sr-only">(opens in a new tab)</span>
            <svg
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2" />
              <path d="M12 4h4v4M16 4l-7 7" />
            </svg>
          </a>
        )}
      </div>
    </li>
  )
}

function DocList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leather" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const summaryClass =
  'inline-flex cursor-pointer list-none items-center gap-1 rounded-md text-sm font-semibold text-primary underline underline-offset-2 marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/** The papers that can fill a slot, opened in tiers so the list stays calm. */
function OptionsPanel({ options }: { options: AcceptedDocs }) {
  return (
    <div className="mt-2 rounded-2xl border border-line bg-paper/60 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-support">
        Papers that count
      </p>
      <DocList items={options.common} />

      {options.more.length > 0 && (
        <details className="mt-3">
          <summary className={summaryClass}>What else could I use?</summary>
          <div className="mt-3">
            <DocList items={options.more} />
            {options.rest.length > 0 && (
              <details className="mt-3">
                <summary className={summaryClass}>Show me the full list</summary>
                <div className="mt-3">
                  <DocList items={options.rest} />
                </div>
              </details>
            )}
          </div>
        </details>
      )}
    </div>
  )
}

/** A row of dots that reads like a scorecard: filled versus still open. */
function Pips({ slots }: { slots: Slot[] }) {
  const filled = slots.filter((s) => s.filled).length
  return (
    <span
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`${filled} of ${slots.length} collected`}
    >
      {slots.map((slot, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`h-3 w-3 rounded-full ${
            slot.filled ? 'bg-primary' : 'border-2 border-dashed border-leather'
          }`}
        />
      ))}
    </span>
  )
}

/** One card in the hand. Filled holds a paper. Empty is a dotted placeholder. */
function SlotCard({ slot, area }: { slot: Slot; area: CategoryId }) {
  if (slot.filled && slot.doc) {
    const { doc } = slot
    return (
      <li className="flex items-center gap-3 rounded-2xl border border-line border-l-4 border-l-primary bg-surface p-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon name={doc.icon} className="h-[18px] w-[18px]" />
        </span>
        <span className="min-w-0 flex-1 text-base font-medium text-ink">{doc.title}</span>
        {doc.tag && (
          <span className="hidden shrink-0 rounded-full bg-paper px-2 py-0.5 text-xs font-semibold text-support sm:inline">
            {doc.tag}
          </span>
        )}
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5 shrink-0 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="4,10 8,14 16,5" />
        </svg>
      </li>
    )
  }

  return (
    <li>
      <details
        className="group"
        onToggle={(e) => {
          if (e.currentTarget.open) track({ name: 'fso_options_open', area })
        }}
      >
        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl border-2 border-dashed border-leather/60 bg-paper/30 p-3 text-support marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-leather/60 text-xl font-bold leading-none text-leather"
          >
            +
          </span>
          <span className="flex-1 text-base font-medium">{slot.needLabel}</span>
          <span className="shrink-0 text-sm font-semibold text-primary">
            <span className="group-open:hidden">See options</span>
            <span className="hidden group-open:inline">Hide</span>
          </span>
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="5,8 10,13 15,8" />
          </svg>
        </summary>
        {slot.options && <OptionsPanel options={slot.options} />}
      </details>
    </li>
  )
}

function CategoryBlock({ category, index }: { category: Category; index: number }) {
  return (
    <section className="mt-6" aria-labelledby={`cat-${category.id}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={`cat-${category.id}`} className="font-display text-xl font-medium text-ink">
          {index}. {category.title}
        </h2>
        <Pips slots={category.slots} />
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {category.slots.map((slot, i) => (
          <SlotCard key={slot.doc?.title ?? `empty-${i}`} slot={slot} area={category.id} />
        ))}
      </ul>

      {category.get.length > 0 && (
        <>
          <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-support">
            {category.have.length > 0 ? 'How to get more' : 'How to get one'}
          </p>
          <ul className="flex flex-col gap-2">
            {category.get.map((doc) => (
              <DocItem key={doc.title} doc={doc} tone="get" />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export function ResultScreen({ result, onBack, onRestart }: ResultScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [copied, setCopied] = useState(false)
  const returnUrl = getReturnUrl()
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  useEffect(() => {
    headingRef.current?.focus()
    scrollToTop()
    track({ name: 'fso_result_view' })
  }, [])

  function handlePrint() {
    track({ name: 'fso_print' })
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print()
    }
  }

  async function handleShare() {
    track({ name: 'fso_share' })
    const shareData = {
      title: 'Throughline · First Step Out',
      text: 'A plain-language guide to getting your Texas ID.',
      url: returnUrl,
    }
    try {
      if (canShare) {
        await navigator.share(shareData)
        return
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(returnUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      // A person closing the share sheet is not an error worth surfacing.
    }
  }

  return (
    <div>
      {/* The clean paper version. Hidden on screen, shown only when printing. */}
      <PrintableSheet result={result} returnUrl={returnUrl} />

      {/* The on-screen version. Hidden when printing so the paper stays clean. */}
      <div className="print:hidden">
        <Progress value={100} label="Your plan" />

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

        {/* The single clear next step. */}
        <section
          aria-labelledby="next-step"
          className="mt-6 rounded-2xl border-2 border-primary bg-primary/8 p-5"
        >
          <p
            id="next-step"
            className="text-xs font-bold uppercase tracking-widest text-primary"
          >
            Your next step
          </p>
          <p className="mt-1 font-display text-xl font-medium text-ink">{result.nextStep.title}</p>
          <p className="mt-1 text-base leading-relaxed text-ink">{result.nextStep.detail}</p>
          {result.nextStep.href && (
            <a
              href={result.nextStep.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track({ name: 'fso_link', target: linkTarget(result.nextStep.href) })}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-base font-bold text-paper shadow-sm transition-colors hover:bg-primary-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {result.nextStep.linkLabel ?? 'Open the page'}
              <span className="sr-only">(opens in a new tab)</span>
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2" />
                <path d="M12 4h4v4M16 4l-7 7" />
              </svg>
            </a>
          )}
        </section>

        {result.categories.map((category, i) => (
          <CategoryBlock key={category.id} category={category} index={i + 1} />
        ))}

        {/* Take it with you. The two clear ways to keep this plan. */}
        <section
          aria-labelledby="take-it"
          className="mt-8 rounded-2xl border border-line bg-surface p-5"
        >
          <h2 id="take-it" className="font-display text-lg font-medium text-ink">
            Take this with you
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-support">
            Print a clean one-page list to carry to DPS, or keep this open on your phone.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-bold text-paper shadow-sm transition-colors hover:bg-primary-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Icon name="document" className="h-5 w-5" />
              Print or save as PDF
            </button>
            <p className="self-center text-sm text-support">
              On a phone? Your plan stays on this page. Keep it open or save the link below.
            </p>
          </div>
        </section>

        {/* Come back any time. A link to return or pass to a friend. */}
        <section
          aria-labelledby="come-back"
          className="mt-4 rounded-2xl border border-line bg-surface p-5"
        >
          <h2 id="come-back" className="font-display text-lg font-medium text-ink">
            Come back any time
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-support">
            Save this link, or share it with a friend who could use it.
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <code className="break-all rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink">
              {returnUrl}
            </code>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-xl border border-leather px-5 py-3 text-base font-medium text-mahogany transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {canShare ? 'Share link' : copied ? 'Link copied' : 'Copy link'}
            </button>
          </div>
        </section>

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
    </div>
  )
}
