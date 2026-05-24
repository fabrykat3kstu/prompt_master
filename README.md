# Fabryka Tekstu - Katalog & Kreator Promptów AI Premium

Profesjonalna, dynamiczna aplikacja webowa służąca do przeglądania, zarządzania, tworzenia oraz optymalizacji instrukcji (promptów) dla sztucznej inteligencji. Dostarcza zestaw zaawansowanych szablonów biznesowych oraz inteligentny kreator podłączony pod API Gemini.

---

## 🛠️ Technologie i Języki Oprogramowania

Aplikacja została zbudowana w architekturze full-stack (Client-Server) z zachowaniem najwyższych standardów bezpieczeństwa:

*   **Frontend (Klient):**
    *   **React 19** – nowoczesna biblioteka do tworzenia reaktywnego interfejsu użytkownika.
    *   **TypeScript** – pełne typowanie statyczne zapewniające niezawodność kodu i brak błędów wykonania.
    *   **Tailwind CSS (v4)** – błyskawiczne, nowoczesne stylowanie oparte o klasy narzędziowe z autorskim, czystym interfejsem graficznym.
    *   **Motion** – płynne animacje przejścia między widokami i dynamicznymi stanami.
    *   **Lucide React** – lekki zestaw doskonałych wektorowych ikon systemowych.

*   **Backend (Serwer proxy):**
    *   **Express.js (Node.js)** – lekki serwer pośredniczący (proxy), który chroni klucze autoryzacyjne.
    *   **Google Gen AI SDK (`@google/genai`)** – najnowsza, oficjalna biblioteka od Google do bezpośredniej i szybkiej komunikacji z modelem **gemini-3.5-flash**.
    *   **Esbuild & Tsx** – narzędzia do natywnego uruchamiania i ultraszybkiego kompilowania kodu TypeScript po stronie serwera.

---

## 🌟 Kluczowe Funkcje Aplikacji

1.  **Kompletny katalog instrukcji premium:**
    *   Baza gotowych do użytku i podzielonych tematycznie instrukcji stworzonych we współpracy z ekspertami branżowymi (m.in.: Strategia CEO, Marketing i viral, Foto i wideo, SEO, Finanse i inwestycje, Badania i doktorat).
    *   Interaktywne pola formularzy wykrywające parametry szablonu (np. `[NISZA]`, `[STANOWISKO]`) i umożliwiające ich natychmiastowe uzupełnienie w locie.

2.  **Moja biblioteka szablonów:**
    *   Zarządzanie ulubionymi instrukcjami z katalogu głównego.
    *   Możliwość tworzenia, edycji i usuwania własnych, autorskich promptów.
    *   Pełna persistencja danych offline przy użyciu mechanizmu `localStorage` przeglądarki.

3.  **Kreator i Rafineria AI (Gemini Core):**
    *   Wykorzystuje zaawansowany model sztucznej inteligencji **gemini-3.5-flash**.
    *   Zamienia proste pomysły użytkownika w rygorystyczne, profesjonalne instrukcje systemowe wyposażone w określone role, kontekst, instrukcje krok po kroku oraz kryteria wyjściowe formatowania.

---

## 🚀 Uruchomienie lokalne

1.  **Instalacja zależności:**
    ```bash
    npm install
    ```

2.  **Konfiguracja API:**
    Stwórz plik `.env` w głównym katalogu i podaj swój klucz API z Google AI Studio:
    ```env
    GEMINI_API_KEY=twoj_klucz_api_tutaj
    ```

3.  **Uruchomienie w trybie developerskim:**
    ```bash
    npm run dev
    ```
    Aplikacja uruchomi się pod adresem: `http://localhost:3000`

---

## ☁️ Wdrożenie na platformie Vercel (Deployment)

Vercel to najpopularniejsza platforma do hostowania projektów stworzonych w React i Vite. Ze względu na to, że aplikacja posiada architekturę z wydzielonym serwerem Express (`server.ts`), masz dwie drogi wdrożenia:

### Metoda 1: Wdrożenie statyczne SPA (Najprostsza i zalecana na Vercel)
Jeśli chcesz hostować sam interfejs użytkownika (Vite SPA) bezpośrednio, Vercel obsłuży go w 100% darmowo jako witrynę statyczną.

1.  Zaloguj się na **Vercel** i połącz swoje repozytorium GitHub.
2.  Wybierz projekt i ustaw profil konfiguracji:
    *   **Framework Preset:** `Vite` (Vercel automatycznie wykryje ustawienia).
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
3.  Kliknij **Deploy**.

> **Uwaga dot. API:** Wywołania optymalizatora promptów korzystają z endpointu `/api/refine`. Jeśli prowadzisz wdrożenie jako statyczne SPA, musisz przenieść kod komunikacji z API Gemini bezpośrednio na frontend (importując `@google/genai` w kodzie Reacta) oraz dodać zmienną środowiskową `VITE_GEMINI_API_KEY` w panelu Vercel, LUB wdrożyć serwer jako Vercel Serverless Function (katalog `/api` z plikiem wejściowym do Node.js).

### Metoda 2: Wdrożenie z Vercel Serverless Functions (Zapewnienie pełnego full-stacka)
Aby zachować bezpieczeństwo klucza API po stronie serwera bez konieczności stawiania dedykowanego VPS:
1.  Stwórz w głównym katalogu folder o nazwie `api`.
2.  Przenieś logikę endpointów Express z `server.ts` do bezserwerowej funkcji Vercel (np. w pliku `api/refine.ts`).
3.  Dodaj zmienną `GEMINI_API_KEY` w ustawieniach środowiskowych projektu na Vercel (Settings -> Environment Variables).
