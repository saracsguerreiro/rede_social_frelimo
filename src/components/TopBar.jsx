import { useState } from 'react';
import { Bell, Search, SquarePen, Tablet, Smartphone, Store, ShieldCheck, CreditCard, CheckSquare, Calendar, Info, X } from 'lucide-react';
import { currentUser } from '../data/mockData';

const pageTitles = {
  feed: 'Feed Oficial', mensagens: 'Mensagens', espacos: 'Espaços',
  documentos: 'Documentos', votacoes: 'Votações', formacao: 'Formação',
  directorio: 'Directório', eventos: 'Eventos', marketplace: 'Marketplace', administracao: 'Administração',
};

const NOTIFS_INIT = [
  {
    id: 1, tipo: 'quota',
    titulo: 'Quota de Julho em atraso',
    desc: 'A sua quota mensal de Julho ainda não foi paga. Regularize até 31 de Julho para manter o estatuto de militante em dia.',
    hora: 'Hoje, 09:15', lida: false,
  },
  {
    id: 2, tipo: 'votacao',
    titulo: 'Votação aberta — participe agora',
    desc: '"Aprovação do orçamento 2.º Semestre 2026" está aberta para votação. A sua participação é esperada até 22 de Julho.',
    hora: 'Hoje, 08:42', lida: false,
  },
  {
    id: 3, tipo: 'evento',
    titulo: 'Evento amanhã com presença confirmada',
    desc: 'Reunião do Comité Central — amanhã, 25 Jul às 09:00 em Maputo. Tem presença confirmada.',
    hora: 'Ontem, 16:30', lida: false,
  },
  {
    id: 4, tipo: 'sistema',
    titulo: 'Bem-vindo ao FRELIMO Connect',
    desc: 'O seu perfil foi activado com sucesso. Explore os espaços, documentos e votações disponíveis.',
    hora: '22 Jul, 10:00', lida: true,
  },
];

const TIPO = {
  quota:   { Icon: CreditCard,  cor: 'var(--red-600)',   bg: 'var(--red-50)'   },
  votacao: { Icon: CheckSquare, cor: 'var(--red-600)',   bg: 'var(--red-50)'   },
  evento:  { Icon: Calendar,    cor: 'var(--green-600)', bg: 'var(--green-50)' },
  sistema: { Icon: Info,        cor: 'var(--gray-500)',  bg: 'var(--gray-100)' },
};

function NotifPanel({ notifs, onMarcarLida, onMarcarTodas, onClose, mobile }) {
  const unread = notifs.filter(n => !n.lida).length;
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 98 }} />
      {/* Painel */}
      <div style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: mobile ? -8 : 0,
        width: mobile ? 'min(340px, calc(100vw - 24px))' : 360,
        background: 'var(--white)',
        borderRadius: 16,
        boxShadow: '0 12px 40px rgba(0,0,0,0.16)',
        border: '1px solid var(--gray-200)',
        zIndex: 99,
        overflow: 'hidden',
      }}>
        {/* Cabeçalho */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={14} color="var(--red-600)" />
          <span style={{ fontSize: 14, fontWeight: 800, flex: 1 }}>Notificações</span>
          {unread > 0 && (
            <span style={{ background: 'var(--red-600)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 50 }}>{unread}</span>
          )}
          {unread > 0 && (
            <button onClick={onMarcarTodas} style={{ fontSize: 11, color: 'var(--red-600)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}>
              Marcar todas como lidas
            </button>
          )}
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', padding: 4, display: 'flex' }}>
            <X size={14} />
          </button>
        </div>

        {/* Lista */}
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {notifs.map((n, i) => {
            const { Icon, cor, bg } = TIPO[n.tipo] || TIPO.sistema;
            return (
              <div
                key={n.id}
                onClick={() => onMarcarLida(n.id)}
                style={{
                  display: 'flex', gap: 12, padding: '13px 16px',
                  borderBottom: i < notifs.length - 1 ? '1px solid var(--gray-200)' : 'none',
                  background: n.lida ? 'transparent' : 'var(--red-50)',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (n.lida) e.currentTarget.style.background = 'var(--gray-50)'; }}
                onMouseLeave={e => { if (n.lida) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Ícone */}
                <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <Icon size={16} color={cor} />
                </div>

                {/* Conteúdo */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: n.lida ? 600 : 800, color: 'var(--black)', lineHeight: 1.3 }}>{n.titulo}</span>
                    {!n.lida && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--red-600)', flexShrink: 0, marginTop: 3 }} />}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)', lineHeight: 1.45, marginBottom: 5 }}>{n.desc}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', fontWeight: 600 }}>{n.hora}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé */}
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--gray-200)', textAlign: 'center' }}>
          <button style={{ fontSize: 12, color: 'var(--red-600)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
            Ver todas as notificações →
          </button>
        </div>
      </div>
    </>
  );
}

function NavBtn({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '6px 14px', borderRadius: 50, background: active ? 'var(--red-50)' : 'var(--white)', color: active ? 'var(--red-600)' : 'var(--gray-400)', border: `1.5px solid ${active ? 'var(--red-200)' : 'var(--gray-200)'}`, cursor: 'pointer', transition: 'all 0.15s' }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--red-50)'; e.currentTarget.style.color = 'var(--red-600)'; e.currentTarget.style.borderColor = 'var(--red-200)'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--gray-400)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; } }}
    >
      <Icon size={17} />
      <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase', lineHeight: 1 }}>{label}</span>
    </button>
  );
}

export default function TopBar({ page, tabletMode, setTabletMode, mobileMode, setMobileMode, onLogout, setPage }) {
  const [notifs, setNotifs] = useState(NOTIFS_INIT);
  const [painelAberto, setPainelAberto] = useState(false);

  const unread = notifs.filter(n => !n.lida).length;
  const marcarLida = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n));
  const marcarTodas = () => setNotifs(prev => prev.map(n => ({ ...n, lida: true })));
  const togglePainel = () => setPainelAberto(p => !p);

  if (mobileMode) {
    return (
      <header style={{
        height: 46, background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6, flexShrink: 0,
        position: 'relative', zIndex: 20,
      }}>
        <h1 style={{ fontSize: 14, fontWeight: 800, color: 'var(--black)', flex: 1 }}>
          {pageTitles[page] || 'FRELIMO'}
        </h1>
        {setPage && (
          <button onClick={() => setPage('marketplace')} style={{ background: 'none', padding: 6, color: 'var(--gray-600)', border: 'none', cursor: 'pointer' }}>
            <Store size={18} />
          </button>
        )}
        {setPage && (
          <button onClick={() => setPage('administracao')} style={{ background: 'none', padding: 6, color: 'var(--gray-600)', border: 'none', cursor: 'pointer' }}>
            <ShieldCheck size={18} />
          </button>
        )}
        <div style={{ position: 'relative' }}>
          <button onClick={togglePainel} style={{ position: 'relative', background: 'none', padding: 6, color: painelAberto ? 'var(--red-600)' : 'var(--gray-600)', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <Bell size={18} />
            {unread > 0 && <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, background: 'var(--red-600)', borderRadius: '50%', border: '1.5px solid var(--white)' }} />}
          </button>
          {painelAberto && <NotifPanel notifs={notifs} onMarcarLida={marcarLida} onMarcarTodas={marcarTodas} onClose={() => setPainelAberto(false)} mobile />}
        </div>
        <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{currentUser.avatar}</div>
      </header>
    );
  }

  return (
    <header style={{
      height: 58, background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12,
      position: 'sticky', top: 0, zIndex: 10, flexShrink: 0,
    }}>
      <h1 style={{ fontSize: 15, fontWeight: 800, color: 'var(--black)', flex: 1 }}>
        {pageTitles[page] || 'Plataforma FRELIMO'}
      </h1>

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-100)', border: '1.5px solid var(--gray-200)', borderRadius: 50, padding: '7px 16px', width: 200, transition: 'border-color 0.15s' }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--red-600)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
      >
        <Search size={13} color="var(--gray-400)" />
        <input placeholder="Pesquisar..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: 12, color: 'var(--black)', width: '100%' }} />
      </div>

      <button
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 50, background: 'var(--red-600)', color: 'var(--white)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'background 0.15s', flexShrink: 0 }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--red-800)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}
      >
        <SquarePen size={14} />Publicar
      </button>

      {/* Sino com painel */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={togglePainel}
          style={{ position: 'relative', background: painelAberto ? 'var(--red-50)' : 'none', padding: 8, borderRadius: 8, color: painelAberto ? 'var(--red-600)' : 'var(--gray-600)', border: 'none', cursor: 'pointer', display: 'flex', transition: 'background 0.15s' }}
        >
          <Bell size={18} />
          {unread > 0 && (
            <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, background: 'var(--red-600)', borderRadius: 50, border: '1.5px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', padding: '0 3px' }}>
              {unread}
            </span>
          )}
        </button>
        {painelAberto && (
          <NotifPanel
            notifs={notifs}
            onMarcarLida={marcarLida}
            onMarcarTodas={marcarTodas}
            onClose={() => setPainelAberto(false)}
            mobile={false}
          />
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
        <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{currentUser.avatar}</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{currentUser.nome}</div>
          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{currentUser.orgao}</div>
        </div>
      </div>

      {!tabletMode && (
        <>
          <div style={{ width: 1, height: 28, background: 'var(--gray-200)', flexShrink: 0 }} />
          <NavBtn label="Tablet" icon={Tablet} active={false} onClick={() => setTabletMode(m => !m)} />
          <NavBtn label="Mobile" icon={Smartphone} active={false} onClick={() => setMobileMode(true)} />
        </>
      )}
    </header>
  );
}
