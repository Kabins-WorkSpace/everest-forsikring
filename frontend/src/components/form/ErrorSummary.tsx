import { MdError } from "react-icons/md";
type ErrorSummaryProps = {
  errors: string[];
};

export function ErrorSummary({ errors }: ErrorSummaryProps) {
  if (errors.length === 0) return null;

  return (
    <div
      className="mb-8 border border-message-error bg-message-error p-4"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="flex items-center gap-2 mb-3 font-bold text-foreground text-lg">
        <MdError className="text-neutral-slate text-xl" />
        <p className="mt-1">Feil og mangler i skjemaet</p>
      </h2>

      <ul className="list-disc space-y-1 pl-5 text-foreground text-sm">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
