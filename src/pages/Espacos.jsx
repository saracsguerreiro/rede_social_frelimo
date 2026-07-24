import { useState } from 'react';
import { Users, TrendingUp, Search, Plus, Check, Bell, ChevronDown, ChevronRight } from 'lucide-react';
import { espacos, mySpaces } from '../data/mockData';
import AnunciosSidebar from '../components/AnunciosSidebar';

const GRUPOS = [
  { key: 'nacional',     label: 'Nacional',      cor: 'var(--red-600)' },
  { key: 'provincial',   label: 'Provincial',    cor: 'var(--green-600)' },
  { key: 'organizacao',  label: 'Organizações',  cor: 'var(--gray-600)' },
];

export default function Espacos({ setPage, mobile }) {
  const [busca, setBusca] = useState('');
  const [joinedIds, setJoinedIds] = useState(new Set(mySpaces.map(s => s.id)));
  const [vistaDir, setVistaDir] = useState('todos'); // 'meus' | 'todos'
  const [colapsados, setColapsados] = useState(new Set());

  const toggleColapso = key => setColapsados(prev => {
    const n = new Set(prev);
    n.has(key) ? n.delete(key) : n.add(key);
    return n;
  });

  const espacosFiltrados = espacos.filter(e =>
    !busca || e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const espacosMeus = espacosFiltrados.filter(e => joinedIds.has(e.id));

  const listaParaMostrar = vistaDir === 'meus' ? espacosMeus : espacosFiltrados;

  return (
    <div style={{ display: 'flex', gap: mobile ? 0 : 32, padding: mobile ? '14px 12px' : '28px 32px', alignItems: 'flex-start', flexDirection: mobile ? 'column' : 'row' }}>

      {/* ── Centro — Os meus espaços ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800 }}>Os Meus Espaços</h2>
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{mySpaces.length} espaços</span>
        </div>

        {mySpaces.map(e => (
          <div key={e.id} style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', marginBottom: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '16px 20px', background: `linear-gradient(135deg, ${e.cor}22, ${e.cor}08)`, borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: e.cor, color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{e.icone}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 3 }}>{e.nome}</h3>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--gray-500)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={11} />{e.membros} membros</span>
                  {e.naoLidas > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><TrendingUp size={11} color="var(--green-600)" /><span style={{ color: 'var(--green-600)', fontWeight: 600 }}>{e.naoLidas} novas</span></span>
                  )}
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
            <div>
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

      {/* ── Coluna direita — Espaços com grupos ── */}
      <div style={{ width: mobile ? '100%' : 290, flexShrink: 0 }}>
        <div className="widget">

          {/* Header da coluna */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <button
                onClick={() => setVistaDir('todos')}
                className={`filter-chip${vistaDir === 'todos' ? ' active' : ''}`}
                style={{ flex: 1, textAlign: 'center', fontSize: 11 }}
              >Todos</button>
              <button
                onClick={() => setVistaDir('meus')}
                className={`filter-chip${vistaDir === 'meus' ? ' active' : ''}`}
                style={{ flex: 1, textAlign: 'center', fontSize: 11 }}
              >Os meus</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-100)', borderRadius: 50, padding: '7px 14px', border: '1.5px solid var(--gray-200)' }}>
              <Search size={12} color="var(--gray-400)" />
              <input
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Pesquisar espaço..."
                style={{ border: 'none', background: 'none', outline: 'none', fontSize: 12, width: '100%' }}
              />
            </div>
          </div>

          {/* Lista agrupada */}
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {GRUPOS.map(grupo => {
              const itens = listaParaMostrar.filter(e => e.nivel === grupo.key);
              if (itens.length === 0) return null;
              const colapsado = colapsados.has(grupo.key);
              return (
                <div key={grupo.key}>
                  {/* Cabeçalho do grupo */}
                  <button
                    onClick={() => toggleColapso(grupo.key)}
                    style={{
                      width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8,
                      background: 'var(--gray-50)', border: 'none', borderBottom: '1px solid var(--gray-200)',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: grupo.cor, flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--gray-600)', flex: 1 }}>{grupo.label}</span>
                    <span style={{ fontSize: 10, color: 'var(--gray-400)', marginRight: 4 }}>{itens.length}</span>
                    {colapsado ? <ChevronRight size={12} color="var(--gray-400)" /> : <ChevronDown size={12} color="var(--gray-400)" />}
                  </button>

                  {/* Itens do grupo */}
                  {!colapsado && itens.map((e, idx) => {
                    const joined = joinedIds.has(e.id);
                    const corBg = e.cor === 'red' ? 'var(--red-600)' : 'var(--green-600)';
                    return (
                      <div key={e.id} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: idx < itens.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: corBg, color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{e.icone}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 3 }}>{e.nome}</div>
                          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{e.membros} membros · {e.publicacoes} publicações</div>
                        </div>
                        <button
                          onClick={() => setJoinedIds(prev => { const n = new Set(prev); joined ? n.delete(e.id) : n.add(e.id); return n; })}
                          style={{
                            padding: '5px 11px', borderRadius: 50, fontSize: 10, fontWeight: 700, flexShrink: 0,
                            background: joined ? 'var(--green-50)' : 'var(--red-50)',
                            color: joined ? 'var(--green-700)' : 'var(--red-700)',
                            border: `1px solid ${joined ? 'var(--green-200)' : 'var(--red-200)'}`,
                          }}
                        >
                          {joined
                            ? <><Check size={10} style={{ display: 'inline', marginRight: 3 }} />Aderiu</>
                            : <><Plus size={10} style={{ display: 'inline', marginRight: 3 }} />Aderir</>
                          }
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {listaParaMostrar.length === 0 && (
              <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: 'var(--gray-400)' }}>Nenhum espaço encontrado.</div>
            )}
          </div>

          {/* Rodapé — ver todos */}
          {vistaDir === 'meus' && (
            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--gray-200)', textAlign: 'center' }}>
              <button onClick={() => { setVistaDir('todos'); setBusca(''); }} style={{ fontSize: 12, color: 'var(--red-600)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                Ver todos os espaços →
              </button>
            </div>
          )}
        </div>
        {!mobile && <AnunciosSidebar />}
      </div>
    </div>
  );
}
