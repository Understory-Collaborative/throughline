import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Throughline landing page', () => {
  it('has a single top-level heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('names the product and the first feature', () => {
    render(<App />)

    expect(screen.getAllByText(/throughline/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/first step out/i).length).toBeGreaterThan(0)
  })

  it('always offers the same clear way to start', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /start first step out/i })).toBeInTheDocument()
  })

  it('does not invite a person to pick up where they left off', () => {
    render(<App />)

    expect(
      screen.queryByRole('button', { name: /pick up where you left off/i }),
    ).not.toBeInTheDocument()
  })

  it('names the Texas scope and that more states are coming', () => {
    render(<App />)

    expect(screen.getByText(/texas for now, more states coming/i)).toBeInTheDocument()
  })

  it('shows a feature nav with First Step Out and the upcoming features', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: /throughline features/i })
    expect(within(nav).getByRole('button', { name: /first step out/i })).toBeInTheDocument()
    expect(within(nav).getByText(/on time/i)).toBeInTheDocument()
    expect(within(nav).getByText(/fair shot/i)).toBeInTheDocument()
  })

  it('marks the upcoming features as coming soon and not yet startable', () => {
    render(<App />)

    // Two features carry a "Soon" badge in the nav and "Coming soon" on cards.
    expect(screen.getAllByText(/^soon$/i).length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText(/coming soon/i)).toHaveLength(2)
  })

  it('explains what each feature does', () => {
    render(<App />)

    expect(screen.getByText(/never miss a court date/i)).toBeInTheDocument()
    expect(screen.getByText(/employers who actually hire people with records/i)).toBeInTheDocument()
  })

  it('returns to the home page when the brand mark is clicked from the flow', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /start first step out/i }))
    expect(screen.queryByRole('button', { name: /start first step out/i })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /throughline, go to the home page/i }))

    expect(screen.getByRole('button', { name: /start first step out/i })).toBeInTheDocument()
  })

  it('leads its privacy promise with protecting privacy', () => {
    render(<App />)

    expect(screen.getByText(/your privacy comes first/i)).toBeInTheDocument()
  })

  it('does not collect a name or account (privacy stance)', () => {
    render(<App />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
  })
})
