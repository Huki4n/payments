import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { EMAIL_PATTERN } from "@/pages/auth/config";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  GoogleIcon,
  Input,
  Progress,
} from "@/shared/ui";

interface AuthFormValues {
  email: string;
}

export const AuthPage = () => {
  const { t } = useTranslation("onboarding");
  const navigate = useNavigate();

  const form = useForm<AuthFormValues>({
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit(() => {
    navigate("/auth/pin");
  });

  return (
    <div className="relative flex min-h-svh flex-col bg-white text-brand-purple">
      <main className="flex flex-1 flex-col items-center px-6 pt-12 pb-10 sm:pt-16 lg:pt-20">
        <div className="flex w-full max-w-xl flex-1 flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-center font-display text-4xl font-bold leading-none sm:text-5xl lg:text-6xl">
              {t("auth.title")}
            </h1>

            <Progress
              value={9}
              className="h-4 w-72 max-w-full bg-brand-blue/30 *:data-[slot=progress-indicator]:bg-brand-blue"
            />
          </div>

          <div className="flex w-full flex-col items-center gap-8">
            <p className="min-h-14 text-center font-display text-xl leading-snug">
              {t("auth.description")}
            </p>

            <Form {...form}>
              <form
                noValidate
                onSubmit={onSubmit}
                className="flex w-full flex-col items-center gap-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: t("auth.errors.required"),
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: t("auth.errors.invalidEmail"),
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          placeholder={t("auth.emailPlaceholder")}
                          className="h-22 w-full rounded-control border border-muted-foreground/70 bg-transparent px-6 text-center font-display text-xl font-medium placeholder:text-black/60"
                        />
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="h-16 w-72 max-w-full rounded-control bg-brand-purple-bg font-display text-xl font-bold text-white hover:bg-brand-purple-bg/90"
                >
                  {t("auth.submit")}
                </Button>
              </form>
            </Form>
          </div>

          <div className="mt-auto flex flex-col items-center gap-4">
            <p className="text-center font-display text-xl">
              <span>{t("auth.haveAccount")} </span>
              <Link
                to="/onboarding/welcome"
                className="font-medium text-brand-blue hover:underline"
              >
                {t("auth.signUp")}
              </Link>
            </p>

            <span className="font-display text-xl text-brand-purple/60">
              {t("auth.or")}
            </span>

            <div className="flex flex-col items-center gap-1">
              <span className="font-display text-xl">
                {t("auth.continueWith")}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t("auth.googleAria")}
                className="size-16 rounded-full hover:bg-transparent hover:opacity-80"
              >
                <GoogleIcon className="size-12" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 pb-10">
        <p className="text-center font-display text-base sm:text-xl">
          <span>{t("auth.terms.prefix")} </span>
          <span className="font-bold">{t("auth.terms.link")}</span>
        </p>
      </footer>
    </div>
  );
};
