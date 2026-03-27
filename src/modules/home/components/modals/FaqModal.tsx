'use client';

import { Accordion, Group, Modal, Text, ThemeIcon } from '@mantine/core';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

interface FaqModalProps {
  opened: boolean;
  onClose: () => void;
  icon?: ReactNode;
}

const FAQ_KEYS = ['free', 'privacy', 'pdf', 'templates', 'offline', 'import'] as const;

export function FaqModal({ opened, onClose, icon }: FaqModalProps) {
  const t = useTranslations('faq');

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
            {t('modalTitle')}
          </Text>
        </Group>
      }
      padding="1.5rem"
      size="xl"
      radius="md"
    >
      <Accordion
        variant="separated"
        radius="md"
        pb="md"
        classNames={{
          item: 'bg-[var(--mantine-color-gray-0)] border border-[var(--mantine-color-gray-2)] mb-2',
          control: 'p-0 font-medium text-[0.9375rem] text-[var(--mantine-color-dark-9)]',
          content: 'px-5 pb-4 pt-0 text-sm leading-[1.7] text-[var(--mantine-color-gray-7)]',
          chevron: 'text-[var(--mantine-color-blue-6)]',
        }}
      >
        {FAQ_KEYS.map((key) => (
          <Accordion.Item key={key} value={key}>
            <Accordion.Control>{t(`items.${key}.question`)}</Accordion.Control>
            <Accordion.Panel>{t(`items.${key}.answer`)}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Modal>
  );
}
