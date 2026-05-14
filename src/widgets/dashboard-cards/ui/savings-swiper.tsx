import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  dashboardChartXAxisTick,
  dashboardChartYAxisTick,
} from "@/shared/lib/dashboard-chart-axes";
import { INITIAL_CHART_DIMENSION } from "@/shared/ui/chart-constants";
import { savingsSlidesMock } from "@/widgets/dashboard-cards/model/dashboard-mock";

import "swiper/css";
import "swiper/css/pagination";

export const SavingsSwiper = () => {
  const { t } = useTranslation("home");

  return (
    <>
      <style>
        {`
          .dashboard-savings-swiper .swiper-wrapper {
            align-items: stretch;
          }
          .dashboard-savings-swiper .swiper-slide {
            display: flex;
            box-sizing: border-box;
            height: auto;
            align-self: stretch;
          }
          .dashboard-savings-swiper .swiper-slide > .savings-slide-card {
            flex: 1 1 auto;
            width: 100%;
            min-height: 0;
          }
          .dashboard-savings-swiper .swiper-pagination-bullet {
            background: var(--dashboard-swiper-bullet-inactive);
            opacity: 1;
          }
          .dashboard-savings-swiper .swiper-pagination-bullet-active {
            background: var(--scrollbar-thumb);
          }
        `}
      </style>
      <section className="dashboard-savings-swiper pb-10">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="pb-8!"
        >
          {savingsSlidesMock.map((slide) => {
            const progress = Math.min(100, (slide.total / slide.goal) * 100);

            return (
              <SwiperSlide key={slide.id}>
                <div className="savings-slide-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:px-6 sm:py-6">
                  <div className="mb-4 shrink-0 flex items-center gap-2">
                    <h2 className="font-display text-base font-bold text-brand-purple sm:text-2xl md:text-3xl">
                      {t(`dashboard.${slide.titleKey}`)}
                    </h2>
                  </div>

                  <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                    <div className="flex min-h-0 flex-col gap-6 text-left">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="min-w-0 font-display text-lg font-bold leading-none text-brand-purple sm:text-md md:text-lg">
                            {t("dashboard.savingGoal")}
                          </span>
                          <span className="inline-flex min-w-35 items-center justify-center min-h-10 px-4 py-2 sm:px-6 font-display text-lg font-bold shrink-0 leading-none sm:text-xl md:text-2xl">
                            {slide.goal}$
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="min-w-0 font-display text-lg font-bold leading-none text-brand-purple sm:text-md md:text-lg">
                            {t("dashboard.savingTotal")}
                          </span>
                          <span className="inline-flex min-w-35 items-center justify-center min-h-10 px-4 py-2 sm:px-6 font-display text-lg font-bold shrink-0 leading-none text-brand-purple sm:text-xl md:text-2xl rounded-2xl bg-dashboard-income-pill">
                            {slide.total}$
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 font-display text-xs font-medium text-brand-purple/80 sm:text-sm">
                          {t("dashboard.savingsReplenishments")}
                        </p>
                        <ul className="flex min-h-35 flex-col gap-2">
                          {slide.replenishments.map((r, idx) => (
                            <li
                              key={`${slide.id}-${r.date}-${idx}`}
                              className="flex items-center justify-between gap-2 rounded-xl bg-card/95 px-3 py-2 shadow-sm"
                            >
                              <span className="font-display text-xs text-brand-purple sm:text-sm">
                                {r.date}
                              </span>
                              <span className="rounded-lg bg-dashboard-income-pill px-2 py-1 font-display text-xs font-bold text-brand-purple sm:text-sm min-w-26 text-center">
                                {r.amount}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="h-52 w-full min-w-0 lg:h-full lg:min-h-64">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        initialDimension={INITIAL_CHART_DIMENSION}
                      >
                        <AreaChart
                          data={slide.progressChart.map((p) => ({
                            month: p.month,
                            value: p.value,
                          }))}
                          margin={{ top: 4, right: 8, left: 8, bottom: 8 }}
                        >
                          <defs>
                            <linearGradient
                              id={`savingFill-${slide.id}`}
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
                            padding={{ right: 16, left: 8 }}
                          />
                          <YAxis
                            tick={dashboardChartYAxisTick}
                            tickLine={false}
                            axisLine={false}
                            width={48}
                          />
                          <Tooltip
                            content={({ active, payload }) =>
                              active && payload?.length ? (
                                <div
                                  className="rounded-lg border bg-card px-2 py-1.5 shadow-md"
                                  style={{
                                    borderColor:
                                      "var(--dashboard-tooltip-border)",
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
                            fill={`url(#savingFill-${slide.id})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <p className="text-left font-display text-sm font-bold text-brand-purple">
                      {t("dashboard.savingProgress")}
                    </p>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-card/90 shadow-inner">
                      <div
                        className="h-full rounded-full bg-linear-to-r transition-[width] duration-500"
                        style={{
                          width: `${progress}%`,
                          background:
                            "linear-gradient(to right, var(--dashboard-progress-start), var(--dashboard-progress-end))",
                        }}
                      />
                    </div>
                    <div className="flex justify-end pt-1">
                      <Link
                        to="/saves"
                        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-purple-bg px-5 font-display text-xs font-bold text-white transition-colors hover:bg-brand-purple-bg/90 sm:text-sm"
                      >
                        {t("dashboard.configureSavings")}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};
