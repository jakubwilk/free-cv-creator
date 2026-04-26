'use client';

import { TagsInput } from '@mantine/core';

interface SkillTagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
}

export function SkillTagInput({ value, onChange, label, placeholder }: SkillTagInputProps) {
  return (
    <TagsInput label={label} value={value} onChange={onChange} placeholder={placeholder} />
  );
}
