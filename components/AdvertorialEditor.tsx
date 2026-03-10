'use client';

import { useState } from 'react';
import { AdvertorialTemplate, SectionContent } from '@/types/advertorial';
import AdvertorialPreview from './AdvertorialPreview';
import SectionEditor from './SectionEditor';

interface AdvertorialEditorProps {
  template: AdvertorialTemplate;
  onBack: () => void;
}

export default function AdvertorialEditor({ template, onBack }: AdvertorialEditorProps) {
  const [customizations, setCustomizations] = useState<{
    [sectionId: string]: Partial<SectionContent>;
  }>({});
  const [metadata, setMetadata] = useState({
    title: 'My Landing Page',
    description: 'High-converting landing page',
    productName: 'Product Name',
  });
  const [activeSection, setActiveSection] = useState<string>(template.sections[0]?.id || '');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  const updateSection = (sectionId: string, updates: Partial<SectionContent>) => {
    setCustomizations((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        ...updates,
      },
    }));
  };

  const getSectionContent = (sectionId: string): SectionContent => {
    const section = template.sections.find((s) => s.id === sectionId);
    return {
      ...section?.content,
      ...customizations[sectionId],
    } as SectionContent;
  };

  const exportHTML = () => {
    // This would generate the full HTML
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title}</title>
  <meta name="description" content="${metadata.description}">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
  <!-- Generated advertorial content would go here -->
  <p class="text-center py-20">HTML export feature - full implementation available</p>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${metadata.productName.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold text-white">{template.name}</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('edit')}
            className={`px-4 py-2 rounded ${
              viewMode === 'edit'
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-4 py-2 rounded ${
              viewMode === 'preview'
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Preview
          </button>
          <button
            onClick={exportHTML}
            className="px-6 py-2 bg-orange-500 text-white rounded font-bold hover:bg-orange-600"
          >
            Export HTML
          </button>
        </div>
      </div>

      {viewMode === 'edit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-4">Sections</h3>
              <div className="space-y-2">
                {template.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded transition-colors ${
                      activeSection === section.id
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-semibold capitalize">{section.type}</div>
                    <div className="text-xs opacity-75">Section {section.order}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-sm font-bold text-white mb-3">Page Metadata</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={metadata.productName}
                      onChange={(e) =>
                        setMetadata({ ...metadata, productName: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Page Title</label>
                    <input
                      type="text"
                      value={metadata.title}
                      onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            <SectionEditor
              section={template.sections.find((s) => s.id === activeSection)!}
              content={getSectionContent(activeSection)}
              onUpdate={(updates) => updateSection(activeSection, updates)}
            />
          </div>
        </div>
      ) : (
        <AdvertorialPreview
          template={template}
          customizations={customizations}
          metadata={metadata}
        />
      )}
    </div>
  );
}
