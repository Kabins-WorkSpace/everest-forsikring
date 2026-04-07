package no.everestforsikring.backend.dto.response;

public record CreateCustomerResponse(
        String externalCustomerNumber,
        String message
) {
}
