import { useTranslation } from "react-i18next";

import { PageFrame as OnboardingFrame } from "@/shared/ui";
import welcomeIll from "../assets/welcome_ill.png";
import bg from "../../protection/assets/bg.png";

export const WelcomePage = () => {
  const { t } = useTranslation("onboarding");

  return (
    <OnboardingFrame
      background={bg}
      title={t("welcome.title")}
      primaryLabel={t("welcome.primary")}
      primaryTo="/onboarding/trading"
      secondaryLabel={t("welcome.secondary")}
      secondaryTo="/auth"
      illustration={
        <img src={welcomeIll} alt="Pie" className="w-200 object-cover" />
      }
    />
  );
};
