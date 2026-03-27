import { Badge, Box, Group, Text } from '@mantine/core';

import styles from './TemplateMockupCard.module.css';

interface Template {
  name: string;
  variant: 'modern' | 'classic' | 'minimal';
  tagline: string;
}

function ModernMockup() {
  return (
    <Box className="bg-white" style={{ width: 595, height: 842 }}>
      {/* Blue header */}
      <Box className="p-10 text-white" bg="blue.6">
        <Box className="h-6 w-[55%] rounded mb-[10px] bg-white/90" />
        <Box className="h-[14px] w-[35%] rounded mb-4 bg-white/70" />
        <Group gap={16}>
          {[28, 32, 40].map((w, i) => (
            <Box key={i} className="h-[10px] rounded bg-white/50" style={{ width: `${w}%` }} />
          ))}
        </Group>
      </Box>
      {/* Content */}
      <Box className="px-10 py-8">
        {[
          ['35%', 'blue'],
          ['80%', 'gray'],
          ['65%', 'gray'],
          ['70%', 'gray'],
          ['30%', 'blue'],
          ['75%', 'gray'],
          ['60%', 'gray'],
        ].map(([w, color], i) => (
          <Box
            key={i}
            className="rounded"
            style={{
              backgroundColor:
                color === 'blue' ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-2)',
              height: color === 'blue' ? 8 : 7,
              width: w,
              borderRadius: 4,
              marginBottom: color === 'blue' ? 12 : 8,
              marginTop: color === 'blue' && i > 0 ? 20 : 0,
            }}
          />
        ))}
        <Group gap={8} mt={20} wrap="wrap">
          {[42, 35, 50, 28, 45, 38].map((w, i) => (
            <Box
              key={i}
              className="h-6 rounded-full"
              bg="blue.0"
              style={{ border: '1px solid var(--mantine-color-blue-2)', width: `${w}%` }}
            />
          ))}
        </Group>
      </Box>
    </Box>
  );
}

function ClassicMockup() {
  return (
    <Box className="flex bg-white" style={{ width: 595, height: 842 }}>
      {/* Dark sidebar */}
      <Box className="flex flex-col gap-4 px-5 py-8 w-[32%]" bg="dark.8">
        <Box className="w-[60px] h-[60px] rounded-full mb-2" bg="blue.6" />
        {[70, 50, 60, 45, 55, 40, 65, 35].map((w, i) => (
          <Box key={i} className="h-2 rounded bg-white/20" style={{ width: `${w}%` }} />
        ))}
      </Box>
      {/* Main content */}
      <Box className="flex-1 px-7 py-8">
        <Box className="h-5 w-[65%] rounded mb-2" bg="dark.9" />
        <Box className="h-[3px] w-full mb-5" bg="blue.6" />
        {[
          ['30%', true],
          ['80%', false],
          ['65%', false],
          ['70%', false],
          ['28%', true],
          ['75%', false],
          ['60%', false],
        ].map(([w, isHeader], i) => (
          <Box
            key={i}
            className="rounded"
            style={{
              backgroundColor: isHeader
                ? 'var(--mantine-color-dark-7)'
                : 'var(--mantine-color-gray-2)',
              height: isHeader ? 9 : 7,
              width: w as string,
              borderRadius: 4,
              marginBottom: isHeader ? 12 : 8,
              marginTop: isHeader && i > 0 ? 20 : 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

function MinimalMockup() {
  return (
    <Box className="bg-white" style={{ width: 595, height: 842 }}>
      {/* Top accent bar */}
      <Box className="h-1 w-full" bg="gray.3" />
      <Box className="p-10">
        <Box className="h-[22px] w-[50%] rounded mb-2" bg="dark.9" />
        <Box className="h-[10px] w-[32%] rounded mb-6" bg="gray.5" />
        <Box className="h-px w-full mb-6" bg="gray.2" />
        {[
          ['28%', true],
          ['85%', false],
          ['70%', false],
          ['60%', false],
          ['25%', true],
          ['75%', false],
          ['55%', false],
          ['65%', false],
        ].map(([w, isHeader], i) => (
          <Box
            key={i}
            className="rounded"
            style={{
              backgroundColor: isHeader
                ? 'var(--mantine-color-dark-8)'
                : 'var(--mantine-color-gray-2)',
              height: isHeader ? 9 : 7,
              width: w as string,
              borderRadius: 4,
              marginBottom: isHeader ? 12 : 8,
              marginTop: isHeader && i > 0 ? 20 : 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export function TemplateMockupCard({ template }: { template: Template }) {
  return (
    <Box className={styles.card}>
      <Box className="h-80 overflow-hidden relative" bg="gray.0">
        <Box
          className="absolute top-0 left-0"
          style={{ transformOrigin: 'top left', transform: 'scale(0.52)' }}
        >
          {template.variant === 'modern' && <ModernMockup />}
          {template.variant === 'classic' && <ClassicMockup />}
          {template.variant === 'minimal' && <MinimalMockup />}
        </Box>
      </Box>
      <Box
        className="flex items-center justify-between px-4 py-3.5 bg-white"
        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
      >
        <Box>
          <Text fw={600} fz="sm" c="dark.9">
            {template.name}
          </Text>
          <Text fz="xs" c="gray.6">
            {template.tagline}
          </Text>
        </Box>
        <Badge variant="light" color="blue" size="sm">
          ATS-friendly
        </Badge>
      </Box>
    </Box>
  );
}
