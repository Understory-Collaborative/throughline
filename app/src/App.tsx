import { useEffect, useState } from 'react'

/**
 * First Step Out starting screen.
 *
 * This is the entry point for the ID-recovery flow. It is intentionally small.
 * The real question tree and checklist content will live as version-controlled
 * data (see /product/first-step-out) so collaborators, including formerly
 * incarcerated reviewers, can read and correct the actual words.
 *
 * Data stance for this build: anonymous, on-device only. We use localStorage to
 * remember where someone left off. No account, no login, no PII. See CLAUDE.md.
 */

const PROGRESS_KEY = 'throughline.firstStepOut.startedAt'

function App() {
  const [returning, setReturning] = useState(false)

  useEffect(() => {
    setReturning(Boolean(localStorage.getItem(PROGRESS_KEY)))
  }, [])

  function handleStart() {
    if (!localStorage.getItem(PROGRESS_KEY)) {
      localStorage.setItem(PROGRESS_KEY, new Date().toISOString())
    }
    // The guided flow will mount here in a later step.
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col gap-8 px-5 py-10">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-slate-500">Throughline</p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">First Step Out</h1>
      </header>

      <section className="flex flex-col gap-4 text-lg leading-relaxed text-slate-700">
        <p>Getting your ID back is the first thing that makes the rest possible.</p>
        <p>
          We will walk it with you, one step at a time. We ask only what you need to answer. You do
          not need to make an account, and we do not save your name.
        </p>
      </section>

      <div className="mt-auto flex flex-col gap-3">
        <button
          type="button"
          onClick={handleStart}
          className="rounded-xl bg-slate-900 px-6 py-4 text-center text-lg font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          {returning ? 'Pick up where you left off' : 'Start'}
        </button>
        <p className="text-center text-sm text-slate-500">Takes about 5 minutes.</p>
      </div>
    </main>
  )
}

export default App
