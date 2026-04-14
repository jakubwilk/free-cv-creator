'use client';

import { LanguageSwitcher } from '@common/components';
import { ActionIcon, Anchor, Box, Burger, Button, Group, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconHome, IconLayoutCards, IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

interface IEditorNavbarProps {
  mobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  onToggleAside: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export function EditorNavbar({
  mobileNavOpen,
  onToggleMobileNav,
  onToggleAside,
  onCancel,
  onDelete,
}: IEditorNavbarProps) {
  const t = useTranslations('editor');

  const handleDeleteClick = () => {
    modals.openConfirmModal({
      title: <Text fw={600} c="gray.8">{t('deleteConfirmTitle')}</Text>,
      children: <Text size="sm" c="gray.7">{t('deleteConfirmMessage')}</Text>,
      labels: { confirm: t('deleteConfirmButton'), cancel: t('back') },
      confirmProps: { color: 'red' },
      onConfirm: onDelete,
    });
  };

  return (
    <div className="min-h-16 h-16 px-4 flex items-center justify-between">
      <Group gap="sm">
        <Burger opened={mobileNavOpen} onClick={onToggleMobileNav} hiddenFrom="md" size="sm" />
        <LanguageSwitcher />
        <Anchor component={Link} href="/" c="gray.6" fz="sm" fw={500} underline="never">
          <Group gap={4} align="center">
            <IconHome size={20} />
            <Text component="span" fz="sm" fw={500} visibleFrom="sm">
              {t('backToHome')}
            </Text>
          </Group>
        </Anchor>
      </Group>

      <Group gap="xs">
        <Box hiddenFrom="lg">
          <Tooltip label={t('templatePanel.changeTemplate')} position="bottom">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={onToggleAside}
              aria-label={t('templatePanel.changeTemplate')}
            >
              <IconLayoutCards size={20} />
            </ActionIcon>
          </Tooltip>
        </Box>
        <Tooltip label={t('backTooltip')} position="bottom">
          <Button variant="default" size="sm" onClick={onCancel}>
            {t('back')}
          </Button>
        </Tooltip>
        <Tooltip label={t('deleteTooltip')} position="bottom">
          <ActionIcon variant="subtle" color="red" onClick={handleDeleteClick}>
            <IconTrash size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </div>
  );
}
