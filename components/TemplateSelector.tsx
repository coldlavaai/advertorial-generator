'use client';

import { templates } from '@/data/templates';
import { AdvertorialTemplate } from '@/types/advertorial';

interface TemplateSelectorProps {
  onSelectTemplate: (template: AdvertorialTemplate) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Label */}
      <div className="flex items-center gap-8 mb-6 fade-in">
        <div className="w-8 h-px bg-cyan-500/40" />
        <span className="section-label">Select Template</span>
      </div>

      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight fade-in fade-in-delay-1">
        Choose Your <span className="font-light text-white/35">Template</span>
      </h2>
      
      <p className="text-lg text-white/60 mb-12 max-w-2xl fade-in fade-in-delay-2">
        Select a proven template optimized for conversions. Each template follows best practices
        for persuasive copywriting and user engagement.
      </p>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {templates.map((template, index) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`corner-brackets card p-8 text-left hover:bg-cyan-500/5 hover:border-cyan-500/40 transition-all duration-300 group fade-in`}
            style={{ animationDelay: `${(index + 3) * 0.1}s`, opacity: 0 }}
          >
            {/* Template Icon/Category */}
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400/70">
                {template.category}
              </span>
            </div>

            {/* Template Name */}
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {template.name}
            </h3>

            {/* Template Description */}
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {template.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 mb-6">
              {template.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-cyan-400/60 mt-1">→</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
              <span>Use Template</span>
              <span className="text-cyan-400/60">→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Info Section */}
      <div className="section-divider" />

      <div className="corner-brackets-lg card-surface p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
          <h3 className="font-mono text-sm uppercase tracking-wider text-cyan-400/60">
            What You Get
          </h3>
        </div>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Section-by-section editor',
            'Live preview mode',
            'Mobile-responsive design',
            'Export to HTML',
            'Save & load projects',
            'SEO meta tags included',
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-white/70">
              <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
