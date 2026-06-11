/**
 * Scroll back to the top when a new screen mounts, honoring the reduced-motion
 * preference. Guards each browser call so the flow also runs under test
 * environments that do not implement them.
 */
export function scrollToTop() {
  if (typeof window === 'undefined') return

  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (typeof window.scrollTo === 'function') {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }
}
