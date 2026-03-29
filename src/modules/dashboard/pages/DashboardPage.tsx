'use client';

import { Box, Card, Container, Divider, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { CvCard, DashboardNavbar, EmptyState, ImportDropzone } from '../components';
import { useCvList } from '../hooks';
import type { CvEntry } from '../models';

export function DashboardPage() {
  const t = useTranslations('dashboard');
  const { cvList, addCv, removeCv, duplicateCv } = useCvList();

  const handleImport = (entry: CvEntry) => {
    addCv(entry);
  };

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <DashboardNavbar />

      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Page heading */}
          <Box>
            <Title order={2} c="dark.9">
              {t('pageTitle')}
            </Title>
            <Text c="gray.6" fz="sm" mt={4}>
              {t('pageSubtitle')}
            </Text>
          </Box>

          {/* CV list */}
          {cvList.length === 0 ? (
            <EmptyState />
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
              {cvList.map((cv) => (
                <CvCard key={cv.id} cv={cv} onDuplicate={duplicateCv} onDelete={removeCv} />
              ))}
            </SimpleGrid>
          )}

          <Divider />

          {/* Import section */}
          <Card radius="md" withBorder padding="lg">
            <Stack gap="sm">
              <Box>
                <Text fw={600} c="dark.8" fz="sm">
                  {t('importTitle')}
                </Text>
                <Text c="gray.6" fz="xs" mt={2}>
                  {t('importDescription')}
                </Text>
              </Box>
              <ImportDropzone onImport={handleImport} />
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
