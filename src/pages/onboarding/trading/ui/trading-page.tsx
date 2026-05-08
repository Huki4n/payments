import { useTranslation } from "react-i18next";

import { PageFrame as OnboardingFrame } from "@/shared/ui";
import tradingIll from "../assets/trading_ill.png";
import bg from "../../protection/assets/bg.png";

export const TradingPage = () => {
  const { t } = useTranslation("onboarding");

  return (
    <OnboardingFrame
      background={bg}
      title={t("trading.title")}
      description={t("trading.description")}
      step={0}
      primaryLabel={t("common.next")}
      primaryTo="/onboarding/savings"
      secondaryLabel={t("common.skip")}
      secondaryTo="/auth"
      illustration={
        <img src={tradingIll} alt="Trading" className="w-120 object-cover" />
      }
    />
  );
};
