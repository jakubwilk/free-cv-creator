'use client';

import {
  Button,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconLayoutCards, IconSearch, IconSparkles } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TemplateId } from '../templates/_shared';
import { TEMPLATES } from '../templates/registry';

interface TemplatePanelProps {
  activeTemplate: TemplateId;
  onTemplateChange: (id: TemplateId) => void;
}

export function TemplatePanel({ activeTemplate, onTemplateChange }: TemplatePanelProps) {
  const t = useTranslations('editor.templatePanel');
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const activeQuery = debouncedQuery.trim().length >= 3 ? debouncedQuery.trim() : '';

  const filtered = activeQuery
    ? TEMPLATES.filter(
        (tpl) =>
          tpl.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
          tpl.personas.some((p) => p.toLowerCase().includes(activeQuery.toLowerCase()))
      )
    : TEMPLATES;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Sticky header */}
      <div
        className="shrink-0 px-4 pt-3 pb-3"
        style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
      >
        <Text size="xs" fw={600} c="gray.7" tt="uppercase" lts={0.5} mb={8}>
          {t('title')}
        </Text>
        <TextInput
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchAriaLabel')}
          leftSection={<IconSearch size={14} />}
          size="sm"
          radius="md"
          variant="filled"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </div>

      {/* Scrollable grid */}
      <ScrollArea className="flex-1 min-h-0" p={0}>
        {filtered.length === 0 ? (
          <Stack align="center" justify="center" py={40} gap={0} px={8}>
            <ThemeIcon variant="light" color="gray" size={48} radius="xl">
              <IconLayoutCards size={24} />
            </ThemeIcon>
            <Text size="sm" fw={500} c="gray.6" mt={12}>
              {t('emptyHeading')}
            </Text>
            <Text size="xs" c="gray.4" ta="center" mt={4}>
              {t('emptyBody', { query: activeQuery })}
            </Text>
          </Stack>
        ) : (
          <div className="grid grid-cols-2 gap-2 px-4 pt-3 pb-4">
            {filtered.map((tpl) => {
              const isActive = activeTemplate === tpl.id;
              return (
                <UnstyledButton
                  key={tpl.id}
                  aria-label={`${t('title')} ${tpl.name}`}
                  aria-pressed={isActive}
                  onClick={() => onTemplateChange(tpl.id)}
                  className="p-1"
                  style={{
                    borderRadius: 'var(--mantine-radius-md)',
                    border: `2px solid ${isActive ? 'var(--mantine-color-blue-5)' : 'transparent'}`,
                    boxShadow: isActive
                      ? '0 0 0 3px color-mix(in srgb, var(--mantine-color-blue-5) 20%, transparent)'
                      : 'none',
                    backgroundColor: isActive ? 'var(--mantine-color-blue-0)' : 'transparent',
                    transition:
                      'border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease',
                  }}
                >
                  <Skeleton
                    height={148}
                    radius="sm"
                    animate={false}
                    style={{
                      opacity: isActive ? 1 : 0.65,
                      transition: 'opacity 150ms ease',
                    }}
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
        )}
      </ScrollArea>

      {/* Sticky footer */}
      <div
        className="shrink-0 px-4 py-3"
        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
      >
        <Button
          variant="filled"
          color="blue"
          size="sm"
          fullWidth
          leftSection={<IconSparkles size={15} />}
          onClick={() => console.log('create custom template')}
        >
          {t('createCustomTemplate')}
        </Button>
      </div>
    </div>
  );
}
