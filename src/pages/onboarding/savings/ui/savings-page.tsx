import { useTranslation } from "react-i18next";

import { PageFrame as OnboardingFrame } from "@/shared/ui";
import slidersSvg from "../assets/sliders.svg";
import bg from "../../protection/assets/bg.png";

export const SavingsPage = () => {
  const { t } = useTranslation("onboarding");

  return (
    <OnboardingFrame
      background={bg}
      title={t("savings.title")}
      description={t("savings.description")}
      step={1}
      primaryLabel={t("common.next")}
      primaryTo="/onboarding/protection"
      secondaryLabel={t("common.skip")}
      secondaryTo="/auth"
      illustration={
        <img
          src={slidersSvg}
          alt=""
          aria-hidden
          width={286}
          height={326}
          className="absolute left-1/2 top-1/2 aspect-[286/326] h-full w-auto -translate-x-1/2 -translate-y-1/2 select-none"
        />
      }
    />
  );
};
