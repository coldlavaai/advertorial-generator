'use client';

import { AdvertorialProject } from '@/types/advertorial';
import { useState } from 'react';

interface AdvertorialPreviewProps {
  project: AdvertorialProject;
}

export default function AdvertorialPreview({ project }: AdvertorialPreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const { template, customizations, metadata } = project;

  const replacePlaceholders = (text: string) => {
    return text
      .replace(/\[Product Name\]/g, metadata.productName)
      .replace(/\[Product\]/g, metadata.productName);
  };

  const renderSection = (sectionId: string) => {
    const section = template.sections.find((s) => s.id === sectionId);
    if (!section) return null;

    const content = { ...section.content, ...customizations[sectionId] };

    switch (section.type) {
      case 'hero':
        return (
          <section style={{
            padding: '80px 24px',
            background: 'linear-gradient(135deg, #06B6D4, #0891b2)',
            color: '#FFFFFF',
            textAlign: 'center',
          }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24, lineHeight: 1.1 }}>
                {replacePlaceholders(content.headline || '')}
              </h1>
              <p style={{ fontSize: 22, marginBottom: 16, opacity: 0.9 }}>
                {replacePlaceholders(content.subheadline || '')}
              </p>
              <p style={{ fontSize: 18, marginBottom: 32, opacity: 0.8 }}>
                {replacePlaceholders(content.body || '')}
              </p>
              <a
                href={content.ctaUrl || '#'}
                style={{
                  display: 'inline-block',
                  background: '#FFFFFF',
                  color: '#0891b2',
                  padding: '16px 40px',
                  borderRadius: 10,
                  fontSize: 18,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {content.ctaText || 'Get Started'}
              </a>
            </div>
          </section>
        );

      case 'problem':
        return (
          <section style={{ padding: '64px 24px', background: '#f8f9fa' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, color: '#111827' }}>
                {replacePlaceholders(content.headline || '')}
              </h2>
              <p style={{ fontSize: 20, marginBottom: 32, color: '#4b5563', lineHeight: 1.6 }}>
                {replacePlaceholders(content.body || '')}
              </p>
              {content.bulletPoints && content.bulletPoints.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {content.bulletPoints.map((point, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      fontSize: 18,
                      color: '#4b5563',
                      padding: '8px 0',
                    }}>
                      <span style={{ color: '#06B6D4', fontSize: 22 }}>→</span>
                      <span>{replacePlaceholders(point)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );

      case 'solution':
        return (
          <section style={{ padding: '64px 24px', background: '#FFFFFF' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, color: '#111827' }}>
                {replacePlaceholders(content.headline || '')}
              </h2>
              <h3 style={{ fontSize: 24, color: '#0891b2', marginBottom: 24, fontWeight: 400 }}>
                {replacePlaceholders(content.subheadline || '')}
              </h3>
              <p style={{ fontSize: 20, color: '#4b5563', lineHeight: 1.7 }}>
                {replacePlaceholders(content.body || '')}
              </p>
            </div>
          </section>
        );

      case 'features':
        return (
          <section style={{ padding: '64px 24px', background: '#f8f9fa' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 40, color: '#111827', textAlign: 'center' }}>
                {replacePlaceholders(content.headline || '')}
              </h2>
              {content.bulletPoints && content.bulletPoints.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  {content.bulletPoints.map((point, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#FFFFFF',
                        padding: 24,
                        borderRadius: 10,
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          background: '#ecfeff',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}>
                          <span style={{ color: '#0891b2', fontWeight: 700 }}>✓</span>
                        </div>
                        <p style={{ color: '#374151', fontSize: 17, margin: 0, lineHeight: 1.5 }}>{replacePlaceholders(point)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section style={{ padding: '64px 24px', background: '#FFFFFF' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 48, color: '#111827', textAlign: 'center' }}>
                {content.headline || ''}
              </h2>
              {content.testimonials && content.testimonials.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                  {content.testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      style={{
                        background: '#f8f9fa',
                        padding: 32,
                        borderRadius: 10,
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      {testimonial.rating && (
                        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i} style={{ color: '#f59e0b', fontSize: 20 }}>★</span>
                          ))}
                        </div>
                      )}
                      <p style={{ color: '#4b5563', fontStyle: 'italic', marginBottom: 24, lineHeight: 1.6, fontSize: 16 }}>
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 16 }}>
                        <p style={{ fontWeight: 700, color: '#111827', margin: 0, fontSize: 15 }}>{testimonial.name}</p>
                        <p style={{ fontSize: 14, color: '#6b7280', margin: '4px 0 0' }}>{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'guarantee':
        return (
          <section style={{ padding: '64px 24px', background: '#ecfeff', textAlign: 'center' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{
                display: 'inline-flex',
                width: 80,
                height: 80,
                background: '#06B6D4',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}>
                <span style={{ color: '#FFFFFF', fontSize: 40 }}>✓</span>
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, color: '#111827' }}>
                {content.headline || ''}
              </h2>
              <p style={{ fontSize: 20, color: '#4b5563', lineHeight: 1.6 }}>
                {replacePlaceholders(content.body || '')}
              </p>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section style={{
            padding: '80px 24px',
            background: 'linear-gradient(135deg, #06B6D4, #0891b2)',
            color: '#FFFFFF',
            textAlign: 'center',
          }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16 }}>
                {replacePlaceholders(content.headline || '')}
              </h2>
              <p style={{ fontSize: 22, marginBottom: 32, opacity: 0.9 }}>
                {replacePlaceholders(content.subheadline || '')}
              </p>
              <a
                href={content.ctaUrl || '#'}
                style={{
                  display: 'inline-block',
                  background: '#FFFFFF',
                  color: '#0891b2',
                  padding: '20px 48px',
                  borderRadius: 10,
                  fontSize: 20,
                  fontWeight: 700,
                  textDecoration: 'none',
                  marginBottom: 24,
                }}
              >
                {content.ctaText || 'Get Started'}
              </a>
              <p style={{ opacity: 0.8, fontSize: 16 }}>
                {replacePlaceholders(content.body || '')}
              </p>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Preview Toolbar */}
      <div style={{
        background: '#111111',
        border: '1px solid #2a2a2a',
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: '#86868B',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Preview
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: 2,
          borderRadius: 8,
          background: '#030305',
          border: '1px solid #2a2a2a',
        }}>
          <button
            onClick={() => setViewMode('desktop')}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              border: viewMode === 'desktop' ? '1px solid rgba(6,182,212,0.2)' : '1px solid transparent',
              background: viewMode === 'desktop' ? '#111111' : 'transparent',
              color: viewMode === 'desktop' ? '#06B6D4' : '#86868B',
              cursor: 'pointer',
            }}
          >
            Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              border: viewMode === 'mobile' ? '1px solid rgba(6,182,212,0.2)' : '1px solid transparent',
              background: viewMode === 'mobile' ? '#111111' : 'transparent',
              color: viewMode === 'mobile' ? '#06B6D4' : '#86868B',
              cursor: 'pointer',
            }}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid #2a2a2a',
          maxWidth: viewMode === 'mobile' ? 375 : '100%',
          margin: viewMode === 'mobile' ? '0 auto' : undefined,
          transition: 'max-width 0.3s ease',
        }}
      >
        {template.sections.map((section) => (
          <div key={section.id}>{renderSection(section.id)}</div>
        ))}

        {/* Footer */}
        <footer style={{
          background: '#111827',
          color: '#FFFFFF',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}>
              Powered by
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#06B6D4',
            }}>
              COLD LAVA
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
