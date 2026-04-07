package no.everestforsikring.backend.controller;


import lombok.extern.slf4j.Slf4j;
import no.everestforsikring.backend.dto.request.CreateAgreementRequest;
import no.everestforsikring.backend.dto.request.CreateCustomerRequest;
import no.everestforsikring.backend.dto.response.CreateAgreementResponse;
import no.everestforsikring.backend.dto.response.CreateCustomerResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/mock/core-system")
@Slf4j
public class MockCoreSystemController {


    @PostMapping("/customers")
    public ResponseEntity<CreateCustomerResponse> createCustomer(@RequestBody CreateCustomerRequest createCustomerRequest) {
        log.info(
                "Customer creation request received for email:{}", createCustomerRequest.email()
        );
        CreateCustomerResponse createCustomerResponse = new CreateCustomerResponse(generateCustomerNumber(), "Customer created successfully in mock system.");

        return ResponseEntity.status(HttpStatus.CREATED).body(createCustomerResponse);
    }

    @PostMapping("/agreements")
    public ResponseEntity<CreateAgreementResponse> createInsuranceAgreement(@RequestBody CreateAgreementRequest agreementRequest){
        log.info("Insurance agreement creation request received for externalCustomerNumber: {} and registrationNumber: {}", agreementRequest.externalCustomerNumber(), agreementRequest.registrationNumber());

        CreateAgreementResponse response = new CreateAgreementResponse(
                generateAgreementNumber(),
                "CREATED",
                "Agreement created successfully in mock system"
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    private String generateCustomerNumber() {
        return "EF-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
    }
    private String generateAgreementNumber() {
        return "AGR-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
    }
}
