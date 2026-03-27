'use client';

import { SectionHeader } from '@common/components';
import { FAQ_ITEMS } from '@home/models';
import { Accordion, Box, Container } from '@mantine/core';

export function FaqSection() {
  return (
    <Box component="section" id="faq" className="py-20" bg="gray.0">
      <Container size="md">
        <SectionHeader label="Pytania" title="Najczęściej zadawane pytania" mb={48} />

        <Accordion
          variant="separated"
          radius="md"
          styles={{
            item: {
              backgroundColor: 'var(--mantine-color-white)',
              border: '1px solid var(--mantine-color-gray-2)',
              marginBottom: '0.75rem',
            },
            control: {
              padding: '1.125rem 1.25rem',
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--mantine-color-dark-9)',
            },
            content: {
              padding: '0 1.25rem 1.125rem',
              color: 'var(--mantine-color-gray-7)',
              lineHeight: 1.7,
              fontSize: '0.9375rem',
            },
            chevron: { color: 'var(--mantine-color-blue-6)' },
          }}
        >
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>{item.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}
