'use client';

import { AppLogo, LanguageSwitcher } from '@common/components';
import { Anchor, Box, Container, Group } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

interface IDashboardNavbarProps {
  backHref?: string;
}

export function DashboardNavbar({ backHref = '/' }: IDashboardNavbarProps) {
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
          <AppLogo />

          <Group gap="md">
            <LanguageSwitcher />

            <Anchor
              component={Link}
              href={backHref}
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
