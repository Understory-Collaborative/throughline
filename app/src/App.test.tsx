import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const PROGRESS_KEY = 'throughline.firstStepOut.startedAt'

describe('First Step Out starting screen', () => {
  it('shows the Start action for a first-time visitor', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /first step out/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^start$/i })).toBeInTheDocument()
  })

  it('records progress on the device when the visitor starts', async () => {
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: /^start$/i }))

    expect(localStorage.getItem(PROGRESS_KEY)).not.toBeNull()
  })

  it('invites a returning visitor to pick up where they left off', () => {
    localStorage.setItem(PROGRESS_KEY, new Date().toISOString())

    render(<App />)

    expect(
      screen.getByRole('button', { name: /pick up where you left off/i }),
    ).toBeInTheDocument()
  })

  it('does not collect a name or account (privacy stance)', () => {
    render(<App />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
  })
})
