'use client';

import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowRight, IconFileText } from '@tabler/icons-react';
import { useState } from 'react';

interface LandingNavbarProps {
  onPrivacyOpen: () => void;
  onFaqOpen: () => void;
}

export function LandingNavbar({ onPrivacyOpen, onFaqOpen }: LandingNavbarProps) {
  const [scroll] = useWindowScroll();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const scrolled = scroll.y > 10;

  return (
    <Box
      component="header"
      className="sticky top-0 z-100 bg-white transition-[box-shadow,border-color] duration-200 ease-in-out"
      style={{
        borderBottom: scrolled ? '1px solid var(--mantine-color-gray-2)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 8px 0 rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center" className="h-16">
          {/* Logo */}
          <Anchor href="/" className="no-underline">
            <Group gap={6} align="center">
              <Box className="w-7 h-7 rounded-[6px] flex items-center justify-center" bg="blue.6">
                <IconFileText size={16} color="white" stroke={2} />
              </Box>
              <Text fw={700} fz="lg" c="dark.9" className="tracking-[-0.02em]">
                Free{' '}
                <Text component="span" c="blue.6" fw={700} fz="lg">
                  CV
                </Text>{' '}
                Creator
              </Text>
            </Group>
          </Anchor>

          {/* Desktop nav links */}
          <Group gap="xl" visibleFrom="md">
            <Anchor href="#how-it-works" c="gray.7" fz="sm" fw={500} className="no-underline">
              Jak to działa
            </Anchor>
            <Anchor href="#features" c="gray.7" fz="sm" fw={500} className="no-underline">
              Funkcje
            </Anchor>
            <UnstyledButton onClick={onPrivacyOpen} c="gray.7" fz="sm" fw={500}>
              Prywatność
            </UnstyledButton>
            <UnstyledButton onClick={onFaqOpen} c="gray.7" fz="sm" fw={500}>
              FAQ
            </UnstyledButton>
          </Group>

          <Group gap="md">
            {/* Desktop CTA */}
            <Button
              component="a"
              href="/app/new"
              variant="filled"
              color="blue"
              size="sm"
              visibleFrom="md"
              rightSection={<IconArrowRight size={16} />}
            >
              Stwórz CV
            </Button>

            {/* Mobile burger */}
            <Burger
              opened={drawerOpened}
              onClick={() => setDrawerOpened((o) => !o)}
              hiddenFrom="md"
              size="sm"
              aria-label="Otwórz menu"
            />
          </Group>
        </Group>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="xl"
        size="100%"
        hiddenFrom="md"
        zIndex={200}
        title={
          <Group gap={6} align="center">
            <Box className="w-7 h-7 rounded-[6px] flex items-center justify-center" bg="blue.6">
              <IconFileText size={16} color="white" stroke={2} />
            </Box>
            <Text fw={700} fz="lg" c="dark.9">
              Free{' '}
              <Text component="span" c="blue.6" fw={700} fz="lg" inherit>
                CV
              </Text>{' '}
              Creator
            </Text>
          </Group>
        }
      >
        <Stack gap="lg" mt="md">
          <Anchor
            href="#how-it-works"
            onClick={() => setDrawerOpened(false)}
            c="dark.9"
            fz="lg"
            fw={500}
            className="no-underline"
          >
            Jak to działa
          </Anchor>
          <Anchor
            href="#features"
            onClick={() => setDrawerOpened(false)}
            c="dark.9"
            fz="lg"
            fw={500}
            className="no-underline"
          >
            Funkcje
          </Anchor>
          <UnstyledButton
            onClick={() => {
              setDrawerOpened(false);
              onPrivacyOpen();
            }}
            c="dark.9"
            fz="lg"
            fw={500}
          >
            Prywatność
          </UnstyledButton>
          <UnstyledButton
            onClick={() => {
              setDrawerOpened(false);
              onFaqOpen();
            }}
            c="dark.9"
            fz="lg"
            fw={500}
          >
            FAQ
          </UnstyledButton>
          <Button
            component="a"
            href="/app/new"
            variant="filled"
            color="blue"
            size="lg"
            fullWidth
            mt="md"
            rightSection={<IconArrowRight size={18} />}
          >
            Stwórz CV za darmo
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
