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
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <PurchaseCompletion />

            <h1 className="mt-8 max-w-[14ch] font-normal text-[2.25rem] text-foreground leading-11 md:text-[3rem] md:leading-14">
              Forsikringen er sendt inn
            </h1>

            <p className="mt-5 max-w-[38ch] text-lg text-neutral-mountain leading-7">
              Takk. Vi har mottatt forespørselen din og opprettet en
              forsikringsflyt.
            </p>

            {agreementNumber ? (
              <p className="mt-6 text-base text-neutral-stone leading-7">
                Avtalenummer:{" "}
                <span className="font-semibold text-foreground">
                  {agreementNumber}
                </span>
              </p>
            ) : null}

            <div className="mt-10 flex justify-center">
              <Link
                href="/insurance"
                className="inline-flex h-11 items-center justify-center rounded-full border border-primary-granite bg-primary-granite px-5 font-semibold text-primary-white text-sm transition-opacity hover:opacity-90"
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
