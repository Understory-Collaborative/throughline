import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Flow } from './Flow'

function noop() {}

type PendoWindow = typeof window & { pendo?: { track?: (...args: unknown[]) => void } }

/** Click past the two welcome screens to reach the first question. */
async function startQuestions(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /^continue$/i }))
  await user.click(screen.getByRole('button', { name: /let's get started/i }))
}

/** Walk through every question with a set of answers that fully covers DPS. */
async function completeFlow(user: ReturnType<typeof userEvent.setup>) {
  await startQuestions(user)

  await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))

  await user.click(screen.getByRole('radio', { name: /my birth certificate/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))

  await user.click(screen.getByRole('radio', { name: /original or certified copy/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))

  await user.click(screen.getByRole('radio', { name: /i have the card/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))

  await user.click(screen.getByRole('radio', { name: /my own place/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))

  await user.click(screen.getByRole('checkbox', { name: /utility or phone bill/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))

  await user.click(screen.getByRole('checkbox', { name: /registered Texas voter/i }))
  await user.click(screen.getByRole('button', { name: /see my documents/i }))
}

describe('First Step Out flow', () => {
  it('opens on the welcome screen before any questions', () => {
    render(<Flow onExit={noop} />)

    expect(
      screen.getByRole('heading', { level: 1, name: /getting a state id can be hard/i }),
    ).toBeInTheDocument()
  })

  it('moves through the welcome screens into the first question', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await user.click(screen.getByRole('button', { name: /^continue$/i }))
    expect(
      screen.getByRole('heading', { level: 1, name: /what you need/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /let's get started/i }))
    expect(
      screen.getByRole('heading', { level: 1, name: /on parole, or are you finished/i }),
    ).toBeInTheDocument()
  })

  it('starts on the first question with Continue disabled until a choice is made', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await startQuestions(user)

    expect(
      screen.getByRole('heading', { level: 1, name: /on parole, or are you finished/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()
  })

  it('enables Continue once an answer is picked', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await startQuestions(user)
    await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))

    expect(screen.getByRole('button', { name: /continue/i })).toBeEnabled()
  })

  it('walks through every step to a personalized result organized by DPS area', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await completeFlow(user)

    expect(
      screen.getByRole('heading', { level: 1, name: /you have what you need/i }),
    ).toBeInTheDocument()

    const citizenship = screen.getByRole('region', { name: /proof you are a u\.s\. citizen/i })
    expect(within(citizenship).getByText(/birth certificate/i)).toBeInTheDocument()

    const residency = screen.getByRole('region', { name: /proof of where you live/i })
    expect(within(residency).getByText(/lease or mortgage/i)).toBeInTheDocument()
  })

  it('warns a birth certificate holder that older Puerto Rico copies do not count', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await completeFlow(user)

    const citizenship = screen.getByRole('region', { name: /proof you are a u\.s\. citizen/i })
    expect(within(citizenship).getByText(/puerto rico/i)).toBeInTheDocument()
    expect(within(citizenship).getByText(/2010/)).toBeInTheDocument()
  })

  it('shows the plain-language status line for an area on screen', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await startQuestions(user)
    // A path that leaves identity short: supporting papers but no key paper.
    await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /do not have either one/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /i have the card/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /with family or a friend/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /none of these right now/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /none of these apply/i }))
    await user.click(screen.getByRole('button', { name: /see my documents/i }))

    const identity = screen.getByRole('region', { name: /proof of who you are/i })
    expect(within(identity).getByText(/not enough by themselves/i)).toBeInTheDocument()
  })

  it('fills an area progress dots from the left, by count', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await startQuestions(user)
    // Parole plus a Social Security card is two supporting papers and no key
    // paper, so identity sits at 2 of 3 with its empty slot in the middle.
    await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /do not have either one/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /i have the card/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /with family or a friend/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /none of these right now/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /none of these apply/i }))
    await user.click(screen.getByRole('button', { name: /see my documents/i }))

    const identity = screen.getByRole('region', { name: /proof of who you are/i })
    const dots = within(identity).getByRole('img', { name: /2 of 3 collected/i })
    const cells = Array.from(dots.children)
    expect(cells).toHaveLength(3)
    // The two filled dots lead, the empty one trails, regardless of which slot holds a paper.
    expect(cells[0].className).toContain('bg-primary')
    expect(cells[1].className).toContain('bg-primary')
    expect(cells[2].className).toContain('border-dashed')
  })

  it('always shows a single clear next step', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await completeFlow(user)

    const nextStep = screen.getByRole('region', { name: /your next step/i })
    expect(within(nextStep).getByText(/take your papers to dps/i)).toBeInTheDocument()
  })

  it('starts fresh every time, ignoring any old saved progress', () => {
    localStorage.setItem(
      'throughline.firstStepOut.state',
      JSON.stringify({ step: 3, answers: {} }),
    )

    render(<Flow onExit={noop} />)

    expect(
      screen.getByRole('heading', { level: 1, name: /getting a state id can be hard/i }),
    ).toBeInTheDocument()
  })

  it('lets a person back out of the first screen to the landing page', async () => {
    let exited = false
    render(<Flow onExit={() => (exited = true)} />)

    await userEvent.click(screen.getByRole('button', { name: /back to home/i }))

    expect(exited).toBe(true)
  })

  it('clears real picks when "None of these" is chosen, and the reverse', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await startQuestions(user)
    await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /my birth certificate/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /original or certified copy/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /i have the card/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /my own place/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))

    const utility = screen.getByRole('checkbox', { name: /utility or phone bill/i })
    const none = screen.getByRole('checkbox', { name: /none of these right now/i })

    await user.click(utility)
    expect(utility).toBeChecked()

    await user.click(none)
    expect(none).toBeChecked()
    expect(utility).not.toBeChecked()

    await user.click(utility)
    expect(utility).toBeChecked()
    expect(none).not.toBeChecked()
  })
})

describe('First Step Out result actions', () => {
  it('offers a clear choice to print or save as PDF', async () => {
    const user = userEvent.setup()
    const printSpy = vi.fn()
    vi.stubGlobal('print', printSpy)
    render(<Flow onExit={noop} />)

    await completeFlow(user)

    await user.click(screen.getByRole('button', { name: /print or save as PDF/i }))
    expect(printSpy).toHaveBeenCalled()

    vi.unstubAllGlobals()
  })

  it('lets a person copy the link to come back or share', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })
    render(<Flow onExit={noop} />)

    await completeFlow(user)

    await user.click(screen.getByRole('button', { name: /copy link/i }))
    expect(writeText).toHaveBeenCalled()
    expect(await screen.findByRole('button', { name: /link copied/i })).toBeInTheDocument()
  })
})

describe('First Step Out analytics', () => {
  const w = window as PendoWindow
  let pendoTrack: ReturnType<typeof vi.fn>

  beforeEach(() => {
    pendoTrack = vi.fn()
    w.pendo = { track: pendoTrack as (...args: unknown[]) => void }
  })

  afterEach(() => {
    delete w.pendo
  })

  it('records reaching a step without recording the answer', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await startQuestions(user)
    expect(pendoTrack).toHaveBeenCalledWith('fso_step_view', { step: 'tdcj' })

    await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))

    expect(pendoTrack).toHaveBeenCalledWith('fso_step_view', { step: 'birth' })

    const everyArg = JSON.stringify(pendoTrack.mock.calls)
    expect(everyArg).not.toContain('parole')
    expect(everyArg).not.toContain('yes')
  })

  it('records finishing the flow', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await completeFlow(user)

    expect(pendoTrack).toHaveBeenCalledWith('fso_result_view', undefined)
  })

  it('records which resource link a person opens, without the answers', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await startQuestions(user)
    // A path that leaves citizenship missing, so the birth certificate link shows.
    await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /do not have either one/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /i have the card/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /with family or a friend/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /none of these right now/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /none of these apply/i }))
    await user.click(screen.getByRole('button', { name: /see my documents/i }))

    await user.click(screen.getAllByRole('link', { name: /order online at Texas\.gov/i })[0])

    expect(pendoTrack).toHaveBeenCalledWith('fso_link', { target: 'birth_cert' })
  })

  it('records opening the list of papers that count for an area', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await startQuestions(user)
    await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /do not have either one/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /i have the card/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /with family or a friend/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /none of these right now/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /none of these apply/i }))
    await user.click(screen.getByRole('button', { name: /see my documents/i }))

    const citizenship = screen.getByRole('region', { name: /proof you are a u\.s\. citizen/i })
    await user.click(within(citizenship).getByText('You still need 1 of these'))

    expect(pendoTrack).toHaveBeenCalledWith('fso_options_open', { area: 'citizenship' })
  })
})
