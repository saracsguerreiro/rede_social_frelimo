import { useState } from 'react';
import { Send, Lock, Users, User, Search, Plus } from 'lucide-react';
import { conversas, mensagensAtivas, currentUser, militantes } from '../data/mockData';

export default function Mensagens({ setPage }) {
  const [activa, setActiva] = useState(conversas[0]);
  const [texto, setTexto] = useState('');
  const [msgs, setMsgs] = useState(mensagensAtivas);
  const [buscaConv, setBuscaConv] = useState('');
  const [buscaContactos, setBuscaContactos] = useState('');
  const [tab, setTab] = useState('conversas'); // 'conversas' | 'contactos'

  function enviar() {
    if (!texto.trim()) return;
    setMsgs(prev => [...prev, {
      id: Date.now(), autor: 'Eu', avatar: currentUser.avatar,
      texto: texto.trim(), hora: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }), proprio: true,
    }]);
    setTexto('');
  }

  const convsFiltradas = conversas.filter(c => !buscaConv || c.nome.toLowerCase().includes(buscaConv.toLowerCase()));
  const contactosFiltrados = militantes.filter(m => m.id !== 1 && (!buscaContactos || m.nome.toLowerCase().includes(buscaContactos.toLowerCase())));

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 58px)', overflow: 'hidden' }}>
      {/* Painel esquerdo */}
      <div style={{ width: 300, borderRight: '1px solid var(--gray-200)', background: 'var(--white)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Lock size={12} color="var(--green-600)" />
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--green-600)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Cifrado de ponta a ponta</span>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            <button onClick={() => setTab('conversas')} className={`filter-chip${tab === 'conversas' ? ' active' : ''}`} style={{ flex: 1, textAlign: 'center' }}>Conversas</button>
            <button onClick={() => setTab('contactos')} className={`filter-chip${tab === 'contactos' ? ' active' : ''}`} style={{ flex: 1, textAlign: 'center' }}>Contactos</button>
          </div>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-100)', borderRadius: 50, padding: '7px 14px', border: '1.5px solid var(--gray-200)' }}>
            <Search size={13} color="var(--gray-400)" />
            <input
              value={tab === 'conversas' ? buscaConv : buscaContactos}
              onChange={e => tab === 'conversas' ? setBuscaConv(e.target.value) : setBuscaContactos(e.target.value)}
              placeholder={tab === 'conversas' ? 'Pesquisar conversa...' : 'Pesquisar contacto...'}
              style={{ border: 'none', background: 'none', outline: 'none', fontSize: 12, width: '100%' }}
            />
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {tab === 'conversas' ? (
            <>
              {convsFiltradas.map(c => (
                <div key={c.id} onClick={() => setActiva(c)} style={{
                  padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                  background: activa?.id === c.id ? 'var(--red-50)' : 'transparent',
                  borderLeft: activa?.id === c.id ? '3px solid var(--red-600)' : '3px solid transparent',
                  borderBottom: '1px solid var(--gray-200)',
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: c.cor === 'green' ? 'var(--green-600)' : 'var(--red-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{c.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{c.nome}</span>
                      <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{c.hora}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--gray-600)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.ultima}</span>
                      {c.naoLidas > 0 && <span style={{ background: 'var(--red-600)', color: 'var(--white)', borderRadius: 50, padding: '1px 7px', fontSize: 10, fontWeight: 800, marginLeft: 6, flexShrink: 0 }}>{c.naoLidas}</span>}
                    </div>
                  </div>
                </div>
              ))}
              {convsFiltradas.length === 0 && <div style={{ padding: 24, textAlign: 'center', fontSize: 12, color: 'var(--gray-400)' }}>Nenhuma conversa encontrada.</div>}
            </>
          ) : (
            <>
              {contactosFiltrados.map(m => (
                <div key={m.id} style={{ padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', borderBottom: '1px solid var(--gray-200)' }}
                  onClick={() => { setTab('conversas'); }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{m.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{m.nome}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{m.cargo}</div>
                  </div>
                  <button style={{ padding: '5px 12px', background: 'var(--red-50)', borderRadius: 50, color: 'var(--red-600)', fontSize: 11, fontWeight: 700, border: '1px solid var(--red-200)' }}>
                    <Plus size={11} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />Msg
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--gray-100)' }}>
        <div style={{ padding: '12px 20px', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>{activa?.avatar}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{activa?.nome}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--green-600)' }}><Lock size={10} />Cifrado · Uso exclusivo FRELIMO</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--gray-400)' }}>
            {activa?.tipo === 'grupo' ? <Users size={13} /> : <User size={13} />}
            <span>{activa?.tipo === 'grupo' ? 'Grupo' : 'Directo'}</span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {msgs.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.proprio ? 'flex-end' : 'flex-start', gap: 8 }}>
              {!m.proprio && <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{m.avatar}</div>}
              <div style={{ maxWidth: '65%' }}>
                {!m.proprio && <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 3 }}>{m.autor}</div>}
                <div style={{ background: m.proprio ? 'var(--red-600)' : 'var(--white)', color: m.proprio ? 'var(--white)' : 'var(--black)', padding: '10px 16px', borderRadius: m.proprio ? '20px 20px 6px 20px' : '6px 20px 20px 20px', fontSize: 13, border: m.proprio ? 'none' : '1px solid var(--gray-200)' }}>
                  {m.texto}
                </div>
                <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 3, textAlign: m.proprio ? 'right' : 'left' }}>{m.hora}</div>
              </div>
              {m.proprio && <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'var(--red-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{m.avatar}</div>}
            </div>
          ))}
        </div>

        <div style={{ padding: '12px 20px', background: 'var(--white)', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 10 }}>
          <input className="input" value={texto} onChange={e => setTexto(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), enviar())} placeholder="Escreva uma mensagem cifrada..." style={{ flex: 1 }} />
          <button className="btn-primary" style={{ padding: '10px 18px', flexShrink: 0 }} onClick={enviar}><Send size={15} /></button>
        </div>
      </div>
    </div>
  );
}
