import { useState } from 'react';
import { CheckCircle, Circle, Clock, Users, ChevronRight, Megaphone, Bell, FileSignature } from 'lucide-react';
import { circulares, currentUser } from '../data/mockData';

const tipoConfig = {
  circular: { label: 'Circular', cor: 'var(--red-600)', bg: 'var(--red-50)', icon: FileSignature },
  convocatoria: { label: 'Convocatória', cor: 'var(--green-600)', bg: 'var(--green-50)', icon: Bell },
  comunicado: { label: 'Comunicado', cor: '#6B7280', bg: 'var(--gray-100)', icon: Megaphone },
};

const prioridadeConfig = {
  alta: { label: 'Urgente', cor: 'var(--red-600)', bg: 'var(--red-50)' },
  media: { label: 'Normal', cor: 'var(--green-600)', bg: 'var(--green-50)' },
  normal: { label: '', cor: '', bg: '' },
};

export default function Feed() {
  const [lidas, setLidas] = useState(new Set(circulares.filter(c => c.lida).map(c => c.id)));
  const [expandido, setExpandido] = useState(null);

  function marcarLida(id) {
    setLidas(prev => new Set([...prev, id]));
  }

  const naolidas = circulares.filter(c => !lidas.has(c.id)).length;

  return (
    <div style={{ maxWidth: 760, padding: '24px' }}>
      {/* Header stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ flex: 1, padding: '16px', borderLeft: '4px solid var(--red-600)' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--red-600)' }}>{naolidas}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 2 }}>Por ler</div>
        </div>
        <div className="card" style={{ flex: 1, padding: '16px', borderLeft: '4px solid var(--green-600)' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--green-600)' }}>{circulares.length}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 2 }}>Total este mês</div>
        </div>
        <div className="card" style={{ flex: 1, padding: '16px', borderLeft: '4px solid var(--yellow)' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--black)' }}>2</div>
          <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 2 }}>Com confirmação pendente</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['Todos', 'Por ler', 'Circulares', 'Convocatórias'].map(f => (
          <button key={f} style={{
            padding: '6px 14px', borderRadius: 4, fontSize: 12, fontWeight: 600,
            background: f === 'Todos' ? 'var(--red-600)' : 'var(--white)',
            color: f === 'Todos' ? 'var(--white)' : 'var(--gray-600)',
            border: '1px solid var(--gray-200)',
          }}>{f}</button>
        ))}
      </div>

      {/* Feed items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {circulares.map(item => {
          const lida = lidas.has(item.id);
          const tipo = tipoConfig[item.tipo];
          const TipoIcon = tipo.icon;
          const prio = prioridadeConfig[item.prioridade];
          const aberto = expandido === item.id;

          return (
            <div key={item.id} className="card" style={{
              padding: 0,
              borderLeft: `4px solid ${lida ? 'var(--gray-200)' : tipo.cor}`,
              opacity: lida ? 0.85 : 1,
            }}>
              <div
                style={{ padding: '16px 20px', cursor: 'pointer' }}
                onClick={() => setExpandido(aberto ? null : item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 6,
                    background: tipo.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <TipoIcon size={16} color={tipo.cor} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span className="badge" style={{ background: tipo.bg, color: tipo.cor }}>{tipo.label}</span>
                      {prio.label && <span className="badge" style={{ background: prio.bg, color: prio.cor }}>{prio.label}</span>}
                      {!lida && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red-600)', display: 'inline-block' }} />}
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 4 }}>{item.titulo}</h3>
                    <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--gray-400)' }}>
                      <span>{item.autor}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} />{item.data}</span>
                      <span>{item.orgao}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--gray-400)" style={{ transform: aberto ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', marginTop: 2 }} />
                </div>
              </div>

              {aberto && (
                <div style={{ borderTop: '1px solid var(--gray-200)', padding: '16px 20px', background: 'var(--gray-100)' }}>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--black)', marginBottom: 16 }}>{item.corpo}</p>

                  {item.confirmados !== null && (
                    <div style={{ display: 'flex', gap: 16, marginBottom: 16, padding: '12px', background: 'var(--white)', borderRadius: 6, border: '1px solid var(--gray-200)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Users size={14} color="var(--green-600)" />
                        <span style={{ fontSize: 12 }}><strong style={{ color: 'var(--green-600)' }}>{item.confirmados}</strong> confirmações</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>de {item.total} convocados</div>
                      <div style={{ flex: 1, height: 6, background: 'var(--gray-200)', borderRadius: 3, alignSelf: 'center' }}>
                        <div style={{ width: `${(item.confirmados / item.total) * 100}%`, height: '100%', background: 'var(--green-600)', borderRadius: 3 }} />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 8 }}>
                    {!lida && (
                      <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => marcarLida(item.id)}>
                        <CheckCircle size={13} style={{ marginRight: 6, display: 'inline' }} />Marcar como lida
                      </button>
                    )}
                    {item.confirmados !== null && (
                      <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 12 }}>Confirmar presença</button>
                    )}
                    <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: 12 }}>Descarregar</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
