'use client';

import { AppLogo } from '@common/components';
import { ActionIcon, AppShell, Box, Paper, Skeleton, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useRouter } from '@/i18n/navigation';

import { useCvData, type TabValue } from '@editor/hooks';
import type { TemplateId } from '@editor/templates/_shared';

import { EditorNavbar, EditorSidebar, TemplatePanel } from '../components';
import {
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  PersonalSection,
  ProjectsSection,
  SkillsSection,
} from '../components/sections';

function SectionSkeleton() {
  return (
    <Stack p="md" gap="sm">
      <Stack gap={6}>
        <Skeleton height={20} width={180} radius="sm" />
        <Skeleton height={14} width={260} radius="sm" />
      </Stack>
      <Paper p="md" radius="sm" withBorder bg="white">
        <Stack gap="md">
          <Skeleton height={36} radius="sm" />
          <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Skeleton height={36} radius="sm" />
            <Skeleton height={36} radius="sm" />
          </Box>
          <Skeleton height={36} radius="sm" />
          <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Skeleton height={36} radius="sm" />
            <Skeleton height={36} radius="sm" />
          </Box>
          <Skeleton height={90} radius="sm" />
        </Stack>
      </Paper>
    </Stack>
  );
}

const VALID_TABS: TabValue[] = [
  'personal',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'extra',
];

export function NewCvPage() {
  const t = useTranslations('editor');
  const router = useRouter();
  const [mobileNavOpen, { toggle: toggleMobileNav }] = useDisclosure(false);
  const [asideOpen, { toggle: toggleAside }] = useDisclosure(false);
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('slate');
  const [activeTab, setActiveTab] = useState<TabValue>('personal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1) as TabValue;
    if (VALID_TABS.includes(hash)) setActiveTab(hash);
    setMounted(true);
  }, []);

  const { cvData, updatePersonal, updateSection } = useCvData();

  const handleCancel = () => {
    router.push('/app');
  };

  const handleDelete = () => {
    router.push('/app');
  };

  function renderSection(tab: TabValue): React.ReactNode {
    switch (tab) {
      case 'personal':
        return <PersonalSection personal={cvData.personal} onChange={updatePersonal} />;
      case 'experience':
        return (
          <ExperienceSection
            section={cvData.sections.experience}
            onChange={(s) => updateSection('experience', () => s)}
          />
        );
      case 'education':
        return (
          <EducationSection
            section={cvData.sections.education}
            onChange={(s) => updateSection('education', () => s)}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            section={cvData.sections.skills}
            onChange={(s) => updateSection('skills', () => s)}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            section={cvData.sections.projects}
            onChange={(s) => updateSection('projects', () => s)}
          />
        );
      case 'certifications':
        return (
          <CertificationsSection
            section={cvData.sections.certifications}
            onChange={(s) => updateSection('certifications', () => s)}
          />
        );
      default:
        return null;
    }
  }

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
          <EditorSidebar activeTab={activeTab} onTabChange={setActiveTab} />
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
        <Box style={{ height: '100%' }}>
          {!mounted ? <SectionSkeleton /> : renderSection(activeTab)}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
