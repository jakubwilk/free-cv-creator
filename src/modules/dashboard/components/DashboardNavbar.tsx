'use client';

import { Anchor, Box, Container, Group, Text } from '@mantine/core';
import { IconArrowLeft, IconFileText } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { LanguageSwitcher } from './LanguageSwitcher';

export function DashboardNavbar() {
  const t = useTranslations('dashboard');

  return (
    <Box
      component="header"
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-2)',
        boxShadow: '0 1px 8px 0 rgba(0,0,0,0.06)',
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center" className="h-16">
          {/* Logo */}
          <Anchor component={Link} href="/" underline="never">
            <Group gap={6} align="center">
              <Box className="w-7 h-7 rounded-[6px] flex items-center justify-center" bg="blue.6">
                <IconFileText size={16} color="white" stroke={2} />
              </Box>
              <Text fw={700} fz="lg" c="dark.9" className="tracking-[-0.02em]">
                Free{' '}
                <Text component="span" c="blue.6" fw={700} fz="lg">
                  CV
                </Text>{' '}
                Creator
              </Text>
            </Group>
          </Anchor>

          <Group gap="md">
            <LanguageSwitcher />

            <Anchor
              component={Link}
              href="/"
              c="gray.7"
              fz="sm"
              fw={500}
              className="nav-link"
              visibleFrom="sm"
              underline="never"
            >
              <Group gap={4} align="center">
                <IconArrowLeft size={14} />
                {t('backToHome')}
              </Group>
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
