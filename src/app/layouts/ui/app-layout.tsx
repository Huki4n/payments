import { type ReactNode } from "react";
// import homeBg from "@/pages/onboarding/assets/bg.png";

interface AppLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export const AppLayout = ({ header, children }: AppLayoutProps) => {
  return (
    <div className="relative min-h-svh text-left">
      <header className="relative overflow-hidden bg-brand-purple-bg pb-8">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-[-20%] top-[-40%] h-[85%] w-[140%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(1,71,255,0.45),transparent_68%)] opacity-90" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand-purple-bg to-brand-purple-bg" />

          {/* <img
            src={homeBg}
            alt="Home Background"
            className="absolute inset-0"
          /> */}
        </div>

        {header}
      </header>

      <main className="relative px-3 py-10 sm:px-4">{children}</main>
    </div>
  );
};
