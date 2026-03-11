'use client';

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Sidebar({ onNavigate, currentView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '◻' },
    { id: 'templates', label: 'Templates', icon: '◻' },
    { id: 'editor', label: 'Editor', icon: '✎' },
    { id: 'exports', label: 'Exports', icon: '↑' },
  ];

  return (
    <div style={{
      width: 240,
      flexShrink: 0,
      height: '100vh',
      background: '#0a0a0a',
      borderRight: '1px solid #1a1a1a',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>CL</span>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13, color: '#fff', letterSpacing: '0.05em' }}>COLD LAVA</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#86868B', letterSpacing: '0.05em' }}>ADVERTORIAL GEN</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {menuItems.map((item) => {
          const active = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 16px',
                marginBottom: 4,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: active ? '#111111' : 'transparent',
                borderLeft: active ? '2px solid #06B6D4' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#111111'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 14, color: active ? '#06B6D4' : '#86868B' }}>{item.icon}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: active ? '#06B6D4' : '#86868B',
                letterSpacing: '0.03em',
              }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#86868B' }}>v1.0</span>
        </div>
      </div>
    </div>
  );
}
