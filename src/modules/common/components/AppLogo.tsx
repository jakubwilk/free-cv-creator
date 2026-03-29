'use client';

import { Anchor, Box, Group, Text } from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';

import { Link } from '@/i18n/navigation';

interface IAppLogoProps {
  size?: 'sm' | 'md';
}

export function AppLogo({ size = 'md' }: IAppLogoProps) {
  const iconSize = size === 'sm' ? 14 : 16;
  const fontSize = size === 'sm' ? 'md' : 'lg';
  const boxSize = size === 'sm' ? 'w-6 h-6' : 'w-7 h-7';

  return (
    <Anchor component={Link} href="/" underline="never">
      <Group gap={6} align="center">
        <Box className={`${boxSize} rounded-[6px] flex items-center justify-center`} bg="blue.6">
          <IconFileText size={iconSize} color="white" stroke={2} />
        </Box>
        <Text fw={700} fz={fontSize} c="dark.9" className="tracking-[-0.02em]">
          Free{' '}
          <Text component="span" c="blue.6" fw={700} fz={fontSize} inherit>
            CV
          </Text>{' '}
          Creator
        </Text>
      </Group>
    </Anchor>
  );
}
