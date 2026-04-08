'use client';

import { useEffect, useState } from 'react';

import { Divider, NavLink, Skeleton, Text, UnstyledButton } from '@mantine/core';
import {
  IconBriefcase,
  IconCertificate,
  IconCode,
  IconDots,
  IconSchool,
  IconStar,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import type { TemplateId } from '../templates/_shared';

type TabValue =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'extra';

interface TabDefinition {
  value: TabValue;
  labelKey: string;
  descKey: string;
  icon: React.ReactNode;
  hash: string | null;
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

const TEMPLATE_MOCKS: { id: TemplateId; name: string }[] = [
  { id: 'slate', name: 'Slate' },
  { id: 'ivory', name: 'Ivory' },
  { id: 'coral', name: 'Coral' },
  { id: 'grid', name: 'Grid' },
  { id: 'arc', name: 'Arc' },
];

function getTabFromHash(hash: string): TabValue {
  const stripped = hash.startsWith('#') ? hash.slice(1) : hash;
  const match = TABS.find((tab) => tab.hash === stripped);
  return match ? match.value : 'personal';
}

export function EditorSidebar() {
  const t = useTranslations('editor');
  const [activeTab, setActiveTab] = useState<TabValue>('personal');
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('slate');

  useEffect(() => {
    setActiveTab(getTabFromHash(window.location.hash));

    const handleHashChange = () => {
      setActiveTab(getTabFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleTabClick = (tab: TabDefinition) => {
    setActiveTab(tab.value);

    if (tab.hash === null) {
      history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = `#${tab.hash}`;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <nav className="flex flex-col overflow-x-hidden py-2 shrink-0" aria-label="CV sections">
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

      <Divider />

      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Text size="xs" fw={600} c="gray.7" px={16} pt={12} pb={8} tt="uppercase" lts={0.5}>
          {t('templatePickerTitle')}
        </Text>


        <div className="flex flex-col gap-2 px-3 pb-3">
          {TEMPLATE_MOCKS.map((tpl) => {
            const isActive = activeTemplate === tpl.id;
            return (
              <UnstyledButton
                key={tpl.id}
                onClick={() => setActiveTemplate(tpl.id)}
                style={{
                  borderRadius: 'var(--mantine-radius-md)',
                  border: `2px solid ${isActive ? 'var(--mantine-color-blue-5)' : 'transparent'}`,
                  padding: 4,
                  transition: 'border-color 150ms ease',
                }}
              >
                <Skeleton
                  height={148}
                  radius="sm"
                  animate={false}
                  style={{ opacity: isActive ? 1 : 0.5 }}
                />
                <Text
                  size="xs"
                  fw={isActive ? 600 : 400}
                  c={isActive ? 'blue.6' : 'gray.6'}
                  ta="center"
                  mt={6}
                  mb={2}
                >
                  {tpl.name}
                </Text>
              </UnstyledButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
