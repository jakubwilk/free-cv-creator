'use client';

import { SectionHeader } from '@common/components';
import { useMotionPreferences } from '@common/hooks';
import { Box, Container, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconDownload, IconForms, IconLayoutGrid } from '@tabler/icons-react';
import { motion } from 'framer-motion';

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
  const { shouldReduceMotion } = useMotionPreferences();

  return (
    <Box component="section" id="how-it-works" className="py-20" bg="gray.0">
      <Container size="xl">
        <SectionHeader
          label="Jak zacząć"
          title="Jak to działa?"
          description="Trzy kroki do gotowego, profesjonalnego CV."
        />

        <Box className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index}>
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
              </div>
            ))}
          </div>
        </Box>
      </Container>
    </Box>
  );
}
