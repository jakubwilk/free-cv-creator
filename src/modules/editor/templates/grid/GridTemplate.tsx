'use client';

import React from 'react';

import type { TemplateProps } from '../_shared/types';
import {
  formatDate,
  formatDateRange,
  isSectionVisible,
} from '../_shared/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const NAVY = '#1a3a5c';
const MUTED = '#64748b';
const TEXT = '#1e293b';

// ─── Sub-components ───────────────────────────────────────────────────────────

function LeftSectionHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <p
      style={{
        fontSize: 9.5,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: NAVY,
        margin: '0 0 8px 0',
        paddingBottom: 3,
        borderBottom: `2px solid ${accent}`,
      }}
    >
      {title}
    </p>
  );
}

function RightSectionHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <p
      style={{
        fontSize: 9,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: NAVY,
        margin: '0 0 6px 0',
        paddingBottom: 3,
        borderBottom: `1.5px solid ${accent}`,
      }}
    >
      {title}
    </p>
  );
}

function MetricBadge({ text, accent }: { text: string; accent: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 8.5,
        fontWeight: 600,
        padding: '1px 7px',
        borderRadius: 3,
        backgroundColor: '#eff6ff',
        color: '#1e40af',
        border: `1px solid ${accent}30`,
        marginRight: 4,
        marginTop: 3,
      }}
    >
      {text}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GridTemplate({ data, accentColor }: TemplateProps) {
  const accent = accentColor ?? data.meta.accentColor ?? '#0ea5e9';
  const lang = data.meta.language;
  const { personal, sections } = data;

  const visibleExperience = sections.experience.items.filter((i) => i.visible);
  const visibleProjects = sections.projects.items.filter((i) => i.visible);
  const visibleSkills = sections.skills.items.filter((i) => i.visible);
  const visibleEducation = sections.education.items.filter((i) => i.visible);
  const visibleCerts = sections.certifications.items.filter((i) => i.visible);
  const visibleLanguages = sections.languages.items.filter((i) => i.visible);
  const visibleCourses = sections.courses.items.filter((i) => i.visible);

  const contactItems = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.website,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        backgroundColor: '#ffffff',
        fontFamily: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
        color: TEXT,
        fontSize: 10,
        lineHeight: 1.5,
      }}
    >
      {/* ── Full-width header ── */}
      <div
        style={{
          padding: '20px 24px 16px',
          borderBottom: `3px solid ${NAVY}`,
          backgroundColor: '#f8fafc',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: NAVY,
                margin: '0 0 2px 0',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {personal.firstName} {personal.lastName}
            </h1>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: accent,
                margin: 0,
              }}
            >
              {personal.jobTitle}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 9, color: MUTED, margin: 0, lineHeight: 1.6 }}>
              {contactItems}
            </p>
          </div>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div style={{ display: 'flex', padding: '16px 0 0 0' }}>
        {/* Left column — 60% */}
        <div style={{ width: '60%', padding: '0 14px 20px 24px', borderRight: '1px solid #e2e8f0' }}>
          {/* Summary */}
          {personal.summary && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 10, color: MUTED, margin: 0, lineHeight: 1.6 }}>
                {personal.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {isSectionVisible(sections.experience) && (
            <div style={{ marginBottom: 16 }}>
              <LeftSectionHeading title={sections.experience.title} accent={accent} />
              {visibleExperience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 2 }}>
                    <span
                      style={{
                        color: accent,
                        fontSize: 10,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ▶
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <p style={{ fontSize: 10.5, fontWeight: 700, color: TEXT, margin: 0 }}>
                          {exp.position}
                        </p>
                        <p style={{ fontSize: 8.5, color: MUTED, margin: 0, flexShrink: 0, marginLeft: 6 }}>
                          {formatDateRange(exp.startDate, exp.endDate, lang)}
                        </p>
                      </div>
                      <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: '1px 0 2px 0' }}>
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ''}
                      </p>
                      {exp.description && (
                        <p style={{ fontSize: 9.5, color: MUTED, margin: '2px 0', lineHeight: 1.5 }}>
                          {exp.description}
                        </p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
                          {exp.highlights.map((h, i) => (
                            <MetricBadge key={i} text={h} accent={accent} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {isSectionVisible(sections.projects) && (
            <div style={{ marginBottom: 16 }}>
              <LeftSectionHeading title={sections.projects.title} accent={accent} />
              {visibleProjects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ color: accent, fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                      ▶
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <p style={{ fontSize: 10.5, fontWeight: 700, color: TEXT, margin: 0 }}>
                          {proj.name}
                        </p>
                        {(proj.startDate || proj.endDate) && (
                          <p style={{ fontSize: 8.5, color: MUTED, margin: 0, flexShrink: 0, marginLeft: 6 }}>
                            {proj.startDate && proj.endDate
                              ? formatDateRange(proj.startDate, proj.endDate, lang)
                              : formatDate(proj.startDate ?? proj.endDate, lang)}
                          </p>
                        )}
                      </div>
                      <p style={{ fontSize: 9.5, color: MUTED, margin: '2px 0', lineHeight: 1.5 }}>
                        {proj.description}
                      </p>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
                          {proj.technologies.map((tech, i) => (
                            <MetricBadge key={i} text={tech} accent={accent} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column — 40% */}
        <div style={{ width: '40%', padding: '0 20px 20px 16px' }}>
          {/* Skills */}
          {isSectionVisible(sections.skills) && (
            <div style={{ marginBottom: 14 }}>
              <RightSectionHeading title={sections.skills.title} accent={accent} />
              {visibleSkills.map((group) => (
                <div key={group.id} style={{ marginBottom: 7 }}>
                  <p
                    style={{
                      fontSize: 9.5,
                      fontWeight: 600,
                      color: NAVY,
                      margin: '0 0 3px 0',
                    }}
                  >
                    {group.category}
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 12 }}>
                    {group.skills.map((skill, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 9.5,
                          color: MUTED,
                          marginBottom: 2,
                          listStyle: 'none',
                          paddingLeft: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <span style={{ color: accent, fontSize: 7, lineHeight: 1 }}>■</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {isSectionVisible(sections.education) && (
            <div style={{ marginBottom: 14 }}>
              <RightSectionHeading title={sections.education.title} accent={accent} />
              {visibleEducation.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 8 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: TEXT, margin: '0 0 1px 0' }}>
                    {edu.degree}
                    {edu.field ? ` · ${edu.field}` : ''}
                  </p>
                  <p style={{ fontSize: 9.5, color: accent, fontWeight: 500, margin: '0 0 1px 0' }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>
                    {formatDateRange(edu.startDate, edu.endDate, lang)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {isSectionVisible(sections.certifications) && (
            <div style={{ marginBottom: 14 }}>
              <RightSectionHeading title={sections.certifications.title} accent={accent} />
              {visibleCerts.map((cert) => (
                <div key={cert.id} style={{ marginBottom: 6 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: TEXT, margin: '0 0 1px 0' }}>
                    {cert.name}
                  </p>
                  <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>
                    {cert.issuer} · {formatDate(cert.date, lang)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {isSectionVisible(sections.languages) && (
            <div style={{ marginBottom: 14 }}>
              <RightSectionHeading title={sections.languages.title} accent={accent} />
              {visibleLanguages.map((l) => (
                <div
                  key={l.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4,
                    padding: '2px 0',
                  }}
                >
                  <span style={{ fontSize: 9.5, color: TEXT }}>{l.name}</span>
                  <span
                    style={{
                      fontSize: 8.5,
                      color: '#1e40af',
                      fontWeight: 600,
                      backgroundColor: '#eff6ff',
                      padding: '1px 6px',
                      borderRadius: 3,
                    }}
                  >
                    {l.level}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Courses */}
          {isSectionVisible(sections.courses) && (
            <div style={{ marginBottom: 14 }}>
              <RightSectionHeading title={sections.courses.title} accent={accent} />
              {visibleCourses.map((course) => (
                <div key={course.id} style={{ marginBottom: 5 }}>
                  <p style={{ fontSize: 9.5, fontWeight: 600, color: TEXT, margin: '0 0 1px 0' }}>
                    {course.name}
                  </p>
                  <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>
                    {course.platform}
                    {course.date ? ` · ${formatDate(course.date, lang)}` : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
