package no.everestforsikring.backend.dto.response;

public record PurchaseInsuranceResponse(
        String agreementNumber,
        String status,
        String message
) {
}
