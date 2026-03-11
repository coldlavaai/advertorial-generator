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
        <label className="label-mono block mb-2">{label}</label>
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
        <p className="font-mono text-xs mt-1.5 text-cl-muted">
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
              <span className="font-mono text-xs shrink-0 text-cl-cyan">
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
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-cl-card border border-cl-red/20 text-cl-red hover:bg-cl-red/10 transition-colors shrink-0"
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
        <div className="pill mb-3">{section.type}</div>
        <h2 className="text-2xl font-bold text-white">
          Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
        </h2>
        <p className="mt-1.5 text-sm text-cl-muted">
          Customize this section to match your product and message
        </p>
      </div>

      <div className="section-divider" />

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
          <div className="mt-5">
            <label className="label-mono block mb-4">Testimonials</label>
            {(content.testimonials || []).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-cl-card border border-cl-border rounded-2xl p-4 mb-3"
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
                    <span className="text-sm text-cl-muted">Stars</span>
                  </label>
                  <button
                    onClick={() => {
                      const newTestimonials = (content.testimonials || []).filter((_, i) => i !== index);
                      onUpdate({ testimonials: newTestimonials });
                    }}
                    className="text-sm text-cl-red hover:text-cl-red/80 transition-colors"
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
      <div className="bg-cl-card border border-cl-border rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-cl-bg border border-cl-border flex items-center justify-center shrink-0 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-cl-cyan">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
              <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <circle cx="6" cy="8.5" r="0.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <span className="font-mono text-xs text-cl-cyan uppercase tracking-wider block mb-1">
              Pro Tip
            </span>
            <p className="text-sm text-cl-muted leading-relaxed">
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
