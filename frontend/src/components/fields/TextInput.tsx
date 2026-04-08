import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { FieldMessage } from "./FieldMessage";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
  inputClassName?: string;
  transformOnBlur?: "uppercase";
};

export function TextInput({
  label,
  error,
  helperText,
  id,
  className,
  inputClassName,
  transformOnBlur,
  ...props
}: TextInputProps) {
  const describedById = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={id}
        className="mb-3 block font-bold text-[1.3125rem] text-foreground leading-7"
      >
        {label}
      </label>

      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedById}
        className={cn(
          "h-12 w-full max-w-xs border bg-white px-4 text-base text-foreground outline-none placeholder:text-neutral-rock",
          error
            ? "border-message-error bg-message-error focus:border-message-error"
            : "border-neutral-rock focus:border-neutral-slate",
          inputClassName,
        )}
        {...props}
      />

      {error ? (
        <FieldMessage id={`${id}-error`} message={error} variant="error" />
      ) : (
        <FieldMessage
          id={`${id}-helper`}
          message={helperText}
          variant="helper"
        />
      )}
    </div>
  );
}
