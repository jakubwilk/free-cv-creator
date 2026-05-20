'use client';

import { useState } from 'react';
import { Stack, Text, TextInput } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { generateId } from '@editor/hooks';
import type { CertificationItem, Section } from '@editor/templates/_shared/types';

import { AddItemButton, ItemCard, SectionShell } from './shared';

interface CertificationsSectionProps {
  section: Section<CertificationItem>;
  onChange: (section: Section<CertificationItem>) => void;
}

function createEmptyItem(): CertificationItem {
  return {
    id: generateId(),
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialUrl: '',
    visible: true,
  };
}

function parseDateValue(value: string): Date | null {
  if (!value) return null;
  const parts = value.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  if (!year || !month) return null;
  return new Date(year, month - 1, 1);
}

function serializeDate(date: Date | string | null): string {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM');
}

export function CertificationsSection({ section, onChange }: CertificationsSectionProps) {
  const t = useTranslations('editor.sections');
  const tCert = useTranslations('editor.sections.certifications');
  const locale = useLocale();
  const valueFormat = locale === 'pl' ? 'MM.YYYY' : 'MM/YYYY';
  const [items, setItems] = useState<CertificationItem[]>(section.items);
  const [newItemId, setNewItemId] = useState<string | null>(null);

  const updateItems = (next: CertificationItem[]) => {
    setItems(next);
    onChange({ ...section, items: next });
  };

  const updateItem = (id: string, updates: Partial<CertificationItem>) => {
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
    <SectionShell title={tCert('title')} description={tCert('description')}>
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
              item.name && item.issuer
                ? `${item.name} — ${item.issuer}`
                : item.name || item.issuer || ''
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
                label={tCert('name')}
                value={item.name}
                onChange={(e) => updateItem(item.id, { name: e.target.value })}
              />
              <TextInput
                label={tCert('issuer')}
                value={item.issuer}
                onChange={(e) => updateItem(item.id, { issuer: e.target.value })}
              />
              <MonthPickerInput
                label={tCert('date')}
                value={parseDateValue(item.date)}
                onChange={(d) => updateItem(item.id, { date: serializeDate(d) })}
                valueFormat={valueFormat}
                maxDate={new Date()}
                clearable
              />
              <MonthPickerInput
                label={tCert('expiryDate')}
                value={parseDateValue(item.expiryDate ?? '')}
                onChange={(d) => updateItem(item.id, { expiryDate: serializeDate(d) })}
                valueFormat={valueFormat}
                clearable
              />
              <TextInput
                label={tCert('credentialUrl')}
                value={item.credentialUrl ?? ''}
                onChange={(e) => updateItem(item.id, { credentialUrl: e.target.value })}
              />
            </Stack>
          </ItemCard>
        ))}
        <AddItemButton label={tCert('addButton')} onClick={addItem} />
      </Stack>
    </SectionShell>
  );
}
