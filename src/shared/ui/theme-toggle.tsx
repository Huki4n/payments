import { useState } from "react";
import { ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { cn } from "@/shared/ui/utils";

const LABELS = { light: "Light", dark: "Dark", system: "System" } as const;

type ThemeToggleProps = {
  variant?: "icon" | "labeled";
  className?: string;
};

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const [mounted] = useState(true);
  const { theme, setTheme } = useTheme();

  const current = theme ?? "system";
  const label = LABELS[current as keyof typeof LABELS] ?? LABELS.system;

  const ThemeGlyph =
    current === "dark" ? Moon : current === "light" ? Sun : Monitor;

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size={variant === "icon" ? "icon" : "default"}
        className={cn(
          variant === "icon" ? "size-9" : "min-w-40 justify-between",
          className,
        )}
        disabled
        aria-hidden
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "icon" ? (
          <Button
            variant="outline"
            size="icon"
            className={cn("relative", className)}
            type="button"
            aria-label="Theme"
          >
            <Sun className="size-[1.15rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-[1.15rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        ) : (
          <Button
            variant="outline"
            type="button"
            className={cn(
              "min-w-40 justify-between gap-2 font-normal",
              className,
            )}
          >
            <span className="flex items-center gap-2">
              <ThemeGlyph className="size-4 opacity-80" />
              {label}
            </span>
            <ChevronDown className="size-4 shrink-0 opacity-50" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuRadioGroup value={current} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">
            {LABELS.light}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            {LABELS.dark}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            {LABELS.system}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
