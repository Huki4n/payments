import { AppLayout } from "@/app/layouts";
import { AccountBalance } from "@/widgets/account-balance";
import {
  DashboardTransactionsCard,
  MonthlySpendsCard,
  SavingsSwiper,
  YearlyFinanceCard,
} from "@/widgets/dashboard-cards";
import { HomeNavigation } from "@/widgets/home-navigation";

export const HomePage = () => {
  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance integerPart="$1650" fractionPart=".40" />
        </>
      }
    >
      <div className="-mx-3 -mt-4 rounded-t-4xl px-3 pb-12 pt-6 sm:-mx-4 sm:px-4 md:pt-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:gap-8">
          <YearlyFinanceCard />
          <DashboardTransactionsCard />
          <MonthlySpendsCard />
          <SavingsSwiper />
        </div>
      </div>
    </AppLayout>
  );
};
