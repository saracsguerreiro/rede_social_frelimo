import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, Circle } from 'lucide-react';
import { eventos } from '../data/mockData';

const tipoConfig = {
  cc: { label: 'Comité Central', bg: 'var(--red-50)', color: 'var(--red-800)', borda: 'var(--red-600)' },
  formacao: { label: 'Formação', bg: '#EDE9FE', color: '#6D28D9', borda: '#7C3AED' },
  assembleia: { label: 'Assembleia', bg: 'var(--green-50)', color: 'var(--green-800)', borda: 'var(--green-600)' },
  organizacao: { label: 'Organização', bg: '#FEF3C7', color: '#92400E', borda: 'var(--yellow)' },
  prazo: { label: 'Prazo', bg: 'var(--red-50)', color: 'var(--red-800)', borda: 'var(--red-400)' },
};

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function Eventos() {
  const [confirmados, setConfirmados] = useState(new Set(eventos.filter(e => e.confirmado).map(e => e.id)));

  const agrupados = eventos.reduce((acc, e) => {
    if (!acc[e.data]) acc[e.data] = [];
    acc[e.data].push(e);
    return acc;
  }, {});

  const datasOrdenadas = Object.keys(agrupados).sort();

  return (
    <div style={{ padding: '24px', maxWidth: 760 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
        <div className="card" style={{ flex: 1, padding: '14px', borderLeft: '4px solid var(--red-600)', display: 'flex', gap: 12 }}>
          <Calendar size={28} color="var(--red-600)" />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{eventos.length}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Próximos eventos</div>
          </div>
        </div>
        <div className="card" style={{ flex: 1, padding: '14px', borderLeft: '4px solid var(--green-600)', display: 'flex', gap: 12 }}>
          <CheckCircle size={28} color="var(--green-600)" />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{confirmados.size}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Presenças confirmadas</div>
          </div>
        </div>
      </div>

      {datasOrdenadas.map(data => (
        <div key={data} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ padding: '6px 14px', background: 'var(--black)', color: 'var(--white)', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
              {formatDate(data)}
            </div>
            <div style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {agrupados[data].map(e => {
              const tc = tipoConfig[e.tipo];
              const confirmado = confirmados.has(e.id);

              return (
                <div key={e.id} className="card" style={{ padding: '16px 20px', borderLeft: `4px solid ${tc.borda}`, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span className="badge" style={{ background: tc.bg, color: tc.color }}>{tc.label}</span>
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{e.titulo}</h3>
                    <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--gray-400)' }}>
                      {e.hora && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} />{e.hora}</span>
                      )}
                      {e.local && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{e.local}</span>
                      )}
                    </div>
                  </div>

                  {e.tipo !== 'prazo' && (
                    <button
                      onClick={() => {
                        setConfirmados(prev => {
                          const next = new Set(prev);
                          confirmado ? next.delete(e.id) : next.add(e.id);
                          return next;
                        });
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 14px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                        background: confirmado ? 'var(--green-50)' : 'var(--white)',
                        color: confirmado ? 'var(--green-600)' : 'var(--gray-600)',
                        border: `1px solid ${confirmado ? 'var(--green-600)' : 'var(--gray-200)'}`,
                        flexShrink: 0,
                      }}
                    >
                      {confirmado ? <CheckCircle size={13} /> : <Circle size={13} />}
                      {confirmado ? 'Confirmado' : 'Confirmar'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
