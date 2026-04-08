'use client';

import React from 'react';

import type { CVSections, TemplateProps } from '../_shared/types';
import {
  formatDate,
  formatDateRange,
  isSectionVisible,
  isCustomSectionVisible,
} from '../_shared/utils';

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <p
      style={{
        fontSize: 9,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: accent,
        margin: '0 0 10px 0',
        paddingBottom: 4,
        borderBottom: `1px solid ${accent}`,
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
        width: 80,
        flexShrink: 0,
        paddingTop: 1,
        fontSize: 9,
        color: '#57534e',
        lineHeight: 1.4,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section renderers ordered by sectionOrder ────────────────────────────────

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
            <div key={exp.id} style={{ display: 'flex', marginBottom: 10, gap: 0 }}>
              <DateCell>
                <div>{formatDate(exp.startDate, lang)}</div>
                <div>–</div>
                <div>{formatDate(exp.endDate, lang)}</div>
              </DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: '#1c1917', margin: '0 0 1px 0' }}>
                  {exp.position}
                </p>
                <p style={{ fontSize: 10, color: accent, margin: '0 0 3px 0', fontWeight: 500 }}>
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ''}
                </p>
                {exp.description && (
                  <p style={{ fontSize: 10, color: '#57534e', margin: '2px 0', lineHeight: 1.5 }}>
                    {exp.description}
                  </p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ margin: '3px 0 0 0', paddingLeft: 14 }}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: 10, color: '#57534e', marginBottom: 2 }}>
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
            <div key={edu.id} style={{ display: 'flex', marginBottom: 8, gap: 0 }}>
              <DateCell>
                <div>{formatDate(edu.startDate, lang)}</div>
                <div>–</div>
                <div>{formatDate(edu.endDate, lang)}</div>
              </DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: '#1c1917', margin: '0 0 1px 0' }}>
                  {edu.degree}{edu.field ? ` · ${edu.field}` : ''}
                </p>
                <p style={{ fontSize: 10, color: accent, margin: '0 0 2px 0', fontWeight: 500 }}>
                  {edu.institution}
                </p>
                {edu.grade && (
                  <p style={{ fontSize: 9.5, color: '#57534e', margin: 0 }}>
                    {lang === 'pl' ? 'Ocena' : 'Grade'}: {edu.grade}
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
              <span style={{ fontSize: 10, fontWeight: 600, color: '#1c1917' }}>
                {group.category}:{' '}
              </span>
              <span style={{ fontSize: 10, color: '#57534e' }}>{group.skills.join(' · ')}</span>
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
          <p style={{ fontSize: 10, color: '#57534e', margin: 0, lineHeight: 1.8 }}>
            {items.map((l, idx) => (
              <span key={l.id}>
                {l.name} ({l.level})
                {idx < items.length - 1 ? ' · ' : ''}
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
            <div key={cert.id} style={{ display: 'flex', marginBottom: 5, gap: 0 }}>
              <DateCell>{formatDate(cert.date, lang)}</DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: '#1c1917', margin: '0 0 1px 0' }}>
                  {cert.name}
                </p>
                <p style={{ fontSize: 9.5, color: '#57534e', margin: 0 }}>{cert.issuer}</p>
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
            <div key={proj.id} style={{ display: 'flex', marginBottom: 8, gap: 0 }}>
              <DateCell>
                {proj.startDate ? (
                  <>
                    <div>{formatDate(proj.startDate, lang)}</div>
                    {proj.endDate && <div>– {formatDate(proj.endDate, lang)}</div>}
                  </>
                ) : null}
              </DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: '#1c1917', margin: '0 0 2px 0' }}>
                  {proj.name}
                </p>
                <p style={{ fontSize: 10, color: '#57534e', margin: '2px 0', lineHeight: 1.5 }}>
                  {proj.description}
                </p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p style={{ fontSize: 9.5, color: accent, margin: 0 }}>
                    {proj.technologies.join(' · ')}
                  </p>
                )}
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
            <div key={vol.id} style={{ display: 'flex', marginBottom: 8, gap: 0 }}>
              <DateCell>
                <div>{formatDate(vol.startDate, lang)}</div>
                <div>–</div>
                <div>{formatDate(vol.endDate, lang)}</div>
              </DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: '#1c1917', margin: '0 0 1px 0' }}>
                  {vol.role}
                </p>
                <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: '0 0 2px 0' }}>
                  {vol.organization}
                </p>
                {vol.description && (
                  <p style={{ fontSize: 10, color: '#57534e', margin: 0, lineHeight: 1.5 }}>
                    {vol.description}
                  </p>
                )}
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
            <div key={course.id} style={{ display: 'flex', marginBottom: 5, gap: 0 }}>
              <DateCell>{course.date ? formatDate(course.date, lang) : ''}</DateCell>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: '#1c1917', margin: '0 0 1px 0' }}>
                  {course.name}
                </p>
                <p style={{ fontSize: 9.5, color: '#57534e', margin: 0 }}>{course.platform}</p>
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
          <p style={{ fontSize: 10, color: '#57534e', margin: 0 }}>
            {items.map((item) => item.name).join(' · ')}
          </p>
        </div>
      );
    }

    default:
      return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export function IvoryTemplate({ data, accentColor }: TemplateProps) {
  const accent = accentColor ?? data.meta.accentColor ?? '#b45309';
  const lang = data.meta.language;
  const { personal, sections, layout } = data;

  const contactItems = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.website,
  ]
    .filter(Boolean)
    .join(' · ');

  // Determine ordered section keys
  const defaultOrder: (SectionKey | string)[] = [
    'experience',
    'education',
    'skills',
    'languages',
    'certifications',
    'projects',
    'courses',
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
        backgroundColor: '#fffef9',
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: '#1c1917',
        fontSize: 10.5,
        lineHeight: 1.5,
      }}
    >
      {/* ── Full-width header ── */}
      <div style={{ padding: '32px 36px 20px' }}>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            color: '#1c1917',
            margin: '0 0 4px 0',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}
        >
          {personal.firstName} {personal.lastName}
        </h1>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: 'system-ui, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#57534e',
            margin: '0 0 8px 0',
          }}
        >
          {personal.jobTitle}
        </p>
        <p
          style={{
            fontSize: 9.5,
            color: '#57534e',
            margin: '0 0 12px 0',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {contactItems}
        </p>
        <div style={{ height: 1, backgroundColor: accent }} />
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '0 36px 32px' }}>
        {/* Summary */}
        {personal.summary && (
          <div
            style={{
              borderLeft: `2px solid ${accent}`,
              paddingLeft: 14,
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: 10.5,
                color: '#57534e',
                fontStyle: 'italic',
                margin: 0,
                lineHeight: 1.6,
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
                  <div key={item.id} style={{ display: 'flex', marginBottom: 7, gap: 0 }}>
                    <DateCell>
                      {item.startDate ? formatDate(item.startDate, lang) : ''}
                      {item.endDate ? ` – ${formatDate(item.endDate, lang)}` : ''}
                    </DateCell>
                    <div style={{ flex: 1 }}>
                      {item.title && (
                        <p style={{ fontSize: 10.5, fontWeight: 700, color: '#1c1917', margin: '0 0 1px 0' }}>
                          {item.title}
                        </p>
                      )}
                      {item.subtitle && (
                        <p style={{ fontSize: 10, color: accent, margin: '0 0 2px 0' }}>
                          {item.subtitle}
                        </p>
                      )}
                      {item.description && (
                        <p style={{ fontSize: 10, color: '#57534e', margin: 0, lineHeight: 1.5 }}>
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
