import { useState } from 'react';
import { FileText, Download, Search, Filter } from 'lucide-react';
import { documentos } from '../data/mockData';

const tipoColors = {
  'Estatuto': { bg: 'var(--red-50)', color: 'var(--red-800)' },
  'Programa': { bg: 'var(--red-50)', color: 'var(--red-800)' },
  'Directriz': { bg: 'var(--green-50)', color: 'var(--green-800)' },
  'Acta': { bg: 'var(--gray-100)', color: 'var(--gray-600)' },
  'Formação': { bg: '#EDE9FE', color: '#6D28D9' },
  'Relatório': { bg: '#FEF3C7', color: '#92400E' },
};

export default function Documentos() {
  const [busca, setBusca] = useState('');
  const filtrados = documentos.filter(d =>
    d.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    d.tipo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', maxWidth: 860 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 4, padding: '0 14px' }}>
          <Search size={14} color="var(--gray-400)" />
          <input className="input" style={{ border: 'none', padding: '10px 0' }} placeholder="Pesquisar documentos..." value={busca} onChange={e => setBusca(e.target.value)} />
        </div>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Filter size={14} />Filtrar
        </button>
        <button className="btn-primary" style={{ fontSize: 12 }}>+ Publicar Documento</button>
      </div>

      {/* Tipo tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['Todos', ...Object.keys(tipoColors)].map(t => (
          <button key={t} style={{
            padding: '5px 12px', borderRadius: 3, fontSize: 11, fontWeight: 600, border: '1px solid var(--gray-200)',
            background: t === 'Todos' ? 'var(--black)' : 'var(--white)',
            color: t === 'Todos' ? 'var(--white)' : 'var(--gray-600)',
          }}>{t}</button>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--gray-100)', borderBottom: '2px solid var(--gray-200)' }}>
              {['Documento', 'Tipo', 'Órgão', 'Data', 'Tamanho', ''].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((doc, i) => {
              const tc = tipoColors[doc.tipo] || { bg: 'var(--gray-100)', color: 'var(--gray-600)' };
              return (
                <tr key={doc.id} style={{ borderBottom: '1px solid var(--gray-200)', background: i % 2 === 0 ? 'var(--white)' : 'var(--gray-100)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, background: 'var(--red-50)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FileText size={14} color="var(--red-600)" />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{doc.titulo}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="badge" style={{ background: tc.bg, color: tc.color }}>{doc.tipo}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--gray-600)' }}>{doc.orgao}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--gray-600)' }}>{doc.data}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--gray-400)' }}>{doc.tamanho}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button className="btn-ghost" style={{ padding: '6px 12px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Download size={12} />Descarregar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div className="empty-state">Nenhum documento encontrado.</div>
        )}
      </div>
    </div>
  );
}
