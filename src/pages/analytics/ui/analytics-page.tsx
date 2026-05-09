import { AppLayout } from "@/app/layouts";
import { AccountBalance } from "@/widgets/account-balance";
import { HomeNavigation } from "@/widgets/home-navigation/ui/home-navigation";

export const AnalyticsPage = () => {
  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance />
        </>
      }
    >
      <div>AnalyticsPage</div>
    </AppLayout>
  );
};
