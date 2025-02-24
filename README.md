# Frontend - Spletna platforma za umetniška dela

## Opis projekta

To je frontend aplikacija za spletno platformo, ki omogoča umetnikom objavo in upravljanje njihovih del ter uporabnikom iskanje in filtriranje umetniških vsebin glede na avtorske pravice.

## Tehnologije

- React.js
- Redux (če je uporabljen za upravljanje stanja)
- Tailwind CSS / Bootstrap za stilizacijo
- Axios za komunikacijo z backendom
- Vite / Webpack za razvoj in produkcijsko gradnjo

## Namestitev

1. **Kloniranje repozitorija**
   ```sh
   git clone <URL-repozitorija>
   cd frontend
   ```

2. **Namestitev odvisnosti**
   ```sh
   npm install
   ```

3. **Zagon razvojnega strežnika**
   ```sh
   npm run dev
   ```
   Privzeto se aplikacija zažene na `http://localhost:3000`.

## Konfiguracija okolja

Ustvarite `.env` datoteko in dodajte ustrezne spremenljivke:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

## Gradnja za produkcijo

Za pripravo produkcijske različice uporabite:
   ```sh
   npm run build
   ```
   Izdelana aplikacija se nahaja v mapi `dist/`.

## Testiranje

Zaženite enotske teste z:
   ```sh
   npm test
   ```

## Avtor

Razvoj aplikacije: **Martin Gruber**

