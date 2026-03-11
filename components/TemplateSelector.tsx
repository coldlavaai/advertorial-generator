'use client';

import { templates } from '@/data/templates';
import { AdvertorialTemplate } from '@/types/advertorial';

interface TemplateSelectorProps {
  onSelectTemplate: (template: AdvertorialTemplate) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div style={{ marginBottom: 40 }}>
        <p style={{ color: '#86868B', fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 16 }}>SELECT TEMPLATE</p>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Templates</h1>
        <p style={{ fontSize: 18, color: '#86868B', maxWidth: 600, lineHeight: 1.6 }}>
          Choose a proven template optimized for conversions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            style={{
              background: '#111111',
              border: '1px solid #2a2a2a',
              borderRadius: 16,
              padding: 24,
              textAlign: 'left' as const,
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#06B6D4')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
          >
            <span style={{
              display: 'inline-block',
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              padding: '6px 12px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: '#06B6D4',
              borderRadius: 6,
              marginBottom: 16,
            }}>
              {template.category}
            </span>

            <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>
              {template.name}
            </h3>

            <p style={{ color: '#86868B', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              {template.description}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 20 }}>
              {template.features.map((feature: string, i: number) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: i < template.features.length - 1 ? '1px solid #1a1a1a' : 'none',
                }}>
                  <span style={{ color: '#06B6D4', fontSize: 14 }}>→</span>
                  <span style={{ color: '#a1a1a6', fontSize: 14, lineHeight: 1.5 }}>{feature}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#06B6D4' }}>Use Template</span>
              <span style={{ color: '#06B6D4' }}>→</span>
            </div>
          </button>
        ))}
      </div>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.15), transparent)', margin: '32px 0' }} />

      <div style={{
        background: '#111111',
        border: '1px solid #2a2a2a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 40,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#06B6D4', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
            What You Get
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {[
            'Section-by-section editor',
            'Live preview mode',
            'Mobile-responsive design',
            'Export to HTML',
            'AI suggestions',
            'SEO meta tags included',
          ].map((feature, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 0',
              borderBottom: '1px solid #1a1a1a',
            }}>
              <span style={{ color: '#22c55e', fontSize: 14 }}>✓</span>
              <span style={{ color: '#86868B', fontSize: 14 }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
