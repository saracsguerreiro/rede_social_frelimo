import { Bell, Search, SquarePen, Tablet, Smartphone, Store, ShieldCheck } from 'lucide-react';
import { currentUser } from '../data/mockData';

const pageTitles = {
  feed: 'Feed Oficial', mensagens: 'Mensagens', espacos: 'Espaços',
  documentos: 'Documentos', votacoes: 'Votações', formacao: 'Formação',
  directorio: 'Directório', eventos: 'Eventos', marketplace: 'Marketplace', administracao: 'Administração',
};

function NavBtn({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '6px 14px', borderRadius: 50, background: active ? 'var(--red-50)' : 'var(--white)', color: active ? 'var(--red-600)' : 'var(--gray-400)', border: `1.5px solid ${active ? 'var(--red-200)' : 'var(--gray-200)'}`, cursor: 'pointer', transition: 'all 0.15s' }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--red-50)'; e.currentTarget.style.color = 'var(--red-600)'; e.currentTarget.style.borderColor = 'var(--red-200)'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--gray-400)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; } }}
    >
      <Icon size={17} />
      <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase', lineHeight: 1 }}>{label}</span>
    </button>
  );
}

export default function TopBar({ page, tabletMode, setTabletMode, mobileMode, setMobileMode, onLogout, setPage }) {
  if (mobileMode) {
    return (
      <header style={{
        height: 46, background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6, flexShrink: 0,
      }}>
        <h1 style={{ fontSize: 14, fontWeight: 800, color: 'var(--black)', flex: 1 }}>
          {pageTitles[page] || 'FRELIMO'}
        </h1>
        {setPage && (
          <button onClick={() => setPage('marketplace')} style={{ background: 'none', padding: 6, color: 'var(--gray-600)', border: 'none', cursor: 'pointer' }}>
            <Store size={18} />
          </button>
        )}
        {setPage && (
          <button onClick={() => setPage('administracao')} style={{ background: 'none', padding: 6, color: 'var(--gray-600)', border: 'none', cursor: 'pointer' }}>
            <ShieldCheck size={18} />
          </button>
        )}
        <button style={{ position: 'relative', background: 'none', padding: 6, color: 'var(--gray-600)', border: 'none', cursor: 'pointer' }}>
          <Bell size={18} />
          <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, background: 'var(--red-600)', borderRadius: '50%', border: '1.5px solid var(--white)' }} />
        </button>
        <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{currentUser.avatar}</div>
      </header>
    );
  }

  return (
    <header style={{
      height: 58, background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12,
      position: 'sticky', top: 0, zIndex: 10, flexShrink: 0,
    }}>
      <h1 style={{ fontSize: 15, fontWeight: 800, color: 'var(--black)', flex: 1 }}>
        {pageTitles[page] || 'Plataforma FRELIMO'}
      </h1>

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-100)', border: '1.5px solid var(--gray-200)', borderRadius: 50, padding: '7px 16px', width: 200, transition: 'border-color 0.15s' }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--red-600)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
      >
        <Search size={13} color="var(--gray-400)" />
        <input placeholder="Pesquisar..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: 12, color: 'var(--black)', width: '100%' }} />
      </div>

      <button
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 50, background: 'var(--red-600)', color: 'var(--white)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'background 0.15s', flexShrink: 0 }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--red-800)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}
      >
        <SquarePen size={14} />Publicar
      </button>

      <button style={{ position: 'relative', background: 'none', padding: 6, color: 'var(--gray-600)', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
        <Bell size={18} />
        <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: 'var(--red-600)', borderRadius: '50%', border: '1.5px solid var(--white)' }} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
        <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{currentUser.avatar}</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{currentUser.nome}</div>
          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{currentUser.orgao}</div>
        </div>
      </div>

      {!tabletMode && (
        <>
          <div style={{ width: 1, height: 28, background: 'var(--gray-200)', flexShrink: 0 }} />
          <NavBtn label="Tablet" icon={Tablet} active={false} onClick={() => setTabletMode(m => !m)} />
          <NavBtn label="Mobile" icon={Smartphone} active={false} onClick={() => setMobileMode(true)} />
        </>
      )}
    </header>
  );
}
