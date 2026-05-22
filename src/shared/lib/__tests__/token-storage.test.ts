import { beforeEach, describe, expect, it } from 'vitest'

import { tokenStorage } from '../token-storage'

describe('tokenStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null when tokens are not set', () => {
    expect(tokenStorage.getAccessToken()).toBeNull()
    expect(tokenStorage.getRefreshToken()).toBeNull()
  })

  it('stores and reads access token', () => {
    tokenStorage.setTokens('access-token')

    expect(tokenStorage.getAccessToken()).toBe('access-token')
    expect(tokenStorage.getRefreshToken()).toBeNull()
  })

  it('stores and reads both tokens', () => {
    tokenStorage.setTokens('access-token', 'refresh-token')

    expect(tokenStorage.getAccessToken()).toBe('access-token')
    expect(tokenStorage.getRefreshToken()).toBe('refresh-token')
  })

  it('clears stored tokens', () => {
    tokenStorage.setTokens('access-token', 'refresh-token')

    tokenStorage.clear()

    expect(tokenStorage.getAccessToken()).toBeNull()
    expect(tokenStorage.getRefreshToken()).toBeNull()
  })
})
