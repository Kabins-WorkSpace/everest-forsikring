import type { z } from "zod";
import type { insuranceFormSchema } from "../schemas/insuranceFormSchema";

export type InsuranceFormValues = z.infer<typeof insuranceFormSchema>;

export type PurchaseInsuranceRequest = {
  registrationNumber: string;
  bonus: string;
  nationalIdentityNumber: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type PurchaseInsuranceResponse = {
  agreementNumber: string;
  status: "SUCCESS" | "FAILED";
  message: string;
};

export type BonusOption = {
  label: string;
  value: string;
};
