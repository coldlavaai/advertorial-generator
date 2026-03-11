'use client';

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Sidebar({ onNavigate, currentView }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      number: '01',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: 'templates',
      label: 'Templates',
      number: '02',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.2" />
          <line x1="5" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: 'editor',
      label: 'Editor',
      number: '03',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <line x1="9.5" y1="3.5" x2="12.5" y2="6.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: 'exports',
      label: 'Exports',
      number: '04',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V10M8 2L5 5M8 2L11 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 10V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="w-[260px] flex flex-col h-screen shrink-0"
      style={{
        background: 'rgba(3,3,5,0.95)',
        borderRight: '1px solid rgba(6,182,212,0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(6,182,212,0.08)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center"
            style={{
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.25)',
            }}
          >
            <span className="font-mono font-bold text-sm" style={{ color: 'rgba(6,182,212,0.8)' }}>CL</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-sm tracking-wider text-white">COLD LAVA</span>
            <span
              className="font-mono text-[0.6rem] tracking-[0.15em] uppercase"
              style={{ color: 'rgba(6,182,212,0.4)' }}
            >
              Advertorial Gen
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-0.5">
        <div className="px-3 mb-4">
          <span
            className="font-mono text-[0.65rem] tracking-[0.15em] uppercase"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            Navigation
          </span>
        </div>

        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative"
              style={{
                background: isActive ? 'rgba(6,182,212,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid #06B6D4' : '2px solid transparent',
              }}
            >
              {/* Number */}
              <span
                className="font-mono text-[0.6rem] w-4"
                style={{
                  color: isActive ? 'rgba(6,182,212,0.6)' : 'rgba(255,255,255,0.15)',
                }}
              >
                {item.number}
              </span>

              {/* Icon */}
              <span
                style={{
                  color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.35)',
                }}
                className="transition-colors group-hover:text-white/60"
              >
                {item.icon}
              </span>

              {/* Label */}
              <span
                className="font-mono text-[0.8rem] tracking-[0.05em] transition-colors"
                style={{
                  color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.5)',
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(6,182,212,0.06)' }}>
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[0.6rem] tracking-[0.12em] uppercase"
            style={{ color: 'rgba(255,255,255,0.15)' }}
          >
            v1.0.0
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            <span
              className="font-mono text-[0.6rem] tracking-[0.1em]"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
