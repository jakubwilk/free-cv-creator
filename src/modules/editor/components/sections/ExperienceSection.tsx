'use client';

import { useState } from 'react';
import { SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { generateId } from '@editor/hooks';
import type { ExperienceItem, Section } from '@editor/templates/_shared/types';

import {
  AddItemButton,
  DateRangeFields,
  ItemCard,
  RichTextField,
  SectionShell,
  SkillTagInput,
} from './shared';

interface ExperienceSectionProps {
  section: Section<ExperienceItem>;
  onChange: (section: Section<ExperienceItem>) => void;
}

function createEmptyItem(): ExperienceItem {
  return {
    id: generateId(),
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    highlights: [],
    visible: true,
  };
}

export function ExperienceSection({ section, onChange }: ExperienceSectionProps) {
  const t = useTranslations('editor.sections');
  const tExp = useTranslations('editor.sections.experience');
  const [items, setItems] = useState<ExperienceItem[]>(section.items);
  const [newItemId, setNewItemId] = useState<string | null>(null);

  const updateItems = (next: ExperienceItem[]) => {
    setItems(next);
    onChange({ ...section, items: next });
  };

  const updateItem = (id: string, updates: Partial<ExperienceItem>) => {
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
    <SectionShell title={tExp('title')} description={tExp('description')}>
      <Stack gap="sm">
        {items.length === 0 && (
          <Text c="dimmed" size="sm" ta="center" py="md">
            {t('noItems')}
          </Text>
        )}
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            label={
              item.position && item.company
                ? `${item.position} @ ${item.company}`
                : item.position || item.company || ''
            }
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
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                <TextInput
                  label={tExp('position')}
                  value={item.position}
                  onChange={(e) => updateItem(item.id, { position: e.target.value })}
                />
                <TextInput
                  label={tExp('company')}
                  value={item.company}
                  onChange={(e) => updateItem(item.id, { company: e.target.value })}
                />
              </SimpleGrid>
              <TextInput
                label={tExp('location')}
                value={item.location ?? ''}
                onChange={(e) => updateItem(item.id, { location: e.target.value })}
              />
              <DateRangeFields
                startDate={item.startDate}
                endDate={item.endDate}
                onStartChange={(v) => updateItem(item.id, { startDate: v })}
                onEndChange={(v) => updateItem(item.id, { endDate: v })}
                startLabel={tExp('startDate')}
                endLabel={tExp('endDate')}
                presentLabel={t('present')}
              />
              <RichTextField
                value={item.description}
                onChange={(html) => updateItem(item.id, { description: html })}
                label={tExp('description')}
              />
              <SkillTagInput
                value={item.highlights ?? []}
                onChange={(v) => updateItem(item.id, { highlights: v })}
                label={tExp('highlights')}
              />
            </Stack>
          </ItemCard>
        ))}
        <AddItemButton label={tExp('addButton')} onClick={addItem} />
      </Stack>
    </SectionShell>
  );
}
