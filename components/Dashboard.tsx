'use client';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      label: 'Templates',
      value: '3',
      sublabel: 'Ready to use',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="1" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.2" />
          <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.2" />
          <line x1="6" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      label: 'Advertorials',
      value: '0',
      sublabel: 'Created',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M14 1L18 5L7 16H3V12L14 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: 'Exports',
      value: '0',
      sublabel: 'Downloaded',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3V12M10 3L6.5 6.5M10 3L13.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 12V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const templates = [
    {
      id: 'saas',
      name: 'SaaS Product Launch',
      description: 'Problem-solution framework for software products',
      category: 'SAAS',
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce Product',
      description: 'Benefit-focused features for physical products',
      category: 'ECOMMERCE',
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      description: 'Trust-building for supplements & health products',
      category: 'HEALTH',
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[960px] mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-10 fade-in">
          <span className="text-cl-muted text-sm font-mono mb-4 block">OVERVIEW</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-cl-muted">
            Create high-converting advertorials in minutes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 fade-in fade-in-delay-1">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-cl-card border border-cl-border rounded-2xl p-6 hover:border-cl-cyan/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-cl-muted">{stat.icon}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{stat.label}</div>
                <div className="text-cl-muted text-xs mt-0.5">{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-divider" />

        {/* Quick Actions */}
        <div className="mb-10 fade-in fade-in-delay-2">
          <span className="text-cl-muted text-sm font-mono mb-6 block">QUICK ACTIONS</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('templates')}
              className="bg-cl-card border border-cl-border rounded-2xl p-5 text-left hover:border-cl-cyan/30 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cl-bg border border-cl-border flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-cl-cyan">
                    <rect x="2" y="1" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="5.5" x2="12.5" y2="5.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="12.5" x2="10" y2="12.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-base mb-0.5">Browse Templates</div>
                  <div className="text-cl-muted text-sm">3 professional templates</div>
                </div>
                <svg className="ml-auto text-cl-muted group-hover:text-cl-cyan transition-colors" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => onNavigate('editor')}
              className="bg-cl-card border border-cl-border rounded-2xl p-5 text-left hover:border-cl-cyan/30 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cl-bg border border-cl-border flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-cl-cyan">
                    <path d="M13 2L16 5L6.5 14.5H3.5V11.5L13 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-base mb-0.5">Create New</div>
                  <div className="text-cl-muted text-sm">Start from a template</div>
                </div>
                <svg className="ml-auto text-cl-muted group-hover:text-cl-cyan transition-colors" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="section-divider" />

        {/* Available Templates */}
        <div className="mb-10 fade-in fade-in-delay-3">
          <span className="text-cl-muted text-sm font-mono mb-6 block">TEMPLATES</span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onNavigate('templates')}
                className="bg-cl-card border border-cl-border rounded-2xl p-5 text-left hover:border-cl-cyan/30 transition-colors group"
              >
                <div className="pill mb-4">{template.category}</div>
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-cl-cyan transition-colors">
                  {template.name}
                </h3>
                <p className="text-cl-muted text-sm mb-5 leading-relaxed">
                  {template.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-cl-cyan">Use Template</span>
                  <span className="text-cl-cyan">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="section-divider" />

        {/* Getting Started */}
        <div className="fade-in fade-in-delay-4 mb-10">
          <div className="bg-cl-card border border-cl-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-cl-cyan" />
              <span className="font-mono text-sm text-cl-cyan uppercase tracking-wider">
                Getting Started
              </span>
            </div>

            <div className="space-y-0">
              {[
                'Choose a template that matches your product type',
                'Customize the content with your product details & benefits',
                'Preview in real-time and optimise for conversion',
                'Export as HTML, PDF, or deploy directly',
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-3"
                  style={{ borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none' }}
                >
                  <span className="font-mono text-sm font-medium text-cl-cyan mt-0.5">
                    0{i + 1}
                  </span>
                  <p className="text-cl-muted text-base leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
