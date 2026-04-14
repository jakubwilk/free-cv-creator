'use client';

import { AppLogo } from '@common/components';
import { ActionIcon, AppShell, Box, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useRouter } from '@/i18n/navigation';

import { EditorNavbar, EditorSidebar, TemplatePanel } from '../components';
import type { TemplateId } from '../templates/_shared';

export function NewCvPage() {
  const t = useTranslations('editor');
  const router = useRouter();
  const [mobileNavOpen, { toggle: toggleMobileNav }] = useDisclosure(false);
  const [asideOpen, { toggle: toggleAside }] = useDisclosure(false);
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('slate');

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
      aside={{ width: 280, breakpoint: 'lg', collapsed: { mobile: !asideOpen } }}
      withBorder={false}
    >
      <AppShell.Navbar
        className="overflow-x-hidden"
        style={{ borderRight: '1px solid var(--mantine-color-gray-3)' }}
      >
        <div
          className="flex items-center justify-between min-h-16 h-16 px-4"
          style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
        >
          <AppLogo />
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            hiddenFrom="md"
            onClick={toggleMobileNav}
            aria-label={t('closeNav')}
          >
            <IconX size={14} />
          </ActionIcon>
        </div>

        <div className="flex-1 min-h-0">
          <EditorSidebar />
        </div>
      </AppShell.Navbar>

      <AppShell.Aside
        className="overflow-x-hidden"
        style={{ borderLeft: '1px solid var(--mantine-color-gray-3)' }}
      >
        <TemplatePanel
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
          onClose={toggleAside}
        />
      </AppShell.Aside>

      <AppShell.Header style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
        <EditorNavbar
          mobileNavOpen={mobileNavOpen}
          onToggleMobileNav={toggleMobileNav}
          onToggleAside={toggleAside}
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
