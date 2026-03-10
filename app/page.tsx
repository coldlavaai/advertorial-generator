'use client';

import { useState } from 'react';
import TemplateSelector from '@/components/TemplateSelector';
import AdvertorialEditor from '@/components/AdvertorialEditor';
import { AdvertorialTemplate } from '@/types/advertorial';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<AdvertorialTemplate | null>(null);

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">
            Cold Lava Advertorial Generator
          </h1>
          <p className="text-gray-400">
            Create high-converting landing pages in minutes
          </p>
        </header>

        {!selectedTemplate ? (
          <TemplateSelector onSelectTemplate={setSelectedTemplate} />
        ) : (
          <AdvertorialEditor
            template={selectedTemplate}
            onBack={() => setSelectedTemplate(null)}
          />
        )}
      </div>
    </main>
  );
}
