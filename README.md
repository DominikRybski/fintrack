# FinTrack

Aplikacja webowa do śledzenia wydatków i przychodów. Projekt na zaliczenie przedmiotu Języki Internetowe 2026.

## Cel aplikacji

Wiele osób traci kontrolę nad swoimi finansami, bo nie ma prostego narzędzia do śledzenia codziennych wydatków i przychodów. FinTrack rozwiązuje ten problem — pozwala szybko dodawać transakcje, filtrować je po kategorii lub miesiącu i na bieżąco widzieć stan konta. Dane zapisywane są w chmurze (Supabase), więc są dostępne po odświeżeniu i na każdym urządzeniu.

## Wersja online

**[https://dominiikrybski.github.io/fintrack/](https://dominiikrybski.github.io/fintrack/)**

## Funkcje

- dodawanie, edycja i usuwanie transakcji
- walidacja formularza (puste pola, kwota > 0, wymagana kategoria)
- filtrowanie po kategorii, typie (wydatek/przychód) i miesiącu
- saldo, suma przychodów i wydatków aktualizowane na bieżąco
- wykres kołowy wydatków według kategorii (Chart.js)
- komunikat pustego stanu gdy brak transakcji
- obsługa błędów połączenia z bazą danych
- dark mode z przełącznikiem
- responsywny layout (działa na telefonach i desktopach)

## Technologie

| Technologia | Zastosowanie |
|-------------|-------------|
| Vue 3 | framework frontendowy, komponenty, reaktywność |
| Vite | bundler, serwer deweloperski |
| Pinia | zarządzanie stanem aplikacji |
| Vue Router | nawigacja między widokami |
| Supabase | baza danych PostgreSQL w chmurze |
| Chart.js + vue-chartjs | wykres kołowy wydatków |
| CSS (własny system) | stylowanie, dark mode, responsywność |

## Model danych

Tabela `transactions` w Supabase:

| Kolumna | Typ | Opis |
|---------|-----|------|
| `id` | UUID | klucz główny, generowany automatycznie |
| `name` | TEXT | nazwa transakcji |
| `amount` | NUMERIC(10,2) | kwota w PLN |
| `type` | TEXT | `expense` lub `income` |
| `category` | TEXT | kategoria (np. Jedzenie, Transport) |
| `date` | DATE | data transakcji |
| `note` | TEXT | notatka (opcjonalna) |
| `created_at` | TIMESTAMPTZ | data dodania rekordu |

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

## Uruchomienie lokalne

```bash
git clone https://github.com/DominikRybski/fintrack
cd fintrack
npm install
```

Utwórz plik `.env.local`:

```
VITE_SUPABASE_URL=twój_url
VITE_SUPABASE_ANON_KEY=twój_klucz
```

Klucze znajdziesz w panelu Supabase → Settings → API.

```bash
npm run dev
```

## Struktura projektu

```
src/
├── assets/styles/     # design system (zmienne CSS, komponenty, reset)
├── components/        # NavBar, TransactionForm, TransactionList,
│                      # TransactionItem, BalanceSummary, FilterBar,
│                      # CategoryChart, EmptyState
├── router/            # konfiguracja Vue Router
├── services/          # supabase.js — komunikacja z bazą danych
├── stores/            # transactions.js — Pinia store
└── views/             # Dashboard.vue, Stats.vue
```

## Screenshoty

Zobacz folder [`docs/screenshots/`](docs/screenshots/).

## Autorzy

- **Dominik Rybski** — inicjalizacja projektu, design system CSS, NavBar, Supabase service, Pinia store, formularz z walidacją, screenshoty
- **Adrian Augustyn** — komponenty listy transakcji, BalanceSummary, FilterBar, widoki Dashboard i Stats, wykres CategoryChart, konfiguracja GitHub Pages
