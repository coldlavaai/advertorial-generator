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
      <div
        className="px-5 py-3.5 flex items-center justify-between shrink-0"
        style={{
          background: 'rgba(3,3,5,0.95)',
          borderBottom: '1px solid rgba(6,182,212,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(6,182,212,0.1)',
              color: 'rgba(255,255,255,0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.25)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[0.7rem] tracking-[0.05em]">Back</span>
          </button>

          <div className="h-4 w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

          <div>
            <h2 className="text-white font-medium text-[0.9rem]">{template.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              {saveStatus === 'saved' && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.6)' }} />
                  <span className="font-mono text-[0.6rem] tracking-[0.1em]" style={{ color: 'rgba(16,185,129,0.6)' }}>
                    SAVED
                  </span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(239,68,68,0.6)' }} />
                  <span className="font-mono text-[0.6rem] tracking-[0.1em]" style={{ color: 'rgba(239,68,68,0.6)' }}>
                    ERROR
                  </span>
                </div>
              )}
              {saveStatus === 'idle' && (
                <span className="font-mono text-[0.6rem] tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  EDITING
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="btn-primary"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V8M7 2L4.5 4.5M7 2L9.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 8V11C2 11.5523 2.44772 12 3 12H11C11.5523 12 12 11.5523 12 11V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[0.75rem] tracking-[0.05em]">Export</span>
        </button>
      </div>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel — Editor */}
        <div
          className="w-1/2 overflow-auto"
          style={{ borderRight: '1px solid rgba(6,182,212,0.08)' }}
        >
          <div className="p-6">
            {/* Metadata Section */}
            <div
              className="corner-brackets mb-8 p-5 rounded-sm"
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(6,182,212,0.12)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(6,182,212,0.5)' }} />
                <span className="font-mono text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(6,182,212,0.5)' }}>
                  Project Settings
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label-mono block mb-2">Product Name</label>
                  <input
                    type="text"
                    value={project.metadata.productName}
                    onChange={(e) => handleMetadataUpdate({ productName: e.target.value })}
                    className="input w-full"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="label-mono block mb-2">Page Title</label>
                  <input
                    type="text"
                    value={project.metadata.title}
                    onChange={(e) => handleMetadataUpdate({ title: e.target.value })}
                    className="input w-full"
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <label className="label-mono block mb-2">Meta Description</label>
                  <textarea
                    value={project.metadata.description}
                    onChange={(e) => handleMetadataUpdate({ description: e.target.value })}
                    className="textarea w-full"
                    rows={3}
                    placeholder="Enter meta description"
                  />
                </div>
              </div>
            </div>

            {/* Section divider */}
            <div className="section-divider" />

            {/* Section Tabs */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(6,182,212,0.5)' }} />
                <span className="font-mono text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(6,182,212,0.5)' }}>
                  Content Sections
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {template.sections.map((section, i) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-[0.7rem] tracking-[0.05em] transition-all"
                      style={{
                        background: isActive ? 'rgba(6,182,212,0.12)' : 'rgba(0,0,0,0.3)',
                        border: isActive ? '1px solid rgba(6,182,212,0.3)' : '1px solid rgba(6,182,212,0.08)',
                        color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.35)',
                      }}
                    >
                      <span style={{ color: 'rgba(6,182,212,0.3)', fontSize: '0.6rem' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                    </button>
                  );
                })}
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

        {/* Right Panel — Preview */}
        <div className="w-1/2 overflow-auto" style={{ background: '#030305' }}>
          <div
            className="sticky top-0 z-10 px-5 py-3"
            style={{
              background: 'rgba(3,3,5,0.95)',
              borderBottom: '1px solid rgba(6,182,212,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
              <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Live Preview
              </span>
            </div>
          </div>
          <div className="p-5">
            <AdvertorialPreview project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
