# Status projektu — Free CV Creator

**Data przeglądu:** 2026-05-20

---

## Szacunkowy postęp

```
Landing page    ████████████ 100%
Dashboard       ████████████ 100%
JSON I/E        ████████████ 100%
Szablony        ████████░░░░  70% (są, ale nie renderowane w edytorze)
Edytor          ██████░░░░░░  55% (formularz ok, brak live preview + persistence)
PDF export      ████░░░░░░░░  20% (pakiet zainstalowany, brak implementacji)
PWA             ░░░░░░░░░░░░   0%
```

**Ogólny postęp MVP: ~60–65%**

---

## Co działa

| Funkcja | Moduł | Uwagi |
|---|---|---|
| Landing page | `src/modules/home/` | Kompletny — hero, sekcje, FAQ, Privacy |
| Dashboard z listą CV | `src/modules/dashboard/` | Grid kafelków, menu akcji |
| Wiele CV | `useCvList()` + localStorage | Pełna persistence |
| JSON export | `downloadCvJson()` | Dostępny z menu CvCard |
| JSON import | `ImportDropzone` | Drag & drop na dashboardzie |
| Formularz edytora | `src/modules/editor/` | 6 sekcji: Personal, Experience, Education, Skills, Projects, Certifications |
| 5 szablonów CV | `src/modules/editor/templates/` | Slate, Ivory, Coral, Grid, Arc |

---

## Zainstalowane, ale nie zaimplementowane

| Pakiet | Wersja | Co brakuje |
|---|---|---|
| `@react-pdf/renderer` | 4.4.0 | Brak przycisku/logiki eksportu PDF w edytorze |
| `zustand` | 5.0.12 | State management odbywa się przez `useState`, store nie istnieje |

---

## Krytyczne braki (blokujące MVP)

### 1. Live preview w edytorze
- Szablony (`SlateTemplate`, `IvoryTemplate` itd.) są zbudowane jako komponenty React
- `NewCvPage.tsx` nie renderuje żadnego szablonu — użytkownik nie widzi podglądu CV podczas edycji

### 2. Brak route `/app/[id]`
- `CvCard` na dashboardzie linkuje do `/app/${cv.id}`
- Strona nie istnieje — edycja istniejącego CV jest niemożliwa

### 3. Edytor nie zapisuje danych
- `useCvData()` trzyma stan wyłącznie w pamięci React
- Odświeżenie strony = utrata całego CV w trakcie edycji

### 4. PWA
- Brak `manifest.json`, service workera i pakietu `next-pwa`
- README wymienia PWA jako feature

---

## Architektura (stan aktualny)

```
src/
├── app/
│   └── [locale]/
│       ├── page.tsx          → Landing page
│       ├── app/
│       │   ├── page.tsx      → Dashboard
│       │   └── new/page.tsx  → Nowe CV (edytor)
│       │   └── [id]/         ← BRAKUJE (edycja istniejącego CV)
│
├── modules/
│   ├── common/               → AppLogo, LanguageSwitcher, shared hooks
│   ├── home/                 → Landing page i wszystkie sekcje
│   ├── dashboard/            → Lista CV, import/export, hooks, utils
│   └── editor/
│       ├── pages/            → NewCvPage
│       ├── hooks/            → useCvData (brak persistence)
│       ├── components/       → EditorNavbar, EditorSidebar, sekcje formularza
│       └── templates/        → 5 szablonów (Slate, Ivory, Coral, Grid, Arc)
```

---

## Następne priorytety (sugerowana kolejność)

1. **Live preview** — wyrenderować aktywny szablon obok formularza w `NewCvPage`
2. **Persistence edytora** — zapisywać `useCvData` do localStorage (lub przez `useCvList`)
3. **Route `/app/[id]`** — strona edycji istniejącego CV
4. **PDF export** — podpiąć `@react-pdf/renderer` pod EditorNavbar
5. **PWA** — `manifest.json` + `next-pwa`
