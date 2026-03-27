'use client';

import { Anchor, Box, Container, Divider, Group, Stack, Text } from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function LandingFooter() {
  const t = useTranslations('footer');

  return (
    <Box
      component="footer"
      className="pt-12 pb-8"
      bg="dark.9"
      style={{ borderTop: '1px solid var(--mantine-color-dark-6)' }}
    >
      <Container size="xl">
        <div className="grid grid-cols-12 gap-8 mb-10">
          <div className="col-span-12 md:col-span-5">
            <Stack gap="md">
              <Group gap={6} align="center">
                <Box className="w-7 h-7 rounded-[6px] flex items-center justify-center" bg="blue.6">
                  <IconFileText size={16} color="white" stroke={2} />
                </Box>
                <Text fw={700} fz="lg" c="white">
                  Free{' '}
                  <Text component="span" c="blue.6" fw={700} fz="lg" inherit>
                    CV
                  </Text>{' '}
                  Creator
                </Text>
              </Group>
              <Text c="gray.6" fz="sm" lh={1.7} maw={320}>
                {t('tagline')}
              </Text>
            </Stack>
          </div>

          <div className="col-span-6 md:col-span-3">
            <Stack gap="sm">
              <Text fw={700} fz="sm" c="gray.4" className="tracking-[0.06em] uppercase">
                {t('navigationLabel')}
              </Text>
              <Anchor href="#how-it-works" c="gray.6" fz="sm" className="nav-link leading-loose">
                {t('howItWorks')}
              </Anchor>
              <Anchor href="#features" c="gray.6" fz="sm" className="nav-link leading-loose">
                {t('features')}
              </Anchor>
            </Stack>
          </div>

          <div className="col-span-6 md:col-span-4">
            <Stack gap="sm">
              <Text fw={700} fz="sm" c="gray.4" className="tracking-[0.06em] uppercase">
                {t('appLabel')}
              </Text>
              <Anchor
                component={Link}
                href="/app/new"
                c="gray.6"
                fz="sm"
                className="nav-link leading-loose"
              >
                {t('createCv')}
              </Anchor>
              <Anchor
                component={Link}
                href="/app"
                c="gray.6"
                fz="sm"
                className="nav-link leading-loose"
              >
                {t('myCv')}
              </Anchor>
            </Stack>
          </div>
        </div>

        <Divider color="dark.6" />
        <Group justify="space-between" mt={24} wrap="wrap" gap="sm">
          <Text fz="xs" c="gray.6">
            {t('copyright')}
          </Text>
          <Text fz="xs" c="gray.6">
            {t('dataStays')}
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
