'use client';

import { Badge, Box, Button, Container, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight, IconDownload, IconUserOff, IconWifi } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';

import { HeroMockup } from './HeroMockup';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const, delay } },
});

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.2 },
  },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? 'visible' : 'hidden';

  return (
    <Box
      component="section"
      className="flex items-center py-16 bg-white"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      <Container size="xl" className="w-full">
        <Grid gutter={{ base: 48, md: 64 }} align="center">
          {/* Left column */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="xl">
              <motion.div variants={fadeUp(0)} initial={initial} animate="visible">
                <Badge
                  variant="light"
                  color="blue"
                  size="md"
                  radius="xl"
                  className="text-xs font-semibold tracking-[0.04em] uppercase px-4 py-2"
                >
                  100% darmowe · Bez konta · Twoje dane zostają u Ciebie
                </Badge>
              </motion.div>

              <motion.div variants={fadeUp(0.1)} initial={initial} animate="visible">
                <Title
                  order={1}
                  fw={800}
                  lh={1.1}
                  c="dark.9"
                  className="tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
                >
                  Stwórz profesjonalne CV{' '}
                  <Text component="span" c="blue.6" inherit>
                    całkowicie za darmo
                  </Text>{' '}
                  — bez konta, bez haczyków.
                </Title>
              </motion.div>

              <motion.div variants={fadeUp(0.2)} initial={initial} animate="visible">
                <Text fz={{ base: 'md', md: 'lg' }} c="gray.7" lh={1.7} maw={520}>
                  Wypełnij formularz, wybierz szablon i pobierz gotowe CV jako PDF. Żadne Twoje dane
                  nie trafiają na serwer — wszystko działa w Twojej przeglądarce.
                </Text>
              </motion.div>

              <motion.div variants={fadeUp(0.3)} initial={initial} animate="visible">
                <Group gap="md" wrap="wrap">
                  <Button
                    component="a"
                    href="/app/new"
                    variant="filled"
                    color="blue"
                    size="lg"
                    radius="md"
                    rightSection={<IconArrowRight size={20} />}
                    fw={700}
                    fz="md"
                  >
                    Stwórz CV za darmo
                  </Button>
                </Group>
              </motion.div>

              <motion.div variants={fadeUp(0.4)} initial={initial} animate="visible">
                <Group gap="xl" wrap="wrap">
                  <Group gap={6}>
                    <IconUserOff size={16} color="var(--mantine-color-gray-6)" aria-hidden />
                    <Text fz="sm" c="gray.6" fw={500}>
                      Bez rejestracji
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconDownload size={16} color="var(--mantine-color-gray-6)" aria-hidden />
                    <Text fz="sm" c="gray.6" fw={500}>
                      Pobierz PDF
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconWifi size={16} color="var(--mantine-color-gray-6)" aria-hidden />
                    <Text fz="sm" c="gray.6" fw={500}>
                      Działa offline
                    </Text>
                  </Group>
                </Group>
              </motion.div>
            </Stack>
          </Grid.Col>

          {/* Right column — mockup (hidden on mobile) */}
          <Grid.Col span={{ base: 12, md: 5 }} visibleFrom="md">
            <motion.div variants={fadeRight} initial={initial} animate="visible">
              <HeroMockup />
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
