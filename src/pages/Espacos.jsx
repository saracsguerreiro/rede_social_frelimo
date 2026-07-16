import { Users, FileText, TrendingUp } from 'lucide-react';
import { espacos } from '../data/mockData';

const nivelLabel = {
  nacional: { label: 'Nacional', cor: 'var(--red-600)', bg: 'var(--red-50)' },
  provincial: { label: 'Provincial', cor: 'var(--green-600)', bg: 'var(--green-50)' },
  distrital: { label: 'Distrital', cor: '#6B7280', bg: 'var(--gray-100)' },
  organizacao: { label: 'Organização', cor: '#7C3AED', bg: '#F3E8FF' },
};

const hierarquia = ['nacional', 'provincial', 'distrital', 'organizacao'];

export default function Espacos() {
  const grupos = hierarquia.reduce((acc, nivel) => {
    const items = espacos.filter(e => e.nivel === nivel);
    if (items.length) acc[nivel] = items;
    return acc;
  }, {});

  return (
    <div style={{ padding: '24px', maxWidth: 900 }}>
      {/* Hierarchy diagram */}
      <div className="card" style={{ marginBottom: 24, padding: '16px 20px', background: 'var(--black)', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, fontSize: 12, fontWeight: 600 }}>
          {['Comité Central', 'Província', 'Distrito', 'Célula'].map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                padding: '6px 14px', borderRadius: 4,
                background: i === 0 ? 'var(--red-600)' : i === 1 ? 'var(--green-600)' : i === 2 ? 'var(--gray-600)' : 'var(--gray-400)',
                color: 'var(--white)', fontSize: 11,
              }}>{label}</div>
              {i < 3 && <div style={{ width: 24, height: 2, background: 'rgba(255,255,255,0.3)' }} />}
            </div>
          ))}
          <div style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Estrutura orgânica da plataforma</div>
        </div>
      </div>

      {Object.entries(grupos).map(([nivel, items]) => {
        const config = nivelLabel[nivel];
        return (
          <div key={nivel} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ height: 3, width: 24, background: config.cor, borderRadius: 2 }} />
              <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: config.cor }}>
                {config.label}
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {items.map(e => (
                <div key={e.id} className="card" style={{ padding: 0, cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onMouseEnter={el => el.currentTarget.style.borderColor = config.cor}
                  onMouseLeave={el => el.currentTarget.style.borderColor = 'var(--gray-200)'}
                >
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 6,
                      background: e.cor === 'red' ? 'var(--red-600)' : 'var(--green-600)',
                      color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 13, flexShrink: 0,
                    }}>{e.icone}</div>
                    <div>
                      <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{e.nome}</h3>
                      <span className="badge" style={{ background: config.bg, color: config.cor }}>{config.label}</span>
                    </div>
                  </div>
                  <div style={{ padding: '12px 16px' }}>
                    <p style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 12 }}>{e.descricao}</p>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--gray-600)' }}>
                        <Users size={12} />{e.membros} membros
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--green-600)' }}>
                        <TrendingUp size={12} />{e.activos} activos
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--gray-400)' }}>
                        <FileText size={12} />{e.publicacoes}
                      </div>
                    </div>
                    <div style={{ marginTop: 10, height: 4, background: 'var(--gray-200)', borderRadius: 2 }}>
                      <div style={{ width: `${(e.activos / e.membros) * 100}%`, height: '100%', background: config.cor, borderRadius: 2 }} />
                    </div>
                  </div>
                  <div style={{ padding: '0 16px 12px' }}>
                    <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: 12, background: config.cor }}>
                      Entrar no Espaço
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
