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
    <div style={{ flex: 1, overflow: 'auto' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span style={{
            color: '#86868B',
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            display: 'block',
            marginBottom: 16,
          }}>OVERVIEW</span>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.1 }}>
            Dashboard
          </h1>
          <p style={{ fontSize: 18, color: '#86868B', lineHeight: 1.6 }}>
            Create high-converting advertorials in minutes.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: '#111111',
                border: '1px solid #2a2a2a',
                borderRadius: 16,
                padding: 24,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ color: '#86868B' }}>{stat.icon}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#06B6D4',
                }}>{stat.value}</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: 14 }}>{stat.label}</div>
                <div style={{ color: '#86868B', fontSize: 13, marginTop: 2 }}>{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)', margin: '32px 0' }} />

        {/* Quick Actions */}
        <div style={{ marginBottom: 40 }}>
          <span style={{
            color: '#86868B',
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            display: 'block',
            marginBottom: 24,
          }}>QUICK ACTIONS</span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <button
              onClick={() => onNavigate('templates')}
              style={{
                background: '#111111',
                border: '1px solid #2a2a2a',
                borderRadius: 16,
                padding: 20,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: '#030305', border: '1px solid #2a2a2a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: '#06B6D4' }}>
                    <rect x="2" y="1" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="5.5" x2="12.5" y2="5.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5.5" y1="12.5" x2="10" y2="12.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16, marginBottom: 2 }}>Browse Templates</div>
                  <div style={{ color: '#86868B', fontSize: 14 }}>3 professional templates</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#86868B' }}>
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => onNavigate('editor')}
              style={{
                background: '#111111',
                border: '1px solid #2a2a2a',
                borderRadius: 16,
                padding: 20,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: '#030305', border: '1px solid #2a2a2a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: '#06B6D4' }}>
                    <path d="M13 2L16 5L6.5 14.5H3.5V11.5L13 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16, marginBottom: 2 }}>Create New</div>
                  <div style={{ color: '#86868B', fontSize: 14 }}>Start from a template</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#86868B' }}>
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)', margin: '32px 0' }} />

        {/* Available Templates */}
        <div style={{ marginBottom: 40 }}>
          <span style={{
            color: '#86868B',
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            display: 'block',
            marginBottom: 24,
          }}>TEMPLATES</span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onNavigate('templates')}
                style={{
                  background: '#111111',
                  border: '1px solid #2a2a2a',
                  borderRadius: 16,
                  padding: 20,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
              >
                <span style={{
                  display: 'inline-block',
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  padding: '6px 12px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#06B6D4',
                  borderRadius: 6,
                  marginBottom: 16,
                }}>
                  {template.category}
                </span>
                <h3 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                  {template.name}
                </h3>
                <p style={{ color: '#86868B', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
                  {template.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#06B6D4' }}>Use Template</span>
                  <span style={{ color: '#06B6D4' }}>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)', margin: '32px 0' }} />

        {/* Getting Started */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            background: '#111111',
            border: '1px solid #2a2a2a',
            borderRadius: 16,
            padding: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4' }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                color: '#06B6D4',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Getting Started
              </span>
            </div>

            <div>
              {[
                'Choose a template that matches your product type',
                'Customize the content with your product details & benefits',
                'Preview in real-time and optimise for conversion',
                'Export as HTML, PDF, or deploy directly',
              ].map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '12px 0',
                    borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#06B6D4',
                    marginTop: 2,
                  }}>
                    0{i + 1}
                  </span>
                  <p style={{ color: '#E5E7EB', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
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
