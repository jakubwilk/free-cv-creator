'use client';

import { Box, Button, Container, Grid, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';

import { TemplateMockupCard } from './TemplateMockupCard';

const templates = [
  { name: 'Modern', variant: 'modern' as const, tagline: 'Kolorowy nagłówek, nowoczesny układ' },
  { name: 'Classic', variant: 'classic' as const, tagline: 'Dwukolumnowy, elegancki' },
  { name: 'Minimal', variant: 'minimal' as const, tagline: 'Czysty, minimalistyczny' },
];

export function TemplateShowcaseSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box component="section" id="templates" className="py-20 bg-white">
      <Container size="xl">
        <Stack align="center" gap="sm" mb={56}>
          <Text fz="xs" fw={700} c="blue.6" className="tracking-widest uppercase">
            Szablony
          </Text>
          <Title
            order={2}
            ta="center"
            c="dark.9"
            fw={700}
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
          >
            Profesjonalne szablony
          </Title>
          <Text c="gray.6" fz="lg" ta="center" maw={520}>
            Wybierz spośród nowoczesnych szablonów zoptymalizowanych pod systemy ATS. Każdy szablon
            dostępny w kilku wariantach kolorystycznych.
          </Text>
        </Stack>

        <Grid gutter={{ base: 24, md: 32 }}>
          {templates.map((tpl, i) => (
            <Grid.Col key={i} span={{ base: 12, sm: 4 }}>
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.12 }}
              >
                <TemplateMockupCard template={tpl} />
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>

        <Stack align="center" gap="md" mt={48}>
          <Text fz="sm" c="gray.5" fw={500}>
            5 szablonów na start · Więcej wkrótce
          </Text>
          <Button
            component="a"
            href="/app/new"
            variant="filled"
            color="blue"
            size="lg"
            rightSection={<IconArrowRight size={20} />}
          >
            Wybierz szablon
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
