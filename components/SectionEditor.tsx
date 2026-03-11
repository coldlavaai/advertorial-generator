'use client';

import { AdvertorialSection, SectionContent } from '@/types/advertorial';

interface SectionEditorProps {
  section: AdvertorialSection;
  content: SectionContent;
  onUpdate: (content: Partial<SectionContent>) => void;
  productName: string;
}

export default function SectionEditor({ section, content, onUpdate, productName }: SectionEditorProps) {
  const renderField = (
    label: string,
    field: keyof SectionContent,
    type: 'text' | 'textarea' | 'url' = 'text',
    placeholder?: string
  ) => {
    const value = (content[field] as string) || '';

    return (
      <div className="mb-5">
        <label className="label-mono block mb-2">
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onUpdate({ [field]: e.target.value })}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            className="textarea w-full min-h-[110px]"
            rows={4}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onUpdate({ [field]: e.target.value })}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            className="input w-full"
          />
        )}
        <p className="font-mono text-[0.65rem] mt-1.5 tracking-[0.05em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Use [Product Name] as placeholder for &ldquo;{productName}&rdquo;
        </p>
      </div>
    );
  };

  const renderBulletPoints = () => {
    const points = content.bulletPoints || [];

    return (
      <div className="mb-5">
        <label className="label-mono block mb-2">Bullet Points</label>
        <div className="space-y-2">
          {points.map((point, index) => (
            <div key={index} className="flex gap-2 items-center">
              <span className="font-mono text-[0.65rem] shrink-0" style={{ color: 'rgba(6,182,212,0.35)' }}>
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
                className="input flex-1"
              />
              <button
                onClick={() => {
                  const newPoints = points.filter((_, i) => i !== index);
                  onUpdate({ bulletPoints: newPoints });
                }}
                className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors shrink-0"
                style={{
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: 'rgba(239,68,68,0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => onUpdate({ bulletPoints: [...points, ''] })}
          className="btn-ghost text-sm mt-3"
        >
          + Add Point
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Section Header */}
      <div className="mb-6">
        <div className="pill mb-3">
          {section.type}
        </div>
        <h2
          className="text-[1.5rem] font-bold text-white"
          style={{ letterSpacing: '-0.02em' }}
        >
          Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
        </h2>
        <p className="mt-1.5 text-[0.85rem]" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Customize this section to match your product and message
        </p>
      </div>

      <div className="section-divider" />

      {/* Dynamic Fields Based on Section Type */}
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
          <div className="mt-5">
            <label className="label-mono block mb-4">Testimonials</label>
            {(content.testimonials || []).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="corner-brackets p-4 mb-3 rounded-sm"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(6,182,212,0.1)',
                }}
              >
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => {
                      const newTestimonials = [...(content.testimonials || [])];
                      newTestimonials[index] = { ...testimonial, name: e.target.value };
                      onUpdate({ testimonials: newTestimonials });
                    }}
                    placeholder="Customer Name"
                    className="input"
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
                    className="input"
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
                  className="textarea w-full mb-3"
                  rows={2}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
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
                      className="input w-16"
                    />
                    <span className="font-mono text-[0.7rem]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Stars
                    </span>
                  </label>
                  <button
                    onClick={() => {
                      const newTestimonials = (content.testimonials || []).filter((_, i) => i !== index);
                      onUpdate({ testimonials: newTestimonials });
                    }}
                    className="font-mono text-[0.7rem] tracking-[0.05em] transition-colors"
                    style={{ color: 'rgba(239,68,68,0.5)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(239,68,68,0.8)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(239,68,68,0.5)'; }}
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
              className="btn-ghost text-sm"
            >
              + Add Testimonial
            </button>
          </div>
        </div>
      )}

      {/* Pro Tips */}
      <div className="section-divider" />
      <div
        className="corner-brackets p-4 rounded-sm"
        style={{
          background: 'rgba(6,182,212,0.02)',
          border: '1px solid rgba(6,182,212,0.12)',
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: 'rgba(6,182,212,0.6)' }}>
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
              <line x1="5" y1="3" x2="5" y2="5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <circle cx="5" cy="7" r="0.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase block mb-1" style={{ color: 'rgba(6,182,212,0.5)' }}>
              Pro Tip
            </span>
            <p className="text-[0.8rem]" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
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
