/**
 * Shared utility functions for CV template rendering.
 */

const PL_MONTHS = [
  'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze',
  'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru',
];
const EN_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Converts YYYY-MM → "Sty 2023" (pl) or "Jan 2023" (en).
 * Falls back to the raw value if the format does not match.
 */
export function formatDate(value: string | undefined, lang: 'pl' | 'en'): string {
  if (!value) return '';
  if (value === 'present') return lang === 'pl' ? 'Obecnie' : 'Present';

  const match = value.match(/^(\d{4})-(\d{2})$/);
  if (!match) return value;

  const year = match[1];
  const monthIdx = parseInt(match[2], 10) - 1;
  const months = lang === 'pl' ? PL_MONTHS : EN_MONTHS;
  const monthLabel = months[monthIdx] ?? match[2];

  return `${monthLabel} ${year}`;
}

/**
 * Formats a date range, e.g. "Jan 2020 – Present".
 */
export function formatDateRange(
  startDate: string,
  endDate: string | 'present',
  lang: 'pl' | 'en',
): string {
  const sep = ' – ';
  return `${formatDate(startDate, lang)}${sep}${formatDate(endDate, lang)}`;
}

/**
 * Returns initials (up to 2 chars) from a first + last name.
 */
export function getInitials(firstName: string, lastName: string): string {
  const f = firstName.trim()[0] ?? '';
  const l = lastName.trim()[0] ?? '';
  return (f + l).toUpperCase();
}

/**
 * Returns true when a standard section should be rendered:
 * visible flag is true AND at least one item is visible.
 */
export function isSectionVisible<T extends { visible: boolean }>(section: {
  visible: boolean;
  items: T[];
}): boolean {
  return section.visible && section.items.some((i) => i.visible);
}

/**
 * Returns true for a custom section that has visible items.
 */
export function isCustomSectionVisible(section: {
  visible: boolean;
  items: Array<{ visible: boolean }>;
}): boolean {
  return section.visible && section.items.some((i) => i.visible);
}
