package no.everestforsikring.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import no.everestforsikring.backend.dto.request.PurchaseInsuranceRequest;
import no.everestforsikring.backend.dto.response.PurchaseInsuranceResponse;
import no.everestforsikring.backend.service.InsurancePurchaseService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(InsuranceController.class)
class InsuranceControllerTest {

 @Autowired
 private MockMvc mockMvc;

 @Autowired
 private ObjectMapper objectMapper;

 @MockBean
 private InsurancePurchaseService insurancePurchaseService;

 @Test
 @DisplayName("Should return 201 Created when purchase insurance request is valid")
 void shouldReturnCreatedWhenRequestIsValid() throws Exception {
  PurchaseInsuranceRequest request = new PurchaseInsuranceRequest(
          "AB12345",
          "50",
          "12345678901",
          "Kabin",
          "Thapa",
          "kabin@example.com"
  );

  PurchaseInsuranceResponse response = new PurchaseInsuranceResponse(
          "AGR-123456",
          "CREATED",
          "Forsikringskjøpet ble mottatt."
  );

  given(insurancePurchaseService.purchaseInsurance(any(PurchaseInsuranceRequest.class)))
          .willReturn(response);

  mockMvc.perform(post("/api/insurance/purchase")
                  .contentType(APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isCreated())
          .andExpect(content().contentTypeCompatibleWith(APPLICATION_JSON))
          .andExpect(jsonPath("$.agreementNumber").value("AGR-123456"))
          .andExpect(jsonPath("$.status").value("CREATED"))
          .andExpect(jsonPath("$.message").value("Forsikringskjøpet ble mottatt."));
 }

 @Test
 @DisplayName("Should return 400 Bad Request when purchase insurance request is invalid")
 void shouldReturnBadRequestWhenRequestIsInvalid() throws Exception {
  String invalidRequestJson = """
                {
                  "registrationNumber": "",
                  "bonus": "",
                  "nationalIdentityNumber": "123",
                  "firstName": "",
                  "lastName": "",
                  "email": "invalid-email"
                }
                """;

  mockMvc.perform(post("/api/insurance/purchase")
                  .contentType(APPLICATION_JSON)
                  .content(invalidRequestJson))
          .andExpect(status().isBadRequest());
 }

 @TestConfiguration
 static class TestCorsConfig {
  @Bean
  WebMvcConfigurer testWebMvcConfigurer() {
   return new WebMvcConfigurer() {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
     registry.addMapping("/**")
             .allowedOrigins("http://localhost:3001")
             .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
             .allowedHeaders("*")
             .allowCredentials(true);
    }
   };
  }
 }
}