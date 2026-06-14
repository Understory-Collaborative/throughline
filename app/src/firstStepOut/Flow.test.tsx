import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Flow } from './Flow'

function noop() {}

type PendoWindow = typeof window & { pendo?: { track?: (...args: unknown[]) => void } }

/** Walk through every question with a set of answers that fully covers DPS. */
async function completeFlow(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))

  await user.click(screen.getByRole('radio', { name: /my birth certificate/i }))
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
  it('starts on the first question with Continue disabled until a choice is made', () => {
    render(<Flow onExit={noop} />)

    expect(
      screen.getByRole('heading', { level: 1, name: /on parole, or are you fully done/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()
  })

  it('enables Continue once an answer is picked', async () => {
    render(<Flow onExit={noop} />)

    await userEvent.click(screen.getByRole('radio', { name: /on parole or supervision/i }))

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
      screen.getByRole('heading', { level: 1, name: /on parole, or are you fully done/i }),
    ).toBeInTheDocument()
  })

  it('lets a person back out of the first question to the landing page', async () => {
    let exited = false
    render(<Flow onExit={() => (exited = true)} />)

    await userEvent.click(screen.getByRole('button', { name: /back/i }))

    expect(exited).toBe(true)
  })

  it('clears real picks when "None of these" is chosen, and the reverse', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await user.click(screen.getByRole('radio', { name: /on parole or supervision/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /my birth certificate/i }))
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
})
