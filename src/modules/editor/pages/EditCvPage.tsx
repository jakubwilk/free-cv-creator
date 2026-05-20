'use client';

import { useEffect, useState } from 'react';
import { Center, Loader, Text, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { loadCvList } from '@dashboard/utils';
import type { CVData } from '@editor/templates/_shared/types';

import { EditorPage } from './EditorPage';

interface EditCvPageProps {
  id: string;
}

export function EditCvPage({ id }: EditCvPageProps) {
  const t = useTranslations('editor');
  const [initialData, setInitialData] = useState<CVData | null | undefined>(undefined);

  useEffect(() => {
    const entry = loadCvList().find((e) => e.id === id);
    setInitialData(entry ? (entry.data as unknown as CVData) : null);
  }, [id]);

  if (initialData === undefined) {
    return (
      <Center className="h-screen">
        <Loader size="md" />
      </Center>
    );
  }

  if (initialData === null) {
    return (
      <Center className="h-screen">
        <Stack align="center" gap="xs">
          <Text fw={600} c="gray.7">{t('notFound')}</Text>
          <Text size="sm" c="gray.5">{t('notFoundDescription')}</Text>
        </Stack>
      </Center>
    );
  }

  return <EditorPage initialData={initialData} />;
}
