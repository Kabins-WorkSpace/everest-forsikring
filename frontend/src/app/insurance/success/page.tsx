import Link from "next/link";

import { PurchaseCompletion } from "@/components/feedback/PurchaseCompletion";

type SuccessPageProps = {
  searchParams: Promise<{
    agreementNumber?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const agreementNumber = params.agreementNumber;

  return (
    <main className="min-h-screen bg-neutral-sand text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10 md:px-8 md:py-16">
        <section className="w-full border border-neutral-rock bg-primary-white p-8 md:p-12">
          <div className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
            <PurchaseCompletion />

            <h1 className="mt-8 max-w-[14ch] text-[2.25rem] leading-[2.75rem] font-normal text-foreground md:text-[3rem] md:leading-[3.5rem]">
              Forsikringen er sendt inn
            </h1>

            <p className="mt-5 max-w-[38ch] text-lg leading-7 text-neutral-mountain">
              Takk. Vi har mottatt forespørselen din og opprettet en
              forsikringsflyt.
            </p>

            {agreementNumber ? (
              <p className="mt-6 text-base leading-7 text-neutral-stone">
                Avtalenummer:{" "}
                <span className="font-semibold text-foreground">
                  {agreementNumber}
                </span>
              </p>
            ) : null}

            <div className="mt-10 flex justify-center">
              <Link
                href="/insurance"
                className="inline-flex h-11 items-center justify-center rounded-full border border-primary-granite bg-primary-granite px-5 text-sm font-semibold text-primary-white transition-opacity hover:opacity-90"
              >
                Tilbake til skjema
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
