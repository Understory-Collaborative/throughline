import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Flow } from './Flow'

function noop() {}

type PendoWindow = typeof window & { pendo?: { track?: (...args: unknown[]) => void } }

describe('First Step Out flow', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts on the first question with Continue disabled until a choice is made', () => {
    render(<Flow onExit={noop} />)

    expect(
      screen.getByRole('heading', { level: 1, name: /released from a Texas facility/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()
  })

  it('enables Continue once an answer is picked', async () => {
    render(<Flow onExit={noop} />)

    await userEvent.click(screen.getByRole('radio', { name: /Texas state facility or on parole/i }))

    expect(screen.getByRole('button', { name: /continue/i })).toBeEnabled()
  })

  it('walks through every step to a personalized result', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await user.click(screen.getByRole('radio', { name: /Texas state facility or on parole/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))

    await user.click(screen.getByRole('radio', { name: /my own place/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))

    // Multi-select: nothing chosen leaves Continue disabled.
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()
    await user.click(screen.getByRole('checkbox', { name: /utility or phone bill/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))

    await user.click(screen.getByRole('checkbox', { name: /registered Texas voter/i }))
    await user.click(screen.getByRole('button', { name: /see my documents/i }))

    expect(
      screen.getByRole('heading', { level: 1, name: /closer than you think/i }),
    ).toBeInTheDocument()

    const have = screen.getByRole('region', { name: /you already have this/i })
    expect(within(have).getByText(/TDCJ release or parole paperwork/i)).toBeInTheDocument()
    expect(within(have).getByText(/utility or phone bill/i)).toBeInTheDocument()
    expect(within(have).getByText(/voter registration card/i)).toBeInTheDocument()
  })

  it('resumes from saved on-device progress', () => {
    localStorage.setItem(
      'throughline.firstStepOut.state',
      JSON.stringify({ step: 1, answers: { tdcj: 'yes', housing: null, mail: [], extras: [] } }),
    )

    render(<Flow onExit={noop} />)

    expect(
      screen.getByRole('heading', { level: 1, name: /where are you staying/i }),
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

    await user.click(screen.getByRole('radio', { name: /Texas state facility or on parole/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /my own place/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))

    const utility = screen.getByRole('checkbox', { name: /utility or phone bill/i })
    const none = screen.getByRole('checkbox', { name: /none of these right now/i })

    await user.click(utility)
    expect(utility).toBeChecked()

    // Choosing "None of these" clears the real pick.
    await user.click(none)
    expect(none).toBeChecked()
    expect(utility).not.toBeChecked()

    // Choosing a real document again clears "None of these".
    await user.click(utility)
    expect(utility).toBeChecked()
    expect(none).not.toBeChecked()
  })
})

describe('First Step Out analytics', () => {
  const w = window as PendoWindow
  let pendoTrack: ReturnType<typeof vi.fn>

  beforeEach(() => {
    localStorage.clear()
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

    await user.click(screen.getByRole('radio', { name: /Texas state facility or on parole/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))

    expect(pendoTrack).toHaveBeenCalledWith('fso_step_view', { step: 'housing' })

    // The chosen value is never sent to Pendo.
    const everyArg = JSON.stringify(pendoTrack.mock.calls)
    expect(everyArg).not.toContain('parole')
    expect(everyArg).not.toContain('yes')
  })

  it('records finishing the flow', async () => {
    const user = userEvent.setup()
    render(<Flow onExit={noop} />)

    await user.click(screen.getByRole('radio', { name: /Texas state facility or on parole/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('radio', { name: /my own place/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /utility or phone bill/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('checkbox', { name: /registered Texas voter/i }))
    await user.click(screen.getByRole('button', { name: /see my documents/i }))

    expect(pendoTrack).toHaveBeenCalledWith('fso_result_view', undefined)
  })

  it('records resuming saved progress', () => {
    localStorage.setItem(
      'throughline.firstStepOut.state',
      JSON.stringify({ step: 1, answers: { tdcj: 'yes', housing: null, mail: [], extras: [] } }),
    )

    render(<Flow onExit={noop} />)

    expect(pendoTrack).toHaveBeenCalledWith('fso_resume', undefined)
  })
})
