import { useEffect, useState } from 'react'
import {
  assembleResult,
  emptyAnswers,
  questions,
  type Answers,
  type QuestionId,
} from '../content/firstStepOut'
import { QuestionScreen } from './QuestionScreen'
import { ResultScreen } from './ResultScreen'

/** Where the in-progress flow lives on the device. Selections only, no PII. */
const STATE_KEY = 'throughline.firstStepOut.state'

interface SavedState {
  step: number
  answers: Answers
}

function loadState(): SavedState {
  try {
    const raw = localStorage.getItem(STATE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SavedState>
      const answers = { ...emptyAnswers, ...parsed.answers }
      const step = typeof parsed.step === 'number' ? parsed.step : 0
      return { step: Math.min(Math.max(step, 0), questions.length), answers }
    }
  } catch {
    // A corrupt or unreadable value just means we start fresh.
  }
  return { step: 0, answers: { ...emptyAnswers } }
}

interface FlowProps {
  /** Called when the person backs out of the first question. */
  onExit: () => void
}

export function Flow({ onExit }: FlowProps) {
  const [{ step, answers }, setState] = useState<SavedState>(loadState)

  // Remember progress on the device so a person can pick up where they left off.
  useEffect(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify({ step, answers }))
  }, [step, answers])

  function setAnswer(id: QuestionId, value: string | string[]) {
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [id]: value } }))
  }

  function goTo(next: number) {
    setState((prev) => ({ ...prev, step: next }))
  }

  function restart() {
    localStorage.removeItem(STATE_KEY)
    setState({ step: 0, answers: { ...emptyAnswers } })
  }

  const onResult = step >= questions.length

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-line bg-surface/70 p-6 shadow-sm sm:p-8">
      {onResult ? (
        <ResultScreen
          result={assembleResult(answers)}
          onBack={() => goTo(questions.length - 1)}
          onRestart={restart}
        />
      ) : (
        (() => {
          const question = questions[step]
          const isLast = step === questions.length - 1
          return (
            <QuestionScreen
              question={question}
              value={answers[question.id]}
              onChange={(value) => setAnswer(question.id, value)}
              onBack={() => (step === 0 ? onExit() : goTo(step - 1))}
              onContinue={() => goTo(step + 1)}
              continueLabel={isLast ? 'See my documents' : 'Continue'}
            />
          )
        })()
      )}
    </div>
  )
}
