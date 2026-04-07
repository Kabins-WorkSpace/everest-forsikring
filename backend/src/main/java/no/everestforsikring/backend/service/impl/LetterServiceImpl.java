package no.everestforsikring.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.everestforsikring.backend.client.LetterServiceClient;
import no.everestforsikring.backend.service.LetterService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {
    private final LetterServiceClient letterServiceClient;
    @Override
    @Async
    public void sendInsuranceLetterToCustomer(String agreementNumber) {
        log.info("Triggering async Letter Sending for agreementNumber: {}", agreementNumber);

        try{
            letterServiceClient.sendLetter(agreementNumber);
            log.info("Letter sent successfully for agreementNumber: {}", agreementNumber);
        } catch (Exception e){
            log.error("Failed to send letter for agreement number:{}", agreementNumber);
        }
    }
}
