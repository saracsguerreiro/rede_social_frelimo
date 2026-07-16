import { useState } from 'react';
import './styles/globals.css';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
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

function TabletFrame({ children, onExit }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #0d0d1f 0%, #13102a 40%, #091525 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 40px',
      overflow: 'auto',
      position: 'relative',
    }}>
      {/* Botão regressar à versão web */}
      <button
        onClick={onExit}
        style={{
          position: 'fixed', top: 20, left: 24, zIndex: 100,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 18px', borderRadius: 50,
          background: 'rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
      >
        ← Versão Web
      </button>
      {/* Tablet body */}
      <div style={{
        width: 1120,
        height: 800,
        background: 'linear-gradient(160deg, #3e3e40 0%, #1c1c1e 45%, #2c2c2e 100%)',
        borderRadius: 44,
        padding: '18px 20px',
        boxShadow: `
          0 70px 160px rgba(0,0,0,0.75),
          0 0 0 1px rgba(255,255,255,0.07),
          inset 0 1px 0 rgba(255,255,255,0.11),
          inset 0 -1px 0 rgba(0,0,0,0.45)
        `,
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Camera */}
        <div style={{
          position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)',
          width: 9, height: 9, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #2a2a2c, #111)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.04)',
        }} />

        {/* Volume up */}
        <div style={{ position: 'absolute', left: -6, top: 110, width: 6, height: 36, borderRadius: '3px 0 0 3px', background: 'linear-gradient(90deg, #222224, #3a3a3c)', boxShadow: '-2px 0 5px rgba(0,0,0,0.5)' }} />
        {/* Volume down */}
        <div style={{ position: 'absolute', left: -6, top: 156, width: 6, height: 36, borderRadius: '3px 0 0 3px', background: 'linear-gradient(90deg, #222224, #3a3a3c)', boxShadow: '-2px 0 5px rgba(0,0,0,0.5)' }} />
        {/* Power */}
        <div style={{ position: 'absolute', right: -6, top: 130, width: 6, height: 54, borderRadius: '0 3px 3px 0', background: 'linear-gradient(90deg, #3a3a3c, #222224)', boxShadow: '2px 0 5px rgba(0,0,0,0.5)' }} />

        {/* Home indicator */}
        <div style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', width: 140, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.16)' }} />

        {/* Reflection strip across top of bezel */}
        <div style={{ position: 'absolute', top: 0, left: 40, right: 40, height: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '0 0 2px 2px' }} />

        {/* Screen */}
        <div style={{
          width: '100%',
          height: '100%',
          background: '#f7f7f8',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {children}
        </div>
      </div>

      {/* Label below tablet */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
          Protótipo Interactivo · FRELIMO Connect
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('feed');
  const [tabletMode, setTabletMode] = useState(false);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const PageComponent = pages[page] || Feed;

  const appContent = (
    <div style={{ display: 'flex', height: tabletMode ? '100%' : '100vh', overflow: 'hidden' }}>
      <Sidebar page={page} setPage={setPage} onLogout={() => setLoggedIn(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <TopBar page={page} tabletMode={tabletMode} setTabletMode={setTabletMode} />
        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--gray-100)' }}>
          <PageComponent setPage={setPage} />
        </main>
      </div>
    </div>
  );

  if (tabletMode) {
    return <TabletFrame onExit={() => setTabletMode(false)}>{appContent}</TabletFrame>;
  }

  return appContent;
}
