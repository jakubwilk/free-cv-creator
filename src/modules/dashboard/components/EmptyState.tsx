'use client';

import { Button, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconFilePlus, IconFileText } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function EmptyState() {
  const t = useTranslations('dashboard');

  return (
    <Stack align="center" gap="md" py={64}>
      <ThemeIcon size={64} radius="xl" variant="light" color="blue">
        <IconFileText size={32} stroke={1.5} />
      </ThemeIcon>
      <Title order={3} c="dark.7" ta="center">
        {t('emptyTitle')}
      </Title>
      <Text c="gray.6" ta="center" maw={360} fz="sm">
        {t('emptyDescription')}
      </Text>
      <Button
        component={Link}
        href="/app/new"
        variant="filled"
        color="blue"
        size="md"
        mt="sm"
        leftSection={<IconFilePlus size={18} />}
      >
        {t('createFirstCv')}
      </Button>
    </Stack>
  );
}
