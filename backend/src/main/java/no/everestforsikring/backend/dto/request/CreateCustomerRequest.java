package no.everestforsikring.backend.dto.request;

public record CreateCustomerRequest(
        String nationalIdentityNumber,
        String firstName,
        String lastName,
        String email
) {
}
