import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { PIN_LENGTH, PIN_SLOT_CLASSNAME } from "@/pages/auth/config";
import {
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Progress,
} from "@/shared/ui";

interface PinFormValues {
  pin: string;
}

const FORM_ID = "pin-form";

export const PinPage = () => {
  const { t } = useTranslation("onboarding");
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PinFormValues>({
    defaultValues: { pin: "" },
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit((values) => {
    navigate("/auth/pin/confirm", { state: { pin: values.pin } });
  });

  return (
    <div className="relative flex min-h-svh flex-col bg-white text-brand-purple">
      <main className="flex flex-1 flex-col items-center px-6 pt-12 pb-10 sm:pt-16 lg:pt-20">
        <div className="flex w-full max-w-xl flex-1 flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-center font-display text-4xl font-bold leading-none sm:text-5xl lg:text-6xl">
              {t("auth.pin.title")}
            </h1>

            <Progress
              value={75}
              className="h-4 w-72 max-w-full bg-brand-blue/30 *:data-[slot=progress-indicator]:bg-brand-blue"
            />
          </div>

          <div className="flex w-full flex-col items-center gap-8">
            <p className="min-h-14 text-center font-display text-xl leading-snug">
              {t("auth.pin.description")}
            </p>

            <form
              id={FORM_ID}
              noValidate
              onSubmit={onSubmit}
              className="flex w-full flex-col items-center gap-2"
            >
              <Controller
                control={control}
                name="pin"
                rules={{
                  validate: (value) =>
                    value.length === PIN_LENGTH ||
                    t("auth.pin.errors.incomplete"),
                }}
                render={({ field }) => (
                  <InputOTP
                    {...field}
                    maxLength={PIN_LENGTH}
                    aria-invalid={!!errors.pin}
                  >
                    <InputOTPGroup className="gap-4">
                      {Array.from({ length: PIN_LENGTH }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={PIN_SLOT_CLASSNAME}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.pin && (
                <p className="text-center text-sm text-destructive">
                  {errors.pin.message}
                </p>
              )}
            </form>
          </div>

          <div className="mt-auto flex flex-col items-center gap-4">
            <Button
              form={FORM_ID}
              type="submit"
              className="h-16 w-72 max-w-full rounded-control bg-brand-purple font-display text-xl font-bold text-white hover:bg-brand-purple/90"
            >
              {t("auth.pin.submit")}
            </Button>
            <Link
              to="/auth"
              className="font-display text-xl text-brand-purple hover:underline"
            >
              {t("auth.pin.back")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
