import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAddContributionMutation } from "@/entities/goal";
import { getApiErrorMessage } from "@/entities/session";
import { Button, Input, Label } from "@/shared/ui";

import { EDIT_GOAL_ACTION_BTN_CLASS } from "../config/form-ui";
import { parseGoalAmount } from "../lib/parse-goal-amount";

export interface EditGoalWithdrawFormProps {
  goalId: number | null;
  disabled?: boolean;
  resetKey?: number | null;
}

export const EditGoalWithdrawForm = ({
  goalId,
  disabled = false,
  resetKey,
}: EditGoalWithdrawFormProps) => {
  const { t } = useTranslation("home");
  const [addContribution, { isLoading }] = useAddContributionMutation();

  const form = useForm<{ amount: string }>({
    defaultValues: { amount: "" },
    mode: "onSubmit",
  });

  const isBusy = disabled || isLoading;

  const onSubmit = form.handleSubmit(async ({ amount: raw }) => {
    if (goalId == null) return;

    const amount = parseGoalAmount(raw);
    if (amount == null) {
      form.setError("amount", {
        message: t("savingsPage.editGoal.errors.invalidAmount"),
      });
      return;
    }

    try {
      await addContribution({
        goalId,
        body: { amount: -amount, type: "MANUAL" },
      }).unwrap();
      form.reset({ amount: "" });
    } catch (error) {
      form.setError("root", {
        message: getApiErrorMessage(
          error,
          t("savingsPage.editGoal.errors.withdrawal"),
        ),
      });
    }
  });

  return (
    <form
      key={`withdraw-${resetKey ?? "closed"}`}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-3"
    >
      <h3 className="font-display text-lg font-bold text-brand-purple">
        {t("savingsPage.editGoal.withdrawSection")}
      </h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_8.75rem] sm:items-end">
        <div className="flex min-w-0 flex-col gap-2">
          <Label htmlFor="edit-goal-withdraw">
            {t("savingsPage.editGoal.amountLabel")}
          </Label>
          <Input
            id="edit-goal-withdraw"
            type="number"
            min={0.01}
            step={0.01}
            inputMode="decimal"
            disabled={isBusy}
            placeholder="0"
            {...form.register("amount")}
            className="font-display"
          />
          {form.formState.errors.amount?.message ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.amount.message}
            </p>
          ) : null}
        </div>
        <Button
          type="submit"
          variant="outline"
          disabled={isBusy}
          className={EDIT_GOAL_ACTION_BTN_CLASS}
        >
          {t("savingsPage.editGoal.withdraw")}
        </Button>
      </div>
      {form.formState.errors.root?.message ? (
        <p className="text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      ) : null}
    </form>
  );
};
