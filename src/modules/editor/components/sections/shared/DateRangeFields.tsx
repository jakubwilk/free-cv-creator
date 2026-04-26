'use client';

import { Checkbox, Group, Stack } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';

interface DateRangeFieldsProps {
  startDate: string;
  endDate: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  startLabel: string;
  endLabel: string;
  presentLabel: string;
  required?: boolean;
  allowPresent?: boolean;
}

function parseDateValue(value: string): Date | null {
  if (!value || value === 'present') return null;
  const parts = value.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  if (!year || !month) return null;
  return new Date(year, month - 1, 1);
}

function serializeDate(date: Date | string | null): string {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM');
}

export function DateRangeFields({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  startLabel,
  endLabel,
  presentLabel,
  required,
  allowPresent = true,
}: DateRangeFieldsProps) {
  const locale = useLocale();
  const valueFormat = locale === 'pl' ? 'MM.YYYY' : 'MM/YYYY';
  const isPresent = endDate === 'present';

  return (
    <Stack gap="xs">
      <Group grow align="flex-start">
        <MonthPickerInput
          label={startLabel}
          value={parseDateValue(startDate)}
          onChange={(date) => onStartChange(serializeDate(date))}
          valueFormat={valueFormat}
          required={required}
          maxDate={new Date()}
          clearable
        />
        <MonthPickerInput
          label={endLabel}
          value={isPresent ? null : parseDateValue(endDate)}
          onChange={(date) => onEndChange(serializeDate(date))}
          valueFormat={valueFormat}
          disabled={isPresent}
          minDate={parseDateValue(startDate) ?? undefined}
          maxDate={new Date()}
          clearable
        />
      </Group>
      {allowPresent && (
        <Checkbox
          label={presentLabel}
          checked={isPresent}
          onChange={(e) => onEndChange(e.currentTarget.checked ? 'present' : '')}
          size="sm"
        />
      )}
    </Stack>
  );
}
