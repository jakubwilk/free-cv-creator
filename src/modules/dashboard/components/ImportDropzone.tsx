'use client';

import { Box, Group, rem, Stack, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconFileUpload, IconUpload, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';

import type { CvEntry } from '../models';
import { loadCvList, parseCvJson, saveCvList } from '../utils';

interface ImportDropzoneProps {
  onImport: (entry: CvEntry) => void;
}

export function ImportDropzone({ onImport }: ImportDropzoneProps) {
  const t = useTranslations('dashboard');
  const router = useRouter();

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      const entry = await parseCvJson(file);
      const existing = loadCvList();
      // Replace if same id exists, otherwise prepend
      const idx = existing.findIndex((cv) => cv.id === entry.id);
      let next: CvEntry[];
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
      // error handled silently; UI feedback can be added with notifications
    }
  };

  return (
    <Dropzone
      onDrop={handleDrop}
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
