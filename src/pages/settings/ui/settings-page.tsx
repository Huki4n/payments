import { AppLayout } from "@/app/layouts";
import { HomeNavigation } from "@/widgets/home-navigation";

export const SettingsPage = () => {
  return (
    <AppLayout header={<HomeNavigation />}>
      <div>SettingsPage</div>
    </AppLayout>
  );
};
