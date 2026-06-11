import { useEffect, useId, useRef } from 'react'
import type { Question } from '../content/firstStepOut'
import { Icon } from './Icon'
import { Progress } from './Progress'
import { scrollToTop } from './scrollToTop'
import { track } from '../analytics'

interface QuestionScreenProps {
  question: Question
  /** A single value for radio questions, a list for multi questions. */
  value: string | string[] | null
  onChange: (value: string | string[]) => void
  onBack?: () => void
  onContinue: () => void
  continueLabel?: string
}

/** A small check that shows inside the selection indicator when chosen. */
function CheckMark() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-2.5 w-2.5 opacity-0 group-has-[:checked]:opacity-100"
      aria-hidden="true"
    >
      <polyline points="2,6 5,9 10,3" />
    </svg>
  )
}

export function QuestionScreen({
  question,
  value,
  onChange,
  onBack,
  onContinue,
  continueLabel = 'Continue',
}: QuestionScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const helpId = useId()

  // Move focus to the question on each step so keyboard and screen reader users
  // land in the right place. Respect the no-motion preference for scrolling.
  useEffect(() => {
    headingRef.current?.focus()
    scrollToTop()
    track({ name: 'fso_step_view', step: question.id })
  }, [question.id])

  const selected = new Set(
    question.multi ? (Array.isArray(value) ? value : []) : value ? [value as string] : [],
  )
  const canContinue = selected.size > 0

  function handleSelect(optionValue: string) {
    if (!question.multi) {
      onChange(optionValue)
      return
    }
    const next = new Set(selected)
    if (next.has(optionValue)) {
      next.delete(optionValue)
      onChange([...next])
      return
    }

    // Keep the "none of these" answer mutually exclusive with the real ones.
    const isExclusive = question.options.find((o) => o.value === optionValue)?.exclusive
    if (isExclusive) {
      onChange([optionValue])
      return
    }
    for (const option of question.options) {
      if (option.exclusive) next.delete(option.value)
    }
    next.add(optionValue)
    onChange([...next])
  }

  return (
    <div>
      <Progress value={question.progress} label={question.stepLabel} />

      <fieldset>
        <legend className="contents">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-2xl font-medium leading-snug text-ink outline-none sm:text-3xl"
          >
            {question.prompt}
          </h1>
        </legend>

        <p id={helpId} className="mt-2 text-base leading-relaxed text-support">
          {question.help}
        </p>

        {question.notice && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/8 p-4">
            <Icon name="help" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-ink">{question.notice}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option) => (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-leather has-[:checked]:border-primary has-[:checked]:bg-primary/8 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary"
            >
              <input
                type={question.multi ? 'checkbox' : 'radio'}
                name={question.id}
                value={option.value}
                checked={selected.has(option.value)}
                onChange={() => handleSelect(option.value)}
                className="sr-only"
              />
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper text-support transition-colors group-has-[:checked]:bg-primary/15 group-has-[:checked]:text-primary">
                <Icon name={option.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="flex-1">
                <span className="block text-base font-medium leading-snug text-ink">
                  {option.title}
                </span>
                {option.sub && (
                  <span className="mt-0.5 block text-sm text-support">{option.sub}</span>
                )}
              </span>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line text-paper transition-colors group-has-[:checked]:border-primary group-has-[:checked]:bg-primary">
                <CheckMark />
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg px-1 py-2 text-base text-support transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-xl bg-primary px-6 py-3 text-base font-bold text-paper shadow-sm transition-colors hover:bg-primary-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-line disabled:text-support disabled:shadow-none"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  )
}
