import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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

  it('does not collect a name or account (privacy stance)', () => {
    render(<App />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
  })
})
