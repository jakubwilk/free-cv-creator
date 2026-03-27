'use client';

import { SectionHeader } from '@common/components';
import { useMotionPreferences } from '@common/hooks';
import { Box, Button, Container, Grid, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { TemplateMockupCard } from './TemplateMockupCard';

const templates = [
  { name: 'Modern', variant: 'modern' as const, tagline: 'Kolorowy nagłówek, nowoczesny układ' },
  { name: 'Classic', variant: 'classic' as const, tagline: 'Dwukolumnowy, elegancki' },
  { name: 'Minimal', variant: 'minimal' as const, tagline: 'Czysty, minimalistyczny' },
];

export function TemplateShowcaseSection() {
  const { shouldReduceMotion } = useMotionPreferences();
  const t = useTranslations('navbar');

  return (
    <Box component="section" id="templates" className="py-20 bg-white">
      <Container size="xl">
        <SectionHeader
          label="Szablony"
          title="Profesjonalne szablony"
          description="Wybierz spośród nowoczesnych szablonów zoptymalizowanych pod systemy ATS. Każdy szablon dostępny w kilku wariantach kolorystycznych."
          descriptionMaxWidth={520}
        />

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
            component={Link}
            href="/app/new"
            variant="filled"
            color="blue"
            size="lg"
            rightSection={<IconArrowRight size={20} />}
          >
            {t('createCv')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
