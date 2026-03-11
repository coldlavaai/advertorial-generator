'use client';

import { templates } from '@/data/templates';
import { AdvertorialTemplate } from '@/types/advertorial';

interface TemplateSelectorProps {
  onSelectTemplate: (template: AdvertorialTemplate) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Heading */}
      <div className="mb-8 fade-in">
        <h1 className="text-4xl font-bold text-white mb-2">Templates</h1>
        <p className="text-cl-muted">
          Choose a proven template optimized for conversions. Each template follows best practices
          for persuasive copywriting and user engagement.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {templates.map((template, index) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`p-6 rounded-xl border border-cl-border bg-cl-card hover:border-cl-cyan hover:bg-cl-card/80 transition-all text-left group fade-in fade-in-delay-${index + 1}`}
          >
            {/* Template Icon/Category */}
            <div className="inline-block px-3 py-1 rounded-full bg-cl-cyan/10 border border-cl-cyan/20 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cl-cyan">
                {template.category}
              </span>
            </div>

            {/* Template Name */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cl-cyan transition-colors">
              {template.name}
            </h3>

            {/* Template Description */}
            <p className="text-cl-muted text-sm leading-relaxed mb-6">
              {template.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 mb-6">
              {template.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-cl-muted">
                  <span className="text-cl-cyan mt-1">→</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-2 text-cl-cyan font-medium text-sm group-hover:gap-3 transition-all">
              <span>Use Template</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Info Section */}
      <div className="p-6 rounded-xl border border-cl-cyan/30 bg-cl-cyan/5 fade-in fade-in-delay-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-cl-cyan" />
          <h3 className="font-mono text-sm uppercase tracking-wider text-cl-cyan">
            What You Get
          </h3>
        </div>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Section-by-section editor',
            'Live preview mode',
            'Mobile-responsive design',
            'Export to HTML',
            'AI suggestions',
            'SEO meta tags included',
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-cl-muted">
              <svg className="w-4 h-4 text-cl-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
