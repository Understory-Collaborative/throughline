import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MarcusSituationCard } from './MarcusSituationCard'

/**
 * The card narrates one person's situation in plain words, on cream, with no
 * face and no stated race. These tests guard the facts, the dignity framing,
 * and the no-photo rule.
 */
describe('MarcusSituationCard', () => {
  it('introduces Marcus by name and age', () => {
    render(<MarcusSituationCard />)
    expect(screen.getByText(/meet marcus/i)).toBeInTheDocument()
    expect(screen.getByText(/34/)).toBeInTheDocument()
  })

  it('states the facts of his situation', () => {
    render(<MarcusSituationCard />)
    const card = screen.getByRole('group', { name: /marcus/i })
    const text = card.textContent ?? ''
    expect(text).toMatch(/three weeks/i)
    expect(text).toMatch(/four-year sentence/i)
    expect(text).toMatch(/I-9/)
    expect(text).toMatch(/sister's couch/i)
    expect(text).toMatch(/Arlington/i)
    expect(text).toMatch(/Social Security card/i)
    expect(text).toMatch(/expired/i)
    expect(text).toMatch(/birth certificate/i)
    expect(text).toMatch(/bus to DPS twice/i)
  })

  it('uses no images, so it never assumes a face or a race', () => {
    const { container } = render(<MarcusSituationCard />)
    expect(container.querySelector('img')).toBeNull()
  })

  it('accepts an overridden name and age for reuse with other personas', () => {
    render(<MarcusSituationCard name="Dana" age={29} />)
    expect(screen.getByText(/meet dana/i)).toBeInTheDocument()
    expect(screen.getByText(/29/)).toBeInTheDocument()
  })
})
