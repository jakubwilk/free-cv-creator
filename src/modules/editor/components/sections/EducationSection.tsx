'use client';

import { useState } from 'react';
import { SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

import type { EducationItem, Section } from '@editor/templates/_shared/types';

import { AddItemButton, DateRangeFields, ItemCard, SectionShell } from './shared';

interface EducationSectionProps {
  section: Section<EducationItem>;
  onChange: (section: Section<EducationItem>) => void;
}

function createEmptyItem(): EducationItem {
  return {
    id: crypto.randomUUID(),
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
    visible: true,
  };
}

export function EducationSection({ section, onChange }: EducationSectionProps) {
  const t = useTranslations('editor.sections');
  const tEdu = useTranslations('editor.sections.education');
  const [items, setItems] = useState<EducationItem[]>(section.items);
  const [newItemId, setNewItemId] = useState<string | null>(null);

  const updateItems = (next: EducationItem[]) => {
    setItems(next);
    onChange({ ...section, items: next });
  };

  const updateItem = (id: string, updates: Partial<EducationItem>) => {
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
    <SectionShell title={tEdu('title')} description={tEdu('description')}>
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
              item.degree && item.institution
                ? `${item.degree}, ${item.institution}`
                : item.institution || item.degree || ''
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
                label={tEdu('institution')}
                value={item.institution}
                onChange={(e) => updateItem(item.id, { institution: e.target.value })}
              />
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                <TextInput
                  label={tEdu('degree')}
                  value={item.degree}
                  onChange={(e) => updateItem(item.id, { degree: e.target.value })}
                />
                <TextInput
                  label={tEdu('field')}
                  value={item.field}
                  onChange={(e) => updateItem(item.id, { field: e.target.value })}
                />
              </SimpleGrid>
              <DateRangeFields
                startDate={item.startDate}
                endDate={item.endDate}
                onStartChange={(v) => updateItem(item.id, { startDate: v })}
                onEndChange={(v) => updateItem(item.id, { endDate: v })}
                startLabel={tEdu('startDate')}
                endLabel={tEdu('endDate')}
                presentLabel={t('present')}
              />
              <TextInput
                label={tEdu('grade')}
                value={item.grade ?? ''}
                onChange={(e) => updateItem(item.id, { grade: e.target.value })}
              />
              <Textarea
                label={tEdu('description')}
                value={item.description ?? ''}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                autosize
                minRows={2}
                maxRows={5}
              />
            </Stack>
          </ItemCard>
        ))}
        <AddItemButton label={tEdu('addButton')} onClick={addItem} />
      </Stack>
    </SectionShell>
  );
}
