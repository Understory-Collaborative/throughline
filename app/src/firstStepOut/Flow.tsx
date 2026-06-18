import { useState, type ReactNode } from 'react'
import {
  assembleResult,
  emptyAnswers,
  introScreens,
  visibleQuestions,
  type Answers,
  type QuestionId,
} from '../content/firstStepOut'
import { IntroScreen } from './IntroScreen'
import { QuestionScreen } from './QuestionScreen'
import { ResultScreen } from './ResultScreen'
import { track } from '../analytics'

interface SessionState {
  step: number
  answers: Answers
}

function freshState(): SessionState {
  return { step: 0, answers: { ...emptyAnswers } }
}

interface FlowProps {
  /** Called when the person backs out of the first screen. */
  onExit: () => void
}

/**
 * The First Step Out question flow.
 *
 * The flow runs as one list of screens: a couple of welcome screens, then the
 * questions, then the result. Every visit starts fresh. We treat each person as
 * a first-time visitor, so we keep no progress between visits. Answers live in
 * React state for this session only. Nothing is written to the device, which
 * keeps the least we can.
 */
export function Flow({ onExit }: FlowProps) {
  const [{ step, answers }, setState] = useState<SessionState>(freshState)

  function setAnswer(id: QuestionId, value: string | string[]) {
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [id]: value } }))
  }

  function goTo(next: number) {
    setState((prev) => ({ ...prev, step: next }))
  }

  function back(from?: QuestionId) {
    if (from) track({ name: 'fso_back', from })
    if (step === 0) {
      onExit()
    } else {
      goTo(step - 1)
    }
  }

  function restart() {
    track({ name: 'fso_restart' })
    setState(freshState())
  }

  // The flow branches, so the list of questions depends on the answers so far.
  // Screens run intro, then questions, then result.
  const active = visibleQuestions(answers)
  const introCount = introScreens.length
  const questionEnd = introCount + active.length

  let content: ReactNode
  if (step >= questionEnd) {
    content = (
      <ResultScreen
        result={assembleResult(answers)}
        onBack={() => goTo(questionEnd - 1)}
        onRestart={restart}
      />
    )
  } else if (step < introCount) {
    content = (
      <IntroScreen
        screen={introScreens[step]}
        isFirst={step === 0}
        onBack={() => back()}
        onContinue={() => goTo(step + 1)}
      />
    )
  } else {
    const question = active[step - introCount]
    const isLast = step === questionEnd - 1
    content = (
      <QuestionScreen
        question={question}
        value={answers[question.id]}
        onChange={(value) => setAnswer(question.id, value)}
        onBack={() => back(question.id)}
        onContinue={() => goTo(step + 1)}
        continueLabel={isLast ? 'See my documents' : 'Continue'}
      />
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-line bg-surface/70 p-6 shadow-sm sm:p-8 print:max-w-none print:rounded-none print:border-0 print:bg-transparent print:p-0 print:shadow-none">
      {content}
    </div>
  )
}
