package no.everestforsikring.backend.dto.response;

public record SendLetterResponse(
        String agreementNumber,
        String status,
        String message
) {
}
