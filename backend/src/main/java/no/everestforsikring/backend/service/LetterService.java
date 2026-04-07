package no.everestforsikring.backend.service;

public interface LetterService {
    void sendInsuranceLetterToCustomer(String agreementNumber);
}
