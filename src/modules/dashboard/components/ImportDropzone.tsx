'use client';

import { Box, Group, rem, Stack, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { IconFileUpload, IconUpload, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';

import type { ICvEntry } from '../models';
import { loadCvList, parseCvJson, saveCvList } from '../utils';

interface IImportDropzoneProps {
  onImport: (entry: ICvEntry) => void;
}

export function ImportDropzone({ onImport }: IImportDropzoneProps) {
  const t = useTranslations('dashboard');
  const router = useRouter();

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      const entry = await parseCvJson(file);
      const existing = loadCvList();
      const idx = existing.findIndex((cv) => cv.id === entry.id);
      let next: ICvEntry[];
      if (idx >= 0) {
        next = [...existing];
        next[idx] = entry;
      } else {
        next = [entry, ...existing];
      }
      saveCvList(next);
      onImport(entry);
      router.push(`/app/${entry.id}`);
    } catch {
      notifications.show({
        title: t('importErrorParseTitle'),
        message: t('importErrorParseMessage'),
        color: 'orange',
        autoClose: 5000,
      });
    }
  };

  const handleReject = () => {
    notifications.show({
      title: t('importErrorTypeTitle'),
      message: t('importErrorTypeMessage'),
      color: 'orange',
      autoClose: 5000,
    });
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={handleReject}
      accept={{ 'application/json': ['.json'] }}
      maxFiles={1}
      radius="md"
      style={{ cursor: 'pointer' }}
    >
      <Group justify="center" gap="xl" mih={120} style={{ pointerEvents: 'none' }} align="center">
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(40), height: rem(40), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(40), height: rem(40), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileUpload
            style={{ width: rem(40), height: rem(40), color: 'var(--mantine-color-gray-4)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <Box>
          <Stack gap={4}>
            <Text fz="sm" fw={600} c="dark.7" ta="center">
              {t('dropzoneTitle')}
            </Text>
            <Text fz="xs" c="gray.5" ta="center">
              {t('dropzoneDescription')}
            </Text>
          </Stack>
        </Box>
      </Group>
    </Dropzone>
  );
}
