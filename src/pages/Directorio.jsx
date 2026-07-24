import { useState } from 'react';
import { Search, MessageSquare, CheckCircle, AlertCircle, BookmarkPlus, BookmarkCheck, Users } from 'lucide-react';
import { militantes, myDirectory as initialMyDir } from '../data/mockData';
import AnunciosSidebar from '../components/AnunciosSidebar';

export default function Directorio({ setPage, mobile }) {
  const [busca, setBusca] = useState('');
  const [filtroQuotas, setFiltroQuotas] = useState('todos');
  const [myDir, setMyDir] = useState(new Set(initialMyDir.map(d => d.id)));
  const [toast, setToast] = useState(null);

  const filtrados = militantes.filter(m => {
    const matchBusca = !busca || m.nome.toLowerCase().includes(busca.toLowerCase()) || m.cartao.toLowerCase().includes(busca.toLowerCase()) || m.orgao.toLowerCase().includes(busca.toLowerCase());
    const matchQ = filtroQuotas === 'todos' || (filtroQuotas === 'emdia' ? m.quotas === 'Em dia' : m.quotas !== 'Em dia');
    return matchBusca && matchQ;
  });

  function toggleDir(m) {
    setMyDir(prev => {
      const n = new Set(prev);
      if (n.has(m.id)) { n.delete(m.id); setToast(`${m.nome} removido do directório.`); }
      else { n.add(m.id); setToast(`${m.nome} adicionado ao directório.`); }
      setTimeout(() => setToast(null), 3000);
      return n;
    });
  }

  const myDirList = militantes.filter(m => myDir.has(m.id));

  return (
    <div style={{ display: 'flex', gap: mobile ? 0 : 32, padding: mobile ? '14px 12px' : '28px 32px', alignItems: 'flex-start', flexDirection: mobile ? 'column' : 'row' }}>

      {/* Centro */}
      <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
        {toast && (
          <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'var(--green-600)', color: 'var(--white)', padding: '12px 20px', borderRadius: 50, fontSize: 13, fontWeight: 600, zIndex: 999, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
            <CheckCircle size={14} style={{ display: 'inline', marginRight: 7, verticalAlign: 'middle' }} />{toast}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {[
            { v: militantes.length, l: 'No directório', c: 'var(--red-600)' },
            { v: militantes.filter(m => m.quotas === 'Em dia').length, l: 'Quotas em dia', c: 'var(--green-600)' },
            { v: myDir.size, l: 'Os meus contactos', c: 'var(--black)' },
          ].map(s => (
            <div key={s.l} style={{ flex: 1, background: 'var(--white)', borderRadius: 16, padding: '14px 16px', border: '1px solid var(--gray-200)', borderLeft: `4px solid ${s.c}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--white)', borderRadius: 50, padding: '0 16px', border: '1.5px solid var(--gray-200)' }}>
            <Search size={13} color="var(--gray-400)" />
            <input className="search-input" style={{ flex: 1, border: 'none', padding: '10px 0', background: 'none' }} placeholder="Nome, cartão ou órgão..." value={busca} onChange={e => setBusca(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['todos', 'Todos'], ['emdia', 'Em dia'], ['pendente', 'Pendentes']].map(([val, label]) => (
              <button key={val} onClick={() => setFiltroQuotas(val)} className={`filter-chip${filtroQuotas === val ? ' active' : ''}`}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
          {filtrados.map(m => (
            <div key={m.id} style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--red-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{m.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{m.nome}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>{m.cargo}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{m.orgao}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--gray-400)', letterSpacing: 0.5 }}>{m.cartao}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {m.quotas === 'Em dia' ? <><CheckCircle size={12} color="var(--green-600)" /><span style={{ fontSize: 11, color: 'var(--green-600)', fontWeight: 600 }}>Em dia</span></> : <><AlertCircle size={12} color="var(--yellow)" /><span style={{ fontSize: 11, color: '#92400E', fontWeight: 600 }}>Pendente</span></>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setPage('mensagens')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px', background: 'var(--gray-100)', borderRadius: 50, border: 'none', color: 'var(--gray-600)', fontSize: 11, fontWeight: 600 }}>
                  <MessageSquare size={12} />Mensagem
                </button>
                <button onClick={() => toggleDir(m)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px', background: myDir.has(m.id) ? 'var(--green-50)' : 'var(--red-50)', borderRadius: 50, border: 'none', color: myDir.has(m.id) ? 'var(--green-700)' : 'var(--red-700)', fontSize: 11, fontWeight: 600 }}>
                  {myDir.has(m.id) ? <><BookmarkCheck size={12} />Directório</> : <><BookmarkPlus size={12} />Adicionar</>}
                </button>
              </div>
            </div>
          ))}
          {filtrados.length === 0 && <div className="empty-state" style={{ gridColumn: '1/-1' }}>Nenhum militante encontrado.</div>}
        </div>
      </div>

      {/* Coluna direita — O meu directório */}
      {!mobile && <div style={{ width: 260, flexShrink: 0 }}>
        <div className="widget">
          <div className="widget-header">
            <div className="widget-title"><Users size={14} color="var(--red-600)" />O Meu Directório</div>
            <span style={{ fontSize: 11, fontWeight: 700, background: 'var(--red-50)', color: 'var(--red-600)', padding: '2px 8px', borderRadius: 50 }}>{myDirList.length}</span>
          </div>
          <div style={{ padding: '6px 0', maxHeight: 400, overflowY: 'auto' }}>
            {myDirList.length === 0 && <div style={{ padding: '24px', textAlign: 'center', fontSize: 12, color: 'var(--gray-400)' }}>Nenhum contacto ainda.<br />Adicione militantes ao seu directório.</div>}
            {myDirList.map((m, i) => (
              <div key={m.id} style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < myDirList.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{m.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.nome}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.cargo}</div>
                </div>
                <button onClick={() => setPage('mensagens')} style={{ padding: '5px 8px', background: 'var(--red-50)', borderRadius: 50, color: 'var(--red-600)', fontSize: 10, fontWeight: 700, border: 'none' }}>
                  <MessageSquare size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <AnunciosSidebar />
      </div>
      }
    </div>
  );
}
