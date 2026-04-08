'use client';

import { AppLogo } from '@common/components';
import { AppShell, Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';

import { EditorNavbar, EditorSidebar } from '../components';

export function NewCvPage() {
  const t = useTranslations('editor');
  const router = useRouter();
  const [mobileNavOpen, { toggle: toggleMobileNav }] = useDisclosure(false);

  const handleCancel = () => {
    // TODO: save draft logic
    router.push('/app');
  };

  const handleDelete = () => {
    // Not applicable on /app/new — no CV exists yet
    router.push('/app');
  };

  return (
    <AppShell
      layout="alt"
      header={{ height: 64 }}
      navbar={{ width: 280, breakpoint: 'md', collapsed: { mobile: !mobileNavOpen } }}
      withBorder={false}
    >
      <AppShell.Navbar style={{ borderRight: '1px solid var(--mantine-color-gray-3)', overflowX: 'hidden' }}>
        <div
          className="flex items-center min-h-16 h-16 px-4"
          style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
        >
          <AppLogo />
        </div>

        <div className="flex-1 min-h-0">
          <EditorSidebar />
        </div>
      </AppShell.Navbar>

      <AppShell.Header style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
        <EditorNavbar
          mobileNavOpen={mobileNavOpen}
          onToggleMobileNav={toggleMobileNav}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </AppShell.Header>

      <AppShell.Main style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
        <Box className="h-full flex items-center justify-center">
          <Text c="gray.4" fz="sm">
            {t('sidebarEmpty')}
          </Text>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
