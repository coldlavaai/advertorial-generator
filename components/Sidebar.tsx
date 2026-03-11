'use client';

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Sidebar({ onNavigate, currentView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'editor', label: 'Editor', icon: '✏️' },
    { id: 'exports', label: 'Exports', icon: '📤' },
  ];

  return (
    <div className="w-64 bg-cl-card border-r border-cl-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-cl-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg gradient-border flex items-center justify-center">
            <span className="text-white font-bold text-lg">CL</span>
          </div>
          <div>
            <span className="font-mono font-bold text-lg text-white block">COLD LAVA</span>
            <span className="text-xs text-cl-muted font-mono">ADVERTORIAL</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === item.id
                ? 'bg-cl-cyan text-white'
                : 'text-cl-muted hover:bg-cl-bg hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-cl-border">
        <div className="text-center text-xs text-cl-muted font-mono">
          v1.0.0
        </div>
      </div>
    </div>
  );
}
