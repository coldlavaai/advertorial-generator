'use client';

import { templates } from '@/data/templates';
import { AdvertorialTemplate } from '@/types/advertorial';

interface TemplateSelectorProps {
  onSelectTemplate: (template: AdvertorialTemplate) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="max-w-[960px] mx-auto">
      {/* Heading */}
      <div className="mb-10 fade-in">
        <span className="text-cl-muted text-sm font-mono mb-4 block">SELECT TEMPLATE</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Templates
        </h1>
        <p className="text-lg text-cl-muted max-w-2xl leading-relaxed">
          Choose a proven template optimized for conversions. Each follows best practices
          for persuasive copywriting and user engagement.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {templates.map((template, index) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`bg-cl-card border border-cl-border rounded-2xl p-6 text-left hover:border-cl-cyan/30 transition-colors group fade-in fade-in-delay-${index + 1}`}
          >
            <div className="pill mb-5">{template.category}</div>

            <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-cl-cyan transition-colors">
              {template.name}
            </h3>

            <p className="text-cl-muted text-sm mb-6 leading-relaxed">
              {template.description}
            </p>

            {/* Features */}
            <ul className="space-y-0 mb-6">
              {template.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 py-2"
                  style={{
                    borderBottom: i < template.features.length - 1 ? '1px solid #1a1a1a' : 'none',
                  }}
                >
                  <span className="text-cl-cyan text-sm mt-px">→</span>
                  <span className="text-cl-muted text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
              <span className="font-mono text-sm text-cl-cyan">Use Template</span>
              <span className="text-cl-cyan">→</span>
            </div>
          </button>
        ))}
      </div>

      <div className="section-divider" />

      {/* What You Get */}
      <div className="bg-cl-card border border-cl-border rounded-2xl p-6 mb-10 fade-in fade-in-delay-4">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2 h-2 rounded-full bg-cl-cyan" />
          <span className="font-mono text-sm text-cl-cyan uppercase tracking-wider">
            What You Get
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {[
            'Section-by-section editor',
            'Live preview mode',
            'Mobile-responsive design',
            'Export to HTML',
            'AI suggestions',
            'SEO meta tags included',
          ].map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-3 py-2.5"
              style={{ borderBottom: '1px solid #1a1a1a' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-cl-green shrink-0">
                <path d="M11.5 3.5L5.5 10L2.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-cl-muted text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
