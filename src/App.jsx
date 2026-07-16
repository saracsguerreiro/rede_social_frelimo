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

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('feed');

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const PageComponent = pages[page] || Feed;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar page={page} setPage={setPage} onLogout={() => setLoggedIn(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar page={page} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
