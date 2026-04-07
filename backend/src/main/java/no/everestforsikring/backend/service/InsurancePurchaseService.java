package no.everestforsikring.backend.service;

import no.everestforsikring.backend.dto.request.PurchaseInsuranceRequest;
import no.everestforsikring.backend.dto.response.PurchaseInsuranceResponse;

public interface InsurancePurchaseService {
    PurchaseInsuranceResponse purchaseInsurance(PurchaseInsuranceRequest insuranceRequest);
}
