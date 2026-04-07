package no.everestforsikring.backend.client;

import no.everestforsikring.backend.dto.response.SendLetterResponse;

public interface LetterServiceClient {
    SendLetterResponse sendLetter(String agreementNumber);
}
