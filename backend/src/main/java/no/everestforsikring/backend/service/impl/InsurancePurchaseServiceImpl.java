package no.everestforsikring.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.everestforsikring.backend.client.CoreSystemClient;
import no.everestforsikring.backend.dto.request.CreateAgreementRequest;
import no.everestforsikring.backend.dto.request.CreateCustomerRequest;
import no.everestforsikring.backend.dto.request.PurchaseInsuranceRequest;
import no.everestforsikring.backend.dto.response.CreateAgreementResponse;
import no.everestforsikring.backend.dto.response.CreateCustomerResponse;
import no.everestforsikring.backend.dto.response.PurchaseInsuranceResponse;
import no.everestforsikring.backend.entity.Customer;
import no.everestforsikring.backend.entity.InsuranceAgreement;
import no.everestforsikring.backend.entity.InsuranceAgreementStatus;
import no.everestforsikring.backend.entity.InsuranceType;
import no.everestforsikring.backend.repository.CustomerRepository;
import no.everestforsikring.backend.repository.InsuranceAgreementRepository;
import no.everestforsikring.backend.service.InsurancePurchaseService;
import no.everestforsikring.backend.service.LetterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class InsurancePurchaseServiceImpl implements InsurancePurchaseService {

    private final CustomerRepository customerRepository;
    private final InsuranceAgreementRepository insuranceAgreementRepository;
    private final LetterService letterService;
    private final CoreSystemClient coreSystemClient;
    @Override
    @Transactional
    public PurchaseInsuranceResponse purchaseInsurance(PurchaseInsuranceRequest insuranceRequest){
        log.info("Starting insurance purchase flow for car with registrationNumber: {}", insuranceRequest.registrationNumber());

        Customer customer;

        Optional<Customer> existingCustomer = customerRepository.findByNationalIdentityNumber(insuranceRequest.nationalIdentityNumber());

        if(existingCustomer.isPresent()){
            customer = existingCustomer.get();
            log.info("Existing customer found with externalCustomerNumber:{} for nationalIdentityNumber: {}",
                    customer.getExternalCustomerNumber(),
                    maskNationalIdentityNumber(customer.getNationalIdentityNumber()));

            if(!customer.getEmail().equalsIgnoreCase(insuranceRequest.email())) {
                log.warn(
                        "Submitted email: {} differs from stored customer email for customer with externalCustomerNumber:{} and nationalIdentityNumber: {}",
                        insuranceRequest.email(),
                        customer.getExternalCustomerNumber(),
                        maskNationalIdentityNumber(customer.getNationalIdentityNumber())
                );
            }
        }

        else {
            customer = createCustomer(insuranceRequest);
        }

        CreateAgreementRequest agreementRequest = new CreateAgreementRequest(
                customer.getExternalCustomerNumber(),
                insuranceRequest.registrationNumber(),
                insuranceRequest.bonus(),
                InsuranceType.CAR.name()
        );
        CreateAgreementResponse agreementResponse = coreSystemClient.createAgreement(agreementRequest);

        InsuranceAgreement insuranceAgreement = InsuranceAgreement.builder()
                .agreementNumber(agreementResponse.agreementNumber())
                .customer(customer)
                .registrationNumber(insuranceRequest.registrationNumber())
                .bonus(insuranceRequest.bonus())
                .insuranceType(InsuranceType.CAR)
                .status(InsuranceAgreementStatus.CREATED)
                .build();

        InsuranceAgreement savedAgreement = insuranceAgreementRepository.save(insuranceAgreement);
        letterService.sendInsuranceLetterToCustomer(savedAgreement.getAgreementNumber());

        log.info("Insurance agreement created successfully with agreement number: {} for car with registrationNumber: {}", savedAgreement.getAgreementNumber(), savedAgreement.getRegistrationNumber());

        return new PurchaseInsuranceResponse(
                savedAgreement.getAgreementNumber(),
                savedAgreement.getStatus().name(),
                "Forsikringskjøpet ble mottatt."
        );
    }

    private Customer createCustomer(PurchaseInsuranceRequest insuranceRequest) {
        log.info("No existing customer found. Creating new customer for nationalIdentityNumber: {}", maskNationalIdentityNumber(insuranceRequest.nationalIdentityNumber()));

        CreateCustomerRequest createCustomerRequest = new CreateCustomerRequest(
                insuranceRequest.nationalIdentityNumber(),
                insuranceRequest.firstName(),
                insuranceRequest.lastName(),
                insuranceRequest.email()
        );

        CreateCustomerResponse createCustomerResponse = coreSystemClient.createCustomer(createCustomerRequest);

        Customer customer = Customer.builder()
                .nationalIdentityNumber(insuranceRequest.nationalIdentityNumber())
                .firstName(insuranceRequest.firstName())
                .lastName(insuranceRequest.lastName())
                .email(insuranceRequest.email())
                .externalCustomerNumber(createCustomerResponse.externalCustomerNumber())
                .build();
        Customer savedCustomer = customerRepository.save(customer);

        log.info("Customer created successfully with externalCustomerNumber: {} for nationalIdentityNumber: {}",
                savedCustomer.getExternalCustomerNumber(),
                maskNationalIdentityNumber(savedCustomer.getNationalIdentityNumber()));

        return savedCustomer;
    }

    private String maskNationalIdentityNumber(String nationalIdentityNumber) {
        if (nationalIdentityNumber == null || nationalIdentityNumber.length() < 6) {
            return "****";
        }
        String maskedNationalIdentityNumber =  "****" + nationalIdentityNumber.substring(nationalIdentityNumber.length() - 4);
        return maskedNationalIdentityNumber;
    }
}
