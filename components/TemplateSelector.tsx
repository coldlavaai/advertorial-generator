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
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-shrink-0" style={{ width: '2rem', background: 'rgba(6,182,212,0.4)' }} />
          <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(6,182,212,0.5)' }}>
            Select Template
          </span>
        </div>
        <h1
          className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-white leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Templates
        </h1>
        <p className="mt-2 text-[0.95rem] max-w-2xl" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
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
            className={`corner-brackets text-left p-6 rounded-sm transition-all duration-200 group fade-in fade-in-delay-${index + 1}`}
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(6,182,212,0.15)',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)';
              e.currentTarget.style.background = 'rgba(6,182,212,0.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.15)';
              e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
            }}
          >
            {/* Category pill */}
            <div className="pill mb-5">
              {template.category}
            </div>

            {/* Template Name */}
            <h3
              className="text-white font-bold text-[1.05rem] mb-3 group-hover:text-cl-cyan transition-colors"
              style={{ letterSpacing: '-0.01em' }}
            >
              {template.name}
            </h3>

            {/* Description */}
            <p className="text-[0.85rem] mb-6" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              {template.description}
            </p>

            {/* Features — arrow list */}
            <ul className="space-y-0 mb-6">
              {template.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 py-2"
                  style={{
                    borderBottom: i < template.features.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <span className="font-mono text-[0.75rem] mt-px" style={{ color: 'rgba(6,182,212,0.4)' }}>→</span>
                  <span className="text-[0.8rem]" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-2 transition-all group-hover:gap-3">
              <span className="font-mono text-[0.75rem] tracking-[0.05em]" style={{ color: 'rgba(6,182,212,0.6)' }}>
                Use Template
              </span>
              <span className="font-mono text-[0.75rem]" style={{ color: 'rgba(6,182,212,0.4)' }}>→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Section divider */}
      <div className="section-divider" />

      {/* What You Get */}
      <div
        className="corner-brackets corner-brackets-lg p-6 rounded-sm mb-10 fade-in fade-in-delay-4"
        style={{
          background: 'rgba(6,182,212,0.02)',
          border: '1px solid rgba(6,182,212,0.15)',
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
          <span className="font-mono text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(6,182,212,0.6)' }}>
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
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ color: 'rgba(6,182,212,0.5)', flexShrink: 0 }}
              >
                <path d="M11.5 3.5L5.5 10L2.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[0.85rem]" style={{ color: 'rgba(255,255,255,0.5)' }}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
