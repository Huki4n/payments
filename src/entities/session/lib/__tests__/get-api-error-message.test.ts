import { describe, expect, it } from 'vitest'

import { getApiErrorMessage } from '../get-api-error-message'

describe('getApiErrorMessage', () => {
  const fallback = 'Something went wrong'

  it('returns fallback for unknown error', () => {
    expect(getApiErrorMessage(new Error('boom'), fallback)).toBe(fallback)
    expect(getApiErrorMessage(null, fallback)).toBe(fallback)
  })

  it('returns message from API response body', () => {
    const error = {
      status: 400,
      data: { message: 'Invalid credentials' },
    }

    expect(getApiErrorMessage(error, fallback)).toBe('Invalid credentials')
  })

  it('returns fallback when API message is empty', () => {
    const error = {
      status: 400,
      data: { message: '' },
    }

    expect(getApiErrorMessage(error, fallback)).toBe(fallback)
  })

  it('returns string error field when data message is missing', () => {
    const error = {
      status: 'FETCH_ERROR',
      error: 'Network error',
    }

    expect(getApiErrorMessage(error, fallback)).toBe('Network error')
  })
})
