import { useState } from 'react';
import './styles/globals.css';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import Feed from './pages/Feed';
import Mensagens from './pages/Mensagens';
import Espacos from './pages/Espacos';
import Documentos from './pages/Documentos';
import Votacoes from './pages/Votacoes';
import Formacao from './pages/Formacao';
import Directorio from './pages/Directorio';
import Eventos from './pages/Eventos';
import Administracao from './pages/Administracao';

const pages = {
  feed: Feed, mensagens: Mensagens, espacos: Espacos,
  documentos: Documentos, votacoes: Votacoes, formacao: Formacao,
  directorio: Directorio, eventos: Eventos, administracao: Administracao,
};

const EXIT_BUTTON_STYLE = {
  position: 'fixed', top: 20, left: 24, zIndex: 100,
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '9px 18px', borderRadius: 50,
  background: 'rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.18)',
  backdropFilter: 'blur(8px)',
  fontSize: 13, fontWeight: 600, cursor: 'pointer',
};

function TabletFrame({ children, onExit }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--white)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 40px', overflow: 'auto', position: 'relative',
    }}>
      <button onClick={onExit} style={EXIT_BUTTON_STYLE}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
      >← Versão Web</button>

      <div style={{
        width: 1120, height: 800,
        background: 'linear-gradient(160deg, #3e3e40 0%, #1c1c1e 45%, #2c2c2e 100%)',
        borderRadius: 44, padding: '18px 20px',
        boxShadow: '0 70px 160px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.11)',
        position: 'relative', flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 9, height: 9, borderRadius: '50%', background: '#111', border: '1px solid rgba(255,255,255,0.06)' }} />
        {[{ top: 110, h: 35 }, { top: 155, h: 35 }].map(({ top, h }, i) => (
          <div key={i} style={{ position: 'absolute', left: -6, top, width: 6, height: h, borderRadius: '3px 0 0 3px', background: 'linear-gradient(90deg, #222224, #3a3a3c)', boxShadow: '-2px 0 5px rgba(0,0,0,0.5)' }} />
        ))}
        <div style={{ position: 'absolute', right: -6, top: 130, width: 6, height: 54, borderRadius: '0 3px 3px 0', background: 'linear-gradient(90deg, #3a3a3c, #222224)', boxShadow: '2px 0 5px rgba(0,0,0,0.5)' }} />
        <div style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', width: 140, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.16)' }} />
        <div style={{ width: '100%', height: '100%', background: '#f7f7f8', borderRadius: 28, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Protótipo Interactivo · FRELIMO Connect</div>
      </div>
    </div>
  );
}

function MobileFrame({ children, onExit }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--white)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px', overflow: 'auto', position: 'relative',
    }}>
      <button onClick={onExit} style={EXIT_BUTTON_STYLE}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
      >← Versão Web</button>

      {/* Phone body */}
      <div style={{
        width: 393, height: 852,
        background: 'linear-gradient(160deg, #3e3e40 0%, #1c1c1e 45%, #2c2c2e 100%)',
        borderRadius: 52, padding: '12px',
        boxShadow: '0 60px 140px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.1)',
        position: 'relative', flexShrink: 0,
      }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 126, height: 36, borderRadius: 20, background: '#000', zIndex: 20 }} />
        {/* Silent switch */}
        <div style={{ position: 'absolute', left: -5, top: 108, width: 4, height: 28, borderRadius: '3px 0 0 3px', background: '#2a2a2c', boxShadow: '-1px 0 4px rgba(0,0,0,0.5)' }} />
        {/* Volume up */}
        <div style={{ position: 'absolute', left: -5, top: 152, width: 4, height: 50, borderRadius: '3px 0 0 3px', background: '#2a2a2c', boxShadow: '-1px 0 4px rgba(0,0,0,0.5)' }} />
        {/* Volume down */}
        <div style={{ position: 'absolute', left: -5, top: 212, width: 4, height: 50, borderRadius: '3px 0 0 3px', background: '#2a2a2c', boxShadow: '-1px 0 4px rgba(0,0,0,0.5)' }} />
        {/* Power */}
        <div style={{ position: 'absolute', right: -5, top: 180, width: 4, height: 70, borderRadius: '0 3px 3px 0', background: '#2a2a2c', boxShadow: '1px 0 4px rgba(0,0,0,0.5)' }} />
        {/* Home indicator */}
        <div style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', width: 130, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />

        {/* Screen */}
        <div style={{ width: '100%', height: '100%', background: '#f7f7f8', borderRadius: 42, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column' }}>
          {/* Status bar (behind Dynamic Island) */}
          <div style={{ height: 50, flexShrink: 0, background: 'var(--white)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 8px', zIndex: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--black)' }}>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="4" width="3" height="8" rx="1" fill="#000" /><rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#000" /><rect x="9" y="1" width="3" height="11" rx="1" fill="#000" /><rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#000" /></svg>
              <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.5C10.5 2.5 12.7 3.5 14.2 5.2L15.5 3.8C13.6 1.7 11 0.5 8 0.5C5 0.5 2.4 1.7 0.5 3.8L1.8 5.2C3.3 3.5 5.5 2.5 8 2.5Z" fill="#000"/><path d="M8 5.5C9.8 5.5 11.4 6.2 12.6 7.4L13.9 6C12.3 4.5 10.2 3.5 8 3.5C5.8 3.5 3.7 4.5 2.1 6L3.4 7.4C4.6 6.2 6.2 5.5 8 5.5Z" fill="#000"/><circle cx="8" cy="10.5" r="1.5" fill="#000"/></svg>
              <svg width="26" height="13" viewBox="0 0 26 13"><rect x="0" y="1" width="22" height="11" rx="3" stroke="#000" strokeWidth="1" fill="none"/><rect x="23" y="4" width="2" height="5" rx="1" fill="#000" /><rect x="1.5" y="2.5" width="18" height="8" rx="2" fill="#000" /></svg>
            </div>
          </div>
          {children}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Protótipo Interactivo · FRELIMO Connect</div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('feed');
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const PageComponent = pages[page] || Feed;

  if (mobileMode) {
    return (
      <MobileFrame onExit={() => setMobileMode(false)}>
        <TopBar page={page} tabletMode={false} setTabletMode={() => {}} mobileMode={true} setMobileMode={setMobileMode} onLogout={() => setLoggedIn(false)} />
        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--gray-100)' }}>
          <PageComponent setPage={setPage} mobile={true} />
        </main>
        <BottomNav page={page} setPage={setPage} />
      </MobileFrame>
    );
  }

  const appContent = (
    <div style={{ display: 'flex', height: tabletMode ? '100%' : '100vh', overflow: 'hidden' }}>
      <Sidebar page={page} setPage={setPage} onLogout={() => setLoggedIn(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <TopBar page={page} tabletMode={tabletMode} setTabletMode={setTabletMode} mobileMode={false} setMobileMode={setMobileMode} onLogout={() => setLoggedIn(false)} />
        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--gray-100)' }}>
          <PageComponent setPage={setPage} mobile={false} />
        </main>
      </div>
    </div>
  );

  if (tabletMode) return <TabletFrame onExit={() => setTabletMode(false)}>{appContent}</TabletFrame>;

  return appContent;
}
