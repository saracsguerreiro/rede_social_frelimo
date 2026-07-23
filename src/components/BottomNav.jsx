import { useState } from 'react';
import { Rss, MessageSquare, Grid, Calendar, Users, FileText, CheckSquare, BookOpen, LayoutGrid, X } from 'lucide-react';

const mainTabs = [
  { id: 'feed',      label: 'Início',  icon: Rss,           badge: 0 },
  { id: 'mensagens', label: 'Chat',    icon: MessageSquare, badge: 10 },
  { id: 'espacos',   label: 'Espaços', icon: Grid,          badge: 0 },
  { id: 'eventos',   label: 'Eventos', icon: Calendar,      badge: 0 },
];

const moreTabs = [
  { id: 'directorio', label: 'Directório', icon: Users },
  { id: 'documentos', label: 'Documentos', icon: FileText },
  { id: 'votacoes',   label: 'Votações',   icon: CheckSquare },
  { id: 'formacao',   label: 'Formação',   icon: BookOpen },
];

export default function BottomNav({ page, setPage }) {
  const [showMore, setShowMore] = useState(false);
  const isInMore = !mainTabs.some(t => t.id === page);

  function navigate(id) {
    setPage(id);
    setShowMore(false);
  }

  return (
    <>
      {showMore && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div onClick={() => setShowMore(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
          <div style={{ position: 'relative', background: 'var(--white)', borderRadius: '22px 22px 0 0', padding: '18px 18px 80px', zIndex: 1, boxShadow: '0 -8px 32px rgba(0,0,0,0.14)' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--gray-300)', margin: '0 auto 16px' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--black)' }}>Mais páginas</span>
              <button onClick={() => setShowMore(false)} style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gray-100)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={14} color="var(--gray-600)" />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {moreTabs.map(tab => {
                const Icon = tab.icon;
                const active = page === tab.id;
                return (
                  <button key={tab.id} onClick={() => navigate(tab.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '13px 6px', borderRadius: 16, background: active ? 'var(--red-50)' : 'var(--gray-100)', border: `1.5px solid ${active ? 'var(--red-200)' : 'transparent'}`, cursor: 'pointer', position: 'relative' }}>
                    <Icon size={22} color={active ? 'var(--red-600)' : 'var(--gray-600)'} />
                    <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? 'var(--red-600)' : 'var(--gray-600)', textAlign: 'center', lineHeight: 1.2 }}>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <nav style={{ height: 62, background: 'var(--white)', borderTop: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', padding: '0 4px 4px', flexShrink: 0, position: 'relative', zIndex: 51 }}>
        {mainTabs.map(tab => {
          const Icon = tab.icon;
          const active = page === tab.id;
          return (
            <button key={tab.id} onClick={() => navigate(tab.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '6px 4px', background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
              {tab.badge > 0 && !active && (
                <span style={{ position: 'absolute', top: 2, right: '50%', transform: 'translateX(14px)', background: 'var(--red-600)', color: 'var(--white)', width: 16, height: 16, borderRadius: '50%', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{tab.badge}</span>
              )}
              {active && (
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 28, height: 3, borderRadius: '0 0 3px 3px', background: 'var(--red-600)' }} />
              )}
              <Icon size={22} color={active ? 'var(--red-600)' : 'var(--gray-400)'} />
              <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, color: active ? 'var(--red-600)' : 'var(--gray-400)' }}>{tab.label}</span>
            </button>
          );
        })}

        <button onClick={() => setShowMore(s => !s)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '6px 4px', background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
          {(isInMore || showMore) && (
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 28, height: 3, borderRadius: '0 0 3px 3px', background: 'var(--red-600)' }} />
          )}
          <LayoutGrid size={22} color={isInMore || showMore ? 'var(--red-600)' : 'var(--gray-400)'} />
          <span style={{ fontSize: 9, fontWeight: isInMore || showMore ? 700 : 400, color: isInMore || showMore ? 'var(--red-600)' : 'var(--gray-400)' }}>Mais</span>
        </button>
      </nav>
    </>
  );
}
