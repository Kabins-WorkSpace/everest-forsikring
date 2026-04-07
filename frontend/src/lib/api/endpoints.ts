import { purchaseInsurance } from "@/features/insurance/api/purchaseInsurance";
import { config } from "../config";

export const endpoints = {
  purchaseInsurance: `${config.apiBaseUrl}/api/insurance/purchase`,
};
