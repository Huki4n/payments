import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { format, subDays, subMonths, subYears } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { DashboardCalendarIcon } from "@/shared/ui/icons/category-icons";

type PeriodPreset = "all" | "week" | "month" | "3m" | "6m" | "year" | "custom";

const PRESETS: { id: Exclude<PeriodPreset, "custom">; row: 1 | 2 }[] = [
  { id: "week", row: 1 },
  { id: "month", row: 1 },
  { id: "3m", row: 1 },
  { id: "6m", row: 2 },
  { id: "year", row: 2 },
  { id: "all", row: 2 },
];

function formatRange(range: DateRange | undefined, allLabel: string) {
  if (!range?.from) {
    return allLabel;
  }
  const a = format(range.from, "dd.MM.yyyy");
  if (!range.to) {
    return `${a} — …`;
  }
  const b = format(range.to, "dd.MM.yyyy");
  return `${a} — ${b}`;
}

export const AnalyticsPeriodSelector = () => {
  const { t } = useTranslation("home");
  const [preset, setPreset] = useState<PeriodPreset>("all");
  const [range, setRange] = useState<DateRange | undefined>();

  const rangeLabel = useMemo(
    () => formatRange(range, t("analyticsPage.periodRangePlaceholder")),
    [range, t],
  );

  const applyPreset = (id: Exclude<PeriodPreset, "custom">) => {
    setPreset(id);
    const now = new Date();
    if (id === "all") {
      setRange(undefined);
      return;
    }
    if (id === "week") {
      setRange({ from: subDays(now, 7), to: now });
      return;
    }
    if (id === "month") {
      setRange({ from: subMonths(now, 1), to: now });
      return;
    }
    if (id === "3m") {
      setRange({ from: subMonths(now, 3), to: now });
      return;
    }
    if (id === "6m") {
      setRange({ from: subMonths(now, 6), to: now });
      return;
    }
    if (id === "year") {
      setRange({ from: subYears(now, 1), to: now });
    }
  };

  const chipClass =
    "inline-flex shrink-0 items-center justify-center rounded-lg border border-[rgba(167,191,255,0.8)] px-3 font-display text-xs font-bold text-brand-purple transition-colors sm:px-4 sm:text-sm";

  return (
    <section className="flex gap-4 rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:px-6 sm:py-4">
      <h2 className="max-w-40 font-display text-lg font-bold text-brand-purple sm:text-xl md:text-2xl">
        {t("analyticsPage.selectPeriod")}
      </h2>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-full min-h-11 w-full max-w-md justify-center gap-4 rounded-2xl border-0 bg-white px-5 py-3 font-display text-sm font-medium text-brand-purple/80 shadow-sm hover:bg-white/95 sm:text-base lg:w-auto"
            >
              <span>{rangeLabel}</span>
              <DashboardCalendarIcon className="size-8 shrink-0 text-[#0147FFCC]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={(next) => {
                setRange(next);
                setPreset("custom");
              }}
              numberOfMonths={2}
              className="rounded-lg"
            />
          </PopoverContent>
        </Popover>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {PRESETS.filter((p) => p.row === 1).map(({ id }) => (
              <Button
                key={id}
                variant="ghost"
                type="button"
                onClick={() => applyPreset(id)}
                className={cn(
                  chipClass,
                  preset === id &&
                    "border-transparent bg-brand-blue text-white",
                )}
              >
                {t(`analyticsPage.preset.${id}`)}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {PRESETS.filter((p) => p.row === 2).map(({ id }) => (
              <Button
                key={id}
                variant="ghost"
                type="button"
                onClick={() => applyPreset(id)}
                className={cn(
                  chipClass,
                  preset === id &&
                    "border-transparent bg-brand-blue text-white",
                )}
              >
                {t(`analyticsPage.preset.${id}`)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
