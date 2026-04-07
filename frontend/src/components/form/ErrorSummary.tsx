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
      <h2 className="mb-3 font-bold text-foreground text-lg">
        Feil og mangler i skjemaet
      </h2>

      <ul className="list-disc space-y-1 pl-5 text-foreground text-sm">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
