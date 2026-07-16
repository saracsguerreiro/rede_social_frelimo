import { useState } from 'react';
import { Clock, MapPin, CheckCircle, Circle, ChevronLeft, ChevronRight } from 'lucide-react';
import { eventos } from '../data/mockData';

const tipoConfig = {
  cc: { label: 'Comité Central', borda: 'var(--red-600)', bg: 'var(--red-50)', cor: 'var(--red-800)' },
  formacao: { label: 'Formação', borda: '#7C3AED', bg: '#EDE9FE', cor: '#6D28D9' },
  assembleia: { label: 'Assembleia', borda: 'var(--green-600)', bg: 'var(--green-50)', cor: 'var(--green-800)' },
  organizacao: { label: 'Organização', borda: 'var(--yellow)', bg: '#FEF3C7', cor: '#92400E' },
  prazo: { label: 'Prazo', borda: 'var(--red-400)', bg: 'var(--red-50)', cor: 'var(--red-700)' },
};

function Calendar({ year, month, eventos, onSelectDay, selectedDay }) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon=0

  const eventDays = new Set(
    eventos
      .filter(e => { const d = new Date(e.data + 'T00:00:00'); return d.getFullYear() === year && d.getMonth() === month; })
      .map(e => new Date(e.data + 'T00:00:00').getDate())
  );

  const today = 16; // prototype: July 16
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <div style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      {/* Calendar header */}
      <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, var(--red-600), var(--red-800))', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'var(--white)', width: 28, height: 28, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={14} />
        </button>
        <span style={{ color: 'var(--white)', fontWeight: 800, fontSize: 16 }}>Julho 2026</span>
        <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'var(--white)', width: 28, height: 28, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--gray-100)', borderBottom: '1px solid var(--gray-200)' }}>
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
          <div key={d} style={{ padding: '8px 4px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase' }}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
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
                  onClick={() => onSelectDay(day)}
                  style={{
                    height: 40, width: '100%', borderRadius: 10,
                    background: isSelected ? 'var(--red-600)' : isToday ? 'var(--red-50)' : 'transparent',
                    color: isSelected ? 'var(--white)' : isToday ? 'var(--red-600)' : 'var(--black)',
                    border: isToday && !isSelected ? '2px solid var(--red-600)' : '2px solid transparent',
                    fontWeight: isToday || isSelected ? 800 : 400,
                    fontSize: 13,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                    cursor: 'pointer', transition: 'all 0.15s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--gray-100)'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = isSelected ? 'var(--red-600)' : 'transparent'; }}
                >
                  {day}
                  {hasEvent && (
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(Math.min(eventos.filter(e => { const d = new Date(e.data + 'T00:00:00'); return d.getDate() === day; }).length, 3))].map((_, i) => (
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

      {/* Legend */}
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

export default function Eventos({ setPage }) {
  const [confirmados, setConfirmados] = useState(new Set(eventos.filter(e => e.confirmado).map(e => e.id)));
  const [selectedDay, setSelectedDay] = useState(null);

  const eventosDoDia = selectedDay
    ? eventos.filter(e => { const d = new Date(e.data + 'T00:00:00'); return d.getDate() === selectedDay && d.getMonth() === 6; })
    : [];

  const eventosOrdenados = [...eventos].sort((a, b) => a.data.localeCompare(b.data));

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  return (
    <div style={{ display: 'flex', gap: 32, padding: '28px 32px', alignItems: 'flex-start' }}>

      {/* Centro — Calendário */}
      <div style={{ flex: 1, minWidth: 0 }}>
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

        <Calendar year={2026} month={6} eventos={eventos} onSelectDay={setSelectedDay} selectedDay={selectedDay} />

        {selectedDay && eventosDoDia.length > 0 && (
          <div style={{ marginTop: 14, background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--red-600)' }}>Eventos de {selectedDay} de Julho</div>
            {eventosDoDia.map(e => {
              const tc = tipoConfig[e.tipo];
              return (
                <div key={e.id} style={{ padding: '10px 14px', background: tc.bg, borderRadius: 14, borderLeft: `4px solid ${tc.borda}`, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: tc.cor }}>{e.titulo}</div>
                    {e.hora && <div style={{ fontSize: 11, color: tc.cor, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} />{e.hora}</div>}
                  </div>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.8)', color: tc.cor }}>{tc.label}</span>
                </div>
              );
            })}
          </div>
        )}
        {selectedDay && eventosDoDia.length === 0 && (
          <div style={{ marginTop: 14, background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', padding: '20px', textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>
            Sem eventos para {selectedDay} de Julho.
          </div>
        )}
      </div>

      {/* Coluna direita — descrição dos eventos */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <div className="widget">
          <div className="widget-header">
            <div className="widget-title" style={{ fontSize: 13 }}>Próximos Eventos</div>
          </div>
          <div style={{ padding: '6px 0', maxHeight: 600, overflowY: 'auto' }}>
            {eventosOrdenados.map((e, i) => {
              const tc = tipoConfig[e.tipo];
              const confirmado = confirmados.has(e.id);
              const d = new Date(e.data + 'T00:00:00');
              return (
                <div key={e.id} style={{ padding: '14px 16px', borderBottom: i < eventosOrdenados.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 44, flexShrink: 0, textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: tc.borda, lineHeight: 1 }}>{d.getDate()}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase' }}>
                        {d.toLocaleDateString('pt-PT', { month: 'short' })}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="badge" style={{ background: tc.bg, color: tc.cor, marginBottom: 5 }}>{tc.label}</span>
                      <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, marginTop: 4 }}>{e.titulo}</div>
                      {e.hora && <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} />{e.hora}</div>}
                      {e.local && <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={10} />{e.local}</div>}
                    </div>
                  </div>
                  {e.tipo !== 'prazo' && (
                    <button
                      onClick={() => setConfirmados(prev => { const n = new Set(prev); confirmado ? n.delete(e.id) : n.add(e.id); return n; })}
                      style={{ width: '100%', padding: '7px', borderRadius: 50, fontSize: 11, fontWeight: 700, background: confirmado ? 'var(--green-50)' : 'var(--gray-100)', color: confirmado ? 'var(--green-700)' : 'var(--gray-600)', border: `1.5px solid ${confirmado ? 'var(--green-400)' : 'var(--gray-200)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                    >
                      {confirmado ? <><CheckCircle size={12} />Confirmado</> : <><Circle size={12} />Confirmar presença</>}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
