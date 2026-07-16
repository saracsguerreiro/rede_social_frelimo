import { useState } from 'react';
import { Users, FileText, TrendingUp, Search, Plus, Check, Bell } from 'lucide-react';
import { espacos, mySpaces } from '../data/mockData';

export default function Espacos({ setPage }) {
  const [busca, setBusca] = useState('');
  const [joinedIds, setJoinedIds] = useState(new Set(mySpaces.map(s => s.id)));

  const todosEspacos = espacos.filter(e => !busca || e.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div style={{ display: 'flex', gap: 32, padding: '28px 32px', alignItems: 'flex-start' }}>

      {/* Centro — Os meus espaços */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800 }}>Os Meus Espaços</h2>
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{mySpaces.length} espaços</span>
        </div>

        {mySpaces.map(e => (
          <div key={e.id} style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', marginBottom: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', background: `linear-gradient(135deg, ${e.cor}22, ${e.cor}08)`, borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: e.cor, color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{e.icone}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 3 }}>{e.nome}</h3>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--gray-500)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={11} />{e.membros} membros</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><TrendingUp size={11} color="var(--green-600)" /><span style={{ color: 'var(--green-600)', fontWeight: 600 }}>{e.naoLidas} novas</span></span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '6px 14px', background: 'var(--white)', borderRadius: 50, border: `1.5px solid ${e.cor}`, color: e.cor, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Bell size={11} />Notificações
                </button>
                <button style={{ padding: '6px 14px', background: e.cor, borderRadius: 50, color: 'var(--white)', fontSize: 11, fontWeight: 700 }}>
                  Entrar no Espaço
                </button>
              </div>
            </div>
            {/* Mock posts */}
            <div style={{ padding: '0' }}>
              {[
                { autor: 'Secretária', texto: 'Acta da reunião de 15 de Julho publicada nos documentos.', hora: '2h' },
                { autor: 'Dep. Organização', texto: 'Novas directrizes para células disponíveis na secção Documentos.', hora: '1d' },
              ].map((p, i) => (
                <div key={i} style={{ padding: '12px 20px', borderBottom: i === 0 ? '1px solid var(--gray-200)' : 'none', display: 'flex', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: e.cor, color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{e.icone[0]}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2 }}>{p.autor} <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>· {p.hora}</span></div>
                    <div style={{ fontSize: 12, color: 'var(--gray-600)' }}>{p.texto}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Coluna direita — Todos os espaços */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <div className="widget">
          <div className="widget-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Todos os Espaços</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-100)', borderRadius: 50, padding: '7px 14px', border: '1.5px solid var(--gray-200)' }}>
              <Search size={12} color="var(--gray-400)" />
              <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Pesquisar espaço..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: 12, width: '100%' }} />
            </div>
          </div>
          <div style={{ padding: '6px 0', maxHeight: 420, overflowY: 'auto' }}>
            {todosEspacos.map(e => {
              const joined = joinedIds.has(e.id);
              return (
                <div key={e.id} style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--gray-200)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: e.cor === 'red' ? 'var(--red-600)' : 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{e.icone}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.nome}</div>
                    <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{e.membros} membros</div>
                  </div>
                  <button
                    onClick={() => setJoinedIds(prev => { const n = new Set(prev); joined ? n.delete(e.id) : n.add(e.id); return n; })}
                    style={{ padding: '5px 10px', borderRadius: 50, fontSize: 10, fontWeight: 700, flexShrink: 0, background: joined ? 'var(--green-50)' : 'var(--red-50)', color: joined ? 'var(--green-700)' : 'var(--red-700)', border: `1px solid ${joined ? 'var(--green-200)' : 'var(--red-200)'}` }}
                  >
                    {joined ? <><Check size={10} style={{ display: 'inline', marginRight: 3 }} />Aderiu</> : <><Plus size={10} style={{ display: 'inline', marginRight: 3 }} />Aderir</>}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
