'use client';

import { AdvertorialSection, SectionContent } from '@/types/advertorial';

interface SectionEditorProps {
  section: AdvertorialSection;
  content: SectionContent;
  onUpdate: (updates: Partial<SectionContent>) => void;
}

export default function SectionEditor({ section, content, onUpdate }: SectionEditorProps) {
  const updateBulletPoint = (index: number, value: string) => {
    const newBulletPoints = [...(content.bulletPoints || [])];
    newBulletPoints[index] = value;
    onUpdate({ bulletPoints: newBulletPoints });
  };

  const addBulletPoint = () => {
    onUpdate({
      bulletPoints: [...(content.bulletPoints || []), 'New bullet point'],
    });
  };

  const removeBulletPoint = (index: number) => {
    const newBulletPoints = content.bulletPoints?.filter((_, i) => i !== index);
    onUpdate({ bulletPoints: newBulletPoints });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4 capitalize">
        Edit {section.type} Section
      </h3>

      <div className="space-y-4">
        {/* Headline */}
        {(section.type === 'hero' ||
          section.type === 'problem' ||
          section.type === 'solution' ||
          section.type === 'features' ||
          section.type === 'testimonials' ||
          section.type === 'guarantee' ||
          section.type === 'cta') && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Headline
            </label>
            <input
              type="text"
              value={content.headline || ''}
              onChange={(e) => onUpdate({ headline: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none text-lg"
              placeholder="Enter headline..."
            />
          </div>
        )}

        {/* Subheadline */}
        {(section.type === 'hero' || section.type === 'solution' || section.type === 'cta') && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Subheadline
            </label>
            <input
              type="text"
              value={content.subheadline || ''}
              onChange={(e) => onUpdate({ subheadline: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
              placeholder="Enter subheadline..."
            />
          </div>
        )}

        {/* Body Text */}
        {(section.type === 'problem' ||
          section.type === 'solution' ||
          section.type === 'guarantee' ||
          section.type === 'cta') && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Body Text</label>
            <textarea
              value={content.body || ''}
              onChange={(e) => onUpdate({ body: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
              placeholder="Enter body text..."
            />
          </div>
        )}

        {/* Bullet Points */}
        {(section.type === 'problem' || section.type === 'features') && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Bullet Points
            </label>
            <div className="space-y-2">
              {content.bulletPoints?.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updateBulletPoint(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    onClick={() => removeBulletPoint(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={addBulletPoint}
                className="w-full px-4 py-2 bg-gray-700 text-cyan-400 rounded border border-cyan-600 hover:bg-gray-600"
              >
                + Add Bullet Point
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        {(section.type === 'hero' || section.type === 'cta') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                CTA Button Text
              </label>
              <input
                type="text"
                value={content.ctaText || ''}
                onChange={(e) => onUpdate({ ctaText: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
                placeholder="Get Started"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">CTA URL</label>
              <input
                type="text"
                value={content.ctaUrl || ''}
                onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
                placeholder="#signup"
              />
            </div>
          </div>
        )}

        {/* Testimonials */}
        {section.type === 'testimonials' && content.testimonials && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Testimonials
            </label>
            <div className="space-y-4">
              {content.testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="bg-gray-700 rounded p-4">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => {
                        const newTestimonials = [...content.testimonials!];
                        newTestimonials[index] = {
                          ...testimonial,
                          name: e.target.value,
                        };
                        onUpdate({ testimonials: newTestimonials });
                      }}
                      placeholder="Name"
                      className="px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => {
                        const newTestimonials = [...content.testimonials!];
                        newTestimonials[index] = {
                          ...testimonial,
                          role: e.target.value,
                        };
                        onUpdate({ testimonials: newTestimonials });
                      }}
                      placeholder="Role"
                      className="px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={testimonial.content}
                    onChange={(e) => {
                      const newTestimonials = [...content.testimonials!];
                      newTestimonials[index] = {
                        ...testimonial,
                        content: e.target.value,
                      };
                      onUpdate({ testimonials: newTestimonials });
                    }}
                    rows={2}
                    placeholder="Testimonial content"
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
