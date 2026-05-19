interface SavingGoalHeaderProps {
  title: string;
}

export const SavingGoalHeader = ({ title }: SavingGoalHeaderProps) => {
  return (
    <div className="shrink-0 flex items-center gap-2">
      <h2 className="font-display text-base font-bold text-brand-purple sm:text-2xl md:text-3xl">
        {title}
      </h2>
    </div>
  );
};
