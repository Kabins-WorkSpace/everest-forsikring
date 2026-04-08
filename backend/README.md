# Everest Forsikring – Backend

Dette repositoryet inneholder backend-applikasjonen for Everest Forsikring.

Backend håndterer kjøp av bilforsikring ved å:

- validere brukerinput
- opprette kunde i et eksternt system
- opprette forsikringsavtale
- returnere samlet respons til frontend

Backend er designet som en produksjonsnær tjeneste med fokus på:
-	tydelig lagdeling (controller → service → client)
-	robust input-validering
-	ekstern systemintegrasjon (mock core system)
-	sikker håndtering av secrets (Doppler)
-	containerisert deploy (Docker)
-	skybasert database (Neon PostgreSQL)

## Teknologistack
-	Java 17
-	Spring Boot
-	Spring Web (REST API)
-	WebClient (ekstern integrasjon)
-	PostgreSQL (Neon)
-	Doppler (secrets management)
-	Maven

## Arkitektur

Backend er strukturert etter klassisk lagdeling:

-	controller/   → håndterer HTTP requests
-	service/      → forretningslogikk
-	client/       → integrasjon mot eksterne systemer
-	dto/          → request/response modeller
-	config/       → konfigurasjon (WebClient, etc.)

## Designprinsipper

	•	Separation of concerns
	•	Tydelig ansvar per lag
	•	Ingen forretningslogikk i controller
	•	Ekstern integrasjon isolert i client-lag
	•	DTO-basert kommunikasjon

## Dataflyt (End-to-End)

1.	Frontend sender request → /insurance/purchase
2.	Controller mottar og validerer input (@Valid)
3.	Service orkestrerer flyten:
        •	oppretter kunde
	    •	oppretter avtale
4.	Client-laget kaller eksternt system (mock core system)
5.	Respons samles og returneres til frontend

## Ekstern integrasjon

Backend simulerer integrasjon med et “core system”:
-	/mock/core-system/customers
-	/mock/core-system/agreements

Disse kallene gjøres via WebClient.

### Hvorfor WebClient?

	•	non-blocking API
	•	moderne alternativ til RestTemplate
	•	bedre kontroll over HTTP-kall

## Validering

Input valideres med Jakarta Validation:
```java
@NotBlank
@Pattern(regexp = "^[A-Za-z]{2}\\d{5}$")
private String registrationNumber;
```

### Viktige valg

	•	Validering skjer i backend (ikke bare frontend)
	•	Konsistente feilmeldinger
	•	Beskytter mot invalid data i systemet

## Database (PostgreSQL via Neon)

Backend bruker PostgreSQL hostet på Neon.

### Hvorfor PostgreSQL?

	•	ACID-compliant (transaksjonssikkerhet)
	•	godt egnet for finans/insurance domener
	•	sterk støtte i Spring Boot
	•	skalerbar og stabil løsning

### Hvorfor Neon?

	•	serverless PostgreSQL
	•	enkel oppsett
	•	autoskalering
	•	ingen lokal DB nødvendig

## Secrets & Configuration (Doppler)

Alle sensitive verdier håndteres via Doppler:

	•	database credentials
	•	eksterne URL-er
	•	miljøspesifikke configer

Eksempel secrets

	•	SPRING_DATASOURCE_URL
	•	SPRING_DATASOURCE_USERNAME
	•	SPRING_DATASOURCE_PASSWORD

### Hvorfor Doppler?

	•	ingen secrets i repo
	•	enkel miljøhåndtering (dev / prod)
	•	trygg distribusjon i container

## Docker & Deploy

Backend er containerisert med Docker.
Dette oppsettet speiler en produksjonsnær deploy-strategi der:
- applikasjonen kjører isolert i container
- secrets håndteres eksternt (Doppler)
- database ligger i managed cloud-tjeneste (Neon)

```bash
doppler run -- docker compose up --build -d
```

Hva skjer?

	1.	Docker bygger applikasjonen (multi-stage build)
	2.	Doppler injiserer environment variables
	3.	Container starter Spring Boot app
	4.	Backend eksponeres på port 8080

## Logging

Applikasjonen bruker strukturert logging via SLF4J:

```java
log.info("Calling mock core system to create customer");
```

Hva logges?

	•	innkommende requests
	•	kall til eksterne systemer
	•	feilsituasjoner

Hvorfor viktig?

	•	debugging
	•	observability
	•	produksjonsklarhet

## Feilhåndtering

	•	Valideringsfeil returneres med klare meldinger
	•	Spring håndterer exceptions via @ControllerAdvice (kan utvides)
	•	Eksterne kall kan utvides med retry / fallback

## Lokal utvikling

1. Gå til backend

```bash
cd backend
```

2. Start med Docker + Doppler
```bash
doppler run -- docker compose up --build -d
```

3.	Backend kjører på:
```bash
http://localhost:8080
```

## API Endpoints

#### Purchase Insurance

```http
POST /insurance/purchase
```

## Testing

Backend er testet med:
#### •	Spring Boot Test
#### •	MockMvc

## Fokus
#### •	controller-lag
#### •	validering
#### •	request/response flyt

## Produksjonsklarhet

Denne backend-løsningen demonstrerer:
-	container-basert deploy
-	ekstern database (Neon)
-	secrets management (Doppler)
-	tydelig arkitektur
-	validering og feilhåndtering
-	integrasjon mot eksterne systemer

## Videre forbedringer

- Retry/logikk for eksterne kall
- Circuit breaker (Resilience4j)
- Observability (OpenTelemetry)
- API-dokumentasjon (Swagger/OpenAPI)
- CI/CD pipeline



