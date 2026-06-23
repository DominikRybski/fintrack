# Dokumentacja projektu FinTrack

Projekt na zaliczenie przedmiotu Języki Internetowe 2026.
Autorzy: Dominik Rybski, Adrian Augustyn

---

## 1. Analiza problemu

### 1.1. Opis problemu

Wiele osób nie ma kontroli nad swoimi codziennymi wydatkami — nie wiedzą, ile wydają na jedzenie, transport czy rozrywkę, i nie widzą, czy ich miesięczne przychody pokrywają koszty. Istniejące aplikacje finansowe są często zbyt rozbudowane, wymagają zakładania kont z weryfikacją lub są płatne.

FinTrack rozwiązuje ten problem, oferując prostą aplikację webową do ręcznego rejestrowania transakcji. Użytkownik może szybko dodać wydatek lub przychód, zobaczyć aktualne saldo i przeanalizować strukturę wydatków na wykresie.

**Dlaczego problem jest istotny?**
Brak kontroli nad finansami osobistymi prowadzi do nieświadomego zadłużenia, braku oszczędności i trudności w planowaniu wydatków.

**W jakiej sytuacji użytkownik korzysta z aplikacji?**
Po każdym zakupie lub otrzymaniu wynagrodzenia — szybko loguje transakcję przez telefon lub komputer.

### 1.2. Użytkownik aplikacji

Aplikacja skierowana jest do **osoby prywatnej** — studenta lub młodej osoby pracującej, która chce kontrolować wydatki bez potrzeby instalowania rozbudowanego oprogramowania.

Potrzeby użytkownika:
- szybkie dodawanie transakcji bez logowania przez konto Google/Facebook,
- podgląd salda w czasie rzeczywistym,
- filtrowanie wydatków po kategorii lub miesiącu,
- wizualna analiza struktury wydatków,
- dostęp z różnych urządzeń.

### 1.3. Analiza konkurencji

| Aplikacja | Co robi dobrze | Ograniczenia | Czym FinTrack się różni |
|-----------|---------------|--------------|------------------------|
| **Mint** | rozbudowane raporty, automatyczny import z konta | tylko dla rynku USA, wymaga podłączenia konta bankowego | FinTrack działa bez podłączania banku, dane wpisuje użytkownik |
| **Money Manager** | prosta obsługa, kategorie, wykresy | aplikacja mobilna, nie ma wersji webowej | FinTrack działa w przeglądarce, bez instalacji |
| **Google Sheets** | elastyczność, znajomy interfejs | brak automatycznego liczenia salda, brak wykresów out-of-the-box | FinTrack ma gotowy UI, saldo i wykresy od razu |

**Inspiracje z konkurencji:** czytelne karty podsumowania (saldo/przychody/wydatki), podział na kategorie, wykres kołowy.

---

## 2. Analiza funkcjonalna

### 2.1. Lista funkcji

- dodawanie transakcji z polami: nazwa, kwota, typ (wydatek/przychód), kategoria, data, notatka
- walidacja formularza: puste pola, kwota > 0, wymagana kategoria, wymagana data
- wyświetlanie listy transakcji z nazwą, kwotą, typem, kategorią i datą
- edycja istniejącej transakcji
- usuwanie transakcji
- filtrowanie po kategorii, typie i miesiącu
- czyszczenie filtrów jednym przyciskiem
- podsumowanie: saldo, suma przychodów, suma wydatków (aktualizowane dynamicznie)
- wykres kołowy wydatków według kategorii (tylko wydatki, po filtrowaniu)
- komunikat pustego stanu gdy brak transakcji
- obsługa błędów połączenia z bazą danych
- dark mode z przełącznikiem w NavBar
- responsywny layout

### 2.2. User Stories

| ID | User Story |
|----|------------|
| US1 | Jako użytkownik chcę dodać transakcję, aby zapisać wydatek lub przychód. |
| US2 | Jako użytkownik chcę zobaczyć bieżące saldo, aby wiedzieć ile mam do dyspozycji. |
| US3 | Jako użytkownik chcę edytować transakcję, aby poprawić błędnie wprowadzone dane. |
| US4 | Jako użytkownik chcę usunąć transakcję, aby usunąć błędny wpis. |
| US5 | Jako użytkownik chcę filtrować transakcje po kategorii, aby analizować wydatki np. na jedzenie. |
| US6 | Jako użytkownik chcę filtrować po miesiącu, aby zobaczyć bilans za konkretny miesiąc. |
| US7 | Jako użytkownik chcę zobaczyć wykres wydatków według kategorii, aby szybko ocenić strukturę kosztów. |
| US8 | Jako użytkownik chcę, aby dane były dostępne po odświeżeniu strony, żeby nie tracić historii transakcji. |
| US9 | Jako użytkownik chcę używać aplikacji w trybie ciemnym, aby wygodnie korzystać wieczorem. |
| US10 | Jako użytkownik chcę widzieć komunikat gdy nie ma transakcji, aby wiedzieć że lista jest pusta, nie zepsuta. |

### 2.4. Lista zadań projektowych

| ID | Zadanie | Priorytet | Status | Autor |
|----|---------|-----------|--------|-------|
| T1 | Inicjalizacja projektu Vue 3 + Vite + Pinia + Router | Wysoki | Wykonane | Dominik |
| T2 | Design system CSS (zmienne, komponenty, reset) | Wysoki | Wykonane | Dominik |
| T3 | NavBar z przełącznikiem dark mode | Wysoki | Wykonane | Dominik |
| T4 | Supabase service (CRUD) | Wysoki | Wykonane | Dominik |
| T5 | Pinia store (stan, filtry, computed) | Wysoki | Wykonane | Dominik |
| T6 | TransactionForm z walidacją | Wysoki | Wykonane | Dominik |
| T7 | EmptyState, TransactionItem, TransactionList | Wysoki | Wykonane | Adrian |
| T8 | BalanceSummary i FilterBar | Wysoki | Wykonane | Adrian |
| T9 | Widoki Dashboard i Stats, integracja routera | Wysoki | Wykonane | Adrian |
| T10 | CategoryChart (wykres kołowy Chart.js) | Średni | Wykonane | Adrian |
| T11 | Deploy na GitHub Pages (Vite base path + workflow CI/CD) | Wysoki | Wykonane | Adrian |
| T12 | Rozbudowa README (cel, funkcje, model danych, link) | Średni | Wykonane | Dominik |
| T13 | Dokumentacja projektu | Średni | Wykonane | Adrian |
| T14 | Screenshoty aplikacji | Niski | Do zrobienia | Dominik |

### 2.5. Narzędzie do zarządzania zadaniami

Zadania projektowe były organizowane za pomocą **GitHub Projects** (tablica Kanban) oraz listy zadań w dokumentacji. Repozytorium: [github.com/DominikRybski/fintrack](https://github.com/DominikRybski/fintrack).

Historia commitów w repozytorium odzwierciedla kolejność realizacji zadań — każdy commit odpowiada jednemu ukończonemu zadaniu z powyższej listy.

---

## 3. Harmonogram pracy

| Etap | Zakres prac | Termin | Status |
|------|-------------|--------|--------|
| 1 | Analiza problemu, wybór technologii, setup projektu | tydzień 1 | Wykonane |
| 2 | Design system CSS, NavBar, routing | tydzień 1 | Wykonane |
| 3 | Supabase service, Pinia store, TransactionForm | tydzień 2 | Wykonane |
| 4 | Komponenty listy, BalanceSummary, FilterBar | tydzień 2 | Wykonane |
| 5 | Widoki Dashboard i Stats, integracja | tydzień 3 | Wykonane |
| 6 | Wykres CategoryChart, testy manualne, poprawki | tydzień 3 | Wykonane |
| 7 | Deploy GitHub Pages, CI/CD, dokumentacja, README | tydzień 4 | Wykonane |

**Realizacja harmonogramu:** Harmonogram został zrealizowany bez opóźnień. Podział pracy na dwie osoby pozwolił na równoległą pracę nad komponentami wizualnymi i logiką danych.

**Co zajęło więcej czasu:** Konfiguracja Supabase (Row Level Security, poprawna struktura tabeli) oraz integracja Chart.js z reaktywnym store Pinia wymagały więcej czasu niż zakładano.

**Największy problem organizacyjny:** Synchronizacja pracy przy jednoczesnej edycji store — rozwiązano przez podział odpowiedzialności (jeden autor pisze store, drugi komponenty korzystające ze store).

---

## 4. Specyfikacja techniczna

### 4.1. Technologie

| Technologia | Wersja | Zastosowanie |
|-------------|--------|-------------|
| Vue 3 | 3.5.x | framework, Composition API, reaktywność |
| Vite | 8.x | bundler, HMR, build produkcyjny |
| Pinia | 3.x | globalny stan aplikacji |
| Vue Router | 4.x | nawigacja, widoki Dashboard/Stats |
| Supabase JS | 2.x | klient do PostgreSQL w chmurze |
| Chart.js | 4.x | wykresy |
| vue-chartjs | 5.x | integracja Chart.js z Vue 3 |
| GitHub Actions | — | CI/CD, automatyczny deploy |
| GitHub Pages | — | hosting aplikacji |

### 4.2. Model danych

Aplikacja przechowuje jeden typ encji — **transakcję**.

```
Transaction {
  id:         UUID       -- klucz główny
  name:       string     -- nazwa transakcji
  amount:     number     -- kwota w PLN (> 0)
  type:       'expense' | 'income'
  category:   string     -- jedna z 9 predefiniowanych kategorii
  date:       string     -- ISO date (YYYY-MM-DD)
  note?:      string     -- opcjonalna notatka
  created_at: timestamp  -- data dodania
}
```

Dostępne kategorie: Jedzenie, Transport, Rachunki, Rozrywka, Zdrowie, Odzież, Edukacja, Oszczędności, Inne.

Dane są przechowywane w PostgreSQL przez Supabase. Po stronie klienta trzymane są w tablicy reaktywnej Pinia store i nigdy nie są dublowane w localStorage.

### 4.3. Architektura aplikacji

```
src/
├── assets/styles/
│   ├── variables.css      # tokeny designu (kolory, radius, shadow, dark mode)
│   ├── components.css     # klasy CSS: .card, .btn, .form-group, .badge
│   └── main.css           # reset, typografia, importuje powyższe
│
├── services/
│   └── supabase.js        # fetchTransactions, insertTransaction,
│                          # updateTransaction, deleteTransaction
│
├── stores/
│   └── transactions.js    # Pinia store: stan, filtry, computed (balance,
│                          # totalIncome, totalExpense, expenseByCategory),
│                          # akcje (load, add, update, remove)
│
├── components/
│   ├── NavBar.vue          # nawigacja, przełącznik dark mode
│   ├── TransactionForm.vue # formularz dodawania/edycji z walidacją
│   ├── TransactionList.vue # lista z obsługą stanów: loading/error/empty
│   ├── TransactionItem.vue # pojedyncza transakcja z przyciskami edit/delete
│   ├── BalanceSummary.vue  # 3 karty: saldo, przychody, wydatki
│   ├── FilterBar.vue       # filtry kategoria/typ/miesiąc
│   ├── CategoryChart.vue   # wykres kołowy Doughnut
│   └── EmptyState.vue      # komunikat braku danych
│
├── views/
│   ├── Dashboard.vue       # składa: BalanceSummary + TransactionForm
│   │                       # + FilterBar + TransactionList
│   └── Stats.vue           # składa: BalanceSummary + FilterBar
│                           # + CategoryChart
│
└── router/
    └── index.js            # / → Dashboard, /stats → Stats
```

### 4.4. Przepływ działania aplikacji

**Dodawanie transakcji:**

1. Użytkownik wypełnia formularz w `TransactionForm` i klika "Dodaj".
2. Komponent wywołuje funkcję `validate()` — sprawdzane są pola name, amount, category, date.
3. Jeśli walidacja nie przejdzie — wyświetlane są komunikaty błędów pod polami.
4. Jeśli walidacja OK — wywoływana jest akcja `store.add(data)`.
5. Store wywołuje `insertTransaction(data)` z `supabase.js`.
6. Supabase zapisuje rekord w PostgreSQL i zwraca nowy obiekt z `id`.
7. Store wstawia go na początek tablicy `transactions` (`unshift`).
8. Computed `filtered`, `balance`, `totalIncome`, `totalExpense` przeliczają się automatycznie.
9. `TransactionList` i `BalanceSummary` aktualizują widok reaktywnie.

**Filtrowanie:**

1. Użytkownik zmienia wartość w `FilterBar` (select lub input month).
2. `v-model` aktualizuje `store.filterCategory`, `store.filterType` lub `store.filterMonth`.
3. Computed `filtered` w store przeliczy się automatycznie.
4. `TransactionList` i `CategoryChart` renderują nowe dane bez dodatkowego wywołania API.
