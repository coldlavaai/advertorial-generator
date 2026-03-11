'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TemplateSelector from '@/components/TemplateSelector';
import AdvertorialEditor from '@/components/AdvertorialEditor';
import PoweredBy from '@/components/PoweredBy';
import { AdvertorialTemplate } from '@/types/advertorial';

export default function Home() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<AdvertorialTemplate | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/auth');
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cl-bg">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-cyan-500/10 bg-black/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Advertorial Generator
              </h1>
              <p className="text-sm font-mono uppercase tracking-wider text-cyan-400/60">
                Cold Lava Tools
              </p>
            </div>
            <div className="flex items-center gap-4">
              {selectedTemplate && (
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-4 py-2 bg-transparent hover:bg-white/5 text-white/60 hover:text-white font-medium rounded-lg transition-all duration-200 text-sm"
                >
                  ← Back to Templates
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-medium rounded-lg transition-all duration-200 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {!selectedTemplate ? (
          <TemplateSelector onSelectTemplate={setSelectedTemplate} />
        ) : (
          <AdvertorialEditor
            template={selectedTemplate}
            onBack={() => setSelectedTemplate(null)}
          />
        )}
      </main>

      {/* Footer */}
      <PoweredBy />
    </div>
  );
}
