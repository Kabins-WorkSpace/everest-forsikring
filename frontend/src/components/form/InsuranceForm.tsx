"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { SelectField } from "@/components/fields/SelectField";
import { TextInput } from "@/components/fields/TextInput";
import { purchaseInsurance } from "@/features/insurance/api/purchaseInsurance";
import { insuranceFormSchema } from "@/features/insurance/schemas/insuranceFormSchema";
import type { InsuranceFormValues } from "@/features/insurance/types/insurance";
import { mapFormToRequest } from "@/features/insurance/utils/mapFormToRequest";
import {
  cleanRegistrationNumber,
  formatRegistrationNumber,
} from "@/lib/formatter/formatRegistrationNumber";
import { ErrorSummary } from "./ErrorSummary";
import { FormApiMessage } from "./FormApiMessage";
import { FormSection } from "./FormSection";
import { SubmitActions } from "./SubmitActions";

const bonusOptions = [
  { label: "0 %", value: "0" },
  { label: "10 %", value: "10" },
  { label: "20 %", value: "20" },
  { label: "30 %", value: "30" },
  { label: "40 %", value: "40" },
  { label: "50 %", value: "50" },
  { label: "60 %", value: "60" },
  { label: "70 %", value: "70" },
  { label: "75 %", value: "75" },
];

export function InsuranceForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InsuranceFormValues>({
    resolver: zodResolver(insuranceFormSchema),
    defaultValues: {
      registrationNumber: "",
      bonus: "",
      nationalIdentityNumber: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const errorMessages = useMemo(() => {
    return Object.values(errors)
      .map((error) => error?.message)
      .filter((message): message is string => Boolean(message));
  }, [errors]);

  const onSubmit = async (formData: InsuranceFormValues) => {
    setApiError(null);

    try {
      const payload = mapFormToRequest(formData);
      const result = await purchaseInsurance(payload);

      router.push(
        `/insurance/success?agreementNumber=${encodeURIComponent(result.agreementNumber)}`,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Noe gikk galt. Prøv igjen senere.";

      setApiError(message);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <ErrorSummary errors={errorMessages} />
      <FormApiMessage message={apiError ?? undefined} variant="error" />

      <div className="space-y-10">
        <div className="space-y-5">
          <h1 className="font-normal text-5xl text-foreground leading-tight md:leading-16">
            Kjøp Bilforsikring
          </h1>

          <p className="max-w-[24ch] text-foreground text-lg  leading-7 md:max-w-[50ch]">
            Det er fire forskjellige forsikringer å velge mellom.
            Ansvarsforsikring er lovpålagt om kjøretøyet er registrert og skal
            brukes på veien. I tillegg kan du utvide forsikringen avhengig av
            hvor gammel bilen din er og hvordan du bruker den.
          </p>
        </div>

        <FormSection>
          <Controller
            name="registrationNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                id="registrationNumber"
                label="Bilens registreringsnummer"
                placeholder="E.g. AB 12345"
                error={errors.registrationNumber?.message}
                value={formatRegistrationNumber(field.value || "")}
                onChange={(e) => {
                  const cleaned = cleanRegistrationNumber(e.target.value);
                  const limited = cleaned.slice(0, 7);
                  field.onChange(limited);
                }}
                onBlur={field.onBlur}
              />
            )}
          />

          <Controller
            name="bonus"
            control={control}
            render={({ field }) => (
              <SelectField
                id="bonus"
                label="Din bonus"
                options={bonusOptions}
                helperText="Velg bonusnivået ditt"
                error={errors.bonus?.message}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Velg bonus"
              />
            )}
          />

          <TextInput
            id="nationalIdentityNumber"
            label="Fødselsnummer"
            placeholder="11 siffer"
            error={errors.nationalIdentityNumber?.message}
            {...register("nationalIdentityNumber")}
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <TextInput
              id="firstName"
              label="Fornavn"
              placeholder="Simen"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            <TextInput
              id="lastName"
              label="Etternavn"
              placeholder="Sægrov"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          <TextInput
            id="email"
            label="E-post"
            placeholder="test@gmail.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <SubmitActions isSubmitting={isSubmitting} />
        </FormSection>
      </div>
    </form>
  );
}
