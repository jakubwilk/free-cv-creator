import type React from 'react';

// ─── Meta & Layout ───────────────────────────────────────────────────────────

export interface CVMeta {
  id: string;
  title: string;
  templateId: string;
  accentColor: string;
  language: 'pl' | 'en';
  pageFormat: 'A4' | 'letter';
  createdAt: string;
  updatedAt: string;
}

export interface CVLayout {
  sectionOrder: string[];
}

// ─── Personal ────────────────────────────────────────────────────────────────

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  photo?: string; // base64
}

// ─── Section items ────────────────────────────────────────────────────────────

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string | 'present';
  description: string;
  highlights?: string[];
  visible: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | 'present';
  grade?: string;
  description?: string;
  visible: boolean;
}

export interface SkillGroupItem {
  id: string;
  category: string;
  skills: string[];
  visible: boolean;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  visible: boolean;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialUrl?: string;
  visible: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string | 'present';
  url?: string;
  github?: string;
  technologies?: string[];
  visible: boolean;
}

export interface CourseItem {
  id: string;
  name: string;
  platform: string;
  date?: string;
  url?: string;
  visible: boolean;
}

export interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string | 'present';
  location?: string;
  description?: string;
  visible: boolean;
}

export interface InterestItem {
  id: string;
  name: string;
  description?: string;
  visible: boolean;
}

export interface CustomSectionItem {
  id: string;
  title?: string;
  subtitle?: string;
  startDate?: string;
  endDate?: string | 'present';
  description?: string;
  visible: boolean;
}

export interface CustomSection {
  id: string;
  title: string;
  visible: boolean;
  items: CustomSectionItem[];
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

export interface Section<T> {
  title: string;
  visible: boolean;
  items: T[];
}

// ─── CVSections ───────────────────────────────────────────────────────────────

export interface CVSections {
  experience: Section<ExperienceItem>;
  education: Section<EducationItem>;
  skills: Section<SkillGroupItem>;
  languages: Section<LanguageItem>;
  certifications: Section<CertificationItem>;
  projects: Section<ProjectItem>;
  courses: Section<CourseItem>;
  volunteer: Section<VolunteerItem>;
  interests: Section<InterestItem>;
  custom: CustomSection[];
}

// ─── Root CVData ──────────────────────────────────────────────────────────────

export interface CVData {
  meta: CVMeta;
  personal: PersonalInfo;
  sections: CVSections;
  layout: CVLayout;
}

// ─── Template types ───────────────────────────────────────────────────────────

export type TemplateId = 'slate' | 'ivory' | 'coral' | 'grid' | 'arc';

export interface TemplateProps {
  data: CVData;
  accentColor?: string;
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  defaultAccentColor: string;
  component: React.ComponentType<TemplateProps>;
  personas: string[];
  atsScore: 'high' | 'medium';
  hasPhoto: boolean;
  columns: 1 | 2;
}
