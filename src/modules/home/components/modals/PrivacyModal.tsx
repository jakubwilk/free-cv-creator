'use client';
import { PRIVACY_POINTS } from '@home/models';
import { Group, Modal, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface PrivacyModalProps {
  opened: boolean;
  onClose: () => void;
  icon?: ReactNode;
}

export function PrivacyModal({ opened, onClose, icon }: PrivacyModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm" align="center">
          {icon && (
            <ThemeIcon variant="transparent" color="blue" size="xl">
              {icon}
            </ThemeIcon>
          )}
          <Text fw={700} fz="lg" c="dark.9">
            Twoje dane są bezpieczne
          </Text>
        </Group>
      }
      padding="1.5rem"
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
          {PRIVACY_POINTS.map((point, i) => (
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
