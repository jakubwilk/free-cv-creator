import type { TemplateDefinition, TemplateId } from './_shared/types';
import { ArcTemplate } from './arc/ArcTemplate';
import { CoralTemplate } from './coral/CoralTemplate';
import { GridTemplate } from './grid/GridTemplate';
import { IvoryTemplate } from './ivory/IvoryTemplate';
import { SlateTemplate } from './slate/SlateTemplate';

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'slate',
    name: 'Slate',
    defaultAccentColor: '#3b82f6',
    component: SlateTemplate,
    personas: ['Software Developer', 'Engineer', 'DevOps'],
    atsScore: 'high',
    hasPhoto: true,
    columns: 2,
  },
  {
    id: 'ivory',
    name: 'Ivory',
    defaultAccentColor: '#b45309',
    component: IvoryTemplate,
    personas: ['Executive', 'Senior Manager', 'Director'],
    atsScore: 'high',
    hasPhoto: false,
    columns: 1,
  },
  {
    id: 'coral',
    name: 'Coral',
    defaultAccentColor: '#e85d4a',
    component: CoralTemplate,
    personas: ['Creative', 'Designer', 'Marketing'],
    atsScore: 'medium',
    hasPhoto: true,
    columns: 1,
  },
  {
    id: 'grid',
    name: 'Grid',
    defaultAccentColor: '#0ea5e9',
    component: GridTemplate,
    personas: ['Data Analyst', 'Finance', 'Consulting'],
    atsScore: 'high',
    hasPhoto: false,
    columns: 2,
  },
  {
    id: 'arc',
    name: 'Arc',
    defaultAccentColor: '#7c3aed',
    component: ArcTemplate,
    personas: ['Academic', 'Researcher', 'PhD'],
    atsScore: 'high',
    hasPhoto: false,
    columns: 1,
  },
];

export function getTemplate(id: TemplateId): TemplateDefinition {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}
