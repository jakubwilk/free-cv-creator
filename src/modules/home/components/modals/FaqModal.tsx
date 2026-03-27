'use client';
import { Accordion, Modal, Text } from '@mantine/core';

interface FaqModalProps {
  opened: boolean;
  onClose: () => void;
}

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
    question: 'Ile szablonów jest dostępnych i czy będą nowe?',
    answer:
      'Na starcie dostępnych jest kilka profesjonalnych szablonów. Każdy szablon można dostosować, wybierając kolor akcentu. Nowe szablony będą regularnie dodawane.',
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

export function FaqModal({ opened, onClose }: FaqModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} fz="lg" c="dark.9">
          Najczęściej zadawane pytania
        </Text>
      }
      size="xl"
      radius="md"
    >
      <Accordion
        variant="separated"
        radius="md"
        pb="md"
        styles={{
          item: {
            backgroundColor: 'var(--mantine-color-gray-0)',
            border: '1px solid var(--mantine-color-gray-2)',
            marginBottom: '0.5rem',
          },
          control: {
            padding: '1rem 1.25rem',
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: 'var(--mantine-color-dark-9)',
          },
          content: {
            padding: '0 1.25rem 1rem',
            color: 'var(--mantine-color-gray-7)',
            lineHeight: 1.7,
            fontSize: '0.875rem',
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
    </Modal>
  );
}
