'use client';

import { ActionIcon, Menu, Text } from '@mantine/core';
import { IconCheck, IconLanguage } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';

const LOCALES = [
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('languageSwitcher');

  const handleLocaleChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Menu shadow="md" width={160} position="bottom-end">
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="md"
          loading={isPending}
          aria-label={t('ariaLabel')}
        >
          <IconLanguage size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t('menuLabel')}</Menu.Label>
        {LOCALES.map((l) => (
          <Menu.Item
            key={l.code}
            leftSection={
              <Text fz="sm" component="span">
                {l.flag}
              </Text>
            }
            rightSection={
              l.code === locale ? <IconCheck size={14} color="var(--mantine-color-blue-6)" /> : null
            }
            onClick={() => handleLocaleChange(l.code)}
            fw={l.code === locale ? 600 : 400}
          >
            {l.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
