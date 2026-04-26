'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface AddItemButtonProps {
  label: string;
  onClick: () => void;
}

export function AddItemButton({ label, onClick }: AddItemButtonProps) {
  return (
    <Button
      variant="outline"
      fullWidth
      leftSection={<IconPlus size={16} />}
      color="blue"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
