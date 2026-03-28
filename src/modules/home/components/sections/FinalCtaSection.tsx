'use client';

import { useMotionPreferences } from '@common/hooks';
import { Box, Button, Container, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function FinalCtaSection() {
  const { shouldReduceMotion } = useMotionPreferences();
  const t = useTranslations('finalCta');
  const tNavbar = useTranslations('navbar');
  const tHero = useTranslations('hero');

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
                {t('titlePart1')}{' '}
                <Text component="span" c="blue.4" inherit>
                  {t('titleHighlight')}
                </Text>
              </Title>
              <Text c="gray.5" fz="lg" lh={1.7} maw={440}>
                {t('subtitle')}
              </Text>
            </Stack>
            <Button
              component={Link}
              href="/app/new"
              variant="filled"
              color="blue"
              size="xl"
              radius="md"
              rightSection={<IconArrowRight size={22} />}
              className="text-[1.125rem] font-bold px-10 h-[60px]"
            >
              {tNavbar('createCvFree')}
            </Button>
            <Text fz="xs" c="gray.6">
              {tHero('noRegistration')} · {tHero('downloadPdf')} · 100% darmowe
            </Text>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
