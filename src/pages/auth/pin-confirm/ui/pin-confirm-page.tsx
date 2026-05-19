import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { markOnboardingCompleted } from "@/entities/onboarding-status";
import {
  getApiErrorMessage,
  pinToPassword,
  useRegisterMutation,
  type AuthFlowState,
} from "@/entities/session";
import { PIN_LENGTH, PIN_SLOT_CLASSNAME } from "@/pages/auth/config";
import {
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Progress,
} from "@/shared/ui";

interface PinConfirmFormValues {
  pin: string;
}

interface PinConfirmLocationState extends AuthFlowState {
  pin?: string;
}

const FORM_ID = "pin-confirm-form";

export const PinConfirmPage = () => {
  const { t } = useTranslation("onboarding");
  const navigate = useNavigate();
  const location = useLocation();

  const [register, { isLoading: isSubmitting }] = useRegisterMutation();

  const flow = location.state as PinConfirmLocationState | null;

  const expectedPin = flow?.pin;
  const phone = flow?.phone;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PinConfirmFormValues>({
    defaultValues: { pin: "" },
    mode: "onSubmit",
  });

  if (!expectedPin || !phone) {
    return <Navigate to="/auth" replace />;
  }

  if (flow.isExistingUser) {
    return (
      <Navigate to="/auth/pin" replace state={{ phone, isExistingUser: true }} />
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    if (values.pin !== expectedPin) {
      setError("pin", {
        type: "mismatch",
        message: t("auth.pinConfirm.errors.mismatch"),
      });
      return;
    }

    const password = pinToPassword(values.pin);

    try {
      await register({
        firstName: "User",
        lastName: "User",
        phoneNumber: phone,
        password,
        repeatPassword: password,
      }).unwrap();

      markOnboardingCompleted();
      navigate("/auth/congratulations");
    } catch (error) {
      setError("root", {
        message: getApiErrorMessage(error, t("auth.errors.requestFailed")),
      });
    }
  });

  const rootError = errors.root?.message;

  return (
    <div className="relative flex min-h-svh flex-col bg-white text-brand-purple">
      <main className="flex flex-1 flex-col items-center px-6 pt-12 pb-10 sm:pt-16 lg:pt-20">
        <div className="flex w-full max-w-xl flex-1 flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-center font-display text-4xl font-bold leading-none sm:text-5xl lg:text-6xl">
              {t("auth.pinConfirm.title")}
            </h1>
            <Progress
              value={90}
              className="h-4 w-72 max-w-full bg-brand-blue/30 *:data-[slot=progress-indicator]:bg-brand-blue"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <p className="min-h-14 text-center font-display text-xl leading-snug">
              {t("auth.pinConfirm.description")}
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
                    t("auth.pinConfirm.errors.incomplete"),
                }}
                render={({ field }) => (
                  <InputOTP
                    {...field}
                    maxLength={PIN_LENGTH}
                    aria-invalid={!!errors.pin}
                    disabled={isSubmitting}
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
              {errors.pin ? (
                <p className="text-center text-sm text-destructive">
                  {errors.pin.message}
                </p>
              ) : null}
              {rootError ? (
                <p className="text-center text-sm text-destructive">
                  {rootError}
                </p>
              ) : null}
            </form>
          </div>
          <div className="mt-auto flex flex-col items-center gap-4">
            <Button
              form={FORM_ID}
              type="submit"
              disabled={isSubmitting}
              className="h-16 w-72 max-w-full rounded-control bg-brand-purple-bg font-display text-xl font-bold text-white hover:bg-brand-purple-bg/90"
            >
              {t("auth.pinConfirm.submit")}
            </Button>
            <Link
              to="/auth/pin"
              state={{ phone, isExistingUser: false }}
              className="font-display text-xl text-brand-purple hover:underline"
            >
              {t("auth.pinConfirm.back")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
