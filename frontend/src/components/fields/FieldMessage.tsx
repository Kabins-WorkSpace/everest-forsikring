import { MdError } from "react-icons/md";

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
    <div
      id={id}
      className={
        variant === "error"
          ? "flex gap-1 items-center mt-2 text-neutral-granite text-sm"
          : "mt-2 text-neutral-stone text-sm"
      }
    >
      {variant === "error" && (
        <MdError className="text-neutral-slate text-lg" />
      )}

      <p className="mt-1">{message}</p>
    </div>
  );
}
