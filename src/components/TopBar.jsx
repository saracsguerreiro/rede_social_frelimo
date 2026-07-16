import { Bell, Search, SquarePen, Tablet, Monitor, Smartphone, LogOut } from 'lucide-react';
import { currentUser } from '../data/mockData';

const pageTitles = {
  feed: 'Feed Oficial', mensagens: 'Mensagens', espacos: 'Espaços',
  documentos: 'Documentos', votacoes: 'Votações', formacao: 'Formação',
  directorio: 'Directório', eventos: 'Eventos', administracao: 'Administração',
};

export default function TopBar({ page, tabletMode, setTabletMode, mobileMode, setMobileMode, onLogout }) {
  if (mobileMode) {
    return (
      <header style={{
        height: 46, background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10, flexShrink: 0,
      }}>
        <h1 style={{ fontSize: 14, fontWeight: 800, color: 'var(--black)', flex: 1 }}>
          {pageTitles[page] || 'FRELIMO'}
        </h1>
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
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 14,
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
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 50, background: 'var(--red-600)', color: 'var(--white)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'background 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--red-800)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}
      >
        <SquarePen size={14} />Publicar
      </button>

      <button style={{ position: 'relative', background: 'none', padding: 6, color: 'var(--gray-600)', border: 'none', cursor: 'pointer' }}>
        <Bell size={18} />
        <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: 'var(--red-600)', borderRadius: '50%', border: '1.5px solid var(--white)' }} />
      </button>

      {/* Toggle tablet */}
      <button
        title={tabletMode ? 'Vista desktop' : 'Vista tablet'}
        onClick={() => setTabletMode(m => !m)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 10, background: tabletMode ? 'var(--red-50)' : 'var(--gray-100)', color: tabletMode ? 'var(--red-600)' : 'var(--gray-500)', border: `1.5px solid ${tabletMode ? 'var(--red-200)' : 'var(--gray-200)'}`, cursor: 'pointer', transition: 'all 0.15s' }}
        onMouseEnter={e => { if (!tabletMode) { e.currentTarget.style.background = 'var(--red-50)'; e.currentTarget.style.color = 'var(--red-600)'; e.currentTarget.style.borderColor = 'var(--red-200)'; } }}
        onMouseLeave={e => { if (!tabletMode) { e.currentTarget.style.background = 'var(--gray-100)'; e.currentTarget.style.color = 'var(--gray-500)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; } }}
      >
        {tabletMode ? <Monitor size={16} /> : <Tablet size={16} />}
      </button>

      {/* Toggle mobile */}
      <button
        title="Vista mobile"
        onClick={() => setMobileMode(true)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 10, background: 'var(--gray-100)', color: 'var(--gray-500)', border: '1.5px solid var(--gray-200)', cursor: 'pointer', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-50)'; e.currentTarget.style.color = 'var(--red-600)'; e.currentTarget.style.borderColor = 'var(--red-200)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--gray-100)'; e.currentTarget.style.color = 'var(--gray-500)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
      >
        <Smartphone size={16} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{currentUser.avatar}</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{currentUser.nome}</div>
          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{currentUser.orgao}</div>
        </div>
      </div>
    </header>
  );
}
