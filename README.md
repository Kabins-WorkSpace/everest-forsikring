# Everest Forsikring – Fullstack løsning

Dette repositoryet inneholder en fullstack applikasjon for kjøp av bilforsikring.

Prosjektet er bygget som en produksjonsnær løsning med fokus på:

- strukturert arkitektur (frontend + backend)
- sikker håndtering av secrets (Doppler)
- containerisert deploy (Docker)
- skybasert database (Neon PostgreSQL)

## Struktur

```code
frontend/   → Next.js applikasjon (UI)
backend/    → Spring Boot API
```

## Teknologi

#### Frontend

    -	Next.js
    -	TypeScript
    -	Tailwind CSS

#### Backend

    -	Spring Boot (Java)
    -	PostgreSQL (Neon)
    -	Docker
    -	Doppler (secrets management)

## Arkitektur (High-level)

```text
Frontend (Vercel)
        ↓
Backend (Docker)
        ↓
PostgreSQL (Neon)
```

## Dataflyt

    1.	Bruker fyller ut skjema i frontend
    2.	Frontend sender request til backend
    3.	Backend validerer og prosesserer data
    4.	Backend integrerer med eksternt system
    5.	Respons sendes tilbake til frontend

## Lokal utvikling

#### Backend

```bash
cd backend
doppler run -- docker compose up --build -d
```

Kjører på:
http://localhost:8080

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Kjører på:
http://localhost:3000

## Frontend (UI): https://everest-forsikring.vercel.app/insurance

⚠️ Backend er foreløpig ikke offentlig deployet.

## Formål

Dette prosjektet demonstrerer:

- fullstack arkitektur
- integrasjon mellom frontend og backend
- bruk av moderne verktøy (Docker, Doppler, Vercel)
- produksjonsnære prinsipper

## Videre arbeid

    - deploy backend til cloud
    - koble frontend til live backend
    - legge til observability og CI/CD
