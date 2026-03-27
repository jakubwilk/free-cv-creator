'use client';

import { Anchor, Box, Container, Divider, Group, Stack, Text } from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';

export function LandingFooter() {
  return (
    <Box
      component="footer"
      className="pt-12 pb-8"
      bg="dark.9"
      style={{ borderTop: '1px solid var(--mantine-color-dark-6)' }}
    >
      <Container size="xl">
        <div className="grid grid-cols-12 gap-8 mb-10">
          <div className="col-span-12 md:col-span-5">
            <Stack gap="md">
              <Group gap={6} align="center">
                <Box className="w-7 h-7 rounded-[6px] flex items-center justify-center" bg="blue.6">
                  <IconFileText size={16} color="white" stroke={2} />
                </Box>
                <Text fw={700} fz="lg" c="white">
                  Free{' '}
                  <Text component="span" c="blue.6" fw={700} fz="lg" inherit>
                    CV
                  </Text>{' '}
                  Creator
                </Text>
              </Group>
              <Text c="gray.6" fz="sm" lh={1.7} maw={320}>
                Bezpłatny kreator CV działający w całości w Twojej przeglądarce. Bez konta, bez
                śledzenia, bez paywall&apos;i.
              </Text>
            </Stack>
          </div>

          <div className="col-span-6 md:col-span-3">
            <Stack gap="sm">
              <Text fw={700} fz="sm" c="gray.4" className="tracking-[0.06em] uppercase">
                Nawigacja
              </Text>
              {[
                ['#how-it-works', 'Jak to działa'],
                ['#features', 'Funkcje'],
                ['#privacy', 'Prywatność'],
                ['#faq', 'FAQ'],
              ].map(([href, label]) => (
                <Anchor
                  key={href}
                  href={href}
                  c="gray.6"
                  fz="sm"
                  className="no-underline leading-loose"
                >
                  {label}
                </Anchor>
              ))}
            </Stack>
          </div>

          <div className="col-span-6 md:col-span-4">
            <Stack gap="sm">
              <Text fw={700} fz="sm" c="gray.4" className="tracking-[0.06em] uppercase">
                Aplikacja
              </Text>
              <Anchor href="/app/new" c="gray.6" fz="sm" className="no-underline leading-loose">
                Stwórz CV
              </Anchor>
              <Anchor href="/app" c="gray.6" fz="sm" className="no-underline leading-loose">
                Moje CV
              </Anchor>
            </Stack>
          </div>
        </div>

        <Divider color="dark.6" />
        <Group justify="space-between" mt={24} wrap="wrap" gap="sm">
          <Text fz="xs" c="gray.6">
            © 2026 Free CV Creator. Wszelkie prawa zastrzeżone.
          </Text>
          <Text fz="xs" c="gray.6">
            Twoje dane nigdy nie opuszczają przeglądarki.
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
