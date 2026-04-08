import type { ReactNode } from "react";

type ContentCardProps = {
  children: ReactNode;
};

export function ContentCard({ children }: ContentCardProps) {
  return (
    <section className="w-full max-w-172 border border-neutral-rock bg-neutral-sand p-6 md:p-14">
      {children}
    </section>
  );
}
