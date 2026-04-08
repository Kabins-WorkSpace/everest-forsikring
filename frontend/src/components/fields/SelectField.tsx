"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "@/lib/utils/cn";
import { FieldMessage } from "./FieldMessage";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  id: string;
  label: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
  className?: string;
};

export function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder = "Velg et alternativ",
  className,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const describedById = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onBlur]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <label
        htmlFor={id}
        className="mb-3 block font-medium text-2xl text-foreground leading-tight"
      >
        {label}
      </label>

      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        aria-describedby={describedById}
        className={cn(
          "flex h-12 w-full max-w-[28ch] items-center justify-between border bg-white px-4 text-left text-base text-foreground outline-none transition cursor-pointer",
          error
            ? "border-red-400 focus:border-red-600"
            : "border-neutral-rock focus:border-neutral-slate",
          open && !error && "border-neutral-slate",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={cn(!selectedOption && "text-neutral-stone")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <FaChevronDown
          className={cn(
            "ml-2 shrink-0 text-neutral-stone text-xs transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute top-full left-0 z-50 mt-1 w-full">
          <div className="max-h-60 overflow-auto border border-neutral-rock bg-white shadow-lg">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    "block w-full px-4 py-3 text-left text-base transition cursor-pointer",
                    isSelected
                      ? "bg-message-info font-semibold text-foreground"
                      : "text-foreground hover:bg-neutral-mist",
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    onBlur?.();
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

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
