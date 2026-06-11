import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { track } from './analytics'

type PendoWindow = typeof window & { pendo?: { track?: (...args: unknown[]) => void } }

const w = window as PendoWindow

describe('analytics.track', () => {
  beforeEach(() => {
    delete w.pendo
  })

  afterEach(() => {
    delete w.pendo
  })

  it('sends the event name and its properties to Pendo', () => {
    const pendoTrack = vi.fn()
    w.pendo = { track: pendoTrack as (...args: unknown[]) => void }

    track({ name: 'fso_step_view', step: 'housing' })

    expect(pendoTrack).toHaveBeenCalledWith('fso_step_view', { step: 'housing' })
  })

  it('sends no properties object for events that carry none', () => {
    const pendoTrack = vi.fn()
    w.pendo = { track: pendoTrack as (...args: unknown[]) => void }

    track({ name: 'fso_result_view' })

    expect(pendoTrack).toHaveBeenCalledWith('fso_result_view', undefined)
  })

  it('does nothing when the Pendo agent is absent', () => {
    expect(() => track({ name: 'fso_restart' })).not.toThrow()
  })

  it('never lets a Pendo failure break the flow', () => {
    w.pendo = {
      track: () => {
        throw new Error('pendo blocked')
      },
    }

    expect(() => track({ name: 'fso_result_view' })).not.toThrow()
  })
})
