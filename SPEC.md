# SPEC.md — Free CV Creator

> Dokument specyfikacji produktu. Zawiera opis produktu, wymagania funkcjonalne i niefunkcjonalne, architekturę techniczną oraz model biznesowy. Aktualizowany na bieżąco w trakcie rozwoju projektu.

---

## Spis treści

1. [Opis produktu](#1-opis-produktu)
2. [Cel biznesowy i problem](#2-cel-biznesowy-i-problem)
3. [Widoki i przepływy użytkownika](#3-widoki-i-przepływy-użytkownika)
4. [Wymagania funkcjonalne](#4-wymagania-funkcjonalne)
5. [Wymagania niefunkcjonalne](#5-wymagania-niefunkcjonalne)
6. [Architektura techniczna](#6-architektura-techniczna)
7. [Stos technologiczny](#7-stos-technologiczny)
8. [Struktura danych](#8-struktura-danych)
9. [Persystencja danych](#9-persystencja-danych)
10. [PWA](#10-pwa)

---

## 1. Opis produktu

**Free CV Creator** to bezpłatna, przeglądarkowa aplikacja do tworzenia CV. Użytkownik wypełnia formularz, wybiera szablon, widzi podgląd w czasie rzeczywistym i pobiera gotowe CV jako PDF.

Nie jest wymagane żadne konto, logowanie ani podanie danych osobowych do korzystania z aplikacji. Wszystkie dane przechowywane są lokalnie w przeglądarce użytkownika i nigdy nie trafiają na serwer. Po pobraniu CV dane są automatycznie czyszczone z localStorage.

---

## 2. Cel biznesowy i problem

### Problem

Większość dostępnych kreatorów CV jest płatna lub ukrywa kluczowe funkcje (pobieranie PDF, dostęp do ładnych szablonów) za paywallem. Bezpłatne alternatywy (Europass) oferują bardzo ograniczone możliwości wizualne.

### Rozwiązanie

Narzędzie, które jest:

- **W pełni darmowe** dla standardowego użycia
- **Privacy-first** — zero danych na serwerze, zero konta
- **Atrakcyjne wizualnie** — nowoczesne, profesjonalne szablony
- **Proste w użyciu** — live preview, export do PDF i JSON

### Unikalna propozycja wartości (USP)

> Jedyne narzędzie, które jest jednocześnie darmowe, ładne i nie wymaga konta.

---

## 3. Widoki i przepływy użytkownika

### Mapa widoków

```
/           Landing Page
/app        Dashboard — lista CV
/app/new    Kreator nowego CV
/app/[id]   Edytor CV
```

### Opis widoków

**`/` — Landing Page**
Jedyna strona renderowana po stronie serwera (SSR) dla celów SEO. Zawiera: opis produktu, podgląd szablonów, sekcję prywatności ("Twoje dane nigdy nie opuszczają przeglądarki"), CTA "Stwórz CV za darmo".

**`/app` — Dashboard**
Lista kafelków CV wczytywanych z `cv_index` w localStorage. Każdy kafelek pokazuje nazwę CV, szablon, datę edycji. Dostępne akcje: utwórz nowe, edytuj, duplikuj, usuń, pobierz PDF, pobierz JSON. Pusty stan z CTA gdy brak CV.

**`/app/new` — Kreator nowego CV**
Dwuetapowy wizard:

1. Wybór szablonu (galeria z miniaturami)
2. Wybór języka CV (PL / EN) + nadanie własnej nazwy

Po zatwierdzeniu: generuje `id`, zapisuje wpis do `cv_index`, przekierowuje do `/app/[id]`.

**`/app/[id]` — Edytor CV**
Główny widok produktu. Formularz po lewej, live preview A4 po prawej. Nawigacja po sekcjach w lewym panelu. Na mobile: przełącznik Edytuj / Podgląd.

### Modalne okna w edytorze

| Modal           | Trigger                 | Zawartość                                                                                 |
| --------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| Zmiana szablonu | przycisk w toolbarze    | galeria miniatur szablonów                                                                |
| Eksport PDF     | przycisk "Pobierz PDF"  | podgląd przed pobraniem + przycisk potwierdzenia, generowanie przez `@react-pdf/renderer` |
| Eksport JSON    | przycisk "Pobierz JSON" | potwierdzenie + informacja o czyszczeniu localStorage                                     |
| Import JSON     | przycisk "Wczytaj CV"   | drop zone na plik JSON                                                                    |
| Usuń CV         | akcja z dashboardu      | potwierdzenie usunięcia                                                                   |

### Główny przepływ użytkownika

```
Landing
  └─► [Stwórz CV] ──► /app/new (wybór szablonu + języka)
                           └─► /app/[id] (edytor)
                                   └─► [modal Eksport PDF] ──► pobierz PDF
                                                                └─► wyczyść localStorage

  └─► [Wczytaj CV] ──► /app/[id] (edytor z danymi z JSON)
```

### Przepływ powracającego użytkownika

```
/app (dashboard)
  └─► kafelek CV ──► /app/[id] (edytor, dane z localStorage)
```

---

## 4. Wymagania funkcjonalne

### 4.1 Kreator CV

- [ ] Formularz podzielony na sekcje: Dane osobowe, Doświadczenie, Wykształcenie, Umiejętności, Dodatkowe
- [ ] Live preview szablonu w czasie rzeczywistym (side-by-side na desktop, tab-switch na mobile)
- [ ] Możliwość dodawania, usuwania i zmiany kolejności wpisów (doświadczenie, wykształcenie, etc.)
- [ ] Wybór szablonu z galerii
- [ ] Wybór koloru akcentu dla szablonu
- [ ] Walidacja formularza z komunikatami błędów

### 4.2 Szablony

- [ ] Minimum 5–6 szablonów na launch
- [ ] Każdy szablon responsywny na podgląd A4
- [ ] Podgląd miniaturek w galerii szablonów (CSS scale trick)

### 4.3 Eksport

- [ ] Eksport do PDF (zachowanie formatowania, tekst selektowalny, ATS-friendly)
- [ ] Eksport do JSON (pełne dane CV do późniejszego wczytania)
- [ ] Po pobraniu — wyczyszczenie danych z localStorage

### 4.4 Import

- [ ] Wczytanie pliku JSON i wypełnienie formularza danymi
- [ ] Walidacja struktury wczytanego JSON

### 4.5 Persystencja lokalna

- [ ] Automatyczny zapis do localStorage przy każdej zmianie
- [ ] Przywrócenie stanu przy ponownym otwarciu aplikacji (jeśli dane istnieją)
- [ ] Czyszczenie localStorage po eksporcie

### 4.6 PWA

- [ ] Możliwość instalacji na urządzeniu (Add to Home Screen)
- [ ] Działanie offline po pierwszym załadowaniu (Service Worker cache)

---

## 5. Wymagania niefunkcjonalne

| Kategoria      | Wymaganie                                                           |
| -------------- | ------------------------------------------------------------------- |
| Prywatność     | Zero danych użytkownika na serwerze w standardowym trybie           |
| Wydajność      | Live preview bez odczuwalnego lag — debounce lub `useDeferredValue` |
| Dostępność     | WCAG AA compliance dla formularzy i nawigacji                       |
| Responsywność  | Mobile-first, działa na ekranach ≥ 320px                            |
| SEO            | SSR przez Next.js, meta tagi, Open Graph                            |
| Bezpieczeństwo | CSP headers, sanityzacja importowanego JSON                         |
| Kompatybilność | Ostatnie 2 wersje Chrome, Firefox, Safari, Edge                     |

---

## 6. Architektura techniczna

### Schemat ogólny

```
┌──────────────────────────────────────────────┐
│                  Przeglądarka                │
│                                              │
│  ┌─────────────┐      ┌──────────────────┐   │
│  │   Formularz  │─────▶│   Zustand Store  │   │
│  │  (React HF)  │      │   (cvData)       │   │
│  └─────────────┘      └────────┬─────────┘   │
│                                │              │
│                    ┌───────────┴────────┐     │
│                    ▼                    ▼     │
│           ┌──────────────┐    ┌──────────────┐│
│           │ Live Preview │    │  localStorage ││
│           │  (Template)  │    │  (auto-sync)  ││
│           └──────┬───────┘    └──────────────┘│
│                  │                            │
│         ┌────────┴────────┐                   │
│         ▼                 ▼                   │
│    [PDF Export]      [JSON Export]            │
└──────────────────────────────────────────────┘
```

### Layout aplikacji (desktop)

```
┌──────────────────────────────────────────────────────────┐
│  Logo          [Zmień szablon]  [Kolor]  [Pobierz ▼]     │
├───────────────────────┬──────────────────────────────────┤
│  [Dane] [Dośw.] [...]  │                                  │
│                        │         PREVIEW A4               │
│    FORMULARZ           │    ┌──────────────────┐          │
│                        │    │                  │          │
│                        │    │   Jan Kowalski   │          │
│                        │    │   ...            │          │
│                        │    └──────────────────┘          │
└───────────────────────┴──────────────────────────────────┘
```

---

## 7. Stos technologiczny

| Warstwa       | Technologia              | Uzasadnienie                                                                  |
| ------------- | ------------------------ | ----------------------------------------------------------------------------- |
| Framework     | Next.js 14+ (App Router) | SSR, SEO, PWA support                                                         |
| Język         | TypeScript               | Bezpieczeństwo typów dla CVData schema                                        |
| Style         | Tailwind CSS             | Szybka implementacja, spójny design system                                    |
| Stan globalny | Zustand                  | Lekkie, bez boilerplate, middleware localStorage                              |
| Formularze    | React Hook Form + Zod    | Minimalne re-rendery, walidacja schema-driven, spójna z walidacją JSON        |
| PDF           | `@react-pdf/renderer`    | Pełna kontrola, spójna jakość cross-browser, tekst selektowalny, ATS-friendly |
| PWA           | `next-pwa`               | Service Worker, manifest                                                      |
| Hosting       | VPS OVH + Nginx + PM2    | Prywatny serwer, pełna kontrola, Docker-ready                                 |

---

## 8. Struktura danych

### Warstwy przechowywania (localStorage)

```
"cv_index"   →  CVListItem[]   lista wszystkich CV (lekkie metadane, widok listy)
"cv_{id}"    →  CVData         pełne dane pojedynczego CV (widok edytora)
```

---

### CVListItem — widok listy CV

Ładowany przy starcie aplikacji. Nie zawiera treści sekcji — tylko to, co potrzebne do wyświetlenia kafelka.

```typescript
interface CVListItem {
  id: string; // UUID
  title: string; // nazwa nadana przez użytkownika, np. "CV – Senior Dev EN"
  templateId: string; // do renderowania miniatury
  accentColor: string; // do renderowania miniatury
  language: 'pl' | 'en';
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  // snapshot do podglądu na kafelku
  previewName: string; // firstName + lastName
  previewTitle: string; // stanowisko z sekcji personal
}
```

---

### CVData — pełne dane CV

Ładowane tylko przy wejściu do edytora konkretnego CV.

```typescript
interface CVData {
  meta: CVMeta;
  personal: PersonalInfo;
  sections: CVSections;
  layout: CVLayout;
}
```

---

### CVMeta — metadane dokumentu

```typescript
interface CVMeta {
  id: string;
  title: string; // nazwa CV widoczna na liście
  templateId: string;
  accentColor: string;
  language: 'pl' | 'en';
  pageFormat: 'A4' | 'letter';
  createdAt: string;
  updatedAt: string;
}
```

---

### PersonalInfo — dane osobowe

```typescript
interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string; // np. "Frontend Developer"
  email: string;
  phone: string;
  location: string; // miasto / kraj
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string; // kilka zdań o sobie
  photo?: string; // base64
}
```

---

### CVSections — sekcje CV

Każda sekcja ma wspólny wrapper z metadanymi (widoczność, tytuł nadpisany przez użytkownika) oraz tablicę wpisów. Kolejność wpisów wyznacza indeks tablicy — reordering = mutacja tablicy.

```typescript
interface CVSections {
  experience: Section<ExperienceItem>;
  education: Section<EducationItem>;
  skills: Section<SkillGroupItem>;
  languages: Section<LanguageItem>;
  certifications: Section<CertificationItem>;
  projects: Section<ProjectItem>;
  courses: Section<CourseItem>;
  volunteer: Section<VolunteerItem>;
  interests: Section<InterestItem>;
  custom: CustomSection[]; // sekcje definiowane przez użytkownika
}

interface Section<T> {
  title: string; // domyślny tytuł lub nadpisany przez użytkownika
  visible: boolean;
  items: T[];
}
```

---

### Modele pól sekcji

```typescript
// --- Doświadczenie ---
interface ExperienceItem {
  id: string;
  position: string; // stanowisko
  company: string;
  location?: string;
  startDate: string; // YYYY-MM
  endDate: string | 'present';
  description: string; // opis, bullet pointy
  highlights?: string[];
  visible: boolean;
}

// --- Wykształcenie ---
interface EducationItem {
  id: string;
  institution: string; // nazwa uczelni / szkoły
  degree: string; // np. "Licencjat", "Magister"
  field: string; // kierunek studiów
  startDate: string; // YYYY-MM
  endDate: string | 'present';
  grade?: string; // ocena / GPA
  description?: string;
  visible: boolean;
}

// --- Umiejętności ---
interface SkillGroupItem {
  id: string;
  category: string; // np. "Frontend", "Narzędzia"
  skills: string[]; // ["React", "TypeScript", ...]
  visible: boolean;
}

// --- Języki ---
interface LanguageItem {
  id: string;
  name: string; // np. "Angielski"
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  visible: boolean;
}

// --- Certyfikaty ---
interface CertificationItem {
  id: string;
  name: string;
  issuer: string; // organizacja wystawiająca
  date: string; // YYYY-MM
  expiryDate?: string; // YYYY-MM
  credentialUrl?: string;
  visible: boolean;
}

// --- Projekty ---
interface ProjectItem {
  id: string;
  name: string;
  description: string;
  startDate?: string; // YYYY-MM
  endDate?: string | 'present';
  url?: string;
  github?: string;
  technologies?: string[];
  visible: boolean;
}

// --- Kursy ---
interface CourseItem {
  id: string;
  name: string;
  platform: string; // np. "Udemy", "Coursera", "YouTube"
  date?: string; // YYYY-MM ukończenia
  url?: string;
  visible: boolean;
}

// --- Wolontariat ---
interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  startDate: string; // YYYY-MM
  endDate: string | 'present';
  location?: string;
  description?: string;
  visible: boolean;
}

// --- Zainteresowania ---
interface InterestItem {
  id: string;
  name: string; // np. "Fotografia", "Open source"
  description?: string; // opcjonalne rozwinięcie
  visible: boolean;
}
```

---

### CustomSection — sekcje własne użytkownika

Użytkownik tworzy sekcję o dowolnej nazwie i dodaje wpisy z predefiniowanym zestawem pól.

```typescript
interface CustomSection {
  id: string;
  title: string; // nazwa sekcji nadana przez użytkownika
  visible: boolean;
  items: CustomSectionItem[];
}

interface CustomSectionItem {
  id: string;
  title?: string; // nagłówek wpisu
  subtitle?: string; // podtytuł / organizacja
  startDate?: string; // YYYY-MM
  endDate?: string | 'present';
  description?: string; // opis
  visible: boolean;
}
```

---

### CVLayout — kolejność i widoczność sekcji

```typescript
type SectionKey =
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certifications'
  | 'projects'
  | string; // string dla custom sections

interface CVLayout {
  sectionOrder: SectionKey[]; // kolejność sekcji na CV (drag & drop)
}
```

Widoczność poszczególnych sekcji przechowywana jest w `Section.visible`, a wpisów w `Item.visible` — layout trzyma wyłącznie kolejność.

---

## 9. Persystencja danych

### Flow localStorage

```
Użytkownik pisze → Zustand store → middleware localStorage (auto-save)
Użytkownik wraca → Aplikacja startuje → odczyt z localStorage → hydratacja stanu
Użytkownik pobiera PDF → eksport → wyczyszczenie localStorage
```

### JSON Import/Export

```typescript
// Export
const exportJSON = (data: CVData) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  // download trigger
};

// Import — z walidacją schematu
const importJSON = (file: File): Promise<CVData> => {
  // parse + validate schema (zod)
};
```

### Walidacja importu

Użycie biblioteki `zod` do walidacji struktury wczytanego JSON — odporność na uszkodzone lub złośliwe pliki.

---

## 10. PWA

### Wymagania

- `manifest.json` z ikoną, nazwą, theme color
- Service Worker (cache strategia: cache-first dla assets, network-first dla danych)
- Działanie offline po pierwszym załadowaniu
- "Add to Home Screen" prompt na mobile

### Konfiguracja

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});
```

---

_Ostatnia aktualizacja: 2026-03-24_
