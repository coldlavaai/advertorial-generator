'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import TemplateSelector from '@/components/TemplateSelector';
import AdvertorialEditor from '@/components/AdvertorialEditor';
import { AdvertorialTemplate } from '@/types/advertorial';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<AdvertorialTemplate | null>(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedTemplate(null); // Reset template when changing views
  };

  const handleSelectTemplate = (template: AdvertorialTemplate) => {
    setSelectedTemplate(template);
    setCurrentView('editor');
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cl-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-lg gradient-border flex items-center justify-center">
            <span className="text-white font-bold text-xl">CL</span>
          </div>
          <div className="text-white font-mono">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-cl-bg">
      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigate} currentView={currentView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        
        {currentView === 'templates' && (
          <div className="flex-1 overflow-auto p-8">
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
            <div className="flex-1 overflow-auto p-8">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-4">Editor</h1>
                <p className="text-cl-muted mb-8">Select a template to start editing</p>
                <button
                  onClick={() => setCurrentView('templates')}
                  className="px-6 py-3 rounded-xl bg-cl-cyan hover:bg-cl-cyan-light text-white font-semibold transition-all"
                >
                  Browse Templates
                </button>
              </div>
            </div>
          )
        )}
        
        {currentView === 'exports' && (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-4">Exports</h1>
              <p className="text-cl-muted">Your exported advertorials will appear here</p>
              <div className="mt-8 p-8 rounded-xl border border-cl-border bg-cl-card text-center">
                <div className="text-6xl mb-4">📤</div>
                <p className="text-cl-muted">No exports yet</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
