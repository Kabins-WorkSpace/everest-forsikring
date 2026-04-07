package no.everestforsikring.backend.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.everestforsikring.backend.dto.response.SendLetterResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
@Slf4j
public class LetterServiceClientImpl implements LetterServiceClient{
    private final WebClient webClient;
    @Value("${mock.letter-service.base-url}")
    private String letterServiceBaseUrl;
    @Override
    public SendLetterResponse sendLetter(String agreementNumber) {
        log.info("Calling mock letter service for agreementNumber:{}", agreementNumber);

        return webClient.post()
                .uri(letterServiceBaseUrl + "/send?agreementNumber={agreementNumber}", agreementNumber)
                .retrieve()
                .bodyToMono(SendLetterResponse.class)
                .block();
    }
}
