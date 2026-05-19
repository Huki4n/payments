import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  getDefaultGoalDeadline,
  getMinGoalDeadline,
  useCreateGoalMutation,
} from "@/entities/goal";
import { GOAL_CURRENCIES } from "@/shared/config/currencies";
import { getApiErrorMessage } from "@/entities/session";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  NativeSelect,
} from "@/shared/ui";

import type { CreateGoalFormValues } from "../model/create-goal-form-values";

export interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateGoalDialog = ({
  open,
  onOpenChange,
}: CreateGoalDialogProps) => {
  const { t } = useTranslation("home");
  const [createGoal, { isLoading }] = useCreateGoalMutation();

  const form = useForm<CreateGoalFormValues>({
    defaultValues: {
      title: "",
      targetAmount: "",
      currency: "USD",
      deadline: getDefaultGoalDeadline(),
    },
    mode: "onSubmit",
  });

  const rootError = form.formState.errors.root?.message;
  const titleError = form.formState.errors.title?.message;
  const amountError = form.formState.errors.targetAmount?.message;
  const deadlineError = form.formState.errors.deadline?.message;

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      form.reset({
        title: "",
        targetAmount: "",
        currency: "USD",
        deadline: getDefaultGoalDeadline(),
      });
      form.clearErrors();
    }
    onOpenChange(next);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    const amount = Number.parseFloat(values.targetAmount.replace(",", "."));

    if (!Number.isFinite(amount) || amount <= 0) {
      form.setError("targetAmount", {
        message: t("savingsPage.createGoal.errors.invalidAmount"),
      });
      return;
    }

    if (!values.title.trim()) {
      form.setError("title", {
        message: t("savingsPage.createGoal.errors.required"),
      });
      return;
    }

    try {
      await createGoal({
        title: values.title.trim(),
        targetAmount: amount,
        currency: values.currency,
        deadline: values.deadline,
      }).unwrap();
      handleOpenChange(false);
    } catch (error) {
      form.setError("root", {
        message: getApiErrorMessage(
          error,
          t("savingsPage.createGoal.errors.submit"),
        ),
      });
    }
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-6 pb-4 sm:px-8">
          <DialogTitle className="font-display text-2xl font-bold text-brand-purple">
            {t("savingsPage.createGoal.title")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t("savingsPage.createGoal.description")}
          </DialogDescription>
        </DialogHeader>

        <form
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-4 px-6 pb-6 sm:px-8 sm:pb-8"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="goal-title">
              {t("savingsPage.createGoal.titleLabel")}
            </Label>
            <Input
              id="goal-title"
              {...form.register("title", {
                required: t("savingsPage.createGoal.errors.required"),
                maxLength: {
                  value: 255,
                  message: t("savingsPage.createGoal.errors.titleTooLong"),
                },
              })}
              placeholder={t("savingsPage.createGoal.titlePlaceholder")}
              className="font-display"
            />
            {titleError ? (
              <p className="text-sm text-destructive">{titleError}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="goal-amount">
                {t("savingsPage.createGoal.amountLabel")}
              </Label>
              <Input
                id="goal-amount"
                type="number"
                min={0.01}
                step={0.01}
                inputMode="decimal"
                {...form.register("targetAmount", {
                  required: t("savingsPage.createGoal.errors.required"),
                })}
                placeholder="1000"
                className="font-display"
              />
              {amountError ? (
                <p className="text-sm text-destructive">{amountError}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="goal-currency">
                {t("savingsPage.createGoal.currencyLabel")}
              </Label>
              <NativeSelect
                id="goal-currency"
                {...form.register("currency")}
                className="w-full"
                selectClassName="font-display w-full"
              >
                {GOAL_CURRENCIES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </NativeSelect>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="goal-deadline">
              {t("savingsPage.createGoal.deadlineLabel")}
            </Label>
            <Input
              id="goal-deadline"
              type="date"
              min={getMinGoalDeadline()}
              {...form.register("deadline", {
                required: t("savingsPage.createGoal.errors.required"),
              })}
              className="font-display"
            />
            {deadlineError ? (
              <p className="text-sm text-destructive">{deadlineError}</p>
            ) : null}
          </div>

          {rootError ? (
            <p className="text-center text-sm text-destructive">{rootError}</p>
          ) : null}

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              {t("savingsPage.createGoal.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-brand-purple-bg font-display font-bold text-white hover:bg-brand-purple-bg/90"
            >
              {t("savingsPage.createGoal.submit")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
