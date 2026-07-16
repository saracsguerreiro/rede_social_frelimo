import { Rss, MessageSquare, Grid, Calendar, Users } from 'lucide-react';

const navItems = [
  { id: 'feed',       label: 'Feed',      icon: Rss,            badge: 0 },
  { id: 'mensagens',  label: 'Chat',      icon: MessageSquare,  badge: 10 },
  { id: 'espacos',    label: 'Espaços',   icon: Grid,           badge: 0 },
  { id: 'eventos',    label: 'Eventos',   icon: Calendar,       badge: 0 },
  { id: 'directorio', label: 'Directório',icon: Users,          badge: 0 },
];

export default function BottomNav({ page, setPage }) {
  return (
    <nav style={{
      height: 62, background: 'var(--white)', borderTop: '1px solid var(--gray-200)',
      display: 'flex', alignItems: 'center', padding: '0 4px 4px', flexShrink: 0,
    }}>
      {navItems.map(item => {
        const Icon = item.icon;
        const active = page === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, padding: '6px 4px',
              background: 'none', border: 'none', cursor: 'pointer', position: 'relative',
            }}
          >
            {item.badge > 0 && !active && (
              <span style={{
                position: 'absolute', top: 2, right: '50%', transform: 'translateX(14px)',
                background: 'var(--red-600)', color: 'var(--white)',
                width: 16, height: 16, borderRadius: '50%', fontSize: 9, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{item.badge}</span>
            )}
            {active && (
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 28, height: 3, borderRadius: '0 0 3px 3px', background: 'var(--red-600)',
              }} />
            )}
            <Icon size={22} color={active ? 'var(--red-600)' : 'var(--gray-400)'} />
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, color: active ? 'var(--red-600)' : 'var(--gray-400)' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
