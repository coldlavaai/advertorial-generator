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
    <div className="min-h-screen flex bg-cl-bg">
      <Sidebar onNavigate={handleNavigate} currentView={currentView} />

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
                <span className="text-cl-muted text-sm font-mono mb-4 block">EDITOR</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Editor
                </h1>
                <p className="text-lg text-cl-muted mb-8">
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
                  <span className="font-mono text-sm">Browse Templates</span>
                </button>
              </div>
            </div>
          )
        )}

        {currentView === 'exports' && (
          <div className="flex-1 overflow-auto px-8 py-10">
            <div className="max-w-[960px] mx-auto">
              <span className="text-cl-muted text-sm font-mono mb-4 block">DOWNLOADS</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Exports
              </h1>
              <p className="text-lg text-cl-muted mb-8">
                Your exported advertorials will appear here
              </p>

              <div className="bg-cl-card border border-cl-border rounded-2xl p-10 text-center">
                <svg
                  width="40" height="40" viewBox="0 0 40 40" fill="none"
                  className="mx-auto mb-4 text-cl-muted"
                >
                  <path d="M20 6V22M20 6L14 12M20 6L26 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 22V32C6 33.1046 6.89543 34 8 34H32C33.1046 34 34 33.1046 34 32V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="font-mono text-sm text-cl-muted uppercase tracking-wider">
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
