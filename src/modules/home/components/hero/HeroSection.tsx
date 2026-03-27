'use client';

import { useMotionPreferences } from '@common/hooks';
import { Badge, Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight, IconDownload, IconUserOff, IconWifi } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { HeroMockup } from './HeroMockup';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const, delay } },
});

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.2 },
  },
};

export function HeroSection() {
  const { initial } = useMotionPreferences();
  const t = useTranslations('hero');

  return (
    <Box
      component="section"
      className="flex items-center py-16 bg-white"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      <Container size="xl" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left column */}
          <div className="md:col-span-7">
            <Stack gap="xl">
              <motion.div variants={fadeUp(0)} initial={initial} animate="visible">
                <Badge
                  variant="light"
                  color="blue"
                  size="md"
                  radius="xl"
                  className="text-xs font-semibold tracking-[0.04em] uppercase px-4 py-2"
                >
                  {t('badge')}
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
                  {t('titlePart1')}{' '}
                  <Text component="span" c="blue.6" inherit>
                    {t('titleHighlight')}
                  </Text>{' '}
                  {t('titlePart2')}
                </Title>
              </motion.div>

              <motion.div variants={fadeUp(0.2)} initial={initial} animate="visible">
                <Text fz={{ base: 'md', md: 'lg' }} c="gray.7" lh={1.7} maw={520}>
                  {t('description')}
                </Text>
              </motion.div>

              <motion.div variants={fadeUp(0.3)} initial={initial} animate="visible">
                <Group gap="md" wrap="wrap">
                  <Button
                    component={Link}
                    href="/app/new"
                    variant="filled"
                    color="blue"
                    size="lg"
                    radius="md"
                    rightSection={<IconArrowRight size={20} />}
                    fw={700}
                    fz="md"
                  >
                    {t('ctaButton')}
                  </Button>
                </Group>
              </motion.div>

              <motion.div variants={fadeUp(0.4)} initial={initial} animate="visible">
                <Group gap="xl" wrap="wrap">
                  <Group gap={6}>
                    <IconUserOff size={16} color="var(--mantine-color-gray-6)" aria-hidden />
                    <Text fz="sm" c="gray.6" fw={500}>
                      {t('noRegistration')}
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconDownload size={16} color="var(--mantine-color-gray-6)" aria-hidden />
                    <Text fz="sm" c="gray.6" fw={500}>
                      {t('downloadPdf')}
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconWifi size={16} color="var(--mantine-color-gray-6)" aria-hidden />
                    <Text fz="sm" c="gray.6" fw={500}>
                      {t('worksOffline')}
                    </Text>
                  </Group>
                </Group>
              </motion.div>
            </Stack>
          </div>

          {/* Right column — mockup (hidden on mobile) */}
          <div className="hidden md:block md:col-span-5">
            <motion.div variants={fadeIn} initial={initial} animate="visible">
              <HeroMockup />
            </motion.div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
