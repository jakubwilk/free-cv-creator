'use client';

import { SectionHeader } from '@common/components';
import { useMotionPreferences } from '@common/hooks';
import { Box, Container, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconEye, IconFileExport, IconGift, IconShield, IconWifiOff } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import styles from './FeaturesSection.module.css';

export function FeaturesSection() {
  const { shouldReduceMotion } = useMotionPreferences();
  const t = useTranslations('features');

  const features = [
    {
      icon: <IconGift size={24} />,
      title: t('items.free.title'),
      description: t('items.free.description'),
    },
    {
      icon: <IconShield size={24} />,
      title: t('items.secure.title'),
      description: t('items.secure.description'),
    },
    {
      icon: <IconEye size={24} />,
      title: t('items.livePreview.title'),
      description: t('items.livePreview.description'),
    },
    {
      icon: <IconFileExport size={24} />,
      title: t('items.export.title'),
      description: t('items.export.description'),
    },
    {
      icon: <IconWifiOff size={24} />,
      title: t('items.offline.title'),
      description: t('items.offline.description'),
    },
  ];

  return (
    <Box component="section" id="features" className="py-20" bg="dark.9">
      <Container size="xl">
        <SectionHeader
          label={t('sectionLabel')}
          title={t('sectionTitle')}
          description={t('sectionDescription')}
          labelColor="blue.4"
          titleColor="white"
          descriptionColor="gray.5"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex">
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
            </div>
          ))}
        </div>
      </Container>
    </Box>
  );
}
