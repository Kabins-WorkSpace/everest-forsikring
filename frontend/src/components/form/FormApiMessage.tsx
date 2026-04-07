type FormApiMessageProps = {
  message?: string;
  variant?: "error" | "success";
};

export function FormApiMessage({
  message,
  variant = "error",
}: FormApiMessageProps) {
  if (!message) return null;

  return (
    <div
      className={
        variant === "error"
          ? "mb-6 border border-neutral-rock bg-message-error p-4 text-foreground"
          : "mb-6 border border-neutral-rock bg-message-success p-4 text-foreground"
      }
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm leading-6">{message}</p>
    </div>
  );
}
