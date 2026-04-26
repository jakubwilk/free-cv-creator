'use client';

import { Paper, ScrollArea, Stack, Text, Title } from '@mantine/core';

interface SectionShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SectionShell({ title, description, children }: SectionShellProps) {
  return (
    <ScrollArea h="100%" type="scroll">
      <Stack p="md" gap="sm">
        <div>
          <Title order={5} c="dark.7" fw={600}>{title}</Title>
          {description && (
            <Text c="dimmed" size="sm" mt={2}>
              {description}
            </Text>
          )}
        </div>
        <Paper
          p="md"
          radius="sm"
          withBorder
          bg="white"
          c="dark.7"
        >
          {children}
        </Paper>
      </Stack>
    </ScrollArea>
  );
}
