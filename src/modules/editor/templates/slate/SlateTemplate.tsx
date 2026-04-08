'use client';

import React from 'react';

import type { TemplateProps } from '../_shared/types';
import {
  formatDate,
  formatDateRange,
  getInitials,
  isSectionVisible,
} from '../_shared/utils';

// ─── Sub-components ───────────────────────────────────────────────────────────

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p
        style={{
          fontSize: 9,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#94a3b8',
          marginBottom: 8,
          margin: '0 0 8px 0',
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function ContactRow({ icon, text }: { icon: string; text: string }) {
  if (!text) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5 }}>
      <span style={{ fontSize: 11, marginTop: 1, flexShrink: 0 }}>{icon}</span>
      <span
        style={{
          fontSize: 9.5,
          color: '#cbd5e1',
          wordBreak: 'break-word',
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function MainSection({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p
        style={{
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#475569',
          marginBottom: 6,
          paddingBottom: 3,
          borderBottom: `1.5px solid ${accentColor}`,
          margin: '0 0 8px 0',
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SlateTemplate({ data, accentColor }: TemplateProps) {
  const accent = accentColor ?? data.meta.accentColor ?? '#3b82f6';
  const lang = data.meta.language;
  const { personal, sections } = data;

  const visibleExperience = sections.experience.items.filter((i) => i.visible);
  const visibleEducation = sections.education.items.filter((i) => i.visible);
  const visibleSkills = sections.skills.items.filter((i) => i.visible);
  const visibleLanguages = sections.languages.items.filter((i) => i.visible);
  const visibleCerts = sections.certifications.items.filter((i) => i.visible);
  const visibleProjects = sections.projects.items.filter((i) => i.visible);
  const visibleVolunteer = sections.volunteer.items.filter((i) => i.visible);

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        display: 'flex',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        fontSize: 10.5,
        lineHeight: 1.5,
      }}
    >
      {/* ── Sidebar ── */}
      <div
        style={{
          width: '32%',
          backgroundColor: '#1e293b',
          padding: '28px 16px',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          {personal.photo ? (
            <img
              src={personal.photo}
              alt="Profile"
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                border: `2px solid #ffffff`,
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                border: '2px solid #ffffff',
                backgroundColor: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {getInitials(personal.firstName, personal.lastName)}
            </div>
          )}
        </div>

        {/* Name + job title */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#f1f5f9',
              margin: '0 0 3px 0',
              lineHeight: 1.2,
            }}
          >
            {personal.firstName} {personal.lastName}
          </p>
          <p style={{ fontSize: 10, color: accent, margin: 0, fontWeight: 500 }}>
            {personal.jobTitle}
          </p>
        </div>

        {/* Contact */}
        <SidebarSection title={lang === 'pl' ? 'Kontakt' : 'Contact'}>
          <ContactRow icon="✉" text={personal.email} />
          <ContactRow icon="☎" text={personal.phone} />
          <ContactRow icon="📍" text={personal.location} />
          {personal.linkedin && <ContactRow icon="🔗" text={personal.linkedin} />}
          {personal.github && <ContactRow icon="⌥" text={personal.github} />}
          {personal.website && <ContactRow icon="🌐" text={personal.website} />}
        </SidebarSection>

        {/* Skills */}
        {isSectionVisible(sections.skills) && (
          <SidebarSection title={sections.skills.title}>
            {visibleSkills.map((group) => (
              <div key={group.id} style={{ marginBottom: 8 }}>
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 4px 0',
                  }}
                >
                  {group.category}
                </p>
                {group.skills.map((skill, idx) => (
                  <div key={idx} style={{ marginBottom: 3 }}>
                    <p style={{ fontSize: 9.5, color: '#e2e8f0', margin: '0 0 2px 0' }}>
                      {skill}
                    </p>
                    <div
                      style={{
                        height: 3,
                        backgroundColor: '#334155',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: '75%',
                          backgroundColor: accent,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </SidebarSection>
        )}

        {/* Languages */}
        {isSectionVisible(sections.languages) && (
          <SidebarSection title={sections.languages.title}>
            {visibleLanguages.map((lang_item) => (
              <div
                key={lang_item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 9.5, color: '#e2e8f0' }}>{lang_item.name}</span>
                <span
                  style={{
                    fontSize: 8.5,
                    color: accent,
                    fontWeight: 600,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    padding: '1px 5px',
                    borderRadius: 3,
                  }}
                >
                  {lang_item.level}
                </span>
              </div>
            ))}
          </SidebarSection>
        )}

        {/* Certifications */}
        {isSectionVisible(sections.certifications) && (
          <SidebarSection title={sections.certifications.title}>
            {visibleCerts.map((cert) => (
              <div key={cert.id} style={{ marginBottom: 7 }}>
                <p style={{ fontSize: 9.5, color: '#e2e8f0', margin: '0 0 1px 0', fontWeight: 600 }}>
                  {cert.name}
                </p>
                <p style={{ fontSize: 9, color: '#94a3b8', margin: 0 }}>
                  {cert.issuer} · {formatDate(cert.date, lang)}
                </p>
              </div>
            ))}
          </SidebarSection>
        )}
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, padding: '28px 22px 28px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#0f172a',
              margin: '0 0 2px 0',
              lineHeight: 1.1,
            }}
          >
            {personal.firstName} {personal.lastName}
          </h1>
          <p style={{ fontSize: 12, color: accent, fontWeight: 500, margin: '0 0 8px 0' }}>
            {personal.jobTitle}
          </p>
          <div style={{ height: 2, backgroundColor: accent, borderRadius: 1 }} />
        </div>

        {/* Summary */}
        {personal.summary && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, color: '#475569', lineHeight: 1.6, margin: 0 }}>
              {personal.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {isSectionVisible(sections.experience) && (
          <MainSection title={sections.experience.title} accentColor={accent}>
            {visibleExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {exp.position}
                  </p>
                  <p style={{ fontSize: 9, color: '#475569', margin: 0, flexShrink: 0, marginLeft: 8 }}>
                    {formatDateRange(exp.startDate, exp.endDate, lang)}
                  </p>
                </div>
                <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: '0 0 3px 0' }}>
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
                {exp.description && (
                  <p style={{ fontSize: 10, color: '#475569', margin: '2px 0', lineHeight: 1.5 }}>
                    {exp.description}
                  </p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ margin: '3px 0 0 0', paddingLeft: 14 }}>
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} style={{ fontSize: 10, color: '#475569', marginBottom: 2 }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {/* Education */}
        {isSectionVisible(sections.education) && (
          <MainSection title={sections.education.title} accentColor={accent}>
            {visibleEducation.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {edu.degree}{edu.field ? ` · ${edu.field}` : ''}
                  </p>
                  <p style={{ fontSize: 9, color: '#475569', margin: 0, flexShrink: 0, marginLeft: 8 }}>
                    {formatDateRange(edu.startDate, edu.endDate, lang)}
                  </p>
                </div>
                <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: '1px 0' }}>
                  {edu.institution}
                </p>
                {edu.grade && (
                  <p style={{ fontSize: 9.5, color: '#475569', margin: 0 }}>
                    {lang === 'pl' ? 'Ocena' : 'Grade'}: {edu.grade}
                  </p>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {isSectionVisible(sections.projects) && (
          <MainSection title={sections.projects.title} accentColor={accent}>
            {visibleProjects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {proj.name}
                  </p>
                  {(proj.startDate || proj.endDate) && (
                    <p style={{ fontSize: 9, color: '#475569', margin: 0, flexShrink: 0, marginLeft: 8 }}>
                      {proj.startDate && proj.endDate
                        ? formatDateRange(proj.startDate, proj.endDate, lang)
                        : formatDate(proj.startDate ?? proj.endDate, lang)}
                    </p>
                  )}
                </div>
                <p style={{ fontSize: 10, color: '#475569', margin: '2px 0', lineHeight: 1.5 }}>
                  {proj.description}
                </p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p style={{ fontSize: 9.5, color: accent, margin: 0 }}>
                    {proj.technologies.join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {/* Volunteer */}
        {isSectionVisible(sections.volunteer) && (
          <MainSection title={sections.volunteer.title} accentColor={accent}>
            {visibleVolunteer.map((vol) => (
              <div key={vol.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {vol.role}
                  </p>
                  <p style={{ fontSize: 9, color: '#475569', margin: 0, flexShrink: 0, marginLeft: 8 }}>
                    {formatDateRange(vol.startDate, vol.endDate, lang)}
                  </p>
                </div>
                <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: '1px 0' }}>
                  {vol.organization}
                </p>
                {vol.description && (
                  <p style={{ fontSize: 10, color: '#475569', margin: '2px 0', lineHeight: 1.5 }}>
                    {vol.description}
                  </p>
                )}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}
