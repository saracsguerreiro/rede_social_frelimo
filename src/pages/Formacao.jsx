import { BookOpen, Play, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { cursos } from '../data/mockData';

const nivelColors = {
  'Base': { bg: 'var(--green-50)', color: 'var(--green-800)' },
  'Intermédio': { bg: '#FEF3C7', color: '#92400E' },
  'Avançado': { bg: 'var(--red-50)', color: 'var(--red-800)' },
};

export default function Formacao() {
  return (
    <div style={{ padding: '24px', maxWidth: 860 }}>
      {/* Summary bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'Em curso', valor: 1, cor: 'var(--red-600)' },
          { label: 'Concluídos', valor: 1, cor: 'var(--green-600)' },
          { label: 'Disponíveis', valor: 2, cor: 'var(--gray-400)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ flex: 1, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.cor }}>{s.valor}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
        <div className="card" style={{ flex: 2, padding: '16px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>Progresso geral</div>
            <div style={{ height: 10, background: 'var(--gray-200)', borderRadius: 5, width: 180 }}>
              <div style={{ width: '37%', height: '100%', background: 'var(--red-600)', borderRadius: 5 }} />
            </div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--red-600)' }}>37%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {cursos.map(curso => {
          const pct = Math.round((curso.concluidos / curso.modulos) * 100);
          const nc = nivelColors[curso.nivel];

          return (
            <div key={curso.id} className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <div style={{
                padding: '16px 20px',
                background: curso.estado === 'concluido' ? 'var(--green-600)' : curso.estado === 'em_curso' ? 'var(--red-600)' : 'var(--black)',
                borderRadius: '6px 6px 0 0',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <BookOpen size={18} color="var(--white)" />
                <span style={{ color: 'var(--white)', fontSize: 13, fontWeight: 700, flex: 1 }}>{curso.titulo}</span>
                {curso.estado === 'concluido' && <CheckCircle size={18} color="var(--white)" />}
              </div>

              <div style={{ padding: '16px 20px', flex: 1 }}>
                <p style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 16, lineHeight: 1.6 }}>{curso.descricao}</p>

                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span className="badge" style={{ background: nc.bg, color: nc.color }}>{curso.nivel}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--gray-400)' }}>
                    <Clock size={11} />{curso.duracao}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{curso.modulos} módulos</span>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, marginBottom: 6, color: 'var(--gray-600)' }}>
                    <span>{curso.concluidos}/{curso.modulos} módulos concluídos</span>
                    <span>{pct}%</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 3 }}>
                    <div style={{
                      width: `${pct}%`, height: '100%', borderRadius: 3,
                      background: curso.estado === 'concluido' ? 'var(--green-600)' : 'var(--red-600)',
                    }} />
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 20px 16px' }}>
                <button
                  className={curso.estado === 'concluido' ? 'btn-ghost' : 'btn-primary'}
                  style={{ width: '100%', padding: '10px', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  {curso.estado === 'concluido' ? (
                    <><CheckCircle size={14} />Rever Conteúdo</>
                  ) : curso.estado === 'em_curso' ? (
                    <><Play size={14} />Continuar</>
                  ) : (
                    <>Começar Curso <ChevronRight size={14} /></>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
