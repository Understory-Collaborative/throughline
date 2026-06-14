import { useEffect, useRef, useState } from 'react'
import type { Category, Result, ResultDoc } from '../content/firstStepOut'
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

function DocItem({ doc, tone }: { doc: ResultDoc; tone: 'have' | 'get' }) {
  const accent = tone === 'have' ? 'border-l-4 border-primary' : 'border-l-4 border-honey'
  const iconWrap = tone === 'have' ? 'bg-primary/10 text-primary' : 'bg-honey/15 text-mahogany'

  return (
    <li className={`flex items-start gap-3 rounded-r-2xl border border-line bg-surface p-4 ${accent}`}>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}>
        <Icon name={doc.icon} className="h-4 w-4" />
      </span>
      <div>
        <p className="text-base font-medium text-ink">{doc.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-support">{doc.detail}</p>
      </div>
    </li>
  )
}

function CategoryBlock({ category, index }: { category: Category; index: number }) {
  const chip = category.met
    ? 'bg-primary/12 text-primary'
    : 'bg-honey/15 text-mahogany'
  const chipLabel = category.met ? 'You have this' : 'Still need this'

  return (
    <section className="mt-6" aria-labelledby={`cat-${category.id}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={`cat-${category.id}`} className="font-display text-xl font-medium text-ink">
          {index}. {category.title}
        </h2>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${chip}`}>{chipLabel}</span>
      </div>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-support">
        {category.rule}
      </p>

      {category.have.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {category.have.map((doc) => (
            <DocItem key={doc.title} doc={doc} tone="have" />
          ))}
        </ul>
      )}

      {category.get.length > 0 && (
        <>
          <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-support">
            {category.have.length > 0 ? 'Quick ways to get more' : 'Quick ways to get one'}
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
