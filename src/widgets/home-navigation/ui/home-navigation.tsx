import { useTranslation } from "react-i18next";
import {
  ArrowLeftRight,
  BarChart3,
  Home,
  PiggyBank,
  Settings,
  UserRound,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { cn } from "@/shared/ui/utils";

const navLinkClass =
  "flex rounded-full px-4 py-1.5 font-display text-sm font-normal whitespace-nowrap transition-colors sm:px-4.5 sm:py-1.5 sm:text-base md:text-lg";

const navItemInactive =
  "border border-white/30 text-white/50 hover:border-white/50 hover:text-white/80";

const navItemActive = "bg-brand-blue text-white shadow-sm";

export const HomeNavigation = () => {
  const { t } = useTranslation("home");

  return (
    <nav className="relative z-20 flex w-full flex-wrap items-center justify-between gap-3 px-4 pt-2 sm:gap-4 sm:px-6 sm:pt-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/settings"
          className="rounded-full p-2 text-white outline-offset-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white sm:p-2.5"
          aria-label={t("settingsAria")}
        >
          <Settings className="size-8 stroke-[1.5]" />
        </Link>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3 md:flex-none">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(navLinkClass, isActive ? navItemActive : navItemInactive)
            }
          >
            <span className="inline-flex items-center gap-1.5">
              <Home className="hidden size-5 sm:inline md:size-6" />
              {t("nav.home")}
            </span>
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              cn(navLinkClass, isActive ? navItemActive : navItemInactive)
            }
          >
            <span className="inline-flex items-center gap-1.5">
              <ArrowLeftRight className="hidden size-5 sm:inline md:size-6" />
              {t("nav.transactions")}
            </span>
          </NavLink>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3 md:flex-none">
        <NavLink
          to="/saves"
          className={({ isActive }) =>
            cn(navLinkClass, isActive ? navItemActive : navItemInactive)
          }
        >
          <span className="inline-flex items-center gap-1.5">
            <PiggyBank className="hidden size-5 sm:inline md:size-6" />
            {t("nav.savings")}
          </span>
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            cn(navLinkClass, isActive ? navItemActive : navItemInactive)
          }
        >
          <span className="inline-flex items-center gap-1.5">
            <BarChart3 className="hidden size-5 sm:inline md:size-6" />
            {t("nav.analytics")}
          </span>
        </NavLink>
        <Link
          to="/profile"
          className="rounded-full border border-white/30 p-2 text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-2.5"
          aria-label={t("profileAria")}
        >
          <UserRound className="size-6 sm:size-7" strokeWidth={1.5} />
        </Link>
      </div>
    </nav>
  );
};
