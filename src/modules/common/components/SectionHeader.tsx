import { Stack, Text, Title } from '@mantine/core';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  labelColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  descriptionMaxWidth?: number;
  mb?: number;
}

export function SectionHeader({
  label,
  title,
  description,
  labelColor = 'blue.6',
  titleColor = 'dark.9',
  descriptionColor = 'gray.6',
  descriptionMaxWidth = 480,
  mb = 56,
}: SectionHeaderProps) {
  return (
    <Stack align="center" gap="sm" mb={mb}>
      <Text fz="xs" fw={700} c={labelColor} className="tracking-widest uppercase">
        {label}
      </Text>
      <Title
        order={2}
        ta="center"
        fw={700}
        c={titleColor}
        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
      >
        {title}
      </Title>
      {description && (
        <Text c={descriptionColor} fz="lg" ta="center" maw={descriptionMaxWidth}>
          {description}
        </Text>
      )}
    </Stack>
  );
}
