import { BookOpen, Play, CheckCircle, Clock, ChevronRight, AlertTriangle, Zap } from 'lucide-react';
import { cursos, formacaoImportante } from '../data/mockData';

const nivelColors = {
  'Base': { bg: 'var(--green-50)', color: 'var(--green-800)' },
  'Intermédio': { bg: '#FEF3C7', color: '#92400E' },
  'Avançado': { bg: 'var(--red-50)', color: 'var(--red-800)' },
};

export default function Formacao({ setPage, mobile }) {
  return (
    <div style={{ display: 'flex', gap: mobile ? 0 : 32, padding: mobile ? '14px 12px' : '28px 32px', alignItems: 'flex-start', flexDirection: mobile ? 'column' : 'row' }}>

      {/* Centro */}
      <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
        {/* Progress overview */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { v: 1, l: 'Em curso', c: 'var(--red-600)' },
            { v: 1, l: 'Concluídos', c: 'var(--green-600)' },
            { v: 2, l: 'Disponíveis', c: 'var(--gray-400)' },
          ].map(s => (
            <div key={s.l} style={{ flex: 1, background: 'var(--white)', borderRadius: 16, padding: '14px 16px', border: '1px solid var(--gray-200)', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
          <div style={{ flex: 2, background: 'var(--white)', borderRadius: 16, padding: '14px 16px', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>Progresso geral</div>
              <div style={{ height: 10, background: 'var(--gray-200)', borderRadius: 50, width: 160 }}>
                <div style={{ width: '37%', height: '100%', background: 'var(--red-600)', borderRadius: 50 }} />
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--red-600)' }}>37%</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 14 }}>
          {cursos.map(curso => {
            const pct = Math.round((curso.concluidos / curso.modulos) * 100);
            const nc = nivelColors[curso.nivel];
            return (
              <div key={curso.id} style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  padding: '14px 18px', borderRadius: '20px 20px 0 0',
                  background: curso.estado === 'concluido' ? 'linear-gradient(135deg,var(--green-600),var(--green-800))' : curso.estado === 'em_curso' ? 'linear-gradient(135deg,var(--red-600),var(--red-800))' : 'var(--black)',
                  display: 'flex', alignItems: 'center', gap: 9,
                }}>
                  <BookOpen size={16} color="var(--white)" />
                  <span style={{ color: 'var(--white)', fontSize: 13, fontWeight: 700, flex: 1 }}>{curso.titulo}</span>
                  {curso.estado === 'concluido' && <CheckCircle size={16} color="var(--white)" />}
                </div>
                <div style={{ padding: '14px 18px', flex: 1 }}>
                  <p style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 12, lineHeight: 1.6 }}>{curso.descricao}</p>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    <span className="badge" style={{ background: nc.bg, color: nc.color }}>{curso.nivel}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--gray-400)' }}><Clock size={10} />{curso.duracao}</span>
                    <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{curso.modulos} módulos</span>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, marginBottom: 5, color: 'var(--gray-600)' }}>
                      <span>{curso.concluidos}/{curso.modulos} módulos</span>
                      <span>{pct}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 50 }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: curso.estado === 'concluido' ? 'var(--green-600)' : 'var(--red-600)', borderRadius: 50 }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: '0 18px 16px' }}>
                  <button className={curso.estado === 'concluido' ? 'btn-ghost' : 'btn-primary'} style={{ width: '100%', padding: '9px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {curso.estado === 'concluido' ? <><CheckCircle size={13} />Rever</> : curso.estado === 'em_curso' ? <><Play size={13} />Continuar</> : <>Começar <ChevronRight size={13} /></>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coluna direita — Consulta rápida */}
      {!mobile && <div style={{ width: 260, flexShrink: 0 }}>
        <div className="widget">
          <div className="widget-header">
            <div className="widget-title"><Zap size={14} color="var(--yellow)" fill="var(--yellow)" />Consulta Rápida</div>
          </div>
          <div style={{ padding: '8px 0' }}>
            {formacaoImportante.map((item, i) => (
              <div key={i} style={{ padding: '12px 16px', borderBottom: i < formacaoImportante.length - 1 ? '1px solid var(--gray-200)' : 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  {item.urgente ? <AlertTriangle size={13} color="var(--red-600)" style={{ flexShrink: 0, marginTop: 2 }} /> : <BookOpen size={13} color="var(--gray-400)" style={{ flexShrink: 0, marginTop: 2 }} />}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4, marginBottom: 4 }}>{item.titulo}</div>
                    {item.prazo && (
                      <span style={{ padding: '2px 10px', background: item.urgente ? 'var(--red-50)' : 'var(--gray-100)', color: item.urgente ? 'var(--red-700)' : 'var(--gray-600)', borderRadius: 50, fontSize: 10, fontWeight: 700 }}>
                        Prazo: {item.prazo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="widget" style={{ padding: '16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12 }}>Recursos de Apoio</div>
          {['Manual do Militante', 'Glossário Político', 'Cronograma de Formações'].map((r, i) => (
            <button key={i} style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 8, padding: '8px 0', background: 'none', borderBottom: '1px solid var(--gray-200)', textAlign: 'left' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--red-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={13} color="var(--red-600)" />
              </div>
              <span style={{ fontSize: 12, flex: 1 }}>{r}</span>
              <ChevronRight size={12} color="var(--gray-400)" />
            </button>
          ))}
        </div>
      </div>
      }
    </div>
  );
}
