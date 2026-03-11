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

  const [showPreview, setShowPreview] = useState(false);
  const [activeSection, setActiveSection] = useState(template.sections[0]?.id || '');
  const [isSaving, setIsSaving] = useState(false);
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
    // Generate HTML file
    const html = generateHTML(project);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.metadata.productName.replace(/[^a-zA-Z0-9]/g, '-')}-advertorial.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveProject = () => {
    setIsSaving(true);
    try {
      const projects = JSON.parse(localStorage.getItem('advertorial_projects') || '[]');
      projects.push(project);
      localStorage.setItem('advertorial_projects', JSON.stringify(projects));
      setSaveStatus('saved');
      setTimeout(() => {
        setIsSaving(false);
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Failed to save project:', error);
      setSaveStatus('error');
      setIsSaving(false);
    }
  };

  const currentSection = template.sections.find((s) => s.id === activeSection);
  const currentContent = {
    ...currentSection?.content,
    ...project.customizations[activeSection],
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      {!showPreview ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-6">
          {/* Sidebar - Section List */}
          <div className="lg:col-span-1 corner-brackets card p-6 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Sections</h2>
              <p className="text-sm text-white/50">
                Click to edit each section
              </p>
            </div>

            {/* Metadata Section */}
            <div className="mb-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400/60 mb-3">
                Product Info
              </h3>
              <input
                type="text"
                placeholder="Product Name"
                value={project.metadata.productName}
                onChange={(e) => handleMetadataUpdate({ productName: e.target.value })}
                className="input w-full mb-2 text-sm"
              />
              <input
                type="text"
                placeholder="Page Title"
                value={project.metadata.title}
                onChange={(e) => handleMetadataUpdate({ title: e.target.value })}
                className="input w-full mb-2 text-sm"
              />
              <textarea
                placeholder="Meta Description"
                value={project.metadata.description}
                onChange={(e) => handleMetadataUpdate({ description: e.target.value })}
                className="textarea w-full text-sm"
                rows={2}
              />
            </div>

            {/* Section List */}
            <div className="space-y-2">
              {template.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-cyan-500/20 border border-cyan-500/40 text-white'
                      : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-cyan-400/60 mb-1">
                        {index + 1}. {section.type.toUpperCase()}
                      </div>
                      <div className="text-sm font-medium truncate">
                        {currentContent.headline || section.content.headline || `Section ${index + 1}`}
                      </div>
                    </div>
                    {activeSection === section.id && (
                      <span className="text-cyan-400">→</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Save Status */}
            {saveStatus !== 'idle' && (
              <div className="mt-6 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono">
                  {saveStatus === 'saved' && (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400">Auto-saved</span>
                    </>
                  )}
                  {saveStatus === 'error' && (
                    <>
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span className="text-red-400">Save failed</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-2 corner-brackets card p-6 overflow-y-auto">
            {currentSection && (
              <SectionEditor
                section={currentSection}
                content={currentContent}
                onUpdate={(content) => handleSectionUpdate(activeSection, content)}
                productName={project.metadata.productName}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-full overflow-y-auto">
          <AdvertorialPreview project={project} />
        </div>
      )}

      {/* Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-cyan-500/20 p-4 z-50">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <div className="w-2 h-2 bg-cyan-400/60 rounded-full" />
            <span>{template.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary text-sm"
            >
              {showPreview ? '← Edit' : 'Preview →'}
            </button>

            <button
              onClick={handleSaveProject}
              disabled={isSaving}
              className="btn-ghost text-sm"
            >
              {isSaving ? 'Saving...' : 'Save Project'}
            </button>

            <button
              onClick={handleExport}
              className="btn-primary text-sm"
            >
              Export HTML
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// HTML generation function
function generateHTML(project: AdvertorialProject): string {
  const { template, customizations, metadata } = project;

  const sections = template.sections.map((section) => {
    const content = { ...section.content, ...customizations[section.id] };
    return renderSection(section.type, content, metadata.productName);
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title || metadata.productName}</title>
  <meta name="description" content="${metadata.description || ''}">
  ${metadata.keywords && metadata.keywords.length > 0 ? `<meta name="keywords" content="${metadata.keywords.join(', ')}">` : ''}
  ${metadata.author ? `<meta name="author" content="${metadata.author}">` : ''}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    section { padding: 60px 0; }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    h3 { font-size: 2rem; margin-bottom: 1rem; }
    .cta-button { display: inline-block; background: #06B6D4; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; }
    .cta-button:hover { background: #0891B2; }
    ul { list-style: none; }
    li { padding: 10px 0; padding-left: 30px; position: relative; }
    li:before { content: "→"; position: absolute; left: 0; color: #06B6D4; }
  </style>
</head>
<body>
  ${sections}
  <footer style="text-align: center; padding: 40px 20px; border-top: 1px solid #eee;">
    <p style="color: #666; font-size: 14px;">Powered by <strong style="color: #06B6D4;">COLD LAVA</strong></p>
  </footer>
</body>
</html>`;
}

function renderSection(type: string, content: any, productName: string): string {
  const replacePlaceholders = (text: string) => text.replace(/\[Product Name\]/g, productName).replace(/\[Product\]/g, productName);

  switch (type) {
    case 'hero':
      return `
        <section style="text-align: center; background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); color: white;">
          <div class="container">
            <h1>${replacePlaceholders(content.headline || '')}</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem;">${replacePlaceholders(content.subheadline || '')}</p>
            <p style="margin-bottom: 2rem;">${replacePlaceholders(content.body || '')}</p>
            <a href="${content.ctaUrl || '#'}" class="cta-button" style="background: white; color: #06B6D4;">${content.ctaText || 'Get Started'}</a>
          </div>
        </section>
      `;
    case 'problem':
      return `
        <section style="background: #f9fafb;">
          <div class="container">
            <h2>${replacePlaceholders(content.headline || '')}</h2>
            <p style="font-size: 1.125rem; margin-bottom: 2rem;">${replacePlaceholders(content.body || '')}</p>
            ${content.bulletPoints ? `<ul>${content.bulletPoints.map((point: string) => `<li>${replacePlaceholders(point)}</li>`).join('')}</ul>` : ''}
          </div>
        </section>
      `;
    case 'solution':
      return `
        <section>
          <div class="container">
            <h2>${replacePlaceholders(content.headline || '')}</h2>
            <h3 style="color: #06B6D4; font-weight: normal;">${replacePlaceholders(content.subheadline || '')}</h3>
            <p style="font-size: 1.125rem;">${replacePlaceholders(content.body || '')}</p>
          </div>
        </section>
      `;
    case 'features':
      return `
        <section style="background: #f9fafb;">
          <div class="container">
            <h2>${replacePlaceholders(content.headline || '')}</h2>
            ${content.bulletPoints ? `<ul>${content.bulletPoints.map((point: string) => `<li>${replacePlaceholders(point)}</li>`).join('')}</ul>` : ''}
          </div>
        </section>
      `;
    case 'testimonials':
      return `
        <section>
          <div class="container">
            <h2 style="text-align: center; margin-bottom: 3rem;">${content.headline || ''}</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
              ${content.testimonials?.map((t: any) => `
                <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <p style="font-style: italic; margin-bottom: 1rem;">"${t.content}"</p>
                  <p style="font-weight: bold;">${t.name}</p>
                  <p style="color: #666; font-size: 0.875rem;">${t.role}</p>
                  ${t.rating ? `<p style="color: #06B6D4;">★★★★★</p>` : ''}
                </div>
              `).join('') || ''}
            </div>
          </div>
        </section>
      `;
    case 'guarantee':
      return `
        <section style="background: #f0fdfa; text-align: center;">
          <div class="container">
            <h2>${content.headline || ''}</h2>
            <p style="font-size: 1.125rem;">${replacePlaceholders(content.body || '')}</p>
          </div>
        </section>
      `;
    case 'cta':
      return `
        <section style="text-align: center; background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); color: white;">
          <div class="container">
            <h2>${replacePlaceholders(content.headline || '')}</h2>
            <p style="font-size: 1.25rem; margin-bottom: 2rem;">${replacePlaceholders(content.subheadline || '')}</p>
            <a href="${content.ctaUrl || '#'}" class="cta-button" style="background: white; color: #06B6D4;">${content.ctaText || 'Get Started'}</a>
            <p style="margin-top: 1rem; font-size: 0.875rem;">${replacePlaceholders(content.body || '')}</p>
          </div>
        </section>
      `;
    default:
      return '';
  }
}
