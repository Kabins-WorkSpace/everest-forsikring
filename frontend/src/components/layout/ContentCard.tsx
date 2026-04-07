import type { ReactNode } from "react";

type ContentCardProps = {
  children: ReactNode;
};

export function ContentCard({ children }: ContentCardProps) {
  return (
    <section className="w-full max-w-[43rem] border border-neutral-rock bg-white p-6 md:p-14">
      {children}
    </section>
  );
}
