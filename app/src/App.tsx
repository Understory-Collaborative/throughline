import { useState } from 'react'
import { Flow } from './firstStepOut/Flow'
import { scrollToTop } from './firstStepOut/scrollToTop'

/**
 * Throughline landing page.
 *
 * Warm, worn-in, unhurried. The first feature is First Step Out, getting your
 * Texas ID. The guided question flow mounts from the start button.
 *
 * We treat every visit as a first visit. There is no saved progress and no
 * "pick up where you left off", so the start is always the same and always
 * simple. Data stance: anonymous, on-device only, no account, no login, no PII.
 * See the root CLAUDE.md.
 */

/** The brand mark, clickable to return to the home page. */
function BrandHeader({ onHome }: { onHome: () => void }) {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center px-5 py-5 print:hidden">
      <button
        type="button"
        onClick={onHome}
        aria-label="Throughline, go to the home page"
        className="-m-1 flex items-center gap-3 rounded-lg p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span aria-hidden="true" className="relative inline-block h-6 w-6 rounded-lg bg-primary">
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-honey" />
        </span>
        <span className="font-display text-xl font-semibold text-ink">Throughline</span>
      </button>
    </header>
  )
}

function App() {
  const [started, setStarted] = useState(false)

  function handleStart() {
    setStarted(true)
  }

  function goHome() {
    setStarted(false)
    scrollToTop()
  }

  if (started) {
    return (
      <div className="flex min-h-svh flex-col">
        <BrandHeader onHome={goHome} />
        <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-16 print:px-0 print:pb-0">
          <Flow onExit={() => setStarted(false)} />
        </main>
        <footer className="border-t border-line print:hidden">
          <div className="mx-auto w-full max-w-3xl px-5 py-6 text-sm text-support">
            First Step Out is a free tool. Your answers are never stored off your phone or shared.
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col">
      <BrandHeader onHome={() => scrollToTop()} />

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
            getting your Texas ID, in plain words, one step at a time.
          </p>
          <p className="mt-3 max-w-xl text-base text-support">
            First Step Out covers Texas for now. More states are coming.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleStart}
              className="rounded-2xl bg-primary px-7 py-4 text-center text-lg font-bold text-paper shadow-sm transition-colors hover:bg-primary-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start First Step Out
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
              <p className="font-display text-lg font-medium text-ink">Your privacy comes first</p>
              <p className="mt-1 text-base text-support">No sign up needed. We ask for the least we can.</p>
            </li>
            <li className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-display text-lg font-medium text-ink">We never save your name</p>
              <p className="mt-1 text-base text-support">Your answers stay on your phone.</p>
            </li>
            <li className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-display text-lg font-medium text-ink">Go at your own pace</p>
              <p className="mt-1 text-base text-support">There is no timer. Just a few quick questions.</p>
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
