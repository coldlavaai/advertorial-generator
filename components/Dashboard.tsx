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
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-px flex-shrink-0"
              style={{ width: '2rem', background: 'rgba(6,182,212,0.4)' }}
            />
            <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(6,182,212,0.5)' }}>
              Overview
            </span>
          </div>
          <h1
            className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-white leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Dashboard
          </h1>
          <p className="mt-2 text-[0.95rem]" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            Create high-converting advertorials in minutes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 fade-in fade-in-delay-1">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="corner-brackets relative p-6 rounded-sm transition-all duration-200 hover:border-opacity-50"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(6,182,212,0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <span style={{ color: 'rgba(6,182,212,0.35)' }}>{stat.icon}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
              <div>
                <div className="font-mono text-[0.75rem] font-medium tracking-[0.1em] uppercase text-white" style={{ opacity: 0.8 }}>
                  {stat.label}
                </div>
                <div className="font-mono text-[0.65rem] tracking-[0.08em] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {stat.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section divider */}
        <div className="section-divider" />

        {/* Quick Actions */}
        <div className="mb-10 fade-in fade-in-delay-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-shrink-0" style={{ width: '2rem', background: 'rgba(6,182,212,0.4)' }} />
            <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(6,182,212,0.5)' }}>
              Quick Actions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('templates')}
              className="corner-brackets text-left p-5 rounded-sm transition-all duration-200 group"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(6,182,212,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)';
                e.currentTarget.style.background = 'rgba(6,182,212,0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6,182,212,0.15)';
                e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(6,182,212,0.06)',
                    border: '1px solid rgba(6,182,212,0.15)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: 'rgba(6,182,212,0.6)' }}>
                    <rect x="2" y="1" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="5.5" x2="12.5" y2="5.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="12.5" x2="10" y2="12.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-[0.9rem] mb-0.5">Browse Templates</div>
                  <div className="font-mono text-[0.7rem] tracking-[0.05em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    3 professional templates
                  </div>
                </div>
                <svg
                  className="ml-auto transition-transform group-hover:translate-x-1"
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{ color: 'rgba(6,182,212,0.3)' }}
                >
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => onNavigate('editor')}
              className="corner-brackets text-left p-5 rounded-sm transition-all duration-200 group"
              style={{
                background: 'rgba(6,182,212,0.02)',
                border: '1px solid rgba(6,182,212,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6,182,212,0.45)';
                e.currentTarget.style.background = 'rgba(6,182,212,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6,182,212,0.25)';
                e.currentTarget.style.background = 'rgba(6,182,212,0.02)';
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px solid rgba(6,182,212,0.25)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: 'rgba(6,182,212,0.7)' }}>
                    <path d="M13 2L16 5L6.5 14.5H3.5V11.5L13 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-[0.9rem] mb-0.5">Create New</div>
                  <div className="font-mono text-[0.7rem] tracking-[0.05em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Start from a template
                  </div>
                </div>
                <svg
                  className="ml-auto transition-transform group-hover:translate-x-1"
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{ color: 'rgba(6,182,212,0.4)' }}
                >
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Section divider */}
        <div className="section-divider" />

        {/* Available Templates */}
        <div className="mb-10 fade-in fade-in-delay-3">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-shrink-0" style={{ width: '2rem', background: 'rgba(6,182,212,0.4)' }} />
            <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(6,182,212,0.5)' }}>
              Templates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onNavigate('templates')}
                className="corner-brackets text-left p-5 rounded-sm transition-all duration-200 group"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(6,182,212,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)';
                  e.currentTarget.style.background = 'rgba(6,182,212,0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6,182,212,0.15)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                }}
              >
                <div className="pill mb-4">{template.category}</div>
                <h3
                  className="text-white font-semibold text-[0.95rem] mb-2 group-hover:text-cl-cyan transition-colors"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {template.name}
                </h3>
                <p className="text-[0.85rem] mb-5" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                  {template.description}
                </p>
                <div className="flex items-center gap-2 transition-all group-hover:gap-3">
                  <span className="font-mono text-[0.75rem] tracking-[0.05em]" style={{ color: 'rgba(6,182,212,0.6)' }}>
                    Use Template
                  </span>
                  <span className="font-mono text-[0.75rem]" style={{ color: 'rgba(6,182,212,0.4)' }}>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section divider */}
        <div className="section-divider" />

        {/* Getting Started */}
        <div className="fade-in fade-in-delay-4 mb-10">
          <div
            className="corner-brackets-lg corner-brackets p-6 rounded-sm"
            style={{
              background: 'rgba(6,182,212,0.02)',
              border: '1px solid rgba(6,182,212,0.15)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#06B6D4' }}
              />
              <span className="font-mono text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(6,182,212,0.6)' }}>
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
                  style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <span className="font-mono text-[0.7rem] font-medium mt-0.5" style={{ color: 'rgba(6,182,212,0.45)' }}>
                    0{i + 1}
                  </span>
                  <p className="text-[0.9rem]" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
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
