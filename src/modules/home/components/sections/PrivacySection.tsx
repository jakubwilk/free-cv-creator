'use client';

import { Box, Container, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCheck, IconLock, IconServer, IconShieldLock, IconX } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';

const privacyPoints = [
  {
    title: 'Brak serwera, brak bazy danych',
    description:
      'Aplikacja nie posiada backendu. Dane zapisywane są wyłącznie w localStorage Twojej przeglądarki.',
  },
  {
    title: 'Zero konta, zero e-maila',
    description: 'Nie pytamy Cię o żadne dane kontaktowe. Zaczynasz tworzyć CV od razu.',
  },
  {
    title: 'Dane znikają po pobraniu PDF',
    description:
      'Po wygenerowaniu pliku PDF localStorage jest automatycznie czyszczony — lub możesz zapisać dane jako JSON.',
  },
];

export function PrivacySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      component="section"
      id="privacy"
      className="py-20"
      style={{
        background:
          'linear-gradient(135deg, var(--mantine-color-blue-7) 0%, var(--mantine-color-blue-6) 60%, var(--mantine-color-blue-5) 100%)',
      }}
    >
      <Container size="xl">
        <Grid gutter={{ base: 48, md: 80 }} align="center">
          {/* Left: text */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -32 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Stack gap="xl">
                <Text fz="xs" fw={700} c="blue.1" className="tracking-widest uppercase">
                  Prywatność
                </Text>
                <Title
                  order={2}
                  c="white"
                  fw={800}
                  lh={1.2}
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                >
                  Twoje dane nigdy nie opuszczają przeglądarki.
                </Title>
                <Text c="blue.1" fz="lg" lh={1.7}>
                  Free CV Creator działa w 100% lokalnie — żaden serwer nie widzi Twojego imienia,
                  adresu e-mail ani historii zatrudnienia. Nie ma logowania, nie ma bazy danych, nie
                  ma ciasteczek śledzących.
                </Text>
                <Stack gap="lg">
                  {privacyPoints.map((point, i) => (
                    <Group key={i} gap="md" align="flex-start" wrap="nowrap">
                      <ThemeIcon
                        size={36}
                        radius="xl"
                        className="shrink-0 mt-[2px]"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                      >
                        <IconCheck size={18} color="white" stroke={2.5} />
                      </ThemeIcon>
                      <Stack gap={2}>
                        <Text fw={700} c="white" fz="md">
                          {point.title}
                        </Text>
                        <Text c="blue.1" fz="sm" lh={1.6}>
                          {point.description}
                        </Text>
                      </Stack>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </motion.div>
          </Grid.Col>

          {/* Right: browser illustration */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 32 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="flex justify-center"
            >
              <Box
                className="w-full rounded-2xl p-3"
                maw={380}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
                }}
              >
                {/* Browser chrome */}
                <Box
                  className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 mb-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  {['#ff5f57', '#febc2e', '#28c840'].map((color, i) => (
                    <Box
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <Box
                    className="flex-1 flex items-center gap-[6px] rounded-md px-3 py-1 ml-2"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <IconLock size={12} color="rgba(255,255,255,0.7)" />
                    <Text fz="xs" c="rgba(255,255,255,0.8)">
                      freecvcreator.app
                    </Text>
                  </Box>
                </Box>
                {/* Browser content */}
                <Box
                  className="flex flex-col items-center gap-4 rounded-lg p-5 min-h-[200px]"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <ThemeIcon
                    size={64}
                    radius="xl"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <IconShieldLock size={32} color="white" />
                  </ThemeIcon>
                  <Text c="white" fw={700} fz="lg" ta="center">
                    Dane tylko w Twojej przeglądarce
                  </Text>
                  <Group gap={6}>
                    <IconServer size={16} color="rgba(255,255,255,0.5)" aria-hidden />
                    <Text fz="xs" c="rgba(255,255,255,0.5)">
                      Serwer nie istnieje
                    </Text>
                    <IconX size={14} color="rgba(239, 68, 68, 0.8)" aria-hidden />
                  </Group>
                </Box>
              </Box>
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
