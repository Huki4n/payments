import { useContext } from 'react'

import { AnalyticsPeriodContext } from './analytics-period-context'

export function useAnalyticsPeriod() {
  const context = useContext(AnalyticsPeriodContext)

  if (!context) {
    throw new Error('useAnalyticsPeriod must be used within AnalyticsPeriodProvider')
  }

  return context
}
