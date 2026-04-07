package no.everestforsikring.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record PurchaseInsuranceRequest(
    @NotBlank(message = "Registreringsnummer er påkrevd.")
    @Pattern(
                regexp = "^[A-Za-z]{2}\\d{5}$",
                message = "Registreringsnummer må bestå av  2 bokstaver og 5 sifre"
                )
    String registrationNumber,

    @NotBlank(message = "Bonus er påkrevd")
    String bonus,

    @NotBlank(message = "Fødselsnummer er påkrevd")
    @Pattern(regexp = "^\\d{11}$",
            message = "Fødselsnummeret må bestå av 11 siffer")
    String nationalIdentityNumber,

    @NotBlank(message = "Fornavn er påkrevd")
    String firstName,

    @NotBlank(message = "Etternavn er påkrevd")
    String lastName,

    @NotBlank(message = "E-post er påkrevd")
    @Email(message = "E-post må være gyldig")
    String email
    ){}
