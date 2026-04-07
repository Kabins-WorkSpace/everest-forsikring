import { z } from "zod";

export const insuranceFormSchema = z.object({
  registrationNumber: z
    .string()
    .min(1, "Du må fylle ut registreringsnummer")
    .regex(
      /^[A-Za-z]{2}\d{5}$/,
      "Registreringsnummer må være 2 bokstaver og 5 sifre",
    )
    .transform((val) => val.toUpperCase()),

  bonus: z.string().min(1, "Du må velge bonus"),

  nationalIdentityNumber: z
    .string()
    .regex(/^\d{11}$/, "Du må fylle ut fødselsnummer, 11 siffer"),

  firstName: z
    .string()
    .min(1, "Du må fylle ut fornavn")
    .regex(/^[A-Za-zÆØÅæøå\s'-]+$/, "Fornavn kan kun inneholde bokstaver"),

  lastName: z
    .string()
    .min(1, "Du må fylle ut etternavn")
    .regex(/^[A-Za-zÆØÅæøå\s'-]+$/, "Etternavn kan kun inneholde bokstaver"),

  email: z
    .string()
    .min(1, "Du må fylle ut e-postadresse")
    .email("Skriv en gyldig e-postadresse"),
});
