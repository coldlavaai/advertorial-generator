'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import TemplateSelector from '@/components/TemplateSelector';
import AdvertorialEditor from '@/components/AdvertorialEditor';
import { AdvertorialTemplate } from '@/types/advertorial';

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<AdvertorialTemplate | null>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedTemplate(null);
  };

  const handleSelectTemplate = (template: AdvertorialTemplate) => {
    setSelectedTemplate(template);
    setCurrentView('editor');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#030305' }}>
      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigate} currentView={currentView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}

        {currentView === 'templates' && (
          <div className="flex-1 overflow-auto px-8 py-10">
            <TemplateSelector onSelectTemplate={handleSelectTemplate} />
          </div>
        )}

        {currentView === 'editor' && (
          selectedTemplate ? (
            <AdvertorialEditor
              template={selectedTemplate}
              onBack={() => setCurrentView('dashboard')}
            />
          ) : (
            <div className="flex-1 overflow-auto px-8 py-10">
              <div className="max-w-[960px] mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-shrink-0" style={{ width: '2rem', background: 'rgba(6,182,212,0.4)' }} />
                  <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(6,182,212,0.5)' }}>
                    Editor
                  </span>
                </div>
                <h1
                  className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-white leading-tight mb-2"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Editor
                </h1>
                <p className="text-[0.95rem] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Select a template to start editing
                </p>
                <button
                  onClick={() => setCurrentView('templates')}
                  className="btn-primary"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="4.5" y1="4.5" x2="9.5" y2="4.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="4.5" y1="7" x2="9.5" y2="7" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span className="font-mono text-[0.75rem] tracking-[0.05em]">Browse Templates</span>
                </button>
              </div>
            </div>
          )
        )}

        {currentView === 'exports' && (
          <div className="flex-1 overflow-auto px-8 py-10">
            <div className="max-w-[960px] mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-shrink-0" style={{ width: '2rem', background: 'rgba(6,182,212,0.4)' }} />
                <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(6,182,212,0.5)' }}>
                  Downloads
                </span>
              </div>
              <h1
                className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-white leading-tight mb-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                Exports
              </h1>
              <p className="text-[0.95rem] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Your exported advertorials will appear here
              </p>

              <div
                className="corner-brackets p-10 rounded-sm text-center"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(6,182,212,0.12)',
                }}
              >
                <svg
                  width="40" height="40" viewBox="0 0 40 40" fill="none"
                  className="mx-auto mb-4"
                  style={{ color: 'rgba(6,182,212,0.2)' }}
                >
                  <path d="M20 6V22M20 6L14 12M20 6L26 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 22V32C6 33.1046 6.89543 34 8 34H32C33.1046 34 34 33.1046 34 32V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="font-mono text-[0.75rem] tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  No exports yet
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
