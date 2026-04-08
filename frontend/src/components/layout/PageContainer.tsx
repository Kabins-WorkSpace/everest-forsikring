import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="min-h-screen bg-neutral-stone/80 text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
        {children}
      </div>
    </main>
  );
}
