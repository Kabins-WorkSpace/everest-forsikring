package no.everestforsikring.backend.dto.request;

public record CreateAgreementRequest(
        String externalCustomerNumber,
        String registrationNumber,
        String bonus,
        String insuranceType
) {
}
