'use client';

import React from 'react';

import type { CVSections, TemplateProps } from '../_shared/types';
import {
  formatDate,
  formatDateRange,
  isSectionVisible,
  isCustomSectionVisible,
} from '../_shared/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const INK = '#0d1b2a';
const MUTED = '#5c6b7e';
const SEP = '#dde1e7';

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <p
      style={{
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: INK,
        margin: '0 0 10px 0',
        paddingBottom: 4,
        borderBottom: `1.5px solid ${accent}`,
        fontFamily: '"Crimson Pro", Georgia, serif',
      }}
    >
      {title}
    </p>
  );
}

function DateCell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 70,
        flexShrink: 0,
        paddingTop: 1,
        fontSize: 9,
        color: MUTED,
        lineHeight: 1.4,
        textAlign: 'right',
        paddingRight: 12,
      }}
    >
      {children}
    </div>
  );
}

type SectionKey = keyof Omit<CVSections, 'custom'>;

function renderSection(
  key: SectionKey | string,
  sections: CVSections,
  accent: string,
  lang: 'pl' | 'en',
): React.ReactNode {
  switch (key) {
    case 'experience': {
      if (!isSectionVisible(sections.experience)) return null;
      const items = sections.experience.items.filter((i) => i.visible);
      return (
        <div key="experience" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.experience.title} accent={accent} />
          {items.map((exp) => (
            <div key={exp.id} style={{ display: 'flex', marginBottom: 12 }}>
              <DateCell>
                <div>{formatDate(exp.startDate, lang)}</div>
                <div>–</div>
                <div>{formatDate(exp.endDate, lang)}</div>
              </DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: INK, margin: '0 0 1px 0' }}>
                  {exp.position}
                </p>
                <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: '0 0 3px 0', fontStyle: 'italic' }}>
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ''}
                </p>
                {exp.description && (
                  <p style={{ fontSize: 10, color: MUTED, margin: '2px 0', lineHeight: 1.6 }}>
                    {exp.description}
                  </p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ margin: '3px 0 0 0', paddingLeft: 16 }}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: 10, color: MUTED, marginBottom: 2, lineHeight: 1.5 }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'education': {
      if (!isSectionVisible(sections.education)) return null;
      const items = sections.education.items.filter((i) => i.visible);
      return (
        <div key="education" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.education.title} accent={accent} />
          {items.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', marginBottom: 10 }}>
              <DateCell>
                <div>{formatDate(edu.startDate, lang)}</div>
                <div>–</div>
                <div>{formatDate(edu.endDate, lang)}</div>
              </DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: INK, margin: '0 0 1px 0' }}>
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ''}
                </p>
                <p style={{ fontSize: 10, color: accent, fontWeight: 500, fontStyle: 'italic', margin: '0 0 2px 0' }}>
                  {edu.institution}
                </p>
                {edu.grade && (
                  <p style={{ fontSize: 9.5, color: MUTED, margin: 0 }}>
                    {lang === 'pl' ? 'Ocena' : 'Grade'}: {edu.grade}
                  </p>
                )}
                {edu.description && (
                  <p style={{ fontSize: 10, color: MUTED, margin: '2px 0', lineHeight: 1.5 }}>
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'projects': {
      if (!isSectionVisible(sections.projects)) return null;
      const items = sections.projects.items.filter((i) => i.visible);
      return (
        <div key="projects" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.projects.title} accent={accent} />
          {items.map((proj) => (
            <div key={proj.id} style={{ display: 'flex', marginBottom: 10 }}>
              <DateCell>
                {proj.startDate ? (
                  <>
                    <div>{formatDate(proj.startDate, lang)}</div>
                    {proj.endDate && <div>– {formatDate(proj.endDate, lang)}</div>}
                  </>
                ) : null}
              </DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: INK, margin: '0 0 2px 0' }}>
                  {proj.name}
                </p>
                <p style={{ fontSize: 10, color: MUTED, margin: '2px 0', lineHeight: 1.6 }}>
                  {proj.description}
                </p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p style={{ fontSize: 9.5, color: accent, margin: 0, fontStyle: 'italic' }}>
                    {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'skills': {
      if (!isSectionVisible(sections.skills)) return null;
      const items = sections.skills.items.filter((i) => i.visible);
      return (
        <div key="skills" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.skills.title} accent={accent} />
          {items.map((group) => (
            <div key={group.id} style={{ marginBottom: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: INK }}>
                {group.category}:{' '}
              </span>
              <span style={{ fontSize: 10, color: MUTED }}>{group.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      );
    }

    case 'languages': {
      if (!isSectionVisible(sections.languages)) return null;
      const items = sections.languages.items.filter((i) => i.visible);
      return (
        <div key="languages" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.languages.title} accent={accent} />
          <p style={{ fontSize: 10, color: MUTED, margin: 0, lineHeight: 1.8 }}>
            {items.map((l, idx) => (
              <span key={l.id}>
                {l.name} <span style={{ color: accent, fontWeight: 600 }}>({l.level})</span>
                {idx < items.length - 1 ? '  ·  ' : ''}
              </span>
            ))}
          </p>
        </div>
      );
    }

    case 'certifications': {
      if (!isSectionVisible(sections.certifications)) return null;
      const items = sections.certifications.items.filter((i) => i.visible);
      return (
        <div key="certifications" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.certifications.title} accent={accent} />
          {items.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', marginBottom: 6 }}>
              <DateCell>{formatDate(cert.date, lang)}</DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: INK, margin: '0 0 1px 0' }}>
                  {cert.name}
                </p>
                <p style={{ fontSize: 9.5, color: MUTED, margin: 0 }}>{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'courses': {
      if (!isSectionVisible(sections.courses)) return null;
      const items = sections.courses.items.filter((i) => i.visible);
      return (
        <div key="courses" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.courses.title} accent={accent} />
          {items.map((course) => (
            <div key={course.id} style={{ display: 'flex', marginBottom: 5 }}>
              <DateCell>{course.date ? formatDate(course.date, lang) : ''}</DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: INK, margin: '0 0 1px 0' }}>
                  {course.name}
                </p>
                <p style={{ fontSize: 9.5, color: MUTED, margin: 0 }}>{course.platform}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'volunteer': {
      if (!isSectionVisible(sections.volunteer)) return null;
      const items = sections.volunteer.items.filter((i) => i.visible);
      return (
        <div key="volunteer" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.volunteer.title} accent={accent} />
          {items.map((vol) => (
            <div key={vol.id} style={{ display: 'flex', marginBottom: 10 }}>
              <DateCell>
                <div>{formatDate(vol.startDate, lang)}</div>
                <div>–</div>
                <div>{formatDate(vol.endDate, lang)}</div>
              </DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: INK, margin: '0 0 1px 0' }}>
                  {vol.role}
                </p>
                <p style={{ fontSize: 10, color: accent, fontStyle: 'italic', fontWeight: 500, margin: '0 0 2px 0' }}>
                  {vol.organization}
                </p>
                {vol.description && (
                  <p style={{ fontSize: 10, color: MUTED, margin: 0, lineHeight: 1.6 }}>
                    {vol.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'interests': {
      if (!isSectionVisible(sections.interests)) return null;
      const items = sections.interests.items.filter((i) => i.visible);
      return (
        <div key="interests" style={{ marginBottom: 18 }}>
          <SectionHeading title={sections.interests.title} accent={accent} />
          <p style={{ fontSize: 10, color: MUTED, margin: 0 }}>
            {items.map((item) => item.name).join('  ·  ')}
          </p>
        </div>
      );
    }

    default:
      return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ArcTemplate({ data, accentColor }: TemplateProps) {
  const accent = accentColor ?? data.meta.accentColor ?? '#7c3aed';
  const lang = data.meta.language;
  const { personal, sections, layout } = data;

  const contactItems = [personal.email, personal.website, personal.location]
    .filter(Boolean)
    .join('  ·  ');

  const defaultOrder: (SectionKey | string)[] = [
    'experience',
    'education',
    'projects',
    'skills',
    'certifications',
    'courses',
    'languages',
    'volunteer',
    'interests',
  ];
  const orderedKeys: (SectionKey | string)[] =
    layout.sectionOrder.length > 0 ? layout.sectionOrder : defaultOrder;

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        backgroundColor: '#ffffff',
        fontFamily: '"Source Serif 4", Georgia, serif',
        color: INK,
        fontSize: 10.5,
        lineHeight: 1.5,
      }}
    >
      {/* ── Centred header ── */}
      <div
        style={{
          textAlign: 'center',
          padding: '36px 48px 20px',
          borderBottom: `1px solid ${SEP}`,
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            fontFamily: '"Crimson Pro", Georgia, serif',
            color: INK,
            margin: '0 0 4px 0',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.jobTitle && (
          <p
            style={{
              fontSize: 11,
              color: MUTED,
              fontStyle: 'italic',
              margin: '0 0 8px 0',
              fontFamily: 'Georgia, serif',
            }}
          >
            {personal.jobTitle}
          </p>
        )}
        <p style={{ fontSize: 9.5, color: MUTED, margin: 0, letterSpacing: '0.02em' }}>
          {contactItems}
        </p>
        {(personal.phone || personal.linkedin || personal.github) && (
          <p style={{ fontSize: 9.5, color: MUTED, margin: '3px 0 0 0', letterSpacing: '0.02em' }}>
            {[personal.phone, personal.linkedin, personal.github].filter(Boolean).join('  ·  ')}
          </p>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '22px 48px 36px' }}>
        {/* Summary */}
        {personal.summary && (
          <div
            style={{
              marginBottom: 22,
              padding: '10px 16px',
              borderLeft: `3px solid ${accent}`,
              backgroundColor: `${accent}08`,
            }}
          >
            <p
              style={{
                fontSize: 10.5,
                color: MUTED,
                margin: 0,
                lineHeight: 1.7,
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
              }}
            >
              {personal.summary}
            </p>
          </div>
        )}

        {/* Ordered sections */}
        {orderedKeys.map((key) => renderSection(key as SectionKey, sections, accent, lang))}

        {/* Custom sections */}
        {sections.custom
          .filter((cs) => isCustomSectionVisible(cs))
          .map((cs) => (
            <div key={cs.id} style={{ marginBottom: 18 }}>
              <SectionHeading title={cs.title} accent={accent} />
              {cs.items
                .filter((i) => i.visible)
                .map((item) => (
                  <div key={item.id} style={{ display: 'flex', marginBottom: 8 }}>
                    <DateCell>
                      {item.startDate ? formatDate(item.startDate, lang) : ''}
                      {item.endDate ? ` – ${formatDate(item.endDate, lang)}` : ''}
                    </DateCell>
                    <div style={{ flex: 1 }}>
                      {item.title && (
                        <p style={{ fontSize: 10.5, fontWeight: 700, color: INK, margin: '0 0 1px 0' }}>
                          {item.title}
                        </p>
                      )}
                      {item.subtitle && (
                        <p style={{ fontSize: 10, color: accent, fontStyle: 'italic', margin: '0 0 2px 0' }}>
                          {item.subtitle}
                        </p>
                      )}
                      {item.description && (
                        <p style={{ fontSize: 10, color: MUTED, margin: 0, lineHeight: 1.6 }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}
