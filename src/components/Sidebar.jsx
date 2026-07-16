import { useState } from 'react';
import {
  Rss, MessageSquare, Grid, FileText, CheckSquare,
  BookOpen, Users, Calendar, Settings, LogOut, Star
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
      width: 240,
      background: 'var(--black)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{
        background: 'var(--red-600)',
        padding: '20px 20px 16px',
        borderBottom: '3px solid var(--yellow)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, background: 'var(--white)',
            borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Star size={22} color="var(--red-600)" fill="var(--red-600)" />
          </div>
          <div>
            <div style={{ color: 'var(--white)', fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>FRELIMO</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 500 }}>Rede Interna</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
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
                padding: '10px 20px',
                background: active ? 'var(--red-600)' : 'transparent',
                color: active ? 'var(--white)' : 'rgba(255,255,255,0.65)',
                borderLeft: active ? '3px solid var(--yellow)' : '3px solid transparent',
                transition: 'all 0.15s',
                textAlign: 'left',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--white)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
            >
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge ? (
                <span style={{
                  background: 'var(--yellow)', color: 'var(--black)',
                  borderRadius: 10, padding: '1px 6px', fontSize: 10, fontWeight: 700,
                }}>{badge}</span>
              ) : null}
            </button>
          );
        })}

        <div style={{ margin: '8px 0', height: 1, background: 'rgba(255,255,255,0.1)' }} />

        <button
          onClick={() => setPage('administracao')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 20px',
            background: page === 'administracao' ? 'var(--red-600)' : 'transparent',
            color: page === 'administracao' ? 'var(--white)' : 'rgba(255,255,255,0.65)',
            borderLeft: page === 'administracao' ? '3px solid var(--yellow)' : '3px solid transparent',
            fontSize: 13,
          }}
          onMouseEnter={e => { if (page !== 'administracao') { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--white)'; } }}
          onMouseLeave={e => { if (page !== 'administracao') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
        >
          <Settings size={16} />
          <span>Administração</span>
        </button>
      </nav>

      {/* User */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{currentUser.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'var(--white)', fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.nome}</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.cargo}</div>
        </div>
        <button onClick={onLogout} title="Sair" style={{ background: 'none', color: 'rgba(255,255,255,0.4)', padding: 4 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
