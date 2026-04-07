package no.everestforsikring.backend.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.everestforsikring.backend.dto.request.CreateAgreementRequest;
import no.everestforsikring.backend.dto.request.CreateCustomerRequest;
import no.everestforsikring.backend.dto.response.CreateAgreementResponse;
import no.everestforsikring.backend.dto.response.CreateCustomerResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
@Slf4j
public class CoreSystemClientImpl implements CoreSystemClient {

    private final WebClient webClient;
    @Value("${mock.core-system.base-url}")
    private String coreSystemBaseUrl;
    @Override
    public CreateCustomerResponse createCustomer(CreateCustomerRequest customerRequest) {
        log.info("Calling mock core system to create customer");

        return webClient.post()
                .uri(coreSystemBaseUrl + "/customers")
                .bodyValue(customerRequest)
                .retrieve()
                .bodyToMono(CreateCustomerResponse.class)
                .block();
    }

    @Override
    public CreateAgreementResponse createAgreement(CreateAgreementRequest agreementRequest) {

        log.info("Calling mock core system to create agreement.");

        return webClient.post()
                .uri(coreSystemBaseUrl + "/agreements")
                .bodyValue(agreementRequest)
                .retrieve()
                .bodyToMono(CreateAgreementResponse.class)
                .block();
    }
}
