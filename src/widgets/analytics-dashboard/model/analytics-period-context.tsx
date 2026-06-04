import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { DateRange } from 'react-day-picker'

import {
  ANALYTICS_PRESET_RANGES,
  getAnalyticsPeriodRange,
  type AnalyticsApiRange,
  type AnalyticsPeriodPreset,
} from '../lib/get-analytics-period-range'

type AnalyticsPeriodContextValue = {
  preset: AnalyticsPeriodPreset
  range: DateRange | undefined
  setPreset: (preset: AnalyticsPeriodPreset) => void
  setRange: (range: DateRange | undefined) => void
  applyPreset: (id: Exclude<AnalyticsPeriodPreset, 'custom' | 'all'>) => void
  apiRange: AnalyticsApiRange
  chartFrom: Date
  chartTo: Date
}

const AnalyticsPeriodContext = createContext<AnalyticsPeriodContextValue | null>(null)

export function AnalyticsPeriodProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<AnalyticsPeriodPreset>('all')
  const [range, setRange] = useState<DateRange | undefined>()

  const { api, chartFrom, chartTo } = useMemo(
    () => getAnalyticsPeriodRange(preset, range),
    [preset, range]
  )

  const applyPreset = useCallback((id: Exclude<AnalyticsPeriodPreset, 'custom' | 'all'>) => {
    setPreset(id)
    setRange(ANALYTICS_PRESET_RANGES[id](new Date()))
  }, [])

  const value = useMemo(
    () => ({
      preset,
      range,
      setPreset,
      setRange,
      applyPreset,
      apiRange: api,
      chartFrom,
      chartTo,
    }),
    [api, applyPreset, chartFrom, chartTo, preset, range]
  )

  return <AnalyticsPeriodContext.Provider value={value}>{children}</AnalyticsPeriodContext.Provider>
}

export function useAnalyticsPeriod() {
  const context = useContext(AnalyticsPeriodContext)

  if (!context) {
    throw new Error('useAnalyticsPeriod must be used within AnalyticsPeriodProvider')
  }

  return context
}
