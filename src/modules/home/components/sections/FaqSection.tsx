'use client';

import { Accordion, Box, Container, Stack, Text, Title } from '@mantine/core';

const faqItems = [
  {
    value: 'free',
    question: 'Czy aplikacja jest naprawdę całkowicie darmowa?',
    answer:
      "Tak. Free CV Creator jest w 100% bezpłatny — nie ma żadnych planów premium, ukrytych opłat ani paywall'i. Możesz pobrać PDF już przy pierwszym użyciu, bez żadnych warunków.",
  },
  {
    value: 'privacy',
    question: 'Co dzieje się z moimi danymi osobowymi?',
    answer:
      'Twoje dane nigdy nie opuszczają Twojej przeglądarki. Aplikacja nie posiada serwera ani bazy danych. Wszystkie informacje przechowywane są wyłącznie w localStorage Twojej przeglądarki i są usuwane po pobraniu PDF lub na Twoje żądanie.',
  },
  {
    value: 'pdf',
    question: 'Jaka jest jakość generowanego PDF?',
    answer:
      'PDF generowany jest przez bibliotekę @react-pdf/renderer bezpośrednio w przeglądarce. Tekst jest w pełni selektowalny i kopiowany, a layout zachowuje dokładnie to, co widzisz w podglądzie. CV jest zoptymalizowane pod kątem systemów ATS (Applicant Tracking Systems).',
  },
  {
    value: 'templates',
    question: 'Ile szablonów jest dostępnych?',
    answer:
      'Na starcie dostępnych jest 5 profesjonalnych szablonów — od nowoczesnych po klasyczne. Każdy szablon można dostosować, wybierając kolor akcentu. Nowe szablony będą regularnie dodawane.',
  },
  {
    value: 'offline',
    question: 'Czy aplikacja działa bez internetu?',
    answer:
      'Tak! Po pierwszym załadowaniu aplikację można zainstalować na urządzeniu jako PWA (Progressive Web App) i korzystać z niej bez dostępu do internetu. Service Worker buforuje wszystkie zasoby aplikacji.',
  },
  {
    value: 'import',
    question: 'Czy mogę wczytać swoje wcześniejsze CV?',
    answer:
      'Tak. Możesz wyeksportować dane CV do pliku JSON i wczytać je ponownie w przyszłości na dowolnym urządzeniu. Plik JSON zawiera wszystkie dane formularza i można go zaimportować przez opcję "Wczytaj CV" w edytorze.',
  },
];

export function FaqSection() {
  return (
    <Box component="section" id="faq" className="py-20" bg="gray.0">
      <Container size="md">
        <Stack align="center" gap="sm" mb={48}>
          <Text fz="xs" fw={700} c="blue.6" className="tracking-widest uppercase">
            Pytania
          </Text>
          <Title
            order={2}
            ta="center"
            c="dark.9"
            fw={700}
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
          >
            Najczęściej zadawane pytania
          </Title>
        </Stack>

        <Accordion
          variant="separated"
          radius="md"
          styles={{
            item: {
              backgroundColor: 'var(--mantine-color-white)',
              border: '1px solid var(--mantine-color-gray-2)',
              marginBottom: '0.75rem',
            },
            control: {
              padding: '1.125rem 1.25rem',
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--mantine-color-dark-9)',
            },
            content: {
              padding: '0 1.25rem 1.125rem',
              color: 'var(--mantine-color-gray-7)',
              lineHeight: 1.7,
              fontSize: '0.9375rem',
            },
            chevron: { color: 'var(--mantine-color-blue-6)' },
          }}
        >
          {faqItems.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>{item.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}
