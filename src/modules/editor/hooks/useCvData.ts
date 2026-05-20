'use client';

import { useCallback, useState } from 'react';

import type { CVData, CVMeta, CVSections, PersonalInfo } from '@editor/templates/_shared/types';

export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export type TabValue =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'extra';

export function createEmptyCvData(): CVData {
  return {
    meta: {
      id: generateId(),
      title: 'My CV',
      templateId: 'slate',
      accentColor: '#3b82f6',
      language: 'en',
      pageFormat: 'A4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    personal: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
      photo: undefined,
    },
    sections: {
      experience: { title: 'Work Experience', visible: true, items: [] },
      education: { title: 'Education', visible: true, items: [] },
      skills: { title: 'Skills', visible: true, items: [] },
      languages: { title: 'Languages', visible: true, items: [] },
      certifications: { title: 'Certifications', visible: true, items: [] },
      projects: { title: 'Projects', visible: true, items: [] },
      courses: { title: 'Courses', visible: true, items: [] },
      volunteer: { title: 'Volunteer', visible: true, items: [] },
      interests: { title: 'Interests', visible: true, items: [] },
      custom: [],
    },
    layout: {
      sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
    },
  };
}

export function useCvData(initialData?: CVData) {
  const [cvData, setCvData] = useState<CVData>(initialData ?? createEmptyCvData);

  const updatePersonal = useCallback((updates: Partial<PersonalInfo>) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...updates },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }));
  }, []);

  const updateSection = useCallback(
    <K extends keyof CVSections>(key: K, updater: (prev: CVSections[K]) => CVSections[K]) => {
      setCvData((prev) => ({
        ...prev,
        sections: { ...prev.sections, [key]: updater(prev.sections[key]) },
        meta: { ...prev.meta, updatedAt: new Date().toISOString() },
      }));
    },
    [],
  );

  const updateMeta = useCallback((updates: Partial<CVMeta>) => {
    setCvData((prev) => ({
      ...prev,
      meta: { ...prev.meta, ...updates, updatedAt: new Date().toISOString() },
    }));
  }, []);

  return { cvData, updatePersonal, updateSection, updateMeta };
}
