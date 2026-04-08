# Everest Forsikring – Frontend

Dette repositoryet inneholder frontend-applikasjonen for Everest Forsikring, en enkel, produksjonsinspirert løsning for kjøp av bilforsikring.

Applikasjonen er bygget med fokus på:

- strukturert arkitektur
- god brukeropplevelse (UX)
- tilgjengelighet (accessibility)
- tydelig separasjon mellom UI, validering og API-lag

## Live demo (UI)

Frontend er deployert på Vercel: https://everest-forsikring.vercel.app/insurance

⚠️ Merk: Backend er foreløpig ikke deployert til produksjon. API-kall vil derfor ikke fungere i live-versjonen.

Deployen brukes primært til:

- visuell kvalitetssikring
- responsiv testing (mobil / desktop)
- vurdering av brukeropplevelse (UX)

## Teknologistack

- Next.js (App Router)
- TypeScript
- React Hook Form
- Zod (validering)
- Tailwind CSS
- Framer Motion (animasjon)
- Vercel (deployment)

## Arkitektur

Frontend er strukturert etter ansvar:
- src/
- app/ # routing (Next.js App Router)
- components/ # presentasjonskomponenter
- features/insurance/ # domenelogikk (schema, api, mapping)
- lib/ # felles utilities (formatters, helpers)

Viktige prinsipper
- Separation of concerns
- Reusable components
- Typed data flow (TypeScript + Zod)
- Isolert API-lag
- Minimal coupling mellom UI og backend

## Dataflyt

1. Bruker fyller inn skjema (UI)
2. React Hook Form håndterer state og submit
3. Zod validerer input
4. Data transformeres via `mapFormToRequest`
5. API-kall gjøres via `purchaseInsurance`
6. Respons håndteres (redirect eller feilmelding)

## Skjema og validering

Skjemaet håndteres av:
- React Hook Form – state og submit
- Zod – validering

### Eksempel (Zod validering)

```ts
registrationNumber: z.string().regex(/^[A-Za-z]{2}\d{5}$/);
```

Viktig designvalg
- Validering er definert ett sted (Zod)
- TypeScript typer genereres automatisk fra schema
- Frontend og backend kontrakt holdes synkronisert

## Spesialtilfelle: Registreringsnummer

Dette feltet håndteres med en controlled input via Controller.

Hvorfor?

UI og intern verdi er forskjellige:
UI: AB 12345
State: AB12345

Dette løses ved å:
- formatere verdi i UI (formatRegistrationNumber)
- lagre ren verdi i state (cleanRegistrationNumber)

Dette er et bevisst valg for:
- bedre brukeropplevelse
- korrekt validering

## UI-komponenter

Komponentene er delt i:

### components/fields/
- TextInput
- SelectField
- FieldMessage

### components/form/
- InsuranceForm
- ErrorSummary
- FormApiMessage
- SubmitActions
- FormSection

### components/layout/
- ContentCard
- PageContainer

### components/ui/
- Button

### Designvalg
- komponenter er “dumme” (presentational)
- all logikk ligger i form-laget
- fokus på gjenbruk og konsistens

## API-integrasjon

Frontend kommuniserer med backend via: purchaseInsurance(payload)

Payload genereres via: mapFormToRequest(formData)

Dette gir:
- fleksibilitet ved endringer
- isolasjon mellom UI og backend

## Lokal utvikling

1. Klon repo
   git clone <repo-url>
   cd everest-frontend

2. Installer dependencies
   npm install

3. Start utviklingsserver
   npm run dev

Applikasjonen kjører som standard på:
http://localhost:3000

(Port kan variere hvis opptatt)

For full funksjonalitet må backend kjøre lokalt.
Backend-repo: https://github.com/Kabins-WorkSpace/everest-forsikring/tree/main/backend

## Testing og Kvalitet

Frontend er bygget med fokus på:
- tydelig feilhåndtering
- tilgjengelighet (aria-\*)
- strukturert layout
- konsistent design

Live deploy brukes til:
- visuell inspeksjon
- responsiv testing
- UX-validering

## Videre forbedring

    •	Cursor/caret-håndtering for masked inputs
    •	Bedre keyboard accessibility for SelectField
    •	End-to-end testing (Cypress)
    •	Backend deployment (VPS / cloud)

## Kontakt

Ta gjerne kontakt for spørsmål eller gjennomgang av løsning.
