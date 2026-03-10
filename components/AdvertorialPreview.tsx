'use client';

import { AdvertorialTemplate, SectionContent, AdvertorialSection } from '@/types/advertorial';

interface AdvertorialPreviewProps {
  template: AdvertorialTemplate;
  customizations: {
    [sectionId: string]: Partial<SectionContent>;
  };
  metadata: {
    title: string;
    description: string;
    productName: string;
  };
}

export default function AdvertorialPreview({
  template,
  customizations,
  metadata,
}: AdvertorialPreviewProps) {
  const getSectionContent = (section: AdvertorialSection): SectionContent => {
    return {
      ...section.content,
      ...customizations[section.id],
    } as SectionContent;
  };

  const renderSection = (section: AdvertorialSection) => {
    const content = getSectionContent(section);

    switch (section.type) {
      case 'hero':
        return (
          <section className="bg-gradient-to-br from-cyan-600 to-blue-700 py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {content.headline}
              </h1>
              <p className="text-2xl text-cyan-100 mb-8">{content.subheadline}</p>
              <a
                href={content.ctaUrl}
                className="inline-block px-10 py-4 bg-orange-500 text-white text-xl font-bold rounded-lg hover:bg-orange-600 transition-colors"
              >
                {content.ctaText}
              </a>
            </div>
          </section>
        );

      case 'problem':
        return (
          <section className="bg-gray-800 py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6 text-center">
                {content.headline}
              </h2>
              {content.body && (
                <p className="text-xl text-gray-300 mb-8 text-center">{content.body}</p>
              )}
              {content.bulletPoints && content.bulletPoints.length > 0 && (
                <ul className="space-y-4">
                  {content.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 text-2xl mr-4">✗</span>
                      <span className="text-lg text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );

      case 'solution':
        return (
          <section className="bg-gradient-to-br from-cyan-500 to-blue-600 py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{content.headline}</h2>
              {content.subheadline && (
                <p className="text-2xl text-cyan-100 mb-6">{content.subheadline}</p>
              )}
              {content.body && <p className="text-xl text-white/90">{content.body}</p>}
            </div>
          </section>
        );

      case 'features':
        return (
          <section className="bg-gray-900 py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-12 text-center">
                {content.headline}
              </h2>
              {content.bulletPoints && content.bulletPoints.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.bulletPoints.map((point, index) => (
                    <div key={index} className="flex items-start bg-gray-800 p-6 rounded-lg">
                      <span className="text-cyan-400 text-2xl mr-4">✓</span>
                      <span className="text-lg text-gray-200">{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section className="bg-gray-800 py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-12 text-center">
                {content.headline}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.testimonials?.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-gray-700 p-6 rounded-lg border-l-4 border-cyan-400"
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-200 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'guarantee':
        return (
          <section className="bg-orange-500 py-12 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">{content.headline}</h2>
              <p className="text-xl text-white/90">{content.body}</p>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section className="bg-gradient-to-br from-orange-500 to-red-600 py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-bold text-white mb-4">{content.headline}</h2>
              {content.subheadline && (
                <p className="text-2xl text-orange-100 mb-8">{content.subheadline}</p>
              )}
              <a
                href={content.ctaUrl}
                className="inline-block px-12 py-5 bg-white text-orange-600 text-2xl font-bold rounded-lg hover:bg-gray-100 transition-colors mb-6"
              >
                {content.ctaText}
              </a>
              {content.body && (
                <p className="text-white/90 text-sm">{content.body}</p>
              )}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
      <div className="bg-gray-900 text-white text-center py-4 px-6">
        <h3 className="text-lg font-bold">Preview Mode</h3>
        <p className="text-sm text-gray-400">This is how your landing page will look</p>
      </div>
      <div className="bg-gray-900">
        {template.sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div key={section.id}>{renderSection(section)}</div>
          ))}
      </div>
    </div>
  );
}
