import { CheckCircle, BookOpen, Calendar, Grid, MessageSquare } from 'lucide-react';
import { currentUser } from '../data/mockData';

export default function LeftColumn({ page, setPage }) {
  return (
    <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Profile card */}
      <div className="widget" style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 0 }}>
        <div style={{ height: 54, background: 'linear-gradient(135deg, var(--red-600), var(--red-800))' }} />
        <div style={{ padding: '0 16px 16px', marginTop: -26 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--white)', padding: 3, marginBottom: 10,
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: 'var(--red-600)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--white)', fontWeight: 900, fontSize: 16,
            }}>{currentUser.avatar}</div>
          </div>
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 2 }}>{currentUser.nome}</div>
          <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 1 }}>{currentUser.cargo}</div>
          <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 10 }}>{currentUser.orgao}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <CheckCircle size={12} color="var(--green-600)" />
            <span style={{ fontSize: 11, color: 'var(--green-700)', fontWeight: 600 }}>Quotas em dia</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: 'var(--gray-400)', fontFamily: 'monospace', letterSpacing: 0.5 }}>{currentUser.cartao}</div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="widget" style={{ marginBottom: 0 }}>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--gray-400)', marginBottom: 12 }}>Resumo</div>
          {[
            { label: 'Mensagens', val: '3 novas', color: 'var(--red-600)', icon: MessageSquare, page: 'mensagens' },
            { label: 'Espaços activos', val: '3', color: 'var(--green-600)', icon: Grid, page: 'espacos' },
            { label: 'Formação', val: '37%', color: '#7C3AED', icon: BookOpen, page: 'formacao' },
            { label: 'Próx. evento', val: '22 Jul', color: 'var(--black)', icon: Calendar, page: 'eventos' },
          ].map(s => (
            <button key={s.label} onClick={() => setPage(s.page)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
              background: 'none', borderBottom: '1px solid var(--gray-200)', textAlign: 'left',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={13} color={s.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>{s.label}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.val}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
