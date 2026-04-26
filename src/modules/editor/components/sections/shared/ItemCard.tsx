'use client';

import { useState } from 'react';
import { ActionIcon, Box, Card, Collapse, Divider, Group, Switch, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconArrowDown,
  IconArrowUp,
  IconChevronDown,
  IconChevronUp,
  IconGripVertical,
  IconTrash,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface ItemCardProps {
  label: string;
  visible: boolean;
  onVisibilityChange: (visible: boolean) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export function ItemCard({
  label,
  visible,
  onVisibilityChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  defaultExpanded = false,
  children,
}: ItemCardProps) {
  const t = useTranslations('editor.sections');
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleDelete = () => {
    modals.openConfirmModal({
      title: <Text fw={600} c="gray.8">{t('deleteConfirmTitle')}</Text>,
      children: <Text size="sm" c="gray.7">{t('deleteConfirmMessage')}</Text>,
      labels: { confirm: t('deleteConfirmButton'), cancel: t('cancel') },
      confirmProps: { color: 'red' },
      onConfirm: onDelete,
    });
  };

  return (
    <Card withBorder p={0} radius="sm">
      <Group px="sm" py={8} gap={6} wrap="nowrap">
        <IconGripVertical size={14} color="var(--mantine-color-gray-4)" style={{ flexShrink: 0 }} />
        <Text size="sm" fw={500} flex={1} truncate>
          {label || '—'}
        </Text>
        <Switch
          size="xs"
          checked={visible}
          onChange={(e) => {
            e.stopPropagation();
            onVisibilityChange(e.currentTarget.checked);
          }}
        />
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          disabled={isFirst}
          onClick={onMoveUp}
        >
          <IconArrowUp size={14} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          disabled={isLast}
          onClick={onMoveDown}
        >
          <IconArrowDown size={14} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="red" size="sm" onClick={handleDelete}>
          <IconTrash size={14} />
        </ActionIcon>
      </Group>
      <Collapse in={expanded}>
        <Divider />
        <Box p="sm">{children}</Box>
      </Collapse>
    </Card>
  );
}
