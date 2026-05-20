const ACCESS = 'payments.accessToken'
const REFRESH = 'payments.refreshToken'

export const tokenStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS)
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH)
  },

  setTokens(accessToken: string, refreshToken?: string | null): void {
    localStorage.setItem(ACCESS, accessToken)
    if (refreshToken != null) {
      localStorage.setItem(REFRESH, refreshToken)
    }
  },

  clear(): void {
    localStorage.removeItem(ACCESS)
    localStorage.removeItem(REFRESH)
  },
}
