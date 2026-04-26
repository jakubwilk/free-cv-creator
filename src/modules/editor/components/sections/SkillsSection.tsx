'use client';

import { useState } from 'react';
import { Stack, Text, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

import type { Section, SkillGroupItem } from '@editor/templates/_shared/types';

import { AddItemButton, ItemCard, SectionShell, SkillTagInput } from './shared';

interface SkillsSectionProps {
  section: Section<SkillGroupItem>;
  onChange: (section: Section<SkillGroupItem>) => void;
}

function createEmptyItem(): SkillGroupItem {
  return {
    id: crypto.randomUUID(),
    category: '',
    skills: [],
    visible: true,
  };
}

export function SkillsSection({ section, onChange }: SkillsSectionProps) {
  const t = useTranslations('editor.sections');
  const tSkills = useTranslations('editor.sections.skills');
  const [items, setItems] = useState<SkillGroupItem[]>(section.items);
  const [newItemId, setNewItemId] = useState<string | null>(null);

  const updateItems = (next: SkillGroupItem[]) => {
    setItems(next);
    onChange({ ...section, items: next });
  };

  const updateItem = (id: string, updates: Partial<SkillGroupItem>) => {
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
    <SectionShell title={tSkills('title')} description={tSkills('description')}>
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
              item.category
                ? `${item.category}${item.skills.length > 0 ? ` — ${item.skills.length}` : ''}`
                : ''
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
              <TextInput
                label={tSkills('category')}
                value={item.category}
                onChange={(e) => updateItem(item.id, { category: e.target.value })}
              />
              <SkillTagInput
                value={item.skills}
                onChange={(v) => updateItem(item.id, { skills: v })}
                label={tSkills('skills')}
              />
            </Stack>
          </ItemCard>
        ))}
        <AddItemButton label={tSkills('addButton')} onClick={addItem} />
      </Stack>
    </SectionShell>
  );
}
