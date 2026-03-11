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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Top Bar */}
      <div style={{
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        background: '#030305',
        borderBottom: '1px solid #2a2a2a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 8,
              background: '#111111',
              border: '1px solid #2a2a2a',
              color: '#86868B',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#86868B';
              e.currentTarget.style.borderColor = '#2a2a2a';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>Back</span>
          </button>

          <div style={{ height: 16, width: 1, background: '#2a2a2a' }} />

          <div>
            <h2 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16, margin: 0 }}>{template.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              {saveStatus === 'saved' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#22c55e' }}>SAVED</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#dc2626' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#dc2626' }}>ERROR</span>
                </div>
              )}
              {saveStatus === 'idle' && (
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#86868B' }}>EDITING</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleExport}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            background: '#06B6D4',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V8M7 2L4.5 4.5M7 2L9.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 8V11C2 11.5523 2.44772 12 3 12H11C11.5523 12 12 11.5523 12 11V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>Export</span>
        </button>
      </div>

      {/* Split View */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel — Editor */}
        <div style={{ width: '50%', overflow: 'auto', borderRight: '1px solid #2a2a2a' }}>
          <div style={{ padding: 24 }}>
            {/* Metadata Section */}
            <div style={{
              background: '#111111',
              border: '1px solid #2a2a2a',
              borderRadius: 16,
              marginBottom: 32,
              padding: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4' }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  color: '#06B6D4',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  Project Settings
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#86868B',
                    display: 'block',
                    marginBottom: 8,
                  }}>Product Name</label>
                  <input
                    type="text"
                    value={project.metadata.productName}
                    onChange={(e) => handleMetadataUpdate({ productName: e.target.value })}
                    placeholder="Enter product name"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: '#0a0a0a',
                      border: '1px solid #2a2a2a',
                      color: '#FFFFFF',
                      padding: '12px 16px',
                      borderRadius: 10,
                      fontSize: 15,
                      fontFamily: "'Inter', sans-serif",
                      outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#06B6D4')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#86868B',
                    display: 'block',
                    marginBottom: 8,
                  }}>Page Title</label>
                  <input
                    type="text"
                    value={project.metadata.title}
                    onChange={(e) => handleMetadataUpdate({ title: e.target.value })}
                    placeholder="Enter page title"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: '#0a0a0a',
                      border: '1px solid #2a2a2a',
                      color: '#FFFFFF',
                      padding: '12px 16px',
                      borderRadius: 10,
                      fontSize: 15,
                      fontFamily: "'Inter', sans-serif",
                      outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#06B6D4')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#86868B',
                    display: 'block',
                    marginBottom: 8,
                  }}>Meta Description</label>
                  <textarea
                    value={project.metadata.description}
                    onChange={(e) => handleMetadataUpdate({ description: e.target.value })}
                    placeholder="Enter meta description"
                    rows={3}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: '#0a0a0a',
                      border: '1px solid #2a2a2a',
                      color: '#FFFFFF',
                      padding: '12px 16px',
                      borderRadius: 10,
                      fontSize: 15,
                      fontFamily: "'Inter', sans-serif",
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#06B6D4')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)', margin: '24px 0' }} />

            {/* Section Tabs */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4' }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  color: '#06B6D4',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  Content Sections
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {template.sections.map((section, i) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 13,
                        background: '#111111',
                        border: isActive ? '1px solid rgba(6,182,212,0.3)' : '1px solid #2a2a2a',
                        color: isActive ? '#06B6D4' : '#86868B',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: 12, color: '#86868B' }}>
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
        <div style={{ width: '50%', overflow: 'auto', background: '#030305' }}>
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            padding: '12px 20px',
            background: 'rgba(3,3,5,0.95)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid #2a2a2a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#86868B',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Live Preview
              </span>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <AdvertorialPreview project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
