/**
 * Pendo analytics for First Step Out.
 *
 * We capture the shape of the funnel only: which screen a person reached, and
 * whether they finished. We never pass what a person answered. Their TDCJ
 * status, housing, and documents stay on the device. This rule is structural,
 * not a thing we remember each time. The AnalyticsEvent union below is the only
 * way to call track, so there is no field to put answer content in.
 *
 * See the privacy-as-safety pillar in the root CLAUDE.md and the Pendo snippet
 * in index.html.
 */
import type { QuestionId } from './content/firstStepOut'

export type AnalyticsEvent =
  | { name: 'fso_step_view'; step: QuestionId }
  | { name: 'fso_result_view' }
  | { name: 'fso_back'; from: QuestionId }
  | { name: 'fso_restart' }
  | { name: 'fso_resume' }

interface PendoAgent {
  track?: (name: string, properties?: Record<string, unknown>) => void
}

function getPendo(): PendoAgent | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as { pendo?: PendoAgent }).pendo
}

/**
 * Send one event to Pendo. No-ops when the agent is absent or blocked, and
 * never throws, so analytics can never break the flow.
 */
export function track(event: AnalyticsEvent): void {
  const pendo = getPendo()
  if (!pendo || typeof pendo.track !== 'function') return

  const { name, ...properties } = event
  try {
    pendo.track(name, Object.keys(properties).length > 0 ? properties : undefined)
  } catch {
    // Swallow. A failed analytics call is never worth interrupting a person.
  }
}
