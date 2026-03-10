'use client';

import { templates } from '@/data/templates';
import { AdvertorialTemplate } from '@/types/advertorial';

interface TemplateSelectorProps {
  onSelectTemplate: (template: AdvertorialTemplate) => void;
}

const categoryColors = {
  health: 'border-green-500',
  finance: 'border-blue-500',
  software: 'border-purple-500',
  ecommerce: 'border-orange-500',
};

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-all hover:scale-105 border-2 ${
              categoryColors[template.category]
            } hover:border-cyan-400`}
          >
            <div className="text-6xl mb-4 text-center">{template.thumbnail}</div>
            <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{template.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-400 capitalize">{template.category}</span>
              <span className="text-orange-400">{template.sections.length} sections</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
