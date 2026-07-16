import { useState } from 'react';
import { FileText, Download, Search, Star } from 'lucide-react';
import { documentos, importantDocs } from '../data/mockData';

const tipoColors = {
  'Estatuto': { bg: 'var(--red-50)', color: 'var(--red-800)' },
  'Programa': { bg: 'var(--red-50)', color: 'var(--red-800)' },
  'Directriz': { bg: 'var(--green-50)', color: 'var(--green-800)' },
  'Acta': { bg: 'var(--gray-100)', color: 'var(--gray-600)' },
  'Formação': { bg: '#EDE9FE', color: '#6D28D9' },
  'Relatório': { bg: '#FEF3C7', color: '#92400E' },
};

export default function Documentos({ setPage }) {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  const filtrados = documentos.filter(d => {
    const matchBusca = !busca || d.titulo.toLowerCase().includes(busca.toLowerCase());
    const matchTipo = filtroTipo === 'Todos' || d.tipo === filtroTipo;
    return matchBusca && matchTipo;
  });

  return (
    <div style={{ display: 'flex', gap: 18, padding: '22px', alignItems: 'flex-start' }}>

      {/* Centro */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Search + action */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--white)', borderRadius: 50, padding: '0 16px', border: '1.5px solid var(--gray-200)' }}>
            <Search size={13} color="var(--gray-400)" />
            <input className="search-input" style={{ flex: 1, border: 'none', padding: '10px 0', background: 'none' }} placeholder="Pesquisar documentos..." value={busca} onChange={e => setBusca(e.target.value)} />
          </div>
          <button className="btn-primary" style={{ fontSize: 12, padding: '10px 20px' }}>+ Publicar</button>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {['Todos', ...Object.keys(tipoColors)].map(t => (
            <button key={t} onClick={() => setFiltroTipo(t)} className={`filter-chip${filtroTipo === t ? ' active' : ''}`}>{t}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--gray-100)', borderBottom: '2px solid var(--gray-200)' }}>
                {['Documento', 'Tipo', 'Órgão', 'Data', 'Tamanho', ''].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((doc, i) => {
                const tc = tipoColors[doc.tipo] || { bg: 'var(--gray-100)', color: 'var(--gray-600)' };
                return (
                  <tr key={doc.id} style={{ borderBottom: '1px solid var(--gray-200)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, background: 'var(--red-50)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FileText size={14} color="var(--red-600)" />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{doc.titulo}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}><span className="badge" style={{ background: tc.bg, color: tc.color }}>{doc.tipo}</span></td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--gray-600)' }}>{doc.orgao}</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--gray-600)' }}>{doc.data}</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--gray-400)' }}>{doc.tamanho}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Download size={12} />Descarregar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtrados.length === 0 && <div className="empty-state">Nenhum documento encontrado.</div>}
        </div>
      </div>

      {/* Coluna direita — Documentos importantes */}
      <div style={{ width: 260, flexShrink: 0 }}>
        <div className="widget">
          <div className="widget-header">
            <div className="widget-title">
              <Star size={14} color="var(--yellow)" fill="var(--yellow)" />
              Documentos Importantes
            </div>
          </div>
          <div style={{ padding: '8px 0' }}>
            {importantDocs.map((d, i) => {
              const tc = tipoColors[d.tipo] || { bg: 'var(--gray-100)', color: 'var(--gray-600)' };
              return (
                <div key={d.id} style={{ padding: '12px 16px', borderBottom: i < importantDocs.length - 1 ? '1px solid var(--gray-200)' : 'none', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: 'var(--red-50)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileText size={14} color="var(--red-600)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4, marginBottom: 4 }}>{d.titulo}</div>
                      <span className="badge" style={{ background: tc.bg, color: tc.color }}>{d.tipo}</span>
                    </div>
                  </div>
                  <button className="btn-ghost" style={{ width: '100%', marginTop: 10, padding: '6px', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Download size={11} />Descarregar
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--gray-200)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-600)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Acesso rápido</div>
            {['Estatuto', 'Programa', 'Directriz'].map(t => {
              const tc = tipoColors[t] || { bg: 'var(--gray-100)', color: 'var(--gray-600)' };
              return (
                <button key={t} onClick={() => setFiltroTipo(t)} style={{ display: 'block', width: '100%', marginBottom: 6, padding: '7px 12px', borderRadius: 50, background: tc.bg, color: tc.color, fontSize: 12, fontWeight: 600, textAlign: 'left', border: 'none' }}>
                  {t}s
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
