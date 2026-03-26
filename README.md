# Free CV Creator

A free, privacy-first CV builder that runs entirely in your browser. No account required, no data stored on any server — your information never leaves your device.

> Create a professional CV, download it as PDF, and save it as JSON to edit later. That's it.

## Why another CV builder?

Most CV builders are either paid, hide PDF export behind a paywall, or require you to create an account. Free CV Creator gives you beautiful, modern templates with full PDF export — completely free, forever.

|                   | Free CV Creator | Canva            | Europass |
| ----------------- | --------------- | ---------------- | -------- |
| Free PDF export   | ✅              | Partially        | ✅       |
| Modern templates  | ✅              | ✅ (partly paid) | ❌       |
| No account needed | ✅              | ❌               | ✅       |
| Privacy-first     | ✅              | ❌               | ❌       |

## Features

- **Live preview** — see your CV update in real time as you type
- **Multiple templates** — choose from a curated set of modern, ATS-friendly designs
- **PDF export** — download a clean, text-selectable PDF (no image trickery)
- **JSON export & import** — save your CV as JSON and reload it anytime
- **Multiple CVs** — create separate CVs for different languages or roles
- **No account, no tracking** — all data stays in your browser's localStorage
- **PWA support** — install as an app, works offline after first load

## Tech stack

- [Next.js](https://nextjs.org/) 16 — App Router, SSR for landing page SEO
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Zustand](https://zustand-demo.pmnd.rs/) — global state with localStorage middleware
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form handling and validation
- [@react-pdf/renderer](https://react-pdf.org/) — client-side PDF generation

## Getting started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Local development

```bash
# Clone the repository
git clone <repo-url>
cd free-cv-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

### Self-hosting (VPS)

The app runs as a standard Node.js process. A minimal setup with Nginx as a reverse proxy and PM2 as a process manager is recommended:

```bash
npm run build
pm2 start npm --name "free-cv" -- start
```

Point Nginx to `localhost:3000` and configure SSL with Certbot.

## Privacy

Free CV Creator is built around a simple principle: **your CV data is yours**.

- All data is stored exclusively in your browser's `localStorage`
- Nothing is sent to any server during normal use
- Downloading a PDF clears the data from localStorage
- No analytics, no cookies, no tracking

## Contributing

Contributions are welcome. If you'd like to add a new template, fix a bug, or improve the UX, feel free to open an issue or a pull request.

## License

MIT
