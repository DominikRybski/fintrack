# 💰 FinTrack

Aplikacja webowa do śledzenia wydatków i przychodów. Projekt na zaliczenie przedmiotu Języki Internetowe 2026.

## O projekcie

Prosta apka do zarządzania osobistymi finansami — dodajesz transakcje, filtrujesz po kategorii lub miesiącu, widzisz na bieżąco ile masz na koncie. Dane zapisywane są w chmurze (Supabase), więc działają po odświeżeniu i na każdym urządzeniu.

## Stack

- Vue 3 + Vite
- Pinia (state management)
- Vue Router
- Supabase (PostgreSQL)
- Chart.js

## Uruchomienie lokalne

```bash
git clone https://github.com/TWOJE_KONTO/fintrack
cd fintrack
npm install
```

Utwórz plik `.env.local` w głównym folderze projektu:

```
VITE_SUPABASE_URL=twój_url
VITE_SUPABASE_ANON_KEY=twój_klucz
```

Klucze znajdziesz w panelu Supabase → Settings → API.

```bash
npm run dev
```

## Baza danych

W Supabase należy utworzyć tabelę `transactions`:

```sql
CREATE TABLE transactions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  amount      NUMERIC(10,2) NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('expense', 'income')),
  category    TEXT NOT NULL,
  date        DATE NOT NULL,
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

## Funkcje

- dodawanie, edycja i usuwanie transakcji
- filtrowanie po kategorii, typie i miesiącu
- saldo aktualizowane na bieżąco
- wykres kołowy wydatków według kategorii
- dark mode
- responsywny design

## Autorzy

- Dominik Rybski — frontend, UI/UX, walidacja
- Adrian Augustyn — Supabase, Pinia store, deploy
