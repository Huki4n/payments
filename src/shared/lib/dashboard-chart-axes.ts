/** Подписи осей dashboard-графиков (Recharts SVG). */
export const dashboardChartAxisFontFamily = "var(--font-chart-alternates)";

export const dashboardChartXAxisTick = {
  fill: "var(--dashboard-chart-tick)",
  fontSize: 11,
  fontFamily: dashboardChartAxisFontFamily,
  fontWeight: 700,
  textAnchor: "end" as const,
} as const;

export const dashboardChartYAxisTick = {
  fill: "var(--dashboard-chart-tick-muted)",
  fontSize: 13,
  fontFamily: dashboardChartAxisFontFamily,
  fontWeight: 400,
} as const;
