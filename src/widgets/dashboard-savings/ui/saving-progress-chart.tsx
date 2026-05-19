import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  dashboardChartXAxisTick,
  dashboardChartYAxisTick,
} from "@/shared/lib/dashboard-chart-axes";
import { INITIAL_CHART_DIMENSION } from "@/shared/ui/chart-constants";

import type { SavingsSlide } from "@/entities/goal";

const TICK_COUNT = 5;

function getSavingsYAxisConfig(values: number[]): {
  domain: [number, number];
  ticks: number[];
} {
  const maxVal = Math.max(...values, 1);
  const top = Math.max(Math.ceil((maxVal * 1.08) / 1000) * 1000, 1000);
  const step = top / TICK_COUNT;
  return {
    domain: [0, top],
    ticks: Array.from({ length: TICK_COUNT }, (_, i) => (i + 1) * step),
  };
}

interface SavingProgressChartProps {
  slideId: string;
  progressChart: SavingsSlide["progressChart"];
}

export const SavingProgressChart = ({
  slideId,
  progressChart,
}: SavingProgressChartProps) => {
  const data = progressChart.map((p) => ({
    month: p.month,
    value: p.value,
  }));
  const yAxis = getSavingsYAxisConfig(data.map((d) => d.value));

  return (
    <div className="pt-3 h-full min-h-0 w-full min-w-0 overflow-hidden rounded-[19px] bg-(--dashboard-savings-chart-surface) shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand-purple)_6%,transparent)] dark:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_10%,transparent)]">
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={INITIAL_CHART_DIMENSION}
      >
        <AreaChart
          data={data}
          margin={{ top: 4, right: 0, left: 8, bottom: 8 }}
        >
          <defs>
            <linearGradient
              id={`savingFill-${slideId}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--dashboard-chart-violet)"
                stopOpacity={0.45}
              />
              <stop
                offset="100%"
                stopColor="var(--dashboard-chart-violet)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 6"
            stroke="var(--dashboard-chart-grid-soft)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={dashboardChartXAxisTick}
            tickLine={false}
            axisLine={false}
            padding={{ right: 8, left: 8 }}
          />
          <YAxis
            domain={yAxis.domain}
            ticks={yAxis.ticks}
            tick={dashboardChartYAxisTick}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(v) => String(Math.round(v))}
          />
          <Tooltip
            content={({ active, payload }) =>
              active && payload?.length ? (
                <div
                  className="rounded-lg border bg-card px-2 py-1.5 shadow-md"
                  style={{
                    borderColor: "var(--dashboard-tooltip-border)",
                  }}
                >
                  <p className="font-display text-xs font-semibold text-brand-purple">
                    {payload[0]?.value}$
                  </p>
                </div>
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--dashboard-chart-violet)"
            strokeWidth={2}
            fill={`url(#savingFill-${slideId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
