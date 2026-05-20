'use client';

import { useState } from 'react';
import { SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { generateId } from '@editor/hooks';
import type { ProjectItem, Section } from '@editor/templates/_shared/types';

import {
  AddItemButton,
  DateRangeFields,
  ItemCard,
  RichTextField,
  SectionShell,
  SkillTagInput,
} from './shared';

interface ProjectsSectionProps {
  section: Section<ProjectItem>;
  onChange: (section: Section<ProjectItem>) => void;
}

function createEmptyItem(): ProjectItem {
  return {
    id: generateId(),
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    url: '',
    github: '',
    technologies: [],
    visible: true,
  };
}

export function ProjectsSection({ section, onChange }: ProjectsSectionProps) {
  const t = useTranslations('editor.sections');
  const tProj = useTranslations('editor.sections.projects');
  const [items, setItems] = useState<ProjectItem[]>(section.items);
  const [newItemId, setNewItemId] = useState<string | null>(null);

  const updateItems = (next: ProjectItem[]) => {
    setItems(next);
    onChange({ ...section, items: next });
  };

  const updateItem = (id: string, updates: Partial<ProjectItem>) => {
    updateItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const addItem = () => {
    const item = createEmptyItem();
    setNewItemId(item.id);
    updateItems([...items, item]);
  };

  const deleteItem = (id: string) => updateItems(items.filter((item) => item.id !== id));

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const next = [...items];
    const to = direction === 'up' ? index - 1 : index + 1;
    [next[index], next[to]] = [next[to], next[index]];
    updateItems(next);
  };

  return (
    <SectionShell title={tProj('title')} description={tProj('description')}>
      <Stack gap="sm">
        {items.length === 0 && (
          <Text c="dimmed" size="sm" ta="center" py="md">
            {t('noItems')}
          </Text>
        )}
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            label={item.name}
            visible={item.visible}
            onVisibilityChange={(v) => updateItem(item.id, { visible: v })}
            onDelete={() => deleteItem(item.id)}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            isFirst={index === 0}
            isLast={index === items.length - 1}
            defaultExpanded={item.id === newItemId}
          >
            <Stack gap="sm">
              <TextInput
                label={tProj('name')}
                value={item.name}
                onChange={(e) => updateItem(item.id, { name: e.target.value })}
              />
              <RichTextField
                value={item.description}
                onChange={(html) => updateItem(item.id, { description: html })}
                label={tProj('description')}
              />
              <DateRangeFields
                startDate={item.startDate ?? ''}
                endDate={item.endDate ?? ''}
                onStartChange={(v) => updateItem(item.id, { startDate: v })}
                onEndChange={(v) => updateItem(item.id, { endDate: v })}
                startLabel={tProj('startDate')}
                endLabel={tProj('endDate')}
                presentLabel={t('present')}
                required={false}
              />
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                <TextInput
                  label={tProj('url')}
                  value={item.url ?? ''}
                  onChange={(e) => updateItem(item.id, { url: e.target.value })}
                />
                <TextInput
                  label={tProj('github')}
                  value={item.github ?? ''}
                  onChange={(e) => updateItem(item.id, { github: e.target.value })}
                />
              </SimpleGrid>
              <SkillTagInput
                value={item.technologies ?? []}
                onChange={(v) => updateItem(item.id, { technologies: v })}
                label={tProj('technologies')}
              />
            </Stack>
          </ItemCard>
        ))}
        <AddItemButton label={tProj('addButton')} onClick={addItem} />
      </Stack>
    </SectionShell>
  );
}
