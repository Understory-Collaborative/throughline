import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Flow } from './Flow'

function noop() {}

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
})
