package no.everestforsikring.backend.repository;

import no.everestforsikring.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByNationalIdentityNumber(String nationalIdentityNumber);
}
