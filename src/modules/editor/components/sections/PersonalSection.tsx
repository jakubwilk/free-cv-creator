'use client';

import { useRef, useState } from 'react';
import { Avatar, Button, Group, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { IconPhoto, IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import type { PersonalInfo } from '@editor/templates/_shared/types';

import { SectionShell } from './shared';

interface PersonalSectionProps {
  personal: PersonalInfo;
  onChange: (updates: Partial<PersonalInfo>) => void;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

async function resizeImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxSize = 200;
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function PersonalSection({ personal, onChange }: PersonalSectionProps) {
  const t = useTranslations('editor.sections.personal');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [values, setValues] = useState<PersonalInfo>(personal);

  const update = <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onChange(next), 400);
      return next;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const resized = await resizeImage(file);
    update('photo', resized);
    e.target.value = '';
  };

  return (
    <SectionShell title={t('title')} description={t('description')}>
      <Stack gap="sm">
        <Group align="flex-end" gap="sm">
          <Avatar src={values.photo || undefined} size={80} radius="md" color="blue">
            {getInitials(values.firstName, values.lastName) || '?'}
          </Avatar>
          <Stack gap={6}>
            <Text size="xs" c="dimmed">
              {t('photoHint')}
            </Text>
            <Group gap="xs">
              <Button
                size="xs"
                variant="light"
                leftSection={<IconPhoto size={14} />}
                onClick={() => fileInputRef.current?.click()}
              >
                {t('uploadPhoto')}
              </Button>
              {values.photo && (
                <Button
                  size="xs"
                  variant="subtle"
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  onClick={() => update('photo', undefined)}
                >
                  {t('removePhoto')}
                </Button>
              )}
            </Group>
          </Stack>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
          <TextInput
            label={t('firstName')}
            value={values.firstName}
            onChange={(e) => update('firstName', e.target.value)}
          />
          <TextInput
            label={t('lastName')}
            value={values.lastName}
            onChange={(e) => update('lastName', e.target.value)}
          />
        </SimpleGrid>

        <TextInput
          label={t('jobTitle')}
          value={values.jobTitle}
          onChange={(e) => update('jobTitle', e.target.value)}
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
          <TextInput
            label={t('email')}
            type="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
          />
          <TextInput
            label={t('phone')}
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </SimpleGrid>

        <TextInput
          label={t('location')}
          value={values.location}
          onChange={(e) => update('location', e.target.value)}
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
          <TextInput
            label={t('website')}
            value={values.website ?? ''}
            onChange={(e) => update('website', e.target.value)}
          />
          <TextInput
            label={t('linkedin')}
            value={values.linkedin ?? ''}
            onChange={(e) => update('linkedin', e.target.value)}
          />
        </SimpleGrid>

        <TextInput
          label={t('github')}
          value={values.github ?? ''}
          onChange={(e) => update('github', e.target.value)}
        />

        <Textarea
          label={t('summary')}
          value={values.summary}
          onChange={(e) => update('summary', e.target.value)}
          autosize
          minRows={3}
          maxRows={8}
        />
      </Stack>
    </SectionShell>
  );
}
