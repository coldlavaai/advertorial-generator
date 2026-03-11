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
    <div style={{ minHeight: '100vh', display: 'flex', background: '#030305' }}>
      <Sidebar onNavigate={handleNavigate} currentView={currentView} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}

        {currentView === 'templates' && (
          <div style={{ flex: 1, overflow: 'auto', padding: '40px 32px' }}>
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
            <div style={{ flex: 1, overflow: 'auto', padding: '40px 32px' }}>
              <div style={{ maxWidth: 960, margin: '0 auto' }}>
                <span style={{
                  color: '#86868B',
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  display: 'block',
                  marginBottom: 16,
                }}>EDITOR</span>
                <h1 style={{ fontSize: 40, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
                  Editor
                </h1>
                <p style={{ fontSize: 18, color: '#86868B', marginBottom: 32 }}>
                  Select a template to start editing
                </p>
                <button
                  onClick={() => setCurrentView('templates')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    background: '#06B6D4',
                    border: 'none',
                    color: '#FFFFFF',
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="4.5" y1="4.5" x2="9.5" y2="4.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="4.5" y1="7" x2="9.5" y2="7" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>Browse Templates</span>
                </button>
              </div>
            </div>
          )
        )}

        {currentView === 'exports' && (
          <div style={{ flex: 1, overflow: 'auto', padding: '40px 32px' }}>
            <div style={{ maxWidth: 960, margin: '0 auto' }}>
              <span style={{
                color: '#86868B',
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                display: 'block',
                marginBottom: 16,
              }}>DOWNLOADS</span>
              <h1 style={{ fontSize: 40, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
                Exports
              </h1>
              <p style={{ fontSize: 18, color: '#86868B', marginBottom: 32 }}>
                Your exported advertorials will appear here
              </p>

              <div style={{
                background: '#111111',
                border: '1px solid #2a2a2a',
                borderRadius: 16,
                padding: 40,
                textAlign: 'center',
              }}>
                <svg
                  width="40" height="40" viewBox="0 0 40 40" fill="none"
                  style={{ margin: '0 auto 16px', display: 'block', color: '#86868B' }}
                >
                  <path d="M20 6V22M20 6L14 12M20 6L26 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 22V32C6 33.1046 6.89543 34 8 34H32C33.1046 34 34 33.1046 34 32V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  color: '#86868B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
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
