import {
  Rss, MessageSquare, Grid, FileText, CheckSquare,
  BookOpen, Users, Calendar, Settings, LogOut
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
];

export default function Sidebar({ page, setPage, onLogout }) {
  return (
    <aside style={{
      width: 270,
      background: 'linear-gradient(180deg, #E15059 0%, #D2232A 30%, #8C171C 70%, #5C0F13 100%)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}>
        <img
          src="/frelimo.png"
          alt="FRELIMO"
          style={{ width: 52, height: 52, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}
        />
        <div>
          <div style={{ color: 'var(--white)', fontWeight: 900, fontSize: 18, lineHeight: 1.1, letterSpacing: 0.5 }}>FRELIMO</div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 500, marginTop: 3 }}>Rede Interna</div>
          <div style={{
            display: 'inline-block', marginTop: 5,
            background: 'var(--yellow)', color: 'var(--black)',
            fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5,
          }}>PROTÓTIPO</div>
        </div>
      </div>

      {/* User card */}
      <div style={{
        margin: '16px 16px 8px',
        padding: '12px 14px',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div className="avatar" style={{ width: 38, height: 38, fontSize: 13, background: 'var(--white)', color: 'var(--red-600)', fontWeight: 900 }}>
          {currentUser.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'var(--white)', fontSize: 13, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.nome}</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>{currentUser.cargo}</div>
        </div>
      </div>

      {/* Nav label */}
      <div style={{ padding: '12px 24px 4px', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
        Navegação
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 12px', overflowY: 'auto' }}>
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 14px',
                marginBottom: 4,
                background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: active ? 'var(--white)' : 'rgba(255,255,255,0.7)',
                borderRadius: 10,
                borderLeft: 'none',
                transition: 'all 0.15s',
                textAlign: 'left',
                fontSize: 13.5,
                fontWeight: active ? 700 : 400,
                border: active ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--white)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
            >
              <Icon size={17} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge ? (
                <span style={{
                  background: 'var(--yellow)', color: 'var(--black)',
                  borderRadius: 10, padding: '2px 7px', fontSize: 10, fontWeight: 800,
                }}>{badge}</span>
              ) : null}
            </button>
          );
        })}

        <div style={{ margin: '12px 2px', height: 1, background: 'rgba(255,255,255,0.12)' }} />

        <button
          onClick={() => setPage('administracao')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '11px 14px',
            marginBottom: 4,
            background: page === 'administracao' ? 'rgba(255,255,255,0.18)' : 'transparent',
            color: page === 'administracao' ? 'var(--white)' : 'rgba(255,255,255,0.7)',
            borderRadius: 10,
            border: page === 'administracao' ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
            fontSize: 13.5,
            fontWeight: page === 'administracao' ? 700 : 400,
          }}
          onMouseEnter={e => { if (page !== 'administracao') { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--white)'; } }}
          onMouseLeave={e => { if (page !== 'administracao') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
        >
          <Settings size={17} />
          <span>Administração</span>
        </button>
      </nav>

      {/* Logout */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', background: 'rgba(0,0,0,0.2)', borderRadius: 10,
            color: 'rgba(255,255,255,0.6)', fontSize: 12, border: '1px solid rgba(255,255,255,0.08)',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(0,0,0,0.2)'; }}
        >
          <LogOut size={15} />
          <span>Terminar Sessão</span>
        </button>
      </div>
    </aside>
  );
}
