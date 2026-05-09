import { useTranslation } from "react-i18next";

import { AppLayout } from "@/app/layouts";
import { DataActionButton } from "@/features/add-data-action";
import { AccountBalance } from "@/widgets/account-balance";
import { HomeNavigation } from "@/widgets/home-navigation";

import { HomeCardsIllustration } from "./home-cards-illustration";

export const HomePage = () => {
  const { t } = useTranslation("home");

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance />
        </>
      }
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-[#edf2ff] px-4 py-5 shadow-lg sm:rounded-3xl sm:px-6 sm:py-6 md:max-w-4xl md:px-8 md:py-8">
        <div className="grid items-center gap-4 md:grid-cols-[0.9fr_1fr] md:gap-6 lg:gap-8">
          <HomeCardsIllustration className="h-auto w-full max-w-full" />

          <div className="flex h-full flex-col gap-4 md:gap-5">
            <h2 className="font-display text-lg font-bold leading-tight text-brand-purple sm:text-xl md:text-2xl">
              {t("addData.title")}
            </h2>

            <div className="flex flex-col gap-2.5">
              <DataActionButton label={t("addData.manual")} />
              <p className="text-center font-display text-xs text-brand-purple/70 sm:text-sm">
                {t("addData.or")}
              </p>
              <DataActionButton label={t("addData.upload")} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
