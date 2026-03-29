'use client';

import { ActionIcon, Badge, Box, Button, Card, Group, Menu, Text, Tooltip } from '@mantine/core';
import {
  IconCopy,
  IconDots,
  IconDownload,
  IconEdit,
  IconFileText,
  IconTrash,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import type { CvEntry } from '../models';
import { downloadCvJson } from '../utils';

interface CvCardProps {
  cv: CvEntry;
  onDuplicate: (cv: CvEntry) => void;
  onDelete: (id: string) => void;
}

function formatDate(isoString: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

export function CvCard({ cv, onDuplicate, onDelete }: CvCardProps) {
  const t = useTranslations('dashboard');

  return (
    <Card
      shadow="xs"
      radius="md"
      withBorder
      padding="lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mantine-spacing-md)',
        transition: 'box-shadow 150ms ease, transform 150ms ease',
      }}
      className="hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Card header */}
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group gap="sm" align="center" style={{ minWidth: 0 }}>
          <Box
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: 'var(--mantine-color-blue-0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <IconFileText size={18} color="var(--mantine-color-blue-6)" stroke={1.5} />
          </Box>
          <Box style={{ minWidth: 0 }}>
            <Text fw={600} c="dark.9" truncate="end" title={cv.name}>
              {cv.name}
            </Text>
            <Badge variant="light" color="blue" size="xs" mt={2} style={{ textTransform: 'none' }}>
              {cv.templateId}
            </Badge>
          </Box>
        </Group>

        <Menu shadow="md" width={180} position="bottom-end">
          <Menu.Target>
            <Tooltip label={t('moreActions')} position="top">
              <ActionIcon variant="subtle" color="gray" size="sm" aria-label={t('moreActions')}>
                <IconDots size={16} />
              </ActionIcon>
            </Tooltip>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconCopy size={14} />} onClick={() => onDuplicate(cv)}>
              {t('duplicate')}
            </Menu.Item>
            <Menu.Item leftSection={<IconDownload size={14} />} onClick={() => downloadCvJson(cv)}>
              {t('downloadJson')}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={<IconTrash size={14} />}
              color="red"
              onClick={() => onDelete(cv.id)}
            >
              {t('delete')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {/* Last edited */}
      <Text fz="xs" c="gray.5">
        {t('lastEdited')}: {formatDate(cv.updatedAt, 'pl')}
      </Text>

      {/* Actions */}
      <Button
        component={Link}
        href={`/app/${cv.id}`}
        variant="light"
        color="blue"
        size="sm"
        fullWidth
        leftSection={<IconEdit size={15} />}
      >
        {t('edit')}
      </Button>
    </Card>
  );
}
