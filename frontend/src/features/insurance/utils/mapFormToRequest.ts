import type {
  InsuranceFormValues,
  PurchaseInsuranceRequest,
} from "../types/insurance";

export function mapFormToRequest(
  formData: InsuranceFormValues,
): PurchaseInsuranceRequest {
  return {
    registrationNumber: formData.registrationNumber,
    bonus: formData.bonus,
    nationalIdentityNumber: formData.nationalIdentityNumber,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
  };
}
