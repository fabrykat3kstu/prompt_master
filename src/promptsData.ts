import { PromptItem, Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "strategy",
    name: "Strategia CEO i biznes",
    icon: "Briefcase",
    description: "Zarządzanie agencją, skalowanie usług i strategiczny audyt zasobów biznesu."
  },
  {
    id: "marketing",
    name: "Marketing i viral",
    icon: "Zap",
    description: "Budowanie zasięgów, copywriting, inżynieria treści viralowych i cold emailing."
  },
  {
    id: "video",
    name: "Foto i wideo",
    icon: "Video",
    description: "Scenariusze dla rolki (reels), TikTok, YouTube premium wraz ze szczegółowymi wytycznymi reżyserskimi."
  },
  {
    id: "seo",
    name: "SEO i dostępność cyfrowa",
    icon: "SearchCode",
    description: "Kompleksowe audyty techniczne i zgodność z kluczowymi normami prawnymi WCAG 2.2 AA."
  },
  {
    id: "academic",
    name: "Badania naukowe",
    icon: "GraduationCap",
    description: "Wsparcie prac dyplomowych i doktoratów: symulowanie badań własnych, statystyki i styl akademicki."
  },
  {
    id: "finance",
    name: "Finanse i inwestycje",
    icon: "Wallet",
    description: "Spersonalizowane audyty majątkowe, długoterminowe portfele ETF/XTB i plany oszczędnościowe."
  },
  {
    id: "security",
    name: "Bezpieczeństwo i OSINT",
    icon: "ShieldCheck",
    description: "Biały wywiad rynkowy, dezinformacja oraz bezpieczeństwo geopolityczne i prawne NDA."
  },
  {
    id: "organization",
    name: "Zarządzanie i organizacja",
    icon: "LayoutList",
    description: "Zorganizowana praca agencji, agendy strategicznych spotkań oraz super-optymalizacja CV."
  },
  {
    id: "health",
    name: "Sport i zdrowie",
    icon: "Activity",
    description: "Redukcje, fizjoterapia kręgosłupa przy pracy siedzącej i plany treningowe."
  },
  {
    id: "travel",
    name: "Podróże",
    icon: "Palmtree",
    description: "Modułowe, kompaktowe plany wyjazdów biznesowych i turystycznych wraz z budżetami."
  }
];

export const INITIAL_PROMPTS: PromptItem[] = [
  // --- STRATEGIA CEO I BIZNES ---
  {
    id: "ceo-1",
    category: "strategy",
    title: "Strategiczny partner i weteran biznesu",
    description: "Uruchamia interaktywnego doradcę biznesowego z 15-letnim stażem. najbardziej polecany krok zero przy starcie audytów.",
    prompt: "Jesteś moim partnerem biznesowym i osobistym strategiem. Masz 15-letnie doświadczenie w budowaniu biznesów online, marketingu internetowym i monetyzacji wiedzy. Masz za sobą dziesiątki dochodowych projektów (5-6 cyfrowe zyski).\n\nTWOJA FILOZOFIA: \n1. Brutalna szczerość (słabe pomysły nazywasz po imieniu).\n2. ROI ponad lajki (wszystko musi budować listę lub sprzedawać).\n3. Przepływ (Social -> Lead Magnet -> Newsletter -> Oferta).\n4. Strategia > Taktyka.\n\nZANIM udzielisz porady, musisz zrozumieć moje zasoby. W pierwszej wiadomości:\n1. Potwierdź rolę.\n2. Zadaj mi 5-7 kluczowych pytań diagnostycznych (przychody, ceny, czas, profil klienta, wyzwania).\nPoczekaj na moje odpowiedzi.",
    tip: "Zawsze uruchamiaj ten prompt przed ubieganiem się o doradztwo operacyjne u AI."
  },
  {
    id: "ceo-ai-studio",
    category: "strategy",
    title: "Automatyzacja API Gemini w Google AI Studio",
    description: "Zaawansowany skrypt w języku Python do stabilnego i masowego przetwarzania plików tekstowych przy użyciu modelu gemini-3.5-flash.",
    prompt: "Jesteś doświadczonym inżynierem oprogramowania i ekspertem ds. automatyzacji AI. Napisz gotowy, w pełni skomentowany i odporny na błędy skrypt w języku Python, który integruje się z API Google AI Studio (model gemini-3.5-flash) w celu masowego przetwarzania danych tekstowych.\n\nSkrypt musi spełniać następujące wymagania techniczne:\n1. Korzystać z najnowszej, oficjalnej biblioteki `google-genai`.\n2. Bezpiecznie pobierać klucz API bezpośrednio ze zmiennych środowiskowych systemu (os.environ).\n3. Implementować rygorystyczny mechanizm 'exponential backoff' (obsługa błędu 429 - rate limit) ponawiający zapytanie do 5 razy z rosnącym opóźnieniem (1s, 2s, 4s, 8s, 16s).\n4. Pozwalać na elastyczne przekazywanie parametrów modelu (systemInstruction, temperature, maxOutputTokens, responseMimeType).\n5. Obsługiwać masowe wczytywanie danych wejściowych z pliku wejściowego (np. CSV/TXT) oraz zapisywanie przetworzonych wyników na bieżąco (on-the-fly) do nowego pliku wyjściowego, zabezpieczając postęp przed awarią skryptu.",
    tip: "Niezbędne przy masowej automatyzacji witryn e-commerce oraz zaawansowanych klastrowaniach słów kluczowych."
  },
  {
    id: "ceo-2",
    category: "strategy",
    title: "Optymalizacja procesów w agencji marketingowej",
    description: "Szczegółowa analiza wąskich gardeł operacyjnych w agencjach usługowych oraz ich automatyzacja No-Code.",
    prompt: "Jesteś ekspertem ds. operacji i skalowania agencji usługowych. Prowadzę agencję marketingową. Moim celem jest zwiększenie marży i zaoszczędzenie czasu bez utraty jakości realizowanych usług.\n\nOto jak obecnie wygląda mój proces (od leada do oddania projektu): [opis obecnego procesu]\n\nZadanie:\n1. Wskaż 3 największe wąskie gardła.\n2. Zaproponuj konkretne narzędzia AI/No-Code do automatyzacji.\n3. Podaj schemat idealnego lejka operacyjnego.",
    tip: "Idealnie sprawdza się w parze z automatyzacją procesu zbierania briefów od nowych klientów."
  },
  {
    id: "ceo-3",
    category: "strategy",
    title: "Bezlitosna analiza konkurencji",
    description: "Agresywny research konkurentów i odnajdywanie luk w ich ofercie, które możesz spieniężyć.",
    prompt: "Jesteś analitykiem rynkowym. Przeanalizuj konkurenta: [nazwa lub link konkurenta]. Zidentyfikuj ich główne UVP, 3 słabości operacyjne oraz lukę na rynku, którą mogę wypełnić lepszą ofertą.",
    tip: "Wklej bezpośrednią treść podstrony 'O nas' lub 'Oferta' konkurenta w celu uzyskania unikalnej opinii rynkowej."
  },
  {
    id: "ceo-4",
    category: "strategy",
    title: "Budowa modelu subskrypcyjnego",
    description: "Transformacja usług jednorazowych w powtarzalne, prewidywalne abonamenty miesięczne.",
    prompt: "Pomóż mi przekształcić moje usługi copywriterskie w 'Productized Service' (model subskrypcyjny). Zaproponuj 3 warianty pakietów (Basic, Pro, Premium). Dla każdego podaj: nazwę, zakres prac, czego nie robimy oraz proponowaną cenę B2B.",
    tip: "Najszybsza droga do wygładzenia cykli finansowych w agencji."
  },
  {
    id: "ceo-5",
    category: "strategy",
    title: "Strategia pivotu biznesowego",
    description: "Szybka, bezawaryjna reorientacja operacyjna przy spadku sprzedaży danego produktu.",
    prompt: "Mój produkt [nazwa produktu] nie sprzedaje się tak jak zakładałem. Główne obiekcje to: [lista obiekcji klientów].\n\nWciel się w rolę stratega i zaproponuj strategię Pivotu:\n1. Nowe opakowanie wiedzy.\n2. Komunikacja zmiany do społeczności.\n3. 3 małe testy MVP na ten tydzień.",
    tip: "Większość porażek sprzedażowych wynika ze złej komunikacji, a nie złej jakości samego produktu."
  },

  // --- MARKETING I VIRAL ---
  {
    id: "mkt-niche",
    category: "marketing",
    title: "Zrozumienie niszy i odbiorców",
    description: "Wielopoziomowa psychologiczna analiza odbiorcy. odkrywa rzeczywiste motywatory zakupowe.",
    prompt: "Zachowuj się jak ekspert strategii social media. Przeanalizuj niszę [nazwa niszy] i zidentyfikuj:\n- Kim jest idealny odbiorca\n- Problemy, z którymi się zmaga\n- Emocje, które kierują jego decyzjami\n- Treści, które konsumuje codziennie\n- Co sprawia, że zaczyna obserwować, angażować się i kupować\nPodsumuj wszystko w jasnym profilu odbiorcy, abym mógł tworzyć treści, które faktycznie działają.",
    tip: "Zastosuj te analizy do stworzenia person komunikacyjnych przed startem nowej kampanii."
  },
  {
    id: "mkt-hooks",
    category: "marketing",
    title: "Twórca wiralowych haczyków",
    description: "Zbiór 50 niezawodnych wzorów nagłówków blokujących scrollowanie użytkownika.",
    prompt: "Zachowuj się jak copywriter, który pisze posty zdobywające miliony wyświetleń. Przeanalizuj wiralowe treści w niszy [nazwa niszy] i stwórz 50 szablonów haczyków (hooków), które mogę szybko dostosować. Pogrupuj je w kategorie: Ciekawość, Kontrowersja, Oparte na historii, Listy, Odważne twierdzenia. Spraw, aby każdy haczyk był krótki, jasny i zatrzymywał scrollowanie.",
    tip: "Wykorzystaj je jako alternatywy na początku nagrań wideo (Reels/Shorts)."
  },
  {
    id: "mkt-1",
    category: "marketing",
    title: "Kalendarz treści Instagram na 30 dni",
    description: "Kompletny, zrównoważony plan z harmonogramem na edukację, viral oraz szybką sprzedaż.",
    prompt: "Stwórz miesięczną strategię treści, która pomoże mi zdobyć [liczba docelowa obserwujących] nowych idealnych obserwujących do [data zakończenia kampanii]. Mój Instagram dotyczy [nisza tematyczna] i pomagam [grupa docelowa] [cel do osiągnięcia] za pomocą [oferowana usługa lub produkt]. Podziel strategię na tygodnie. Dodaj konkretne przykłady hooków dla każdego posta.",
    tip: "Przeplataj posty eksperckie o dużej wartości zapisywalnej z szybkimi, powtarzalnymi Reelsami."
  },
  {
    id: "mkt-2",
    category: "marketing",
    title: "Analiza SEO słów kluczowych",
    description: "Identyfikuje intencje rynkowe użytkowników i dzieli frazy na odpowiednie ścieżki.",
    prompt: "Wypisz 15 słów kluczowych, których [grupa docelowa] używa do wyszukiwania sposobów na [potrzeba lub cel odbiorców]. Podziel frazy na: Informacyjne, Transakcyjne i Nawigacyjne. Zaproponuj 5 tytułów na bloga.",
    tip: "Doskonale chroni przed marnowaniem budżetu reklamowego na niedopasowane intencje."
  },
  {
    id: "mkt-3",
    category: "marketing",
    title: "Angażująca burza mózgów",
    description: "Kreowanie niesztampowych, mocno komentowanych pomysłów wyłamujących się z powtarzalnych schematów.",
    prompt: "Szukam 10 pomysłów na zasięgowe treści na Instagram. Celem jest zwiększenie zaangażowania i wyświetleń. Myśl nieszablonowo! Prowadzę [nazwa i rodzaj mojego biznesu]. Dla każdego pomysłu podaj: hook, opis formatu i emocję, w którą uderzamy.",
    tip: "Użytkownicy uwielbiają narrację ukazującą ludzką stronę Twoich porażek i drogi do wniosków."
  },
  {
    id: "mkt-4",
    category: "marketing",
    title: "Post social media (formuła anty-AI)",
    description: "Blokuje typowe językowe maniery sztucznej inteligencji, zapewniając ultra-ludzki dźwięk tekstu.",
    prompt: "Napisz post na [PLATFORMA] o [TEMAT]. Zasady ANTY-AI: Zakaz retoryki na start, 'W dzisiejszym świecie', 'Warto zauważyć'. Max 2 emoji. Różna długość zdań, potoczne zwroty, niedoskonałości. Styl: Hook -> Historia -> Punchline.",
    tip: "Skutecznie eliminuje słowa-ozdobniki, czyniąc tekst przystępnym i dynamicznym."
  },
  {
    id: "mkt-5",
    category: "marketing",
    title: "Inżynieria wsteczna virali",
    description: "Dezawuuje sukces viralowych postów konkurencji i tworzy z nich uniwersalny schemat pisania.",
    prompt: "Jesteś analitykiem treści. Wykonaj inżynierię wsteczną posta: [treść analizowanego posta]. Przeanalizuj strukturę hooka, styl, słownictwo i psychologię (FOMO, curiosity gap). Stwórz gotowy do skopiowania prompt na bazie tej analizy.",
    tip: "Pozostawia strukturę nienaruszoną, uzbrajając Cię w uniwersalny mechanizm przyciągający uwagę."
  },
  {
    id: "mkt-6",
    category: "marketing",
    title: "Zabójczy cold email B2B",
    description: "Wzorzec nieformalnej, zwięzłej wiadomości do kluczowych decydentów o wysokiej responsywności.",
    prompt: "Jesteś elitarnym copywriterem B2B. Napisz dla mnie szablon wiadomości Cold Email do [stanowisko decydenta]. Zasady: Max 5 zdań, zacznij od NICH, podaj Social Proof, użyj Soft CTA.",
    tip: "Nigdy nie załączaj oferty PDF w pierwszej wiadomości – dąż najpierw do uzyskania odpowiedzi."
  },

  // --- FOTO I WIDEO ---
  {
    id: "vid-1",
    category: "video",
    title: "Algorytmiczny viral wideo",
    description: "Scenariusz skrojony dokładnie pod szybką dynamikę organiczną Facebook, Instagram i TikTok.",
    prompt: "Stwórz scenariusz rolki (15–45s) pod maksymalny zasięg. Styl dynamiczny. Wymagane: 5 wariantów hooka, pattern interrupt w 3 sekundy, tekst krótkimi frazami (max 4 słowa), moment zatrzymania scrolla, 3 warianty CTA. Dodaj plan montażu.",
    tip: "Pamiętaj o dopasowaniu trendu dźwiękowego przed wrzuceniem nagrania do sieci."
  },
  {
    id: "vid-2",
    category: "video",
    title: "Wideo sprzedażowe i monetyzacyjne",
    description: "Fokus na natychmiastowym pozyskiwaniu wiadomości DM / komentarzy pod lejek produktowy.",
    prompt: "Stwórz scenariusz rolki nastawionej na sprzedaż. Struktura: silny hook problemowy -> ból odbiorcy -> rozwiązanie -> dowód -> FOMO -> CTA. Dodaj 3 wersje hooka i tekst pod reklamy płatne.",
    tip: "Zawsze nawołuj do jasnego słowa kluczowego w komentarzu (np. napisz 'PROMPT' w komentarzu a prześlę Ci link)."
  },
  {
    id: "vid-3",
    category: "video",
    title: "Sesje motoryzacyjne i offroad",
    description: "Doskonała reżyseria pokazująca detal i potęgę ruchu maszyn.",
    prompt: "Stwórz scenariusz rolki pokazującej samochód. Styl dynamiczny, efekt wow. Dodaj: hook w ruchu, ujęcia wnętrza + zewnątrz, slowmo z przyspieszeniem, teksty techniczne (moc, moment), dźwięk silnika w montażu.",
    tip: "Staraj się kręcić z niskiej perspektywy w celu optycznego powiększenia sylwetki pojazdu."
  },
  {
    id: "vid-4",
    category: "video",
    title: "Cinematic travel premium",
    description: "Opowieść podróżnicza z narracją docierająca do najgłębszych marzeń estetycznych.",
    prompt: "Stwórz scenariusz rolki travel cinematic. Klimat: dokument premium. Uwzględnij: narrację opowieści, opis ujęć (dron, slowmo, detal, panorama), muzykę, przejścia. Zamknięcie z refleksją i 3 alternatywne zakończenia.",
    tip: "Skup się na dźwiękach otoczenia (sound design) takich jak fale, wiatr czy kroki."
  },
  {
    id: "vid-5",
    category: "video",
    title: "Dynamiczny format problem-solution",
    description: "Czysty schemat z rekomendacji UX dla Instagrama - zoptymalizowane podglądy i położenie napisów.",
    prompt: "Wygeneruj dynamiczne wideo sprzedażowe (1080x1920). Zasady: auto-zoomy co 3-5 sek, postać centralnie. Napisy: zsynchronizowane, wyżej niż standardowo, żółte słowa kluczowe. Sekwencja: 0:01-0:10 chaos (B-roll), potem przejście do rozwiązania i finał.",
    tip: "Tytułowe napisy trzymaj zawsze w bezpiecznej strefie, by interfejs aplikacji ich nie zasłaniał."
  },
  {
    id: "vid-6",
    category: "video",
    title: "Rolka ekspercka dla marki osobistej",
    description: "Gromadzona merytoryka bez nachalnego marketingu. buduje status lidera branży z minuty na minutę.",
    prompt: "Stwórz profesjonalny scenariusz rolki budującej autorytet. Styl: rzeczowy, merytoryczny. Uwzględnij: Tezę przewodnią, 3 argumenty, przykład praktyczny, insight ekspercki, mocne zamknięcie.",
    tip: "Odpowiadaj na konkretne, często niszowe pytania od swoich prawdziwych klientów."
  },

  // --- SEO I WCAG DOSTĘPNOŚĆ ---
  {
    id: "seo-audit-1",
    category: "seo",
    title: "Strategiczny audyt SEO 360",
    description: "Techniczno-treściowy audyt serwisu o wysokim zaawansowaniu, dający gotowe zadania wdrożeniowe.",
    prompt: "Wykonaj kompleksowy audyt SEO strony: [adres URL strony]. Branża: [branża]. Rynek: [docelowy rynek]. Cel biznesowy: [główny cel biznesowy strony].\nAudyt podziel na sekcje:\n1. Audyt techniczny (statusy 200/301/404, robots, schema, Vitals, mobile usability).\n2. Audyt on-page (title, meta, nagłówki H1-H6, E-E-A-T, ALT).\n3. Audyt contentowy (intencje wyszukiwania, Topical Authority).\n4. Audyt off-site (linki).\n5. Analiza konkurencji.\n6. Rekomendacje (Quick wins, strategia 6 m-cy).\nWyniki przedstaw z priorytetami High/Medium/Low.",
    tip: "Niezbędny materiał przy tworzeniu rzetelnych wycen dla nowych, wymagających klientów."
  },
  {
    id: "wcag-tech-1",
    category: "seo",
    title: "Audyt WCAG 2.2 AA (techniczny)",
    description: "Analizuje kod, skupienie (focus), dostępność klawiatury oraz reguły czytników ekranowych.",
    prompt: "Wykonaj szczegółowy audyt dostępności cyfrowej strony [adres URL strony] zgodnie z WCAG 2.2 AA. Oceń zgodność w podziale na: \n1. Percepcja (kontrast, ALT, napisy, skalowalność 200%).\n2. Funkcjonalność (klawiatura, focus, ARIA roles, pułapki klaw.).\n3. Zrozumiałość (język, błędy).\n4. Solidność (semantyka, czytniki).\nW raporcie podaj naruszenia, priorytet, ryzyko prawne i checklistę dla developera.",
    tip: "Kluczowy etap audytów dla podmiotów publicznych i medycznych."
  },
  {
    id: "wcag-legal-1",
    category: "seo",
    title: "Dostępność cyfrowa - legal compliance",
    description: "Audyt zgodności w świetle EAA (European Accessibility Act) i polskiego prawa.",
    prompt: "Przygotuj audyt dostępności cyfrowej strony [adres URL strony] w kontekście zgodności z WCAG 2.2, European Accessibility Act oraz ustawą o dostępności cyfrowej. Oceń ryzyko sankcji, barier UX i wpływ na SEO. Uwzględnij executive summary dla zarządu, listę barier, roadmapę (30/90/180 dni) i deklarację dostępności.",
    tip: "Od czerwca 2025 roku kary za brak dostępności dotkną również sektor prywatny (SaaS, E-sklepy)."
  },

  // --- AKADEMICKIE I BADANIA ---
  {
    id: "acad-wyniki-1",
    category: "academic",
    title: "Precyzyjne opracowanie badań sondażowych",
    description: "Generuje cały rozdział badawczy (Rozdział IV) na podstawie kwestionariusza ankiety w bezbłędnej nomenklaturze naukowej.",
    prompt: "Opracuj wyniki badań sondażowych przeprowadzonych techniką ankiety przy użyciu kwestionariusza ankiety jako narzędzia badawczego. Opracowanie przygotuj na podstawie dostarczonych danych: [dane z ankiety (np. surowy tekst, CSV, XML, XLS)]. AI musi samodzielnie zidentyfikować wszystkie pytania oraz dane liczbowe w tym pliku. Dla każdego pytania z osobna przygotuj opracowanie według schematu:\n\n1. Tytuł: Wykres (kolejny numer wykresu). Odpowiedzi na pytanie nr (numer pytania) - (pełna treść zidentyfikowanego pytania).\n2. Podpis: 'Źródło: Opracowanie własne na podstawie przeprowadzonych badań.'.\n3. Analiza opisowa: Tekst w stylu akademickim i naukowym interpretujący dane z kwestionariusza. Wzoruj się na przykładzie: 'Pod względem poziomu wykształcenia w badanej grupie respondentów dominowały osoby posiadające dyplom studiów licencjackich lub inżynierskich (30,5%). 23,2% respondentów to studentenci studiów magisterskich. 22,1% respondentów studiuje na studiach I stopnia. Z kolei 20% badanych posiada dyplom magistra. Nieznaczna liczba badanych posiada wykształcenie średnie.'.\n\nDbaj o rygorystyczny styl naukowy, płynność narracji, poprawne zaokrąglenia procentowe oraz precyzyjne wnioskowanie statystyczne.\n\nStruktura rozdziału:\nRozdział IV: Wyniki badań własnych i ich analiza\n4.1. Charakterystyka społeczno-demograficzna próby badawczej (metryczka kwestionariusza)\n4.2. Analiza wyników badania sondażowego (interpretacja wszystkich kolejnych pytań z pliku danych)\n4.3. Wnioski z badań i rekomendacje naukowe\n\nW tym rozdziale przedstaw naukowe wnioski z analizy kwestionariusza. Na początku podaj metodologię: cel, technikę badania (ankieta) i zastosowane narzędzie badawcze (kwestionariusz ankiety). Następnie przedstaw interpretację zebranych danych empirycznych oraz wskaż weryfikację hipotez badawczych i własne wnioski zbieżne z tematyką pracy naukowej.\n\nZałożenia metodologiczne dla badań własnych (odnieś się we wnioskach i rekomendacjach): [metodologia].",
    tip: "Przeklej surowe dane z kwestionariusza ankiety (np. Excel, PDF lub XML), aby wygenerować profesjonalną analizę opisową do pracy dyplomowej."
  },
  {
    id: "acad-sim-1",
    category: "academic",
    title: "Symulacja statystyczna badań",
    description: "Projektuje ankietę Likerta, metryczki i tabelaryczny rozkład próby na 50+ respondentów.",
    prompt: "Zasymuluj przeprowadzenie badań własnych na temat [temat badania]. Skorzystaj z metody sondażu i techniki ankiety online. Opracuj: \n1. Kwestionariusz (metryczka: służba, staż, płeć, wiek + 15 pytań skala Likerta).\n2. Charakterystyka próby (tabele rozkładu dla 50 respondentów + opis akademicki).\n3. Analiza pytań zasadniczych (osobne tabele dla każdego pytania + interpretacja).\n4. Wnioski i rekomendacje (weryfikacja hipotez).\nZachowaj rygorystyczny styl naukowy.",
    tip: "Pomoże ugruntować wstępne hipotezy badawcze przed prawdziwym pilotażem."
  },
  {
    id: "acad-phd-1",
    category: "academic",
    title: "Promotor naukowy AI",
    description: "Pomaga wykryć luki badawcze (research gaps) i stawiać poprawnie pytania problemowe.",
    prompt: "Jesteś promotorem akademickim. Pomagasz mi w przygotowaniu [rodzaj opracowania (np. artykuł/rozdział)]. Temat: [temat pracy]. Zadania: 1. Zaproponuj strukturę (Abstrakt-Wstęp-Metodologia-Wyniki), 2. Wskaż 5 luk badawczych (research gaps), 3. Zaproponuj pytania badawcze.",
    tip: "Świetny mechanizm obrony przed zbytnim ogólnikiem w pracy seminaryjnej."
  },
  {
    id: "acad-phd-2",
    category: "academic",
    title: "Trening i symulator obrony doktoratu",
    description: "Wciela się w niezwykle czepliwego recenzenta, odkrywając najsłabsze punkty tezy naukowej.",
    prompt: "Zagraj rolę surowego recenzenta mojej rozprawy. Oto moja teza: [teza rozprawy doktorskiej]. Zadaj mi 3 najtrudniejsze, podchwytliwe pytania metodologiczne i merytoryczne, jakie mogłyby paść podczas obrony. Nie oszczędzaj mnie.",
    tip: "Podstawowy krok w budowaniu odporności psychicznej i merytorycznej przed obroną pracy."
  },

  // --- FINANSE ---
  {
    id: "fin-gs-1",
    category: "finance",
    title: "Audyt majątkowy w stylu Goldman Sachs",
    description: "Doskonały diagnoza aktywów, pasywów i długów z realną punktacją finansową.",
    prompt: "Jesteś starszym doradcą ds. majątku. Chcę jasnego przeglądu moich finansów, który pokaże, na czym stoję i co naprawić najpierw. Przeanalizuj:\n- Majątek netto (tabela aktywów i długów)\n- Miesięczny przepływ pieniędzy (dochody vs wydatki)\n- Fundusz awaryjny (ile miesięcy przetrwania)\n- Przegląd zadłużenia (stopy procentowe i strategia spłaty)\n- Przegląd ubezpieczeń\n- Inwestycje (mieszanka portfela pod mój wiek i cele)\n- Gotowość emerytalna i podatki\n- Ogólna ocena finansowa (1-100) i top 3 akcje do podjęcia.\nMoje dane: [wiek, dochody, koszty i oszczędności]",
    tip: "Daje doskonały obiektywny obraz własnych finansów bez emocji."
  },
  {
    id: "fin-xtb-1",
    category: "finance",
    title: "Ocena i dywersyfikacja portfela XTB",
    description: "Optymalizuje portfel inwestycyjny złożony z ETF oraz akcji dywidendowych.",
    prompt: "Oceń mój portfel XTB. Skład: [skład obecnego portfela (akcje i ETF)]. Oceń dywersyfikację, potencjał wzrostu i dywidendowy. Uwzględnij sytuację rynkową. Stwórz tabelę z rekomendacjami inwestowania 1000 zł miesięcznie przez kolejne 6 miesięcy.",
    tip: "Zapobiega przewartościowaniu jednego sektora w portfelu."
  },
  {
    id: "fin-podatki-1",
    category: "finance",
    title: "Audyt podatkowy dla polskiego JDG",
    description: "Analizuje ryczałt vs podatek liniowy vs skalę podatkową i health-contributions chroniąc finanse.",
    prompt: "Porównaj formy opodatkowania dla polskiego przedsiębiorcy. Dane: [przychód, koszty oraz status ZUS/VAT]. Wylicz roczne obciążenie (Podatek + Zdrowotna) i wskaż najbardziej optymalne rozwiązanie.",
    tip: "Pamiętaj o uwzględnieniu odliczeń ZUS przed wyborem formy opodatkowania."
  },

  // --- BEZPIECZEŃSTWO I OSINT ---
  {
    id: "sec-trip-1",
    category: "security",
    title: "Geopolityczny przegląd przed podróżą",
    description: "Audyt obyczajów i bezpieczeństwa w docelowym kraju przed podróżami biznesowymi.",
    prompt: "Jesteś doświadczonym doradcą z zakresu bezpieczeństwa podróży. Jadę do [kraj docelowy] w terminie [termin podróży]. Sporządź rozpoznanie sytuacji pod kątem obyczajowym i politycznym: \n1. Stosunek do Polaków (gov.pl).\n2. Powitania i zwroty grzecznościowe.\n3. Gesty zakazane i wskazane (palce, dłonie, głowa).\n4. Napiwki.\n5. Dress code (sakralne i publiczne).\n6. Święta narodowe i ograniczenia w terminie wyjazdu.\n7. Zagrożenia i przestępczość lokalna.\n8. Waluta, kurs i prawo wywozu gotówki.\n9. Dane najbliższej placówki dyplomatycznej (gov.pl).\nPodaj źródła każdej informacji.",
    tip: "Chroni przed niezręcznymi gafami obyczajowymi i utratą reputacji."
  },
  {
    id: "sec-osint-1",
    category: "security",
    title: "Analityk białego wywiadu (OSINT) dla agencji",
    description: "Szybka weryfikacja i ocena wiarygodności podejrzanych leadów rynkowych lub osób.",
    prompt: "Jesteś ekspertem OSINT. Przeanalizuj wiadomość: [treść podejrzanej wiadomości]. Dokonaj analizy krytycznej (socjotechnika, manipulacja, red flagi). Wskaż bazy do sprawdzenia i oceń ryzyko interakcji.",
    tip: "Działa ochronno na poufne dane firmowe – zawsze przeprowadzaj audyt nadawców przed podpisaniem umów."
  },
  // --- PODRÓŻE ---
  {
    id: "trv-adventure-1",
    category: "travel",
    title: "Wybierz własną przygodę w mieście",
    description: "Modułowy plan dnia dopasowany do nastroju.",
    prompt: "Zaplanuj wycieczkę po [miasto docelowe] na [liczba dni] dni. Dla każdej pory dnia przedstaw 3 opcje dopasowane do stylów: [preferowane style zwiedzania (np. historia/kulinaria)]. Podaj opis, czas i koszt ($).",
    tip: "Łącz style, np. 'historia i lokalna kuchnia'."
  },
  {
    id: "trv-mountain-1",
    category: "travel",
    title: "Górski plan awaryjny na złą pogodę",
    description: "Alternatywne atrakcje, gdy nie można wyjść na szlak.",
    prompt: "Stwórz plan awaryjny dla regionu [region górski]. Kategorie: 1. Pod dachem, 2. Kultura, 3. Smaki regionu, 4. Relaks. Podaj Pro-Tipy dla każdej atrakcji.",
    tip: "Warto mieć ten plan zapisany przed wyjazdem w góry."
  },
  {
    id: "trv-budget-1",
    category: "travel",
    title: "Oszacowanie budżetu turysty",
    description: "Precyzyjna kalkulacja kosztów w lokalnej walucie.",
    prompt: "Oszacuj budżet na podróż do [kierunek podróży] na [liczba dni] dni dla [liczba osób] osób. Stwórz tabelę: Kategoria, Koszt dzienny (lokalna waluta), Koszt całkowity (PLN). Podaj porady oszczędnościowe.",
    tip: "Zawsze dodaj 15% rezerwy na nieprzewodziane wydatki."
  },
  {
    id: "trv-plan-1",
    category: "travel",
    title: "Kompleksowy plan wakacji",
    description: "Strategiczny i operacyjny plan wyjazdu dzień po dniu.",
    prompt: "Przygotuj szczegółowy plan podróży. Miejsce docelowe: [kierunek podróży]. Termin: [daty wyjazdu]. Budżet: [szacowany budżet]. Styl podróżowania: [styl wyjazdu (np. aktywny/relaks)]. Uwzględnij: 1. Plan dzień po dniu, 2. Noclegi, 3. Transport, 4. Must see (główne atrakcje), 5. Gastronomię, 6. Checklistę praktyczną.",
    tip: "Użyj tego do planowania swoich głównych zagranicznych wyjazdów."
  },
  {
    id: "trv-citybreak-1",
    category: "travel",
    title: "Planowanie city breaku (szybki wypad)",
    description: "Intensywny i logistycznie zoptymalizowany plan na weekendowy wyjazd do europejskiej stolicy.",
    prompt: "Zaplanuj intensywny wyjazd typu City Break do miasta [miasto docelowe] na [liczba dni] dni. Skup się na maksymalnym wykorzystaniu czasu. Opracuj: 1. Logistykę dojazdu z lotniska, 2. Optymalną trasę zwiedzania dzielnica po dzielnicy, 3. Rekomendowane miejsca na szybki lunch i kolację z lokalną kuchnią, 4. Kartę komunikacji miejskiej, którą warto kupić. Unikaj turystycznych pułapek.",
    tip: "Idealne narzędzie do planowania krótkich, 2-3 dniowych wypadów weekendowych."
  },
  {
    id: "trv-packing-1",
    category: "travel",
    title: "Pakowanie i checklista przedwyjazdowa (Smart Packing)",
    description: "Spersonalizowana checklista rzeczy do zabrania dopasowana do klimatu i aktywności.",
    prompt: "Stwórz spersonalizowaną listę rzeczy do spakowania na wyjazd do [kierunek podróży] na [liczba dni] dni. Typ wyjazdu i główne aktywności: [aktywności i styl podróży (np. trekking/plaża)]. Uwzględnij: 1. Dokumenty i finanse, 2. Odzież dopasowaną do klimatu, 3. Apteczkę, 4. Elektronikę, 5. Kosmetyki, 6. Rzeczy specyficzne dla typu wyjazdu. Podaj wskazówki, jak spakować się tylko w bagaż podręczny.",
    tip: "Pomoże Ci uniknąć stresu i zapomnienia o najważniejszych dokumentach lub lekach."
  }
];
