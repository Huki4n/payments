import { describe, expect, it } from 'vitest'

import { normalizePhone } from '../normalize-phone'

describe('normalizePhone', () => {
  it('keeps 7XXXXXXXXXX as is', () => {
    expect(normalizePhone('79005797475')).toBe('79005797475')
  })

  it('converts +7XXXXXXXXXX to 7XXXXXXXXXX', () => {
    expect(normalizePhone('+79005797475')).toBe('79005797475')
  })

  it('converts 8XXXXXXXXXX to 7XXXXXXXXXX', () => {
    expect(normalizePhone('89005797475')).toBe('79005797475')
  })

  it('prepends 7 to 10-digit local number', () => {
    expect(normalizePhone('9005797475')).toBe('79005797475')
  })

  it('strips formatting characters', () => {
    expect(normalizePhone('+7 (900) 579-74-75')).toBe('79005797475')
  })
})
