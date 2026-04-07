package no.everestforsikring.backend.repository;

import no.everestforsikring.backend.entity.InsuranceAgreement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceAgreementRepository extends JpaRepository<InsuranceAgreement, Long> {

}
