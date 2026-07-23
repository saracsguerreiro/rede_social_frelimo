import {
  Rss, MessageSquare, Grid, FileText, CheckSquare,
  BookOpen, Users, Calendar, Settings, LogOut, Store
} from 'lucide-react';
import { currentUser } from '../data/mockData';

const navItems = [
  { id: 'feed', label: 'Feed Oficial', icon: Rss },
  { id: 'mensagens', label: 'Mensagens', icon: MessageSquare, badge: 10 },
  { id: 'espacos', label: 'Espaços', icon: Grid },
  { id: 'documentos', label: 'Documentos', icon: FileText },
  { id: 'votacoes', label: 'Votações', icon: CheckSquare, badge: 1 },
  { id: 'formacao', label: 'Formação', icon: BookOpen },
  { id: 'directorio', label: 'Directório', icon: Users },
  { id: 'eventos', label: 'Eventos', icon: Calendar },
  { separator: true },
  { id: 'marketplace', label: 'Marketplace', icon: Store },
];

export default function Sidebar({ page, setPage, onLogout }) {
  return (
    <aside style={{
      width: 270,
      background: 'linear-gradient(180deg, #E15059 0%, #D2232A 28%, #8C171C 68%, #5C0F13 100%)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: 13 }}>
        <img src={`${import.meta.env.BASE_URL}frelimo.png`} alt="FRELIMO" style={{ width: 50, height: 50, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' }} />
        <div>
          <div style={{ color: 'var(--white)', fontWeight: 900, fontSize: 18, lineHeight: 1.1, letterSpacing: 0.5 }}>FRELIMO</div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 500, marginTop: 3 }}>Rede Interna</div>
          <div style={{ display: 'inline-block', marginTop: 5, background: 'var(--yellow)', color: 'var(--black)', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 50, letterSpacing: 0.5 }}>PROTÓTIPO</div>
        </div>
      </div>

      {/* User pill card */}
      <div style={{
        margin: '14px 14px 6px',
        padding: '10px 14px',
        background: 'rgba(255,255,255,0.13)',
        borderRadius: 50,
        border: '1px solid rgba(255,255,255,0.18)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: 'var(--white)', color: 'var(--red-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 12,
        }}>{currentUser.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'var(--white)', fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.nome}</div>
          <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.cargo}</div>
        </div>
      </div>

      <div style={{ padding: '10px 22px 4px', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: 1.5, textTransform: 'uppercase' }}>Navegação</div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 12px', overflowY: 'auto' }}>
        {navItems.map((item, idx) => {
          if (item.separator) return <div key={`sep-${idx}`} style={{ margin: '8px 4px', height: 1, background: 'rgba(255,255,255,0.12)' }} />;
          const { id, label, icon: Icon, badge } = item;
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px', marginBottom: 3,
                background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: active ? 'var(--white)' : 'rgba(255,255,255,0.68)',
                borderRadius: 50,
                border: active ? '1.5px solid rgba(255,255,255,0.28)' : '1.5px solid transparent',
                transition: 'all 0.15s', textAlign: 'left',
                fontSize: 13, fontWeight: active ? 700 : 400,
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'var(--white)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.68)'; } }}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge ? <span style={{ background: 'var(--yellow)', color: 'var(--black)', borderRadius: 50, padding: '2px 7px', fontSize: 10, fontWeight: 800 }}>{badge}</span> : null}
            </button>
          );
        })}

        <div style={{ margin: '10px 4px', height: 1, background: 'rgba(255,255,255,0.12)' }} />

        <button
          onClick={() => setPage('administracao')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 16px', marginBottom: 3,
            background: page === 'administracao' ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: page === 'administracao' ? 'var(--white)' : 'rgba(255,255,255,0.68)',
            borderRadius: 50,
            border: page === 'administracao' ? '1.5px solid rgba(255,255,255,0.28)' : '1.5px solid transparent',
            fontSize: 13, fontWeight: page === 'administracao' ? 700 : 400,
          }}
          onMouseEnter={e => { if (page !== 'administracao') { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'var(--white)'; } }}
          onMouseLeave={e => { if (page !== 'administracao') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.68)'; } }}
        >
          <Settings size={16} />
          <span>Administração</span>
        </button>
      </nav>

      {/* Logout */}
      <div style={{ padding: '10px 14px 14px' }}>
        <button onClick={onLogout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 16px', background: 'rgba(0,0,0,0.18)', borderRadius: 50,
          color: 'rgba(255,255,255,0.58)', fontSize: 12, border: '1px solid rgba(255,255,255,0.08)',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.background = 'rgba(0,0,0,0.28)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.58)'; e.currentTarget.style.background = 'rgba(0,0,0,0.18)'; }}
        >
          <LogOut size={15} /><span>Terminar Sessão</span>
        </button>
      </div>
    </aside>
  );
}
