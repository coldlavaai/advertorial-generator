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
      <div className="mb-6">
        <label className="block font-mono text-xs uppercase tracking-wider text-cyan-400/60 mb-2">
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onUpdate({ [field]: e.target.value })}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            className="textarea w-full min-h-[120px]"
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
        <p className="text-xs text-white/30 mt-1">
          Use [Product Name] as a placeholder for "{productName}"
        </p>
      </div>
    );
  };

  const renderBulletPoints = () => {
    const points = content.bulletPoints || [];

    return (
      <div className="mb-6">
        <label className="block font-mono text-xs uppercase tracking-wider text-cyan-400/60 mb-2">
          Bullet Points
        </label>
        <div className="space-y-2">
          {points.map((point, index) => (
            <div key={index} className="flex gap-2">
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
                className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            onUpdate({ bulletPoints: [...points, ''] });
          }}
          className="btn-ghost text-sm mt-2"
        >
          + Add Point
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400/70">
            {section.type}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white">
          Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
        </h2>
        <p className="text-white/50 mt-2">
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
          <div className="mt-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-cyan-400/60 mb-4">
              Testimonials
            </label>
            {(content.testimonials || []).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="corner-brackets bg-white/5 border border-cyan-500/10 p-4 mb-4 rounded-lg"
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
                  <label className="flex items-center gap-2 text-sm text-white/60">
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
                    <span>Star Rating</span>
                  </label>
                  <button
                    onClick={() => {
                      const newTestimonials = (content.testimonials || []).filter((_, i) => i !== index);
                      onUpdate({ testimonials: newTestimonials });
                    }}
                    className="text-red-400 hover:text-red-300 text-sm"
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
                  {
                    id: `t${Date.now()}`,
                    name: '',
                    role: '',
                    content: '',
                    rating: 5,
                  },
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
      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-cyan-400 text-xs">💡</span>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400/80 mb-1">
              Pro Tip
            </h4>
            <p className="text-sm text-white/60">
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
