import { useTranslation } from "react-i18next";

export interface AccountBalanceProps {
  userName?: string;
  integerPart?: string;
  fractionPart?: string;
}

export const AccountBalance = ({
  userName = "Rodion",
  integerPart = "$0",
  fractionPart = ".00",
}: AccountBalanceProps) => {
  const { t } = useTranslation("home");

  return (
    <section className="relative z-10 px-4 pt-6 text-center text-white sm:px-6 sm:pt-8">
      <h1 className="font-display text-xl font-bold leading-tight sm:text-2xl md:text-3xl">
        {t("welcome", { name: userName })}
      </h1>
      <p className="mt-6 font-display text-3xl font-bold leading-none   sm:text-4xl md:text-5xl">
        <span>{integerPart}</span>
        <span className="text-white/50">{fractionPart}</span>
      </p>
      <p className="mx-auto mt-2 max-w-md font-display text-xs font-normal leading-snug text-white/90 sm:text-sm md:text-base">
        {t("balanceLabel")}
      </p>
    </section>
  );
};
