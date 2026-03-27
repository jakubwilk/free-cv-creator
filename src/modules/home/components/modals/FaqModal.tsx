'use client';
import { FAQ_ITEMS } from '@home/models';
import { Accordion, Group, Modal, Text, ThemeIcon } from '@mantine/core';
import type { ReactNode } from 'react';

interface FaqModalProps {
  opened: boolean;
  onClose: () => void;
  icon?: ReactNode;
}

export function FaqModal({ opened, onClose, icon }: FaqModalProps) {
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
            Najczęściej zadawane pytania
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
        {FAQ_ITEMS.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Modal>
  );
}
