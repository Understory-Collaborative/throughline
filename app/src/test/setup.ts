import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Keep tests isolated: unmount the React tree and clear on-device state between
// tests so localStorage from one test cannot leak into the next.
afterEach(() => {
  cleanup()
  localStorage.clear()
})
