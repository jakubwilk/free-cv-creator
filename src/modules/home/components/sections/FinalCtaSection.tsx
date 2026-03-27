'use client';

import { useMotionPreferences } from '@common/hooks';
import { Box, Button, Container, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export function FinalCtaSection() {
  const { shouldReduceMotion } = useMotionPreferences();

  return (
    <Box component="section" className="py-20" bg="dark.9">
      <Container size="sm">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Stack align="center" gap="xl" ta="center">
            <Stack gap="md" align="center">
              <Title
                order={2}
                c="white"
                fw={800}
                lh={1.2}
                className="tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                Gotowe CV w mniej niż{' '}
                <Text component="span" c="blue.4" inherit>
                  10 minut.
                </Text>
              </Title>
              <Text c="gray.5" fz="lg" lh={1.7} maw={440}>
                Bez rejestracji. Bez płacenia. Twoje dane zostają u Ciebie.
              </Text>
            </Stack>
            <Button
              component="a"
              href="/app/new"
              variant="filled"
              color="blue"
              size="xl"
              radius="md"
              rightSection={<IconArrowRight size={22} />}
              className="text-[1.125rem] font-bold px-10 h-[60px]"
            >
              Stwórz swoje CV teraz
            </Button>
            <Text fz="xs" c="gray.6">
              Bez konta · Bez karty kredytowej · 100% darmowe
            </Text>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
