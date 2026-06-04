/** Подпись месяца на оси: при нескольких годах добавляем год (`Авг 25`). */
export function formatAnalyticsChartMonthLabel(
  monthId: string,
  monthLabel: string,
  spansMultipleYears: boolean
): string {
  if (!spansMultipleYears) {
    return monthLabel
  }

  const year = monthId.slice(0, 4)

  return `${monthLabel} ${year.slice(2)}`
}
