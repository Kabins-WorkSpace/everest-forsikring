package no.everestforsikring.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EverestBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EverestBackendApplication.class, args);
	}

}
