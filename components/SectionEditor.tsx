'use client';

import { AdvertorialSection, SectionContent } from '@/types/advertorial';

interface SectionEditorProps {
  section: AdvertorialSection;
  content: SectionContent;
  onUpdate: (content: Partial<SectionContent>) => void;
  productName: string;
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: '#86868B',
  display: 'block',
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  background: '#0a0a0a',
  border: '1px solid #2a2a2a',
  color: '#FFFFFF',
  padding: '12px 16px',
  borderRadius: 10,
  fontSize: 15,
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: 110,
};

const hintStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  marginTop: 6,
  color: '#86868B',
};

export default function SectionEditor({ section, content, onUpdate, productName }: SectionEditorProps) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#06B6D4';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#2a2a2a';
  };

  const renderField = (
    label: string,
    field: keyof SectionContent,
    type: 'text' | 'textarea' | 'url' = 'text',
    placeholder?: string
  ) => {
    const value = (content[field] as string) || '';

    return (
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onUpdate({ [field]: e.target.value })}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            style={textareaStyle}
            rows={4}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onUpdate({ [field]: e.target.value })}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
        <p style={hintStyle}>
          Use [Product Name] as placeholder for &ldquo;{productName}&rdquo;
        </p>
      </div>
    );
  };

  const renderBulletPoints = () => {
    const points = content.bulletPoints || [];

    return (
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Bullet Points</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {points.map((point, index) => (
            <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                flexShrink: 0,
                color: '#06B6D4',
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <input
                type="text"
                value={point}
                onChange={(e) => {
                  const newPoints = [...points];
                  newPoints[index] = e.target.value;
                  onUpdate({ bulletPoints: newPoints });
                }}
                placeholder={`Point ${index + 1}`}
                style={{ ...inputStyle, flex: 1 }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                onClick={() => {
                  const newPoints = points.filter((_, i) => i !== index);
                  onUpdate({ bulletPoints: newPoints });
                }}
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  background: '#111111',
                  border: '1px solid rgba(220,38,38,0.2)',
                  color: '#dc2626',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontSize: 16,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => onUpdate({ bulletPoints: [...points, ''] })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            border: '1px solid #2a2a2a',
            background: '#111111',
            color: '#86868B',
            borderRadius: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            cursor: 'pointer',
            marginTop: 12,
          }}
        >
          + Add Point
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Section Header */}
      <div style={{ marginBottom: 24 }}>
        <span style={{
          display: 'inline-block',
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          padding: '6px 12px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#06B6D4',
          borderRadius: 6,
          marginBottom: 12,
        }}>{section.type}</span>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', margin: 0, marginBottom: 6 }}>
          Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
        </h2>
        <p style={{ marginTop: 6, fontSize: 14, color: '#86868B' }}>
          Customize this section to match your product and message
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)', margin: '24px 0' }} />

      {/* Dynamic Fields */}
      {(section.type === 'hero' || section.type === 'cta') && (
        <>
          {renderField('Headline', 'headline', 'text', 'Your compelling headline')}
          {renderField('Subheadline', 'subheadline', 'text', 'Supporting text')}
          {renderField('Body Text', 'body', 'textarea', 'Additional context or information')}
          {renderField('CTA Button Text', 'ctaText', 'text', 'Get Started')}
          {renderField('CTA URL', 'ctaUrl', 'url', '#signup')}
        </>
      )}

      {section.type === 'problem' && (
        <>
          {renderField('Headline', 'headline', 'text', 'What problem are you solving?')}
          {renderField('Body Text', 'body', 'textarea', 'Describe the pain points')}
          {renderBulletPoints()}
        </>
      )}

      {section.type === 'solution' && (
        <>
          {renderField('Headline', 'headline', 'text', 'Your solution headline')}
          {renderField('Subheadline', 'subheadline', 'text', 'Supporting message')}
          {renderField('Body Text', 'body', 'textarea', 'Describe your solution')}
        </>
      )}

      {section.type === 'features' && (
        <>
          {renderField('Headline', 'headline', 'text', 'What makes you special?')}
          {renderBulletPoints()}
        </>
      )}

      {section.type === 'guarantee' && (
        <>
          {renderField('Headline', 'headline', 'text', 'Your guarantee')}
          {renderField('Body Text', 'body', 'textarea', 'Guarantee details')}
        </>
      )}

      {section.type === 'testimonials' && (
        <div>
          {renderField('Headline', 'headline', 'text', 'Social Proof')}
          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>Testimonials</label>
            {(content.testimonials || []).map((testimonial, index) => (
              <div
                key={testimonial.id}
                style={{
                  background: '#111111',
                  border: '1px solid #2a2a2a',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => {
                      const newTestimonials = [...(content.testimonials || [])];
                      newTestimonials[index] = { ...testimonial, name: e.target.value };
                      onUpdate({ testimonials: newTestimonials });
                    }}
                    placeholder="Customer Name"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <input
                    type="text"
                    value={testimonial.role}
                    onChange={(e) => {
                      const newTestimonials = [...(content.testimonials || [])];
                      newTestimonials[index] = { ...testimonial, role: e.target.value };
                      onUpdate({ testimonials: newTestimonials });
                    }}
                    placeholder="Role/Title"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <textarea
                  value={testimonial.content}
                  onChange={(e) => {
                    const newTestimonials = [...(content.testimonials || [])];
                    newTestimonials[index] = { ...testimonial, content: e.target.value };
                    onUpdate({ testimonials: newTestimonials });
                  }}
                  placeholder="Testimonial text"
                  style={{ ...textareaStyle, minHeight: 60, marginBottom: 12 }}
                  rows={2}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={testimonial.rating || 5}
                      onChange={(e) => {
                        const newTestimonials = [...(content.testimonials || [])];
                        newTestimonials[index] = { ...testimonial, rating: parseInt(e.target.value) };
                        onUpdate({ testimonials: newTestimonials });
                      }}
                      style={{ ...inputStyle, width: 64 }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <span style={{ fontSize: 14, color: '#86868B' }}>Stars</span>
                  </label>
                  <button
                    onClick={() => {
                      const newTestimonials = (content.testimonials || []).filter((_, i) => i !== index);
                      onUpdate({ testimonials: newTestimonials });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: 14,
                      color: '#dc2626',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newTestimonials = [
                  ...(content.testimonials || []),
                  { id: `t${Date.now()}`, name: '', role: '', content: '', rating: 5 },
                ];
                onUpdate({ testimonials: newTestimonials });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                border: '1px solid #2a2a2a',
                background: '#111111',
                color: '#86868B',
                borderRadius: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              + Add Testimonial
            </button>
          </div>
        </div>
      )}

      {/* Pro Tips */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)', margin: '24px 0' }} />
      <div style={{
        background: '#111111',
        border: '1px solid #2a2a2a',
        borderRadius: 16,
        padding: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            background: '#030305',
            border: '1px solid #2a2a2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 2,
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: '#06B6D4' }}>
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
              <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <circle cx="6" cy="8.5" r="0.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#06B6D4',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: 4,
            }}>
              Pro Tip
            </span>
            <p style={{ fontSize: 14, color: '#86868B', lineHeight: 1.6, margin: 0 }}>
              {getProTip(section.type)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getProTip(sectionType: string): string {
  const tips: Record<string, string> = {
    hero: 'Lead with a strong benefit-driven headline. Focus on the transformation, not just features.',
    problem: 'Make the pain points specific and relatable. Your audience should think "Yes, that\'s exactly my problem!"',
    solution: 'Position your product as the bridge between their current pain and desired outcome.',
    features: 'Frame features as benefits. Instead of "Fast processing", say "Save 10 hours per week".',
    testimonials: 'Use specific, detailed testimonials with real names and roles. Specificity builds trust.',
    guarantee: 'A strong guarantee reduces risk and shows confidence in your product. Make it clear and simple.',
    cta: 'Create urgency without being pushy. Include what happens next after they click.',
  };
  return tips[sectionType] || 'Customize this section to match your brand voice and message.';
}
