import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 cursor-pointer items-center justify-center rounded-full border px-8 font-semibold text-sm transition-colors",
        variant === "primary" &&
          "border-primary-granite bg-primary-granite text-primary-white hover:opacity-90",
        variant === "secondary" &&
          "border-primary-granite bg-white text-primary-granite hover:bg-neutral-mist",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
