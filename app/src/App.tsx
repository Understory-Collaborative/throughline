import { useState } from 'react'
import { Flow } from './firstStepOut/Flow'
import { scrollToTop } from './firstStepOut/scrollToTop'

/**
 * Throughline landing page.
 *
 * Warm, worn-in, unhurried. Throughline is a companion for life after prison.
 * The home page introduces the product and its features. First Step Out, the
 * Texas ID guide, is live. The others are on the way.
 *
 * We treat every visit as a first visit. There is no saved progress and no
 * "pick up where you left off", so the start is always the same and always
 * simple. Data stance: anonymous, on-device only, no account, no login, no PII.
 * See the root CLAUDE.md.
 */

type View = 'home' | 'fso'

interface Feature {
  id: string
  name: string
  tagline: string
  body: string
  status: 'live' | 'soon'
}

const features: Feature[] = [
  {
    id: 'fso',
    name: 'First Step Out',
    tagline: 'Get your Texas ID',
    body: 'A plain-language guide to the papers you need and exactly what to bring to the DPS office. Texas for now, more states coming.',
    status: 'live',
  },
  {
    id: 'courtdate',
    name: 'CourtDate',
    tagline: 'Never miss a court date',
    body: 'Keep your court dates and what to bring in one place, with reminders so a date never slips by.',
    status: 'soon',
  },
  {
    id: 'trustlist',
    name: 'TrustList',
    tagline: 'Find work that is open to you',
    body: 'A list of employers who actually hire people with records, so you do not waste a day on a closed door.',
    status: 'soon',
  },
]

function SoonBadge() {
  return (
    <span className="rounded-full bg-honey/20 px-2 py-0.5 text-xs font-semibold text-mahogany">
      Soon
    </span>
  )
}

/** The brand mark, clickable to return to the home page. */
function BrandMark({ onHome }: { onHome: () => void }) {
  return (
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
  )
}

/** The header used inside the flow: brand only, to keep the task focused. */
function BrandHeader({ onHome }: { onHome: () => void }) {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center px-5 py-5 print:hidden">
      <BrandMark onHome={onHome} />
    </header>
  )
}

/** The home header: brand plus the feature nav. */
function NavBar({ onHome, onStart }: { onHome: () => void; onStart: () => void }) {
  return (
    <header className="border-b border-line">
      <nav
        aria-label="Throughline features"
        className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4"
      >
        <BrandMark onHome={onHome} />
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-base">
          <li>
            <button
              type="button"
              onClick={onStart}
              className="rounded-md font-medium text-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              First Step Out
            </button>
          </li>
          <li className="inline-flex items-center gap-1.5 text-support">
            CourtDate <SoonBadge />
          </li>
          <li className="inline-flex items-center gap-1.5 text-support">
            TrustList <SoonBadge />
          </li>
        </ul>
      </nav>
    </header>
  )
}

function FeatureCard({ feature, onStart }: { feature: Feature; onStart: () => void }) {
  return (
    <li className="flex flex-col rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center gap-2">
        <h3 className="font-display text-lg font-medium text-ink">{feature.name}</h3>
        {feature.status === 'soon' && <SoonBadge />}
      </div>
      <p className="mt-1 text-base font-medium text-ink">{feature.tagline}</p>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-support">{feature.body}</p>
      {feature.status === 'live' ? (
        <button
          type="button"
          onClick={onStart}
          className="mt-4 self-start rounded-xl bg-primary px-5 py-2.5 text-base font-bold text-paper shadow-sm transition-colors hover:bg-primary-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start
        </button>
      ) : (
        <p className="mt-4 text-sm font-semibold text-support">Coming soon</p>
      )}
    </li>
  )
}

function App() {
  const [view, setView] = useState<View>('home')

  function startFso() {
    setView('fso')
    scrollToTop()
  }

  function goHome() {
    setView('home')
    scrollToTop()
  }

  if (view === 'fso') {
    return (
      <div className="flex min-h-svh flex-col">
        <BrandHeader onHome={goHome} />
        <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-16 print:px-0 print:pb-0">
          <Flow onExit={goHome} />
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
      <NavBar onHome={goHome} onStart={startFso} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5">
        <section className="pt-8 pb-12">
          <h1 className="max-w-[16ch] font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
            You're headed somewhere. In your own time.
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-ink">
            Throughline walks with you through the moments after leaving prison. Plain words, one
            step at a time. Your information stays with you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={startFso}
              className="rounded-2xl bg-primary px-7 py-4 text-center text-lg font-bold text-paper shadow-sm transition-colors hover:bg-primary-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start First Step Out
            </button>
            <p className="text-sm text-support">About 5 minutes. No account.</p>
          </div>
        </section>

        <section aria-labelledby="features" className="pb-12">
          <h2 id="features" className="font-display text-2xl font-medium text-ink">
            What Throughline can do
          </h2>
          <p className="mt-2 max-w-xl text-base text-support">
            One feature is ready now. The rest are on the way.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} onStart={startFso} />
            ))}
          </ul>
        </section>

        <section aria-labelledby="promise" className="pb-16">
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
