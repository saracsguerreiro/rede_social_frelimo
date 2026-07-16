import { useState } from 'react';
import { Send, Lock, Users, User } from 'lucide-react';
import { conversas, mensagensAtivas, currentUser } from '../data/mockData';

export default function Mensagens() {
  const [activa, setActiva] = useState(conversas[0]);
  const [texto, setTexto] = useState('');
  const [msgs, setMsgs] = useState(mensagensAtivas);

  function enviar() {
    if (!texto.trim()) return;
    setMsgs(prev => [...prev, {
      id: Date.now(), autor: 'Eu', avatar: currentUser.avatar,
      texto: texto.trim(), hora: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }), proprio: true,
    }]);
    setTexto('');
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', overflow: 'hidden' }}>
      {/* Lista de conversas */}
      <div style={{ width: 280, borderRight: '1px solid var(--gray-200)', background: 'var(--white)', overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Lock size={13} color="var(--green-600)" />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-600)' }}>CIFRADO DE PONTA A PONTA</span>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: 12 }}>+ Nova Conversa</button>
        </div>

        {conversas.map(c => (
          <div
            key={c.id}
            onClick={() => setActiva(c)}
            style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              background: activa?.id === c.id ? 'var(--red-50)' : 'transparent',
              borderLeft: activa?.id === c.id ? '3px solid var(--red-600)' : '3px solid transparent',
            }}
          >
            <div className={`avatar ${c.cor === 'green' ? 'avatar-green' : ''}`} style={{ fontSize: 11, width: 38, height: 38, flexShrink: 0 }}>
              {c.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{c.nome}</span>
                <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{c.hora}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--gray-600)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.ultima}</span>
                {c.naoLidas > 0 && (
                  <span style={{ background: 'var(--red-600)', color: 'var(--white)', borderRadius: 10, padding: '1px 6px', fontSize: 10, fontWeight: 700, marginLeft: 6, flexShrink: 0 }}>{c.naoLidas}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Área de chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--gray-100)' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="avatar avatar-green" style={{ fontSize: 12 }}>{activa?.avatar}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{activa?.nome}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--green-600)' }}>
              <Lock size={10} />
              <span>Cifrado · Uso exclusivo FRELIMO</span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--gray-400)' }}>
            {activa?.tipo === 'grupo' ? <Users size={13} /> : <User size={13} />}
            <span>{activa?.tipo === 'grupo' ? 'Grupo' : 'Directo'}</span>
          </div>
        </div>

        {/* Mensagens */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {msgs.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.proprio ? 'flex-end' : 'flex-start', gap: 8 }}>
              {!m.proprio && (
                <div className="avatar avatar-green" style={{ fontSize: 11, width: 32, height: 32, flexShrink: 0 }}>{m.avatar}</div>
              )}
              <div style={{ maxWidth: '65%' }}>
                {!m.proprio && <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 3 }}>{m.autor}</div>}
                <div style={{
                  background: m.proprio ? 'var(--red-600)' : 'var(--white)',
                  color: m.proprio ? 'var(--white)' : 'var(--black)',
                  padding: '10px 14px',
                  borderRadius: m.proprio ? '12px 12px 4px 12px' : '4px 12px 12px 12px',
                  fontSize: 13,
                  border: m.proprio ? 'none' : '1px solid var(--gray-200)',
                }}>
                  {m.texto}
                </div>
                <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 3, textAlign: m.proprio ? 'right' : 'left' }}>
                  {m.hora}
                </div>
              </div>
              {m.proprio && (
                <div className="avatar" style={{ fontSize: 11, width: 32, height: 32, flexShrink: 0 }}>{m.avatar}</div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 20px', background: 'var(--white)', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 10 }}>
          <input
            className="input"
            value={texto}
            onChange={e => setTexto(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), enviar())}
            placeholder="Escreva uma mensagem cifrada..."
            style={{ flex: 1 }}
          />
          <button className="btn-primary" style={{ padding: '10px 16px' }} onClick={enviar}>
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
