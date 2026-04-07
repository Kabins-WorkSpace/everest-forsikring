package no.everestforsikring.backend.controller;

import lombok.extern.slf4j.Slf4j;
import no.everestforsikring.backend.dto.response.SendLetterResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mock/letter-service")
@Slf4j
public class MockLetterServiceController {
    @PostMapping("/send")
    public ResponseEntity<SendLetterResponse> sendLetter(@RequestParam String agreementNumber){
        log.info("Mock letter service received request to send letter for agreementNumber: {}", agreementNumber);

        // Simulerer delay
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e){
            Thread.currentThread().interrupt();
        }

        SendLetterResponse response = new SendLetterResponse(
                agreementNumber,
                "SENT",
                "Letter Sent Successfully."
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
