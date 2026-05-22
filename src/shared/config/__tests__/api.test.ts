import { describe, expect, it } from 'vitest'

import { normalizeApiBase } from '../api'

describe('normalizeApiBase', () => {
  it('returns default when value is empty', () => {
    expect(normalizeApiBase()).toBe('/api/v1')
    expect(normalizeApiBase('')).toBe('/api/v1')
    expect(normalizeApiBase('   ')).toBe('/api/v1')
  })

  it('trims whitespace', () => {
    expect(normalizeApiBase('  https://api.example.com  ')).toBe('https://api.example.com')
  })

  it('removes trailing slash', () => {
    expect(normalizeApiBase('/api/v1/')).toBe('/api/v1')
    expect(normalizeApiBase('https://api.example.com/')).toBe('https://api.example.com')
  })

  it('keeps url without trailing slash unchanged', () => {
    expect(normalizeApiBase('/api/v2')).toBe('/api/v2')
  })
})
