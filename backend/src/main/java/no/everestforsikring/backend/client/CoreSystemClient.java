package no.everestforsikring.backend.client;

import no.everestforsikring.backend.dto.request.CreateAgreementRequest;
import no.everestforsikring.backend.dto.request.CreateCustomerRequest;
import no.everestforsikring.backend.dto.response.CreateAgreementResponse;
import no.everestforsikring.backend.dto.response.CreateCustomerResponse;

public interface CoreSystemClient {
    CreateCustomerResponse createCustomer(CreateCustomerRequest customerRequest);
    CreateAgreementResponse createAgreement(CreateAgreementRequest agreementRequest);
}
