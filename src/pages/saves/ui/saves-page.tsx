import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { AppLayout } from "@/app/layouts";
import { useSavingsSlides } from "@/entities/goal";
import { AccountBalance } from "@/widgets/account-balance";
import { SavingsSwiper } from "@/widgets/dashboard-savings";
import { HomeNavigation } from "@/widgets/home-navigation";

export const SavesPage = () => {
  const { t } = useTranslation("home");
  const { slides, isLoading, isError } = useSavingsSlides();

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance integerPart="$1650" fractionPart=".40" />
        </>
      }
    >
      <div className="rounded-t-4xl px-3 pb-12 sm:px-4">
        <div className="mx-auto flex max-w-5xl flex-col gap-2">
          {isError ? (
            <p className="rounded-4xl bg-dashboard-card px-6 py-10 text-center font-display text-lg text-destructive">
              {t("savingsPage.loadError")}
            </p>
          ) : (
            <SavingsSwiper
              showConfigureSavingsLink={false}
              slides={slides}
              isLoading={isLoading}
              loadingMessage={t("savingsPage.loading")}
              emptyMessage={t("savingsPage.empty")}
            />
          )}
          <div className="flex justify-end">
            <Link
              to="/profile"
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-purple-bg px-5 font-display text-xs font-bold text-white transition-colors hover:bg-brand-purple-bg/90 sm:text-sm"
            >
              {t("savingsPage.addNewSaving")}
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
