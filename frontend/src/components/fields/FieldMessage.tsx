type FieldMessageProps = {
  message?: string;
  variant?: "helper" | "error";
  id?: string;
};

export function FieldMessage({
  message,
  variant = "helper",
  id,
}: FieldMessageProps) {
  if (!message) return null;

  return (
    <p
      id={id}
      className={
        variant === "error"
          ? "mt-2 text-neutral-granite text-sm"
          : "mt-2 text-neutral-stone text-sm"
      }
    >
      {message}
    </p>
  );
}
