import type { CvEntry } from '../models';

export const CV_STORAGE_KEY = 'free-cv-creator:cvs';

export function loadCvList(): CvEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CV_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CvEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveCvList(list: CvEntry[]): void {
  localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(list));
}

export function createCvEntry(
  partial: Omit<CvEntry, 'id' | 'updatedAt'> & Partial<Pick<CvEntry, 'id' | 'updatedAt'>>
): CvEntry {
  return {
    id: partial.id ?? crypto.randomUUID(),
    name: partial.name,
    templateId: partial.templateId,
    updatedAt: partial.updatedAt ?? new Date().toISOString(),
    data: partial.data,
  };
}

export function duplicateCvEntry(entry: CvEntry): CvEntry {
  return createCvEntry({
    ...entry,
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
  });
}

export function downloadCvJson(entry: CvEntry): void {
  const blob = new Blob([JSON.stringify(entry, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${entry.name.replace(/\s+/g, '_')}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseCvJson(file: File): Promise<CvEntry> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (typeof parsed !== 'object' || parsed === null) {
          reject(new Error('Invalid JSON structure'));
          return;
        }
        const entry = createCvEntry({
          id: typeof parsed.id === 'string' ? parsed.id : undefined,
          name: typeof parsed.name === 'string' ? parsed.name : file.name.replace('.json', ''),
          templateId: typeof parsed.templateId === 'string' ? parsed.templateId : 'default',
          data: typeof parsed.data === 'object' && parsed.data !== null ? parsed.data : parsed,
        });
        resolve(entry);
      } catch {
        reject(new Error('Failed to parse JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
