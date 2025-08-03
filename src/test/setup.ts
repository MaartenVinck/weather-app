import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

// Clean up after each test case
afterEach(() => {
  cleanup()
})

// Mock environment variables
Object.defineProperty(import.meta, "env", {
  value: {
    VITE_WEATHERSTACK_API_KEY: "test-api-key",
  },
})

// Mock fetch globally
global.fetch = vi.fn()

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
}
