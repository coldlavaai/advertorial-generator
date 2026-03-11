'use client';

import { useState } from 'react';
import TemplateSelector from '@/components/TemplateSelector';
import AdvertorialEditor from '@/components/AdvertorialEditor';
import PoweredBy from '@/components/PoweredBy';
import { AdvertorialTemplate } from '@/types/advertorial';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<AdvertorialTemplate | null>(null);

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
            {selectedTemplate && (
              <button
                onClick={() => setSelectedTemplate(null)}
                className="px-4 py-2 bg-transparent hover:bg-white/5 text-white/60 hover:text-white font-medium rounded-lg transition-all duration-200 text-sm"
              >
                ← Back to Templates
              </button>
            )}
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
