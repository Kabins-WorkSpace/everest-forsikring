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
          ? "flex gap-1 items-start md:max-w-[35ch] mt-2 text-neutral-slate text-sm"
          : "max-w-[35ch] mt-2 text-neutral-mountain text-sm"
      }
    >
      {variant === "error" && (
        <MdError className="text-neutral-slate text-lg size-4" />
      )}

      <p className="">{message}</p>
    </div>
  );
}
