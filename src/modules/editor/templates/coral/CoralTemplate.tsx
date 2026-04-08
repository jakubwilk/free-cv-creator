'use client';

import React from 'react';

import type { CVSections, TemplateProps } from '../_shared/types';
import {
  formatDate,
  formatDateRange,
  getInitials,
  isSectionVisible,
  isCustomSectionVisible,
} from '../_shared/utils';

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: accent,
        margin: '0 0 8px 0',
        paddingBottom: 4,
        borderBottom: `2px solid ${accent}`,
      }}
    >
      {title}
    </p>
  );
}

function Chip({ label, accent }: { label: string; accent: string }) {
  // derive chip colors from accent with opacity
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 9,
        fontWeight: 500,
        padding: '2px 9px',
        borderRadius: 999,
        backgroundColor: '#fde8e6',
        border: '1px solid #fbb4ad',
        color: '#7c2d2a',
        marginRight: 4,
        marginBottom: 4,
      }}
    >
      {label}
    </span>
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
        <div key="experience" style={{ marginBottom: 16 }}>
          <SectionHeading title={sections.experience.title} accent={accent} />
          {items.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 11 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: '#2d3748', margin: 0 }}>
                  {exp.position}
                </p>
                <p style={{ fontSize: 9, color: '#718096', margin: 0, flexShrink: 0, marginLeft: 8 }}>
                  {formatDateRange(exp.startDate, exp.endDate, lang)}
                </p>
              </div>
              <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: '1px 0 3px 0' }}>
                {exp.company}
                {exp.location ? ` · ${exp.location}` : ''}
              </p>
              {exp.description && (
                <p style={{ fontSize: 10, color: '#4a5568', margin: '2px 0', lineHeight: 1.5 }}>
                  {exp.description}
                </p>
              )}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul style={{ margin: '3px 0 0 0', paddingLeft: 14 }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: 10, color: '#4a5568', marginBottom: 2 }}>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    }

    case 'skills': {
      if (!isSectionVisible(sections.skills)) return null;
      const items = sections.skills.items.filter((i) => i.visible);
      return (
        <div key="skills" style={{ marginBottom: 16 }}>
          <SectionHeading title={sections.skills.title} accent={accent} />
          {items.map((group) => (
            <div key={group.id} style={{ marginBottom: 6 }}>
              {group.category && (
                <p style={{ fontSize: 9.5, fontWeight: 600, color: '#4a5568', margin: '0 0 3px 0' }}>
                  {group.category}
                </p>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {group.skills.map((skill, idx) => (
                  <Chip key={idx} label={skill} accent={accent} />
                ))}
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
        <div key="projects" style={{ marginBottom: 16 }}>
          <SectionHeading title={sections.projects.title} accent={accent} />
          {items.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: '#2d3748', margin: 0 }}>
                  {proj.name}
                </p>
                {(proj.startDate || proj.endDate) && (
                  <p style={{ fontSize: 9, color: '#718096', margin: 0, flexShrink: 0, marginLeft: 8 }}>
                    {proj.startDate && proj.endDate
                      ? formatDateRange(proj.startDate, proj.endDate, lang)
                      : formatDate(proj.startDate ?? proj.endDate, lang)}
                  </p>
                )}
              </div>
              <p style={{ fontSize: 10, color: '#4a5568', margin: '2px 0', lineHeight: 1.5 }}>
                {proj.description}
              </p>
              {proj.technologies && proj.technologies.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 3 }}>
                  {proj.technologies.map((tech, i) => (
                    <Chip key={i} label={tech} accent={accent} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    case 'certifications': {
      if (!isSectionVisible(sections.certifications)) return null;
      const items = sections.certifications.items.filter((i) => i.visible);
      return (
        <div key="certifications" style={{ marginBottom: 16 }}>
          <SectionHeading title={sections.certifications.title} accent={accent} />
          {items.map((cert) => (
            <div key={cert.id} style={{ marginBottom: 5 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#2d3748', margin: '0 0 1px 0' }}>
                {cert.name}
              </p>
              <p style={{ fontSize: 9.5, color: '#718096', margin: 0 }}>
                {cert.issuer} · {formatDate(cert.date, lang)}
              </p>
            </div>
          ))}
        </div>
      );
    }

    case 'courses': {
      if (!isSectionVisible(sections.courses)) return null;
      const items = sections.courses.items.filter((i) => i.visible);
      return (
        <div key="courses" style={{ marginBottom: 16 }}>
          <SectionHeading title={sections.courses.title} accent={accent} />
          {items.map((course) => (
            <div key={course.id} style={{ marginBottom: 5 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#2d3748', margin: '0 0 1px 0' }}>
                {course.name}
              </p>
              <p style={{ fontSize: 9.5, color: '#718096', margin: 0 }}>
                {course.platform}
                {course.date ? ` · ${formatDate(course.date, lang)}` : ''}
              </p>
            </div>
          ))}
        </div>
      );
    }

    case 'volunteer': {
      if (!isSectionVisible(sections.volunteer)) return null;
      const items = sections.volunteer.items.filter((i) => i.visible);
      return (
        <div key="volunteer" style={{ marginBottom: 16 }}>
          <SectionHeading title={sections.volunteer.title} accent={accent} />
          {items.map((vol) => (
            <div key={vol.id} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: '#2d3748', margin: 0 }}>
                  {vol.role}
                </p>
                <p style={{ fontSize: 9, color: '#718096', margin: 0, flexShrink: 0, marginLeft: 8 }}>
                  {formatDateRange(vol.startDate, vol.endDate, lang)}
                </p>
              </div>
              <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: '1px 0 2px' }}>
                {vol.organization}
              </p>
              {vol.description && (
                <p style={{ fontSize: 10, color: '#4a5568', margin: 0, lineHeight: 1.5 }}>
                  {vol.description}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CoralTemplate({ data, accentColor }: TemplateProps) {
  const accent = accentColor ?? data.meta.accentColor ?? '#e85d4a';
  const lang = data.meta.language;
  const { personal, sections, layout } = data;

  const visibleEducation = sections.education.items.filter((i) => i.visible);
  const visibleLanguages = sections.languages.items.filter((i) => i.visible);
  const visibleInterests = sections.interests.items.filter((i) => i.visible);

  const defaultOrder: (SectionKey | string)[] = [
    'experience',
    'skills',
    'projects',
    'certifications',
    'courses',
    'volunteer',
  ];
  const orderedKeys: (SectionKey | string)[] =
    layout.sectionOrder.length > 0
      ? layout.sectionOrder.filter(
          (k) => !['education', 'languages', 'interests'].includes(k),
        )
      : defaultOrder;

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        backgroundColor: '#ffffff',
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
        color: '#2d3748',
        fontSize: 10.5,
        lineHeight: 1.5,
      }}
    >
      {/* ── Coloured header ── */}
      <div
        style={{
          backgroundColor: accent,
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        {/* Avatar */}
        {personal.photo ? (
          <img
            src={personal.photo}
            alt="Profile"
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.8)',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.8)',
              backgroundColor: 'rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 800,
              color: '#ffffff',
              flexShrink: 0,
            }}
          >
            {getInitials(personal.firstName, personal.lastName)}
          </div>
        )}

        {/* Name block */}
        <div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 3px 0',
              lineHeight: 1.1,
            }}
          >
            {personal.firstName} {personal.lastName}
          </h1>
          <p
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.85)',
              margin: '0 0 8px 0',
              fontWeight: 500,
            }}
          >
            {personal.jobTitle}
          </p>
          {/* Contact row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 14px' }}>
            {personal.email && (
              <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>
                ✉ {personal.email}
              </span>
            )}
            {personal.phone && (
              <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>
                ☎ {personal.phone}
              </span>
            )}
            {personal.location && (
              <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>
                📍 {personal.location}
              </span>
            )}
            {personal.linkedin && (
              <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>
                🔗 {personal.linkedin}
              </span>
            )}
            {personal.website && (
              <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>
                🌐 {personal.website}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '20px 28px' }}>
        {/* Summary / About */}
        {personal.summary && (
          <div
            style={{
              borderLeft: `4px solid ${accent}`,
              paddingLeft: 12,
              marginBottom: 18,
            }}
          >
            <p style={{ fontSize: 10.5, color: '#4a5568', margin: 0, lineHeight: 1.6 }}>
              {personal.summary}
            </p>
          </div>
        )}

        {/* Main ordered sections */}
        {orderedKeys.map((key) => renderSection(key as SectionKey, sections, accent, lang))}

        {/* Custom sections */}
        {sections.custom
          .filter((cs) => isCustomSectionVisible(cs))
          .map((cs) => (
            <div key={cs.id} style={{ marginBottom: 16 }}>
              <SectionHeading title={cs.title} accent={accent} />
              {cs.items
                .filter((i) => i.visible)
                .map((item) => (
                  <div key={item.id} style={{ marginBottom: 7 }}>
                    {item.title && (
                      <p style={{ fontSize: 10.5, fontWeight: 700, color: '#2d3748', margin: '0 0 1px 0' }}>
                        {item.title}
                      </p>
                    )}
                    {item.subtitle && (
                      <p style={{ fontSize: 10, color: accent, margin: '0 0 2px 0' }}>
                        {item.subtitle}
                      </p>
                    )}
                    {(item.startDate || item.endDate) && (
                      <p style={{ fontSize: 9, color: '#718096', margin: '0 0 2px 0' }}>
                        {item.startDate && item.endDate
                          ? formatDateRange(item.startDate, item.endDate, lang)
                          : formatDate(item.startDate ?? item.endDate, lang)}
                      </p>
                    )}
                    {item.description && (
                      <p style={{ fontSize: 10, color: '#4a5568', margin: 0, lineHeight: 1.5 }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          ))}

        {/* ── Footer 3-column: Education | Languages | Interests ── */}
        {(isSectionVisible(sections.education) ||
          isSectionVisible(sections.languages) ||
          isSectionVisible(sections.interests)) && (
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 8,
              paddingTop: 16,
              borderTop: `1px solid #e2e8f0`,
            }}
          >
            {/* Education column */}
            {isSectionVisible(sections.education) && (
              <div style={{ flex: 1 }}>
                <SectionHeading title={sections.education.title} accent={accent} />
                {visibleEducation.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: 7 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#2d3748', margin: '0 0 1px 0' }}>
                      {edu.degree}
                      {edu.field ? `, ${edu.field}` : ''}
                    </p>
                    <p style={{ fontSize: 9.5, color: '#718096', margin: '0 0 1px 0' }}>
                      {edu.institution}
                    </p>
                    <p style={{ fontSize: 9, color: '#a0aec0', margin: 0 }}>
                      {formatDateRange(edu.startDate, edu.endDate, lang)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Languages column */}
            {isSectionVisible(sections.languages) && (
              <div style={{ flex: 1 }}>
                <SectionHeading title={sections.languages.title} accent={accent} />
                {visibleLanguages.map((l) => (
                  <div
                    key={l.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 10, color: '#2d3748' }}>{l.name}</span>
                    <span
                      style={{
                        fontSize: 9,
                        color: accent,
                        fontWeight: 600,
                      }}
                    >
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Interests column */}
            {isSectionVisible(sections.interests) && (
              <div style={{ flex: 1 }}>
                <SectionHeading title={sections.interests.title} accent={accent} />
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {visibleInterests.map((item) => (
                    <Chip key={item.id} label={item.name} accent={accent} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
