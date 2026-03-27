'use client';

import { SectionHeader } from '@common/components';
import { useMotionPreferences } from '@common/hooks';
import { Box, Container, Grid, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconEye, IconFileExport, IconGift, IconShield, IconWifiOff } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import styles from './FeaturesSection.module.css';

const features = [
  {
    icon: <IconGift size={24} />,
    title: 'W pełni darmowe',
    description: "Zero ukrytych opłat, zero paywall'i. Pobierz PDF już przy pierwszym użyciu.",
  },
  {
    icon: <IconShield size={24} />,
    title: 'Twoje dane są bezpieczne',
    description: 'Dane CV nigdy nie opuszczają Twojej przeglądarki. Brak serwera, brak śledzenia.',
  },
  {
    icon: <IconEye size={24} />,
    title: 'Live Preview',
    description:
      'Podgląd szablonu aktualizuje się w czasie rzeczywistym podczas wypełniania formularza.',
  },
  {
    icon: <IconFileExport size={24} />,
    title: 'Eksport PDF i JSON',
    description:
      'Pobierz gotowe CV jako PDF lub zapisz dane do pliku JSON — do późniejszego użycia.',
  },
  {
    icon: <IconWifiOff size={24} />,
    title: 'Działa offline',
    description: 'Zainstaluj jako aplikację PWA i pracuj nad CV bez dostępu do internetu.',
  },
];

export function FeaturesSection() {
  const { shouldReduceMotion } = useMotionPreferences();

  return (
    <Box component="section" id="features" className="py-20" bg="dark.9">
      <Container size="xl">
        <SectionHeader
          label="Możliwości"
          title="Wszystko czego potrzebujesz"
          description="Zero subskrypcji, zero konta — pełna funkcjonalność dostępna od razu."
          labelColor="blue.4"
          titleColor="white"
          descriptionColor="gray.5"
        />

        <Grid gutter={{ base: 16, md: 24 }}>
          {features.map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, xs: 6, md: 4 }}>
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.07 }}
                className="h-full"
              >
                <Box
                  className={`${styles.card} h-full rounded-xl p-6`}
                  bg="dark.8"
                  style={{ border: '1px solid var(--mantine-color-dark-6)' }}
                >
                  <Stack gap="md">
                    <ThemeIcon
                      size={48}
                      radius="md"
                      variant="light"
                      color="blue"
                      style={{ backgroundColor: 'rgba(34, 139, 230, 0.12)' }}
                    >
                      {feature.icon}
                    </ThemeIcon>
                    <Stack gap={6}>
                      <Text fw={700} fz="lg" c="white">
                        {feature.title}
                      </Text>
                      <Text fz="sm" c="gray.5" lh={1.6}>
                        {feature.description}
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
