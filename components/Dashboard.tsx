'use client';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Templates', value: '3', icon: '📄', color: 'text-cl-cyan' },
    { label: 'Advertorials', value: '0', icon: '📝', color: 'text-cl-green' },
    { label: 'Exports', value: '0', icon: '📤', color: 'text-cl-orange' },
  ];

  const templates = [
    {
      id: 'saas',
      name: 'SaaS Product Launch',
      description: 'Perfect for software products with strong problem-solution framework',
      icon: '💼',
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce Product',
      description: 'Optimized for physical products with benefit-focused features',
      icon: '🛍️',
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      description: 'Ideal for supplements and health products with trust-building',
      icon: '💊',
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-cl-muted">Welcome back! Create high-converting advertorials in minutes.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 fade-in fade-in-delay-1">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-cl-border bg-cl-card hover:border-cl-cyan/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <div className="text-cl-muted text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8 fade-in fade-in-delay-2">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('templates')}
              className="p-6 rounded-xl border border-cl-border bg-cl-card hover:border-cl-cyan hover:bg-cl-card/80 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cl-cyan/10 flex items-center justify-center group-hover:bg-cl-cyan/20 transition-colors">
                  <span className="text-2xl">📄</span>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Browse Templates</div>
                  <div className="text-cl-muted text-sm">Choose from 3 professional templates</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('editor')}
              className="p-6 rounded-xl border border-cl-cyan bg-cl-cyan/10 hover:bg-cl-cyan/20 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cl-cyan/20 flex items-center justify-center group-hover:bg-cl-cyan/30 transition-colors">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Create New Advertorial</div>
                  <div className="text-cl-muted text-sm">Start from scratch or use a template</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Available Templates */}
        <div className="fade-in fade-in-delay-3">
          <h2 className="text-2xl font-bold text-white mb-4">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-6 rounded-xl border border-cl-border bg-cl-card hover:border-cl-cyan/30 transition-all cursor-pointer group"
                onClick={() => onNavigate('templates')}
              >
                <div className="text-4xl mb-4">{template.icon}</div>
                <h3 className="text-white font-semibold mb-2">{template.name}</h3>
                <p className="text-cl-muted text-sm mb-4">{template.description}</p>
                <div className="flex items-center gap-2 text-cl-cyan text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Use Template</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="mt-8 p-6 rounded-xl border border-cl-cyan/30 bg-cl-cyan/5 fade-in fade-in-delay-4">
          <h3 className="text-xl font-bold text-white mb-4">🚀 Getting Started</h3>
          <div className="space-y-3 text-cl-muted">
            <div className="flex items-start gap-3">
              <span className="text-cl-cyan font-bold">1.</span>
              <p>Choose a template that matches your product type (SaaS, E-commerce, or Health)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cl-cyan font-bold">2.</span>
              <p>Customize the content with your product details, benefits, and call-to-action</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cl-cyan font-bold">3.</span>
              <p>Preview in real-time and use AI suggestions to improve conversion</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cl-cyan font-bold">4.</span>
              <p>Export as HTML, PDF, or deploy directly to your domain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
