'use client';

import { useState, useEffect } from 'react';
import { AdvertorialTemplate, AdvertorialProject, SectionContent } from '@/types/advertorial';
import SectionEditor from './SectionEditor';
import AdvertorialPreview from './AdvertorialPreview';

interface AdvertorialEditorProps {
  template: AdvertorialTemplate;
  onBack: () => void;
}

export default function AdvertorialEditor({ template, onBack }: AdvertorialEditorProps) {
  const [project, setProject] = useState<AdvertorialProject>({
    template,
    customizations: {},
    metadata: {
      title: '',
      description: '',
      productName: '[Your Product]',
      keywords: [],
      author: '',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [activeSection, setActiveSection] = useState(template.sections[0]?.id || '');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('advertorial_draft', JSON.stringify(project));
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (error) {
        console.error('Failed to save:', error);
        setSaveStatus('error');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [project]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('advertorial_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.template.id === template.id) {
          setProject(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load saved project:', error);
    }
  }, [template.id]);

  const handleSectionUpdate = (sectionId: string, content: Partial<SectionContent>) => {
    setProject((prev) => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [sectionId]: {
          ...prev.customizations[sectionId],
          ...content,
        },
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleMetadataUpdate = (metadata: Partial<AdvertorialProject['metadata']>) => {
    setProject((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        ...metadata,
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleExport = () => {
    // Simple HTML export (you can enhance this)
    const content = JSON.stringify(project, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.metadata.productName.replace(/[^a-zA-Z0-9]/g, '-')}-advertorial.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Top Bar */}
      <div className="border-b border-cl-border bg-cl-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-cl-bg hover:bg-cl-bg/80 text-cl-muted hover:text-white transition-all"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-white font-semibold">{template.name}</h2>
            <p className="text-cl-muted text-sm">
              {saveStatus === 'saved' && '✓ Saved'}
              {saveStatus === 'error' && '⚠ Error saving'}
              {saveStatus === 'idle' && 'Editing...'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-lg bg-cl-cyan hover:bg-cl-cyan-light text-white font-medium transition-all"
          >
            📤 Export
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="w-1/2 border-r border-cl-border overflow-auto">
          <div className="p-6">
            {/* Metadata Section */}
            <div className="mb-8 p-6 rounded-xl border border-cl-border bg-cl-card">
              <h3 className="text-white font-semibold mb-4">Project Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cl-muted mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={project.metadata.productName}
                    onChange={(e) => handleMetadataUpdate({ productName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-cl-bg border border-cl-border text-white placeholder-cl-muted focus:outline-none focus:border-cl-cyan transition-colors"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cl-muted mb-2">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={project.metadata.title}
                    onChange={(e) => handleMetadataUpdate({ title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-cl-bg border border-cl-border text-white placeholder-cl-muted focus:outline-none focus:border-cl-cyan transition-colors"
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cl-muted mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={project.metadata.description}
                    onChange={(e) => handleMetadataUpdate({ description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-cl-bg border border-cl-border text-white placeholder-cl-muted focus:outline-none focus:border-cl-cyan transition-colors"
                    rows={3}
                    placeholder="Enter meta description"
                  />
                </div>
              </div>
            </div>

            {/* Section Tabs */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">Content Sections</h3>
              <div className="flex flex-wrap gap-2">
                {template.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-cl-cyan text-white'
                        : 'bg-cl-card text-cl-muted hover:text-white hover:bg-cl-bg'
                    }`}
                  >
                    {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Section Editor */}
            {template.sections.find(s => s.id === activeSection) && (
              <SectionEditor
                section={template.sections.find(s => s.id === activeSection)!}
                content={project.customizations[activeSection] || template.sections.find(s => s.id === activeSection)!.content}
                onUpdate={(content) => handleSectionUpdate(activeSection, content)}
                productName={project.metadata.productName}
              />
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-cl-bg overflow-auto">
          <div className="sticky top-0 z-10 p-4 bg-cl-card border-b border-cl-border">
            <h3 className="text-white font-semibold">Live Preview</h3>
            <p className="text-cl-muted text-sm">Changes update automatically</p>
          </div>
          <div className="p-6">
            <AdvertorialPreview project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
