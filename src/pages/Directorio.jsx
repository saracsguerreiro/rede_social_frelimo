import { useState } from 'react';
import { Search, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { militantes } from '../data/mockData';

export default function Directorio() {
  const [busca, setBusca] = useState('');
  const [filtroQuotas, setFiltroQuotas] = useState('todos');

  const filtrados = militantes.filter(m => {
    const matchBusca = !busca || m.nome.toLowerCase().includes(busca.toLowerCase()) || m.cartao.toLowerCase().includes(busca.toLowerCase()) || m.orgao.toLowerCase().includes(busca.toLowerCase());
    const matchQuotas = filtroQuotas === 'todos' || (filtroQuotas === 'emdia' ? m.quotas === 'Em dia' : m.quotas !== 'Em dia');
    return matchBusca && matchQuotas;
  });

  const quotasEmDia = militantes.filter(m => m.quotas === 'Em dia').length;

  return (
    <div style={{ padding: '24px', maxWidth: 900 }}>
      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ flex: 1, padding: '14px', borderLeft: '4px solid var(--red-600)' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--red-600)' }}>{militantes.length}</div>
          <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>Militantes no directório</div>
        </div>
        <div className="card" style={{ flex: 1, padding: '14px', borderLeft: '4px solid var(--green-600)' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--green-600)' }}>{quotasEmDia}</div>
          <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>Quotas em dia</div>
        </div>
        <div className="card" style={{ flex: 1, padding: '14px', borderLeft: '4px solid var(--yellow)' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--black)' }}>{militantes.length - quotasEmDia}</div>
          <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>Quotas pendentes</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 4, padding: '0 14px' }}>
          <Search size={14} color="var(--gray-400)" />
          <input className="input" style={{ border: 'none', padding: '10px 0' }} placeholder="Pesquisar por nome, cartão ou órgão..." value={busca} onChange={e => setBusca(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['todos', 'Todos'], ['emdia', 'Em dia'], ['pendente', 'Pendentes']].map(([val, label]) => (
            <button key={val} onClick={() => setFiltroQuotas(val)} style={{
              padding: '0 14px', borderRadius: 4, fontSize: 12, fontWeight: 600,
              background: filtroQuotas === val ? 'var(--red-600)' : 'var(--white)',
              color: filtroQuotas === val ? 'var(--white)' : 'var(--gray-600)',
              border: '1px solid var(--gray-200)',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {filtrados.map(m => (
          <div key={m.id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="avatar avatar-lg">{m.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{m.nome}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 4 }}>{m.cargo}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{m.orgao}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--gray-200)' }}>
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--gray-400)', letterSpacing: 0.5 }}>{m.cartao}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {m.quotas === 'Em dia' ? (
                  <><CheckCircle size={12} color="var(--green-600)" /><span style={{ fontSize: 11, color: 'var(--green-600)', fontWeight: 600 }}>Em dia</span></>
                ) : (
                  <><AlertCircle size={12} color="var(--yellow)" /><span style={{ fontSize: 11, color: '#92400E', fontWeight: 600 }}>Pendente</span></>
                )}
              </div>
            </div>

            <button className="btn-ghost" style={{ width: '100%', padding: '7px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <MessageSquare size={12} />Enviar Mensagem
            </button>
          </div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="empty-state">Nenhum militante encontrado com esses critérios.</div>
      )}
    </div>
  );
}
