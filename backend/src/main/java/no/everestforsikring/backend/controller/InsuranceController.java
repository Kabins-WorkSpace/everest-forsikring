package no.everestforsikring.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.everestforsikring.backend.dto.request.PurchaseInsuranceRequest;
import no.everestforsikring.backend.dto.response.PurchaseInsuranceResponse;
import no.everestforsikring.backend.service.InsurancePurchaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/insurance")
@RequiredArgsConstructor
@Slf4j
public class InsuranceController {
    private final InsurancePurchaseService insurancePurchaseService;
    @PostMapping("/purchase")
    public ResponseEntity<PurchaseInsuranceResponse> purchaseInsurance(@Valid @RequestBody PurchaseInsuranceRequest insuranceRequest){
        log.info("Received insurance purchase request for car with registration number: {}", insuranceRequest.registrationNumber());

        PurchaseInsuranceResponse purchaseInsuranceResponse = insurancePurchaseService.purchaseInsurance(insuranceRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(purchaseInsuranceResponse);
    }

}
