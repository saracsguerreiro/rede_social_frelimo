import { Bell, Search } from 'lucide-react';
import { currentUser } from '../data/mockData';

const pageTitles = {
  feed: 'Feed Oficial', mensagens: 'Mensagens', espacos: 'Espaços',
  documentos: 'Documentos', votacoes: 'Votações', formacao: 'Formação de Quadros',
  directorio: 'Directório de Militantes', eventos: 'Eventos', administracao: 'Administração',
};

export default function TopBar({ page }) {
  return (
    <header style={{
      height: 58, background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <h1 style={{ fontSize: 15, fontWeight: 800, color: 'var(--black)', flex: 1 }}>
        {pageTitles[page] || 'Plataforma FRELIMO'}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-100)', border: '1.5px solid var(--gray-200)', borderRadius: 50, padding: '7px 16px', width: 220, transition: 'border-color 0.15s' }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--red-600)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
      >
        <Search size={13} color="var(--gray-400)" />
        <input placeholder="Pesquisar..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: 12, color: 'var(--black)', width: '100%' }} />
      </div>

      <button style={{ position: 'relative', background: 'none', padding: 6, color: 'var(--gray-600)' }}>
        <Bell size={18} />
        <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: 'var(--red-600)', borderRadius: '50%', border: '1.5px solid var(--white)' }} />
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
