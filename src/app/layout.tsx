// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports.
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import './globals.css';

import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-heading',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const theme = createTheme({
  fontFamily: 'var(--font-body), system-ui, sans-serif',
  fontFamilyMonospace: 'var(--font-geist-mono), monospace',
  primaryColor: 'blue',
  primaryShade: { light: 6, dark: 5 },
  defaultRadius: 'md',
  headings: {
    fontFamily: 'var(--font-heading), system-ui, sans-serif',
    fontWeight: '800',
    sizes: {
      h1: { fontSize: '3.5rem', lineHeight: '1.1' },
      h2: { fontSize: '2.25rem', lineHeight: '1.2' },
      h3: { fontSize: '1.5rem', lineHeight: '1.3' },
      h4: { fontSize: '1.125rem', lineHeight: '1.4' },
    },
  },
  components: {
    Button: {
      defaultProps: { radius: 'md' },
      styles: { root: { fontWeight: 600, letterSpacing: '0.01em' } },
    },
    Container: {
      defaultProps: { size: 'xl' },
    },
  },
});

export const metadata: Metadata = {
  title: 'Free CV Creator — Darmowy kreator CV online',
  description:
    'Stwórz profesjonalne CV za darmo. Bez rejestracji, bez konta. Twoje dane zostają w przeglądarce. Pobierz PDF od razu.',
  keywords: 'kreator CV, CV online, darmowe CV, stwórz CV, CV PDF, kreator CV bez rejestracji',
  openGraph: {
    title: 'Free CV Creator — Darmowy kreator CV online',
    description:
      'Stwórz profesjonalne CV za darmo. Bez rejestracji, bez konta. Pobierz PDF od razu.',
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Free CV Creator',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${plusJakartaSans.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
