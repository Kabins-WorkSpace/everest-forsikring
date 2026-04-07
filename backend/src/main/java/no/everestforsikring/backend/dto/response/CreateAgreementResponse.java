package no.everestforsikring.backend.dto.response;

public record CreateAgreementResponse(
        String agreementNumber,
        String status,
        String message
) {
}
