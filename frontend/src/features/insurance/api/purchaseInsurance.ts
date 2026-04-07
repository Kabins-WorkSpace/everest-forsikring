import type {
  PurchaseInsuranceRequest,
  PurchaseInsuranceResponse,
} from "../types/insurance";
import { endpoints } from "@/lib/api/endpoints";

export async function purchaseInsurance(
  payload: PurchaseInsuranceRequest,
): Promise<PurchaseInsuranceResponse> {
  const response = await fetch(endpoints.purchaseInsurance, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Kunne ikke sende inn forsikringskjøpet";

    try {
      const errorData = await response.json();
      if (errorData?.message) {
        message = errorData.message;
      }
    } catch {
      // fallback til standard melding
    }
    throw new Error(message);
  }

  return response.json();
}
