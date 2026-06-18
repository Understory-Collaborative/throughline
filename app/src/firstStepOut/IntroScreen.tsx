import { useEffect, useRef } from 'react'
import type { IntroScreen as IntroScreenData } from '../content/firstStepOut'
import { scrollToTop } from './scrollToTop'
import { track } from '../analytics'

interface IntroScreenProps {
  screen: IntroScreenData
  /** True for the very first screen, where Back leaves the flow. */
  isFirst: boolean
  onBack: () => void
  onContinue: () => void
}

/**
 * A welcome screen shown before the questions. Plain words, no inputs. It sets
 * expectations and invites a person to start when they are ready.
 */
export function IntroScreen({ screen, isFirst, onBack, onContinue }: IntroScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
    scrollToTop()
    track({ name: 'fso_intro_view', screen: screen.id })
  }, [screen.id])

  return (
    <div>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-3xl font-medium leading-snug text-ink outline-none sm:text-4xl"
      >
        {screen.title}
      </h1>

      <div className="mt-4 flex flex-col gap-4">
        {screen.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}

        {screen.list && (
          <ol className="flex flex-col gap-3">
            {screen.list.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary"
                >
                  {i + 1}
                </span>
                <span className="text-lg font-medium text-ink">{item}</span>
              </li>
            ))}
          </ol>
        )}

        {screen.closing?.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg px-1 py-2 text-base text-support transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {isFirst ? 'Back to home' : 'Back'}
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="rounded-xl bg-primary px-6 py-3 text-base font-bold text-paper shadow-sm transition-colors hover:bg-primary-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {screen.cta}
        </button>
      </div>
    </div>
  )
}
