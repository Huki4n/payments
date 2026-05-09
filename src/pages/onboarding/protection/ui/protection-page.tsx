import { useTranslation } from "react-i18next";

import { markOnboardingCompleted } from "@/entities/onboarding-status";

import { PageFrame as OnboardingFrame } from "@/shared/ui";
import hexagonSvg from "../../assets/hexagon.svg";
import bg from "../../assets/bg.png";

export const ProtectionPage = () => {
  const { t } = useTranslation("onboarding");

  return (
    <OnboardingFrame
      background={bg}
      title={t("protection.title")}
      description={t("protection.description")}
      step={2}
      primaryLabel={t("protection.primary")}
      primaryTo="/auth"
      secondaryTo="/auth"
      onPrimary={markOnboardingCompleted}
      illustration={
        <img
          src={hexagonSvg}
          alt=""
          aria-hidden
          className="pointer-events-none aspect-[425/386] w-auto select-none"
        />
      }
    />
  );
};
