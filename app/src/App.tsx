import { useState } from 'react'

/**
 * Throughline landing page.
 *
 * Warm, worn-in, unhurried. The first feature is First Step Out, getting your
 * Texas ID back after leaving TDCJ. The guided flow mounts from the start
 * button in a later step.
 *
 * Data stance: anonymous, on-device only. We use localStorage to remember where
 * someone left off. No account, no login, no PII. See the root CLAUDE.md.
 */

const PROGRESS_KEY = 'throughline.firstStepOut.startedAt'

function App() {
  // Read on-device progress once. This app is client-only, so localStorage is
  // available synchronously here.
  const [returning] = useState(() => Boolean(localStorage.getItem(PROGRESS_KEY)))

  function handleStart() {
    if (!localStorage.getItem(PROGRESS_KEY)) {
      localStorage.setItem(PROGRESS_KEY, new Date().toISOString())
    }
    // The guided flow will mount here in a later step.
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-3xl items-center gap-3 px-5 py-5">
        <span
          aria-hidden="true"
          className="relative inline-block h-6 w-6 rounded-lg bg-primary"
        >
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-honey" />
        </span>
        <span className="font-display text-xl font-semibold text-ink">Throughline</span>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5">
        <section className="pt-6 pb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-mahogany">
            Texas · First Step Out
          </p>
          <h1 className="mt-3 max-w-[16ch] font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
            You're headed somewhere. In your own time.
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-ink">
            Throughline walks with you through the first steps after leaving prison. We start with
            getting your Texas ID back, in plain words, one step at a time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleStart}
              className="rounded-2xl bg-primary px-7 py-4 text-center text-lg font-bold text-paper shadow-sm transition-colors hover:bg-primary-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {returning ? 'Pick up where you left off' : 'Start First Step Out'}
            </button>
            <p className="text-sm text-support">About 5 minutes. No account.</p>
          </div>
        </section>

        <section aria-labelledby="promise" className="pb-12">
          <h2 id="promise" className="sr-only">
            Our promise
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            <li className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-display text-lg font-medium text-ink">No account, ever</p>
              <p className="mt-1 text-base text-support">Nothing to sign up for. Just start.</p>
            </li>
            <li className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-display text-lg font-medium text-ink">We never save your name</p>
              <p className="mt-1 text-base text-support">Your answers stay on your phone.</p>
            </li>
            <li className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-display text-lg font-medium text-ink">Go at your own pace</p>
              <p className="mt-1 text-base text-support">Stop anytime. Pick up where you left off.</p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="what" className="pb-16">
          <h2 id="what" className="font-display text-2xl font-medium text-ink">
            What you get
          </h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink">
            Answer a few plain questions. Get a clear list to bring to the DPS office. Here is what
            you have, here is what you still need, and here is where to get it. No wasted trips.
          </p>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-6 text-sm text-support">
          Throughline. Built with people who have been through reentry. Texas first.
        </div>
      </footer>
    </div>
  )
}

export default App
