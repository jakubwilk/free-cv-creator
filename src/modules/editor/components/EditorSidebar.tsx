'use client';

import { Button, NavLink } from '@mantine/core';
import {
  IconBriefcase,
  IconCertificate,
  IconCode,
  IconDeviceFloppy,
  IconDots,
  IconSchool,
  IconStar,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import type { TabValue } from '@editor/hooks';

interface TabDefinition {
  value: TabValue;
  labelKey: string;
  descKey: string;
  icon: React.ReactNode;
  hash: string | null;
}

interface EditorSidebarProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

const ICON_SIZE = 16;

const TABS: TabDefinition[] = [
  {
    value: 'personal',
    labelKey: 'tabs.personal',
    descKey: 'tabs.personalDesc',
    icon: <IconUser size={ICON_SIZE} />,
    hash: null,
  },
  {
    value: 'experience',
    labelKey: 'tabs.experience',
    descKey: 'tabs.experienceDesc',
    icon: <IconBriefcase size={ICON_SIZE} />,
    hash: 'experience',
  },
  {
    value: 'education',
    labelKey: 'tabs.education',
    descKey: 'tabs.educationDesc',
    icon: <IconSchool size={ICON_SIZE} />,
    hash: 'education',
  },
  {
    value: 'skills',
    labelKey: 'tabs.skills',
    descKey: 'tabs.skillsDesc',
    icon: <IconStar size={ICON_SIZE} />,
    hash: 'skills',
  },
  {
    value: 'projects',
    labelKey: 'tabs.projects',
    descKey: 'tabs.projectsDesc',
    icon: <IconCode size={ICON_SIZE} />,
    hash: 'projects',
  },
  {
    value: 'certifications',
    labelKey: 'tabs.certifications',
    descKey: 'tabs.certificationsDesc',
    icon: <IconCertificate size={ICON_SIZE} />,
    hash: 'certifications',
  },
  {
    value: 'extra',
    labelKey: 'tabs.extra',
    descKey: 'tabs.extraDesc',
    icon: <IconDots size={ICON_SIZE} />,
    hash: 'extra',
  },
];

export function EditorSidebar({ activeTab, onTabChange }: EditorSidebarProps) {
  const t = useTranslations('editor');

  const handleTabClick = (tab: TabDefinition) => {
    onTabChange(tab.value);
    if (tab.hash === null) {
      history.pushState(null, '', window.location.pathname);
    } else {
      history.pushState(null, '', `#${tab.hash}`);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <nav
        className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden py-2"
        aria-label="CV sections"
      >
        {TABS.map((tab) => (
          <NavLink
            key={tab.value}
            label={t(tab.labelKey as Parameters<typeof t>[0])}
            description={t(tab.descKey as Parameters<typeof t>[0])}
            leftSection={tab.icon}
            active={activeTab === tab.value}
            onClick={() => handleTabClick(tab)}
            styles={{
              root: { borderRadius: 'var(--mantine-radius-sm)' },
              label: { fontWeight: 500 },
              description: { opacity: activeTab === tab.value ? 0.75 : 1 },
            }}
            color="blue"
            c={activeTab === tab.value ? undefined : 'gray.7'}
            mx={8}
          />
        ))}
      </nav>

      <div
        className="shrink-0 px-4 py-3"
        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
      >
        <Button
          variant="filled"
          color="green"
          size="sm"
          fullWidth
          leftSection={<IconDeviceFloppy size={15} />}
          onClick={() => console.log('save')}
        >
          {t('save')}
        </Button>
      </div>
    </div>
  );
}
