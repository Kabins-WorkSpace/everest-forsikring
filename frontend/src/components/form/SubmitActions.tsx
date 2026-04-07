import { Button } from "@/components/ui/Button";

type SubmitActionsProps = {
  isSubmitting?: boolean;
};

export function SubmitActions({ isSubmitting }: SubmitActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sender..." : "Kjøp"}
      </Button>

      <Button type="button" variant="secondary">
        Avbryt
      </Button>
    </div>
  );
}
