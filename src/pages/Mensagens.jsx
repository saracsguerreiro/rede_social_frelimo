import { useState } from 'react';
import { Send, Lock, Users, User, Search, Plus, Paperclip, Smile, Mic, Phone, Video, Clock, X, Play, Pause, FileText, Pin } from 'lucide-react';
import { conversas, mensagensAtivas, currentUser, militantes } from '../data/mockData';

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
const WAVE_BARS = [4, 8, 12, 16, 10, 14, 8, 12, 16, 10, 8, 12, 14, 10, 8, 6, 10, 14, 12, 8];

function VoiceMsg({ msg, isOwn }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 200 }}>
      <button
        onClick={() => setPlaying(!playing)}
        style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: isOwn ? 'rgba(255,255,255,0.25)' : 'var(--red-50)',
          color: isOwn ? 'var(--white)' : 'var(--red-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer',
        }}
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <svg width="90" height="24" viewBox="0 0 90 24" style={{ flexShrink: 0 }}>
        {WAVE_BARS.map((h, i) => (
          <rect
            key={i}
            x={i * 4.5} y={(24 - h) / 2} width={3} height={h} rx={1.5}
            fill={isOwn ? 'rgba(255,255,255,0.65)' : 'var(--red-300)'}
          />
        ))}
      </svg>
      <span style={{ fontSize: 11, opacity: 0.75, flexShrink: 0 }}>{msg.duracao}</span>
    </div>
  );
}

function FileMsg({ msg, isOwn }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 0', minWidth: 200 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: isOwn ? 'rgba(255,255,255,0.2)' : 'var(--red-50)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <FileText size={18} color={isOwn ? 'var(--white)' : 'var(--red-600)'} />
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{msg.nomeFicheiro}</div>
        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{msg.tamanho} · PDF</div>
      </div>
    </div>
  );
}

function ReadStatus({ lida }) {
  if (lida === undefined) return null;
  return (
    <span style={{
      fontSize: 11, marginLeft: 4, fontWeight: 700,
      color: lida ? 'var(--yellow)' : 'rgba(255,255,255,0.5)',
    }}>
      {lida ? '✓✓' : '✓'}
    </span>
  );
}

export default function Mensagens({ setPage, mobile }) {
  const [activa, setActiva] = useState(conversas[0]);
  const [texto, setTexto] = useState('');
  const [msgs, setMsgs] = useState(mensagensAtivas);
  const [buscaConv, setBuscaConv] = useState('');
  const [buscaContactos, setBuscaContactos] = useState('');
  const [tab, setTab] = useState('conversas');
  const [filterNaoLidas, setFilterNaoLidas] = useState(false);
  const [pinnedDismissed, setPinnedDismissed] = useState(false);
  const [hoveredMsgId, setHoveredMsgId] = useState(null);
  const [pickerMsgId, setPickerMsgId] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);

  function enviar() {
    if (!texto.trim()) return;
    setMsgs(prev => [...prev, {
      id: Date.now(), tipo: 'texto', autor: 'Eu', avatar: currentUser.avatar,
      texto: texto.trim(),
      hora: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      proprio: true, lida: false, reacoes: [],
    }]);
    setTexto('');
  }

  function toggleReacao(msgId, emoji) {
    setMsgs(prev => prev.map(m => {
      if (m.id !== msgId) return m;
      const reacoes = m.reacoes || [];
      const has = reacoes.includes(emoji);
      return { ...m, reacoes: has ? reacoes.filter(r => r !== emoji) : [...reacoes, emoji] };
    }));
    setPickerMsgId(null);
  }

  const totalNaoLidas = conversas.reduce((s, c) => s + (c.naoLidas || 0), 0);

  const convsFiltradas = conversas.filter(c => {
    const matchBusca = !buscaConv || c.nome.toLowerCase().includes(buscaConv.toLowerCase());
    const matchFiltro = !filterNaoLidas || c.naoLidas > 0;
    return matchBusca && matchFiltro;
  });

  const contactosFiltrados = militantes.filter(m =>
    m.id !== 1 && (!buscaContactos || m.nome.toLowerCase().includes(buscaContactos.toLowerCase()))
  );

  const activaOnline = activa?.tipo === 'direto' &&
    conversas.find(c => c.id === activa?.id)?.online;

  const navToChat = (c) => { setActiva(c); if (mobile) setShowMobileChat(true); };

  return (
    <>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>

      <div style={{ display: 'flex', height: mobile ? 'calc(100vh - 150px)' : 'calc(100vh - 58px)', overflow: 'hidden' }}>

        {/* ── Painel esquerdo ── */}
        <div style={{ width: mobile ? '100%' : 300, borderRight: mobile ? 'none' : '1px solid var(--gray-200)', background: 'var(--white)', display: mobile && showMobileChat ? 'none' : 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Header */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Lock size={12} color="var(--green-600)" />
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--green-600)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Cifrado de ponta a ponta</span>
            </div>

            {/* Tabs Conversas / Contactos */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              <button onClick={() => setTab('conversas')} className={`filter-chip${tab === 'conversas' ? ' active' : ''}`} style={{ flex: 1, textAlign: 'center' }}>Conversas</button>
              <button onClick={() => setTab('contactos')} className={`filter-chip${tab === 'contactos' ? ' active' : ''}`} style={{ flex: 1, textAlign: 'center' }}>Contactos</button>
            </div>

            {/* Sub-filtro Todos / Não lidas */}
            {tab === 'conversas' && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <button
                  onClick={() => setFilterNaoLidas(false)}
                  className={`filter-chip${!filterNaoLidas ? ' active' : ''}`}
                  style={{ flex: 1, textAlign: 'center', fontSize: 11 }}
                >Todos</button>
                <button
                  onClick={() => setFilterNaoLidas(true)}
                  className={`filter-chip${filterNaoLidas ? ' active' : ''}`}
                  style={{ flex: 1, textAlign: 'center', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                >
                  Não lidas
                  {totalNaoLidas > 0 && (
                    <span style={{ background: 'var(--red-600)', color: 'var(--white)', borderRadius: 50, padding: '0 5px', fontSize: 9, fontWeight: 800, lineHeight: '16px' }}>{totalNaoLidas}</span>
                  )}
                </button>
              </div>
            )}

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

          {/* Lista */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {tab === 'conversas' ? (
              <>
                {convsFiltradas.map(c => (
                  <div
                    key={c.id}
                    onClick={() => navToChat(c)}
                    style={{
                      padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                      background: activa?.id === c.id ? 'var(--red-50)' : 'transparent',
                      borderLeft: activa?.id === c.id ? '3px solid var(--red-600)' : '3px solid transparent',
                      borderBottom: '1px solid var(--gray-200)',
                    }}
                  >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.cor === 'green' ? 'var(--green-600)' : 'var(--red-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{c.avatar}</div>
                      {c.online && (
                        <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: 'var(--green-600)', border: '2px solid var(--white)' }} />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{c.nome}</span>
                        <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{c.hora}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--gray-600)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.ultima}</span>
                        {c.naoLidas > 0 && (
                          <span style={{ background: 'var(--red-600)', color: 'var(--white)', borderRadius: 50, padding: '1px 7px', fontSize: 10, fontWeight: 800, marginLeft: 6, flexShrink: 0 }}>{c.naoLidas}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {convsFiltradas.length === 0 && (
                  <div style={{ padding: 24, textAlign: 'center', fontSize: 12, color: 'var(--gray-400)' }}>Nenhuma conversa encontrada.</div>
                )}
              </>
            ) : (
              <>
                {contactosFiltrados.map(m => (
                  <div
                    key={m.id}
                    style={{ padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', borderBottom: '1px solid var(--gray-200)' }}
                    onClick={() => setTab('conversas')}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{m.avatar}</div>
                      {m.online && (
                        <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: 'var(--green-600)', border: '2px solid var(--white)' }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{m.nome}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {m.online && <span style={{ color: 'var(--green-600)', fontWeight: 600 }}>● Online</span>}
                        {!m.online && m.cargo}
                      </div>
                    </div>
                    <button style={{ padding: '5px 12px', background: 'var(--red-50)', borderRadius: 50, color: 'var(--red-600)', fontSize: 11, fontWeight: 700, border: '1px solid var(--red-200)', flexShrink: 0 }}>
                      <Plus size={11} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />Msg
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* ── Área de chat ── */}
        <div style={{ flex: 1, display: mobile && !showMobileChat ? 'none' : 'flex', flexDirection: 'column', background: 'var(--gray-100)', overflow: 'hidden' }}>

          {/* Barra de mensagem fixada */}
          {!pinnedDismissed && (
            <div style={{ padding: '8px 20px', background: '#FEFCE8', borderBottom: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <Pin size={12} color="#92400E" />
              <span style={{ fontSize: 12, color: '#92400E', fontWeight: 600, flex: 1 }}>
                Fixado: <span style={{ fontWeight: 400 }}>Relatorio_Junho_2026.pdf — enviado por Fátima Cossa</span>
              </span>
              <button onClick={() => setPinnedDismissed(true)} style={{ color: '#92400E', padding: 4, background: 'none', cursor: 'pointer', border: 'none', display: 'flex' }}>
                <X size={14} />
              </button>
            </div>
          )}

          {/* Header da conversa */}
          <div style={{ padding: '10px 14px', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
            {mobile && (
              <button onClick={() => setShowMobileChat(false)} style={{ background: 'none', border: 'none', color: 'var(--red-600)', fontSize: 20, cursor: 'pointer', padding: '0 4px', lineHeight: 1, flexShrink: 0 }}>‹</button>
            )}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>{activa?.avatar}</div>
              {activaOnline && (
                <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: 'var(--green-600)', border: '2px solid var(--white)' }} />
              )}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{activa?.nome}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11 }}>
                <Lock size={10} color="var(--green-600)" />
                <span style={{ color: 'var(--green-600)', fontWeight: 600 }}>Encriptado E2E</span>
                {activaOnline && <><span style={{ color: 'var(--gray-300)' }}>·</span><span style={{ color: 'var(--green-600)' }}>Online agora</span></>}
                {!activaOnline && activa?.tipo === 'grupo' && <><span style={{ color: 'var(--gray-300)' }}>·</span><span style={{ color: 'var(--gray-400)' }}>Uso exclusivo FRELIMO</span></>}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              {!mobile && <span style={{ fontSize: 11, color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: 3, marginRight: 8 }}>
                {activa?.tipo === 'grupo' ? <Users size={13} /> : <User size={13} />}
                {activa?.tipo === 'grupo' ? 'Grupo' : 'Directo'}
              </span>}
              {[
                { icon: <Clock size={16} />, title: 'Mensagem agendada' },
                { icon: <Phone size={16} />, title: 'Chamada de voz' },
                { icon: <Video size={16} />, title: 'Videochamada' },
              ].map(({ icon, title }) => (
                <button
                  key={title}
                  title={title}
                  style={{ width: 34, height: 34, borderRadius: 50, border: '1px solid var(--gray-200)', background: 'var(--white)', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-50)'; e.currentTarget.style.color = 'var(--red-600)'; e.currentTarget.style.borderColor = 'var(--red-200)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--gray-500)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
                >{icon}</button>
              ))}
            </div>
          </div>

          {/* Mensagens */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {msgs.map(m => {
              const isOwn = m.proprio;
              const reacoes = m.reacoes || [];
              return (
                <div
                  key={m.id}
                  style={{ display: 'flex', justifyContent: isOwn ? 'flex-end' : 'flex-start', gap: 8 }}
                  onMouseEnter={() => setHoveredMsgId(m.id)}
                  onMouseLeave={() => { setHoveredMsgId(null); if (pickerMsgId === m.id) setPickerMsgId(null); }}
                >
                  {!isOwn && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, alignSelf: 'flex-end' }}>{m.avatar}</div>
                  )}

                  <div style={{ maxWidth: '65%', position: 'relative' }}>
                    {!isOwn && <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 3 }}>{m.autor}</div>}

                    {/* Reação picker flutuante */}
                    {hoveredMsgId === m.id && (
                      <div style={{ position: 'absolute', top: -38, [isOwn ? 'right' : 'left']: 0, zIndex: 10, display: 'flex', gap: 4 }}>
                        {pickerMsgId === m.id ? (
                          <div style={{ display: 'flex', gap: 4, background: 'var(--white)', borderRadius: 50, padding: '5px 10px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', border: '1px solid var(--gray-200)' }}>
                            {EMOJIS.map(e => (
                              <button key={e} onClick={() => toggleReacao(m.id, e)} style={{ fontSize: 16, background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 1, borderRadius: 50, transition: 'transform 0.1s' }}
                                onMouseEnter={el => el.currentTarget.style.transform = 'scale(1.3)'}
                                onMouseLeave={el => el.currentTarget.style.transform = 'scale(1)'}
                              >{e}</button>
                            ))}
                          </div>
                        ) : (
                          <button onClick={() => setPickerMsgId(m.id)} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 50, padding: '3px 10px', fontSize: 13, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            + 😊
                          </button>
                        )}
                      </div>
                    )}

                    {/* Bolha */}
                    <div style={{
                      background: isOwn ? 'var(--red-600)' : 'var(--white)',
                      color: isOwn ? 'var(--white)' : 'var(--black)',
                      padding: m.tipo === 'voz' ? '10px 14px' : m.tipo === 'ficheiro' ? '10px 14px' : '10px 16px',
                      borderRadius: isOwn ? '20px 20px 6px 20px' : '6px 20px 20px 20px',
                      fontSize: 13,
                      border: isOwn ? 'none' : '1px solid var(--gray-200)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}>
                      {/* Citação / resposta */}
                      {m.tipo === 'resposta' && m.citacao && (
                        <div style={{
                          borderLeft: '3px solid var(--red-400)',
                          padding: '6px 10px',
                          background: isOwn ? 'rgba(255,255,255,0.15)' : 'var(--red-50)',
                          borderRadius: 8,
                          marginBottom: 8,
                        }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: isOwn ? 'rgba(255,255,255,0.8)' : 'var(--red-600)', marginBottom: 2 }}>{m.citacao.autor}</div>
                          <div style={{ fontSize: 11, opacity: 0.8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.citacao.texto}</div>
                        </div>
                      )}

                      {/* Conteúdo */}
                      {m.tipo === 'voz' && <VoiceMsg msg={m} isOwn={isOwn} />}
                      {m.tipo === 'ficheiro' && <FileMsg msg={m} isOwn={isOwn} />}
                      {(m.tipo === 'texto' || m.tipo === 'resposta') && m.texto}
                    </div>

                    {/* Meta: hora + leitura */}
                    <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 3, textAlign: isOwn ? 'right' : 'left', display: 'flex', justifyContent: isOwn ? 'flex-end' : 'flex-start', alignItems: 'center', gap: 2 }}>
                      {m.hora}
                      {isOwn && <ReadStatus lida={m.lida} />}
                    </div>

                    {/* Reações */}
                    {reacoes.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 4, justifyContent: isOwn ? 'flex-end' : 'flex-start', flexWrap: 'wrap' }}>
                        {[...new Set(reacoes)].map(e => (
                          <button key={e} onClick={() => toggleReacao(m.id, e)} style={{
                            fontSize: 13, padding: '2px 8px', background: 'var(--white)', border: '1px solid var(--gray-200)',
                            borderRadius: 50, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            display: 'flex', alignItems: 'center', gap: 3,
                          }}>
                            {e} <span style={{ fontSize: 10, color: 'var(--gray-500)' }}>{reacoes.filter(r => r === e).length}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {isOwn && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'var(--red-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, alignSelf: 'flex-end' }}>{m.avatar}</div>
                  )}
                </div>
              );
            })}

            {/* Indicador de digitação */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'var(--green-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, alignSelf: 'flex-end' }}>FC</div>
              <div style={{ background: 'var(--white)', borderRadius: '6px 20px 20px 20px', padding: '12px 16px', border: '1px solid var(--gray-200)', display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gray-400)', animation: `typingBounce 1.2s ease-in-out ${i * 0.18}s infinite` }} />
                ))}
                <span style={{ fontSize: 11, color: 'var(--gray-400)', marginLeft: 4 }}>Fátima Cossa a escrever...</span>
              </div>
            </div>
          </div>

          {/* Barra de input */}
          <div style={{ padding: '12px 20px', background: 'var(--white)', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
            {[
              { icon: <Paperclip size={18} />, title: 'Anexar ficheiro' },
              { icon: <Smile size={18} />, title: 'Emoji' },
            ].map(({ icon, title }) => (
              <button key={title} title={title} style={{ color: 'var(--gray-400)', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', borderRadius: 8, flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--red-600)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}
              >{icon}</button>
            ))}
            <input
              className="input"
              value={texto}
              onChange={e => setTexto(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), enviar())}
              placeholder="Escreva uma mensagem cifrada..."
              style={{ flex: 1 }}
            />
            <button title="Mensagem de voz" style={{ color: 'var(--gray-400)', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', borderRadius: 8, flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--red-600)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}
            ><Mic size={18} /></button>
            <button
              onClick={enviar}
              title="Enviar"
              style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--red-600)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--red-800)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}
            ><Send size={15} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
