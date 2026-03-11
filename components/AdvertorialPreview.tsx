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
          <section className="py-20 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white text-center">
            <div className="container mx-auto px-6">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {replacePlaceholders(content.headline || '')}
              </h1>
              <p className="text-2xl mb-4 text-white/90">
                {replacePlaceholders(content.subheadline || '')}
              </p>
              <p className="text-lg mb-8 text-white/80">
                {replacePlaceholders(content.body || '')}
              </p>
              <a
                href={content.ctaUrl || '#'}
                className="inline-block bg-white text-cyan-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
              >
                {content.ctaText || 'Get Started'}
              </a>
            </div>
          </section>
        );

      case 'problem':
        return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {replacePlaceholders(content.headline || '')}
              </h2>
              <p className="text-xl mb-8 text-gray-700">
                {replacePlaceholders(content.body || '')}
              </p>
              {content.bulletPoints && content.bulletPoints.length > 0 && (
                <ul className="space-y-4">
                  {content.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-lg text-gray-700">
                      <span className="text-cyan-500 text-2xl">→</span>
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
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                {replacePlaceholders(content.headline || '')}
              </h2>
              <h3 className="text-2xl text-cyan-600 mb-6 font-normal">
                {replacePlaceholders(content.subheadline || '')}
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                {replacePlaceholders(content.body || '')}
              </p>
            </div>
          </section>
        );

      case 'features':
        return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center">
                {replacePlaceholders(content.headline || '')}
              </h2>
              {content.bulletPoints && content.bulletPoints.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {content.bulletPoints.map((point, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-cyan-300 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-cyan-600 font-bold">✓</span>
                        </div>
                        <p className="text-gray-800 text-lg">{replacePlaceholders(point)}</p>
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
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
              <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">
                {content.headline || ''}
              </h2>
              {content.testimonials && content.testimonials.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {content.testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200"
                    >
                      {testimonial.rating && (
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xl">★</span>
                          ))}
                        </div>
                      )}
                      <p className="text-gray-700 italic mb-6 leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
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
          <section className="py-16 bg-cyan-50 text-center">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="inline-flex w-20 h-20 bg-cyan-500 rounded-full items-center justify-center mb-6">
                <span className="text-white text-4xl">✓</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {content.headline || ''}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                {replacePlaceholders(content.body || '')}
              </p>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section className="py-20 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white text-center">
            <div className="container mx-auto px-6">
              <h2 className="text-5xl font-bold mb-4">
                {replacePlaceholders(content.headline || '')}
              </h2>
              <p className="text-2xl mb-8 text-white/90">
                {replacePlaceholders(content.subheadline || '')}
              </p>
              <a
                href={content.ctaUrl || '#'}
                className="inline-block bg-white text-cyan-600 px-12 py-5 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors mb-6"
              >
                {content.ctaText || 'Get Started'}
              </a>
              <p className="text-white/80">
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
      <div className="bg-cl-card border border-cl-border rounded-2xl mb-4 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cl-green" />
          <span className="font-mono text-sm text-cl-muted uppercase tracking-wider">
            Preview
          </span>
        </div>

        <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-cl-bg border border-cl-border">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1 rounded-md font-mono text-xs transition-all ${
              viewMode === 'desktop'
                ? 'bg-cl-card border border-cl-cyan/20 text-cl-cyan'
                : 'text-cl-muted border border-transparent'
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-md font-mono text-xs transition-all ${
              viewMode === 'mobile'
                ? 'bg-cl-card border border-cl-cyan/20 text-cl-cyan'
                : 'text-cl-muted border border-transparent'
            }`}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div
        className={`bg-white shadow-2xl transition-all duration-300 rounded-xl overflow-hidden ${
          viewMode === 'mobile' ? 'max-w-[375px] mx-auto' : 'max-w-full'
        }`}
        style={{ border: '1px solid #1a1a1a' }}
      >
        {template.sections.map((section) => (
          <div key={section.id}>{renderSection(section.id)}</div>
        ))}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-xs tracking-widest uppercase text-gray-500">
              Powered by
            </span>
            <span className="font-mono text-sm font-bold tracking-wider text-cl-cyan">
              COLD LAVA
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
