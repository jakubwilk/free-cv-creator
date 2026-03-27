'use client';

import { Box, Container, Grid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconDownload, IconForms, IconLayoutGrid } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';

const steps = [
  {
    icon: <IconLayoutGrid size={32} />,
    title: 'Wybierz szablon',
    description:
      'Przeglądaj galerię profesjonalnych szablonów i wybierz ten, który pasuje do Twojej branży.',
  },
  {
    icon: <IconForms size={32} />,
    title: 'Wypełnij formularz',
    description:
      'Uzupełnij sekcje CV — dane osobowe, doświadczenie, wykształcenie i umiejętności. Podgląd aktualizuje się na bieżąco.',
  },
  {
    icon: <IconDownload size={32} />,
    title: 'Pobierz PDF',
    description:
      'Gotowe! Pobierz CV jako PDF w jakości druku — selektowalny tekst, przyjazny dla systemów ATS.',
  },
];

export function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box component="section" id="how-it-works" className="py-20" bg="gray.0">
      <Container size="xl">
        <Stack align="center" gap="sm" mb={56}>
          <Text fz="xs" fw={700} c="blue.6" className="tracking-widest uppercase">
            Jak zacząć
          </Text>
          <Title
            order={2}
            ta="center"
            fw={700}
            c="dark.9"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
          >
            Jak to działa?
          </Title>
          <Text c="gray.6" fz="lg" ta="center" maw={480}>
            Trzy kroki do gotowego, profesjonalnego CV.
          </Text>
        </Stack>

        <Box className="relative">
          <Grid gutter={{ base: 32, md: 48 }}>
            {steps.map((step, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
                >
                  <Stack align="center" gap="md" ta="center">
                    <Box className="relative">
                      <ThemeIcon size={72} radius="xl" variant="light" color="blue">
                        {step.icon}
                      </ThemeIcon>
                      <Box
                        className="absolute -top-[6px] -right-[6px] w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        bg="blue.6"
                      >
                        {index + 1}
                      </Box>
                    </Box>
                    <Title order={3} fz="xl" fw={700} c="dark.9">
                      {step.title}
                    </Title>
                    <Text c="gray.6" fz="md" lh={1.6}>
                      {step.description}
                    </Text>
                  </Stack>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
