'use client';
import { Group, Modal, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

interface PrivacyModalProps {
  opened: boolean;
  onClose: () => void;
}

const privacyPoints = [
  {
    title: 'Brak serwera, brak bazy danych',
    description:
      'Aplikacja nie posiada backendu. Dane zapisywane są wyłącznie w localStorage Twojej przeglądarki.',
  },
  {
    title: 'Zero konta, zero e-maila',
    description: 'Nie pytamy Cię o żadne dane kontaktowe. Zaczynasz tworzyć CV od razu.',
  },
  {
    title: 'Dane znikają po pobraniu PDF',
    description:
      'Po wygenerowaniu pliku PDF localStorage jest automatycznie czyszczony — lub możesz zapisać dane jako JSON.',
  },
];

export function PrivacyModal({ opened, onClose }: PrivacyModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} fz="lg" c="dark.9">
          Twoje dane są bezpieczne
        </Text>
      }
      size="lg"
      radius="md"
      centered
    >
      <Stack gap="xl" pb="md">
        <Text c="gray.7" fz="md" lh={1.7}>
          Free CV Creator działa w 100% lokalnie — żaden serwer nie widzi Twojego imienia, adresu
          e-mail ani historii zatrudnienia. Nie ma logowania, nie ma bazy danych, nie ma ciasteczek
          śledzących.
        </Text>
        <Stack gap="lg">
          {privacyPoints.map((point, i) => (
            <Group key={i} gap="md" align="flex-start" wrap="nowrap">
              <ThemeIcon
                size={36}
                radius="xl"
                color="blue"
                variant="light"
                className="shrink-0 mt-[2px]"
              >
                <IconCheck size={18} stroke={2.5} />
              </ThemeIcon>
              <Stack gap={2}>
                <Text fw={700} c="dark.9" fz="md">
                  {point.title}
                </Text>
                <Text c="gray.6" fz="sm" lh={1.6}>
                  {point.description}
                </Text>
              </Stack>
            </Group>
          ))}
        </Stack>
      </Stack>
    </Modal>
  );
}
