import { useState } from 'react';
import { Clock, MapPin, CheckCircle, Circle, ChevronLeft, ChevronRight, CalendarCheck, History } from 'lucide-react';
import { eventos, eventosAnteriores } from '../data/mockData';
import AnuncioCard from '../components/AnuncioCard';

const tipoConfig = {
  cc:          { label: 'Comité Central', borda: 'var(--red-600)',   bg: 'var(--red-50)',   cor: 'var(--red-800)' },
  formacao:    { label: 'Formação',       borda: '#7C3AED',          bg: '#EDE9FE',         cor: '#6D28D9' },
  assembleia:  { label: 'Assembleia',     borda: 'var(--green-600)', bg: 'var(--green-50)', cor: 'var(--green-800)' },
  organizacao: { label: 'Organização',    borda: 'var(--yellow)',    bg: '#FEF3C7',         cor: '#92400E' },
  prazo:       { label: 'Prazo',          borda: 'var(--red-400)',   bg: 'var(--red-50)',   cor: 'var(--red-700)' },
};

function Calendar({ year, month, eventos, onSelectDay, selectedDay }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const eventDays = new Set(
    eventos
      .filter(e => { const d = new Date(e.data + 'T00:00:00'); return d.getFullYear() === year && d.getMonth() === month; })
      .map(e => new Date(e.data + 'T00:00:00').getDate())
  );

  const today = 16;
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <div style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, var(--red-600), var(--red-800))', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'var(--white)', width: 28, height: 28, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={14} />
        </button>
        <span style={{ color: 'var(--white)', fontWeight: 800, fontSize: 16 }}>Julho 2026</span>
        <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'var(--white)', width: 28, height: 28, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--gray-100)', borderBottom: '1px solid var(--gray-200)' }}>
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
          <div key={d} style={{ padding: '8px 4px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase' }}>{d}</div>
        ))}
      </div>

      <div style={{ padding: '8px' }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {week.map((day, di) => {
              if (!day) return <div key={di} />;
              const hasEvent = eventDays.has(day);
              const isToday = day === today;
              const isSelected = day === selectedDay;
              return (
                <button
                  key={di}
                  onClick={() => onSelectDay(isSelected ? null : day)}
                  style={{
                    height: 40, width: '100%', borderRadius: 10,
                    background: isSelected ? 'var(--red-600)' : isToday ? 'var(--red-50)' : 'transparent',
                    color: isSelected ? 'var(--white)' : isToday ? 'var(--red-600)' : 'var(--black)',
                    border: isToday && !isSelected ? '2px solid var(--red-600)' : '2px solid transparent',
                    fontWeight: isToday || isSelected ? 800 : 400,
                    fontSize: 13,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--gray-100)'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = isToday ? 'var(--red-50)' : 'transparent'; }}
                >
                  {day}
                  {hasEvent && (
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(Math.min(eventos.filter(e => new Date(e.data + 'T00:00:00').getDate() === day).length, 3))].map((_, i) => (
                        <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? 'var(--white)' : 'var(--red-600)' }} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 16px 14px', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--gray-600)' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red-600)' }} />Evento marcado
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--gray-600)' }}>
          <div style={{ width: 12, height: 12, borderRadius: 4, border: '2px solid var(--red-600)', background: 'var(--red-50)' }} />Hoje
        </div>
      </div>
    </div>
  );
}

export default function Eventos({ setPage, mobile }) {
  const [confirmados, setConfirmados] = useState(new Set(eventos.filter(e => e.confirmado).map(e => e.id)));
  const [selectedDay, setSelectedDay] = useState(null);

  const eventosOrdenados = [...eventos].sort((a, b) => a.data.localeCompare(b.data));

  const eventosFiltrados = selectedDay
    ? eventosOrdenados.filter(e => new Date(e.data + 'T00:00:00').getDate() === selectedDay && new Date(e.data + 'T00:00:00').getMonth() === 6)
    : eventosOrdenados;

  const eventosConfirmados = eventosOrdenados.filter(e => confirmados.has(e.id));

  function toggleConfirmar(id) {
    setConfirmados(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  return (
    <div style={{ display: 'flex', gap: mobile ? 0 : 32, padding: mobile ? '14px 12px' : '28px 32px', alignItems: 'flex-start', flexDirection: mobile ? 'column' : 'row' }}>

      {/* ── Centro ── */}
      <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <div style={{ flex: 1, background: 'var(--white)', borderRadius: 16, padding: '14px 16px', border: '1px solid var(--gray-200)', borderLeft: '4px solid var(--red-600)' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--red-600)' }}>{eventos.length}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Próximos eventos</div>
          </div>
          <div style={{ flex: 1, background: 'var(--white)', borderRadius: 16, padding: '14px 16px', border: '1px solid var(--gray-200)', borderLeft: '4px solid var(--green-600)' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--green-600)' }}>{confirmados.size}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Presenças confirmadas</div>
          </div>
        </div>

        {/* Calendário */}
        <Calendar year={2026} month={6} eventos={eventos} onSelectDay={setSelectedDay} selectedDay={selectedDay} />

        {/* Próximos eventos — abaixo do calendário */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--gray-600)' }}>
              {selectedDay ? `Eventos de ${selectedDay} de Julho` : 'Próximos Eventos'}
            </h3>
            {selectedDay && (
              <button onClick={() => setSelectedDay(null)} style={{ fontSize: 11, color: 'var(--red-600)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Ver todos →
              </button>
            )}
          </div>

          {eventosFiltrados.length === 0 && (
            <div style={{ background: 'var(--white)', borderRadius: 16, border: '1px solid var(--gray-200)', padding: '20px', textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>
              Sem eventos para {selectedDay} de Julho.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {eventosFiltrados.map(e => {
              const tc = tipoConfig[e.tipo];
              const confirmado = confirmados.has(e.id);
              const d = new Date(e.data + 'T00:00:00');
              return (
                <div key={e.id} style={{ background: 'var(--white)', borderRadius: 16, border: '1px solid var(--gray-200)', borderLeft: `4px solid ${tc.borda}`, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  {/* Data */}
                  <div style={{ textAlign: 'center', flexShrink: 0, minWidth: 40 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: tc.borda, lineHeight: 1 }}>{d.getDate()}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase' }}>
                      {d.toLocaleDateString('pt-PT', { month: 'short' })}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span className="badge" style={{ background: tc.bg, color: tc.cor }}>{tc.label}</span>
                      {confirmado && <span style={{ fontSize: 10, color: 'var(--green-600)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}><CheckCircle size={10} />Confirmado</span>}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{e.titulo}</div>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                      {e.hora && <span style={{ fontSize: 11, color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={11} />{e.hora}</span>}
                      {e.local && <span style={{ fontSize: 11, color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={11} />{e.local}</span>}
                    </div>
                  </div>

                  {/* Botão */}
                  {e.tipo !== 'prazo' && (
                    <button
                      onClick={() => toggleConfirmar(e.id)}
                      style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 50, fontSize: 11, fontWeight: 700, background: confirmado ? 'var(--green-50)' : 'var(--gray-100)', color: confirmado ? 'var(--green-700)' : 'var(--gray-600)', border: `1.5px solid ${confirmado ? 'var(--green-400)' : 'var(--gray-200)'}`, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      {confirmado ? <><CheckCircle size={12} />Confirmado</> : <><Circle size={12} />Confirmar</>}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Coluna direita ── */}
      {!mobile && <div style={{ width: 280, flexShrink: 0 }}>
        <div className="widget">
          <div className="widget-header">
            <div className="widget-title">
              <CalendarCheck size={14} color="var(--green-600)" />
              Presenças Confirmadas
            </div>
          </div>

          {eventosConfirmados.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>
              Nenhuma presença confirmada ainda.
            </div>
          ) : (
            <div style={{ padding: '6px 0' }}>
              {eventosConfirmados.map((e, i) => {
                const tc = tipoConfig[e.tipo];
                const d = new Date(e.data + 'T00:00:00');
                return (
                  <div key={e.id} style={{ padding: '14px 16px', borderBottom: i < eventosConfirmados.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 42, flexShrink: 0, textAlign: 'center', background: tc.bg, borderRadius: 10, padding: '6px 4px' }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: tc.borda, lineHeight: 1 }}>{d.getDate()}</div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: tc.cor, textTransform: 'uppercase' }}>
                          {d.toLocaleDateString('pt-PT', { month: 'short' })}
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span className="badge" style={{ background: tc.bg, color: tc.cor, marginBottom: 4, display: 'inline-block' }}>{tc.label}</span>
                        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.35 }}>{e.titulo}</div>
                        {e.hora && <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} />{e.hora}</div>}
                        {e.local && <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={10} />{e.local}</div>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px', background: 'var(--green-50)', borderRadius: 50 }}>
                      <CheckCircle size={12} color="var(--green-600)" />
                      <span style={{ fontSize: 11, color: 'var(--green-700)', fontWeight: 700 }}>Presença confirmada</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ marginTop: 12 }}><AnuncioCard /></div>

        {/* Eventos anteriores */}
        <div className="widget" style={{ marginTop: 12 }}>
          <div className="widget-header">
            <div className="widget-title">
              <History size={14} color="var(--gray-500)" />
              Eventos Anteriores
            </div>
          </div>
          <div style={{ padding: '6px 0' }}>
            {eventosAnteriores.map((e, i) => {
              const tc = tipoConfig[e.tipo];
              const d = new Date(e.data + 'T00:00:00');
              return (
                <div key={e.id} style={{ padding: '13px 16px', borderBottom: i < eventosAnteriores.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ width: 42, flexShrink: 0, textAlign: 'center', background: 'var(--gray-100)', borderRadius: 10, padding: '6px 4px' }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--gray-500)', lineHeight: 1 }}>{d.getDate()}</div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase' }}>
                        {d.toLocaleDateString('pt-PT', { month: 'short' })}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span className="badge" style={{ background: tc.bg, color: tc.cor, marginBottom: 4, display: 'inline-block', opacity: 0.75 }}>{tc.label}</span>
                      <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.35, color: 'var(--gray-600)' }}>{e.titulo}</div>
                      {e.hora && <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={9} />{e.hora}</div>}
                      {e.local && <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={9} />{e.local}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      }
    </div>
  );
}
