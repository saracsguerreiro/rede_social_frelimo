import { useState } from 'react';
import {
  CheckCircle, Clock, Users, ThumbsUp, MessageCircle,
  Share2, Megaphone, Bell, FileSignature, ChevronRight,
  CalendarDays, TrendingUp, UserPlus, Vote, MapPin
} from 'lucide-react';

const tipoConfig = {
  circular: { label: 'Circular', cor: 'var(--red-600)', bg: 'var(--red-50)', icon: FileSignature },
  convocatoria: { label: 'Convocatória', cor: 'var(--green-600)', bg: 'var(--green-50)', icon: Bell },
  comunicado: { label: 'Comunicado', cor: '#6B7280', bg: '#F3F4F6', icon: Megaphone },
};

const posts = [
  {
    id: 1,
    tipo: 'circular',
    prioridade: 'alta',
    autor: { nome: 'Secretariado do CC', cargo: 'Comité Central · FRELIMO', avatar: 'SC', avatarColor: 'var(--red-600)' },
    titulo: 'Circular nº 12/2026 — Reunião do Comité Central',
    corpo: 'Convoca-se todos os membros do Comité Central para reunião ordinária a realizar-se nos dias 24 e 25 de Julho de 2026, no Complexo da Ponta Vermelha, Maputo. A presença é obrigatória. A agenda será distribuída por esta plataforma até 20 de Julho de 2026.',
    data: 'Há 2 horas',
    lida: false,
    confirmados: 87,
    total: 120,
    likes: 34,
    comentarios: 12,
    expandido: true,
    imagem: null,
  },
  {
    id: 2,
    tipo: 'convocatoria',
    prioridade: 'media',
    autor: { nome: 'Daniel Chapo', cargo: 'Presidente da República · Secretário-Geral do Partido', avatar: null, foto: '/post-president.webp', avatarColor: 'var(--red-800)' },
    titulo: 'Mensagem do Presidente do Partido',
    corpo: 'Camaradas militantes, a força da nossa organização reside na unidade e na disciplina. O FRELIMO cumpre 64 anos de existência comprometido com o povo moçambicano. Convido todos os quadros a participarem activamente na sessão de formação política que decorrerá nos dias 22 e 23 de Julho em todas as províncias. A mobilização começa em cada um de nós.',
    data: 'Há 4 horas',
    lida: true,
    confirmados: null,
    total: null,
    likes: 218,
    comentarios: 45,
    expandido: true,
    imagem: '/post-president.webp',
  },
  {
    id: 3,
    tipo: 'comunicado',
    prioridade: 'normal',
    autor: { nome: 'OMM — Organização da Mulher Moçambicana', cargo: 'Organização da Mulher Moçambicana · Nacional', avatar: 'OM', avatarColor: 'var(--green-600)' },
    titulo: 'Actividade comunitária da OMM em Cabo Delgado',
    corpo: 'As militantes da OMM na província de Cabo Delgado desenvolveram mais uma acção de capacitação e apoio às comunidades rurais. 47 mulheres participaram em sessões de formação em saúde reprodutiva, empreendedorismo e direitos da mulher. O FRELIMO presente onde mais se precisa.',
    data: 'Ontem às 15:30',
    lida: true,
    confirmados: null,
    total: null,
    likes: 156,
    comentarios: 28,
    expandido: false,
    imagem: '/post-women.jpeg',
  },
  {
    id: 4,
    tipo: 'circular',
    prioridade: 'alta',
    autor: { nome: 'Departamento de Organização', cargo: 'Sede Nacional · FRELIMO', avatar: 'DO', avatarColor: 'var(--red-600)' },
    titulo: 'Circular nº 11/2026 — Novas directrizes para organização de células',
    corpo: 'Ao abrigo das deliberações do Comité Central, são publicadas novas directrizes para a organização e funcionamento das células de base. Todos os secretários distritais devem garantir a sua implementação até 31 de Agosto. O documento completo está disponível na secção Documentos.',
    data: '10 Jul · 09:00',
    lida: true,
    confirmados: 234,
    total: 312,
    likes: 67,
    comentarios: 8,
    expandido: false,
    imagem: null,
  },
];

const novosMembrosMock = [
  { nome: 'Hélder Guambe', cargo: 'Sec. Distrital — Boane', avatar: 'HG' },
  { nome: 'Ana Chambal', cargo: 'CP Gaza', avatar: 'AC' },
  { nome: 'Tomás Bila', cargo: 'OJM — Inhambane', avatar: 'TB' },
];

const eventosMock = [
  { titulo: 'Reunião do CC', data: '24 Jul', local: 'Maputo', tipo: 'urgente' },
  { titulo: 'Formação — Secretários', data: '22 Jul', local: 'Nampula', tipo: 'normal' },
  { titulo: 'Prazo: Quotas 2º Trim.', data: '31 Jul', local: null, tipo: 'prazo' },
];

const espacosMock = [
  { nome: 'CP Maputo', activos: 71, icone: 'MP', cor: 'var(--green-600)' },
  { nome: 'Comité Central', activos: 98, icone: 'CC', cor: 'var(--red-600)' },
  { nome: 'OJM Nacional', activos: 201, icone: 'OJ', cor: 'var(--red-800)' },
];

function PostCard({ post }) {
  const [expandido, setExpandido] = useState(post.expandido);
  const [liked, setLiked] = useState(false);
  const [lida, setLida] = useState(post.lida);
  const tipo = tipoConfig[post.tipo];
  const TipoIcon = tipo.icon;

  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 20,
      border: '1px solid var(--gray-200)',
      overflow: 'hidden',
      marginBottom: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      {/* Post header */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          {/* Avatar */}
          {post.autor.foto ? (
            <img src={post.autor.foto} alt={post.autor.nome} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--red-200)' }} />
          ) : (
            <div style={{
              width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
              background: post.autor.avatarColor, color: 'var(--white)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 14, border: '2px solid var(--gray-200)',
            }}>{post.autor.avatar}</div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--black)' }}>{post.autor.nome}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 1 }}>{post.autor.cargo}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={10} />{post.data}
            </div>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
              background: tipo.bg, color: tipo.cor,
            }}>
              <TipoIcon size={11} />{tipo.label}
            </span>
            {post.prioridade === 'alta' && (
              <span style={{
                padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800,
                background: 'var(--yellow)', color: 'var(--black)',
              }}>URGENTE</span>
            )}
            {!lida && (
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--red-600)', marginTop: 5 }} />
            )}
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--black)', margin: '14px 0 10px' }}>{post.titulo}</h3>

        {/* Body */}
        <p style={{
          fontSize: 13.5, color: '#374151', lineHeight: 1.75,
          display: expandido ? 'block' : '-webkit-box',
          WebkitLineClamp: expandido ? undefined : 2,
          WebkitBoxOrient: 'vertical',
          overflow: expandido ? 'visible' : 'hidden',
          marginBottom: 12,
        }}>{post.corpo}</p>

        {!expandido && (
          <button onClick={() => setExpandido(true)} style={{ background: 'none', color: 'var(--red-600)', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
            Ver mais <ChevronRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </button>
        )}
      </div>

      {/* Image */}
      {post.imagem && (
        <div style={{ margin: '4px 0' }}>
          <img src={post.imagem} alt="Post" style={{ width: '100%', maxHeight: 340, objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {/* Confirmação progress */}
      {post.confirmados !== null && expandido && (
        <div style={{ margin: '12px 20px', padding: '12px 14px', background: 'var(--green-50)', borderRadius: 12, border: '1px solid var(--green-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-800)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Users size={12} />{post.confirmados} de {post.total} confirmaram presença
            </span>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--green-600)' }}>{Math.round((post.confirmados / post.total) * 100)}%</span>
          </div>
          <div style={{ height: 6, background: 'var(--green-200)', borderRadius: 3 }}>
            <div style={{ width: `${(post.confirmados / post.total) * 100}%`, height: '100%', background: 'var(--green-600)', borderRadius: 3 }} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ padding: '10px 20px 14px', borderTop: '1px solid var(--gray-200)', marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => setLiked(!liked)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
            background: liked ? 'var(--red-50)' : 'var(--gray-100)', borderRadius: 20, border: 'none',
            color: liked ? 'var(--red-600)' : 'var(--gray-600)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <ThumbsUp size={13} fill={liked ? 'var(--red-600)' : 'none'} />
          {post.likes + (liked ? 1 : 0)}
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: 'var(--gray-100)', borderRadius: 20, border: 'none', color: 'var(--gray-600)', fontSize: 12, fontWeight: 600 }}>
          <MessageCircle size={13} />{post.comentarios}
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: 'var(--gray-100)', borderRadius: 20, border: 'none', color: 'var(--gray-600)', fontSize: 12, fontWeight: 600 }}>
          <Share2 size={13} />Partilhar
        </button>

        <div style={{ flex: 1 }} />

        {!lida && (
          <button
            onClick={() => setLida(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: 'var(--red-600)', borderRadius: 20, border: 'none', color: 'var(--white)', fontSize: 12, fontWeight: 700 }}
          >
            <CheckCircle size={13} />Marcar como lida
          </button>
        )}
        {lida && post.tipo !== 'comunicado' && (
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: 'var(--green-600)', borderRadius: 20, border: 'none', color: 'var(--white)', fontSize: 12, fontWeight: 700 }}>
            <CheckCircle size={13} />Confirmar presença
          </button>
        )}
      </div>
    </div>
  );
}

function RightColumn({ setPage }) {
  return (
    <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Votação activa */}
      <div style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '14px 16px', background: 'linear-gradient(135deg, var(--red-600), var(--red-800))', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Vote size={15} color="var(--white)" />
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--white)' }}>Votação a Decorrer</span>
          <span style={{ marginLeft: 'auto', background: 'var(--yellow)', color: 'var(--black)', fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 10 }}>1 ABERTA</span>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 5 }}>Aprovação do orçamento 2º Sem. 2026</div>
          <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 12 }}>Comité Central · Termina em 22 Jul</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
            <span style={{ color: 'var(--gray-600)' }}>89/120 votaram</span>
            <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>74%</span>
          </div>
          <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 3, marginBottom: 12 }}>
            <div style={{ width: '74%', height: '100%', background: 'var(--green-600)', borderRadius: 3 }} />
          </div>
          <button onClick={() => setPage('votacoes')} className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: 12, borderRadius: 10 }}>
            Votar agora
          </button>
        </div>
      </div>

      {/* Próximos eventos */}
      <div style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <CalendarDays size={15} color="var(--red-600)" />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Próximos Eventos</span>
          </div>
          <button onClick={() => setPage('eventos')} style={{ background: 'none', fontSize: 11, color: 'var(--red-600)', fontWeight: 700 }}>Ver todos</button>
        </div>
        <div style={{ padding: '8px 0' }}>
          {eventosMock.map((e, i) => (
            <div key={i} style={{ padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: i < eventosMock.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                background: e.tipo === 'urgente' ? 'var(--red-50)' : e.tipo === 'prazo' ? '#FEF3C7' : 'var(--green-50)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: e.tipo === 'urgente' ? 'var(--red-600)' : e.tipo === 'prazo' ? '#92400E' : 'var(--green-600)' }}>
                  {e.data.split(' ')[0]}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: e.tipo === 'urgente' ? 'var(--red-800)' : e.tipo === 'prazo' ? '#92400E' : 'var(--green-800)' }}>
                  {e.data.split(' ')[1]}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{e.titulo}</div>
                {e.local && (
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MapPin size={10} />{e.local}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Espaços mais utilizados */}
      <div style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <TrendingUp size={15} color="var(--green-600)" />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Os Seus Espaços</span>
          </div>
          <button onClick={() => setPage('espacos')} style={{ background: 'none', fontSize: 11, color: 'var(--red-600)', fontWeight: 700 }}>Ver todos</button>
        </div>
        <div style={{ padding: '8px 0' }}>
          {espacosMock.map((e, i) => (
            <div key={i} style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < espacosMock.length - 1 ? '1px solid var(--gray-200)' : 'none', cursor: 'pointer' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: e.cor,
                color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, flexShrink: 0,
              }}>{e.icone}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{e.nome}</div>
                <div style={{ fontSize: 11, color: 'var(--green-600)', fontWeight: 600 }}>{e.activos} activos</div>
              </div>
              <ChevronRight size={13} color="var(--gray-400)" />
            </div>
          ))}
        </div>
      </div>

      {/* Novos na rede */}
      <div style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: 7, alignItems: 'center' }}>
          <UserPlus size={15} color="var(--red-600)" />
          <span style={{ fontSize: 13, fontWeight: 700 }}>Novos na Rede</span>
        </div>
        <div style={{ padding: '8px 0' }}>
          {novosMembrosMock.map((m, i) => (
            <div key={i} style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < novosMembrosMock.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%', background: 'var(--red-600)',
                color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, flexShrink: 0,
              }}>{m.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{m.nome}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{m.cargo}</div>
              </div>
              <button style={{
                padding: '5px 10px', background: 'var(--green-50)', borderRadius: 20,
                color: 'var(--green-700)', fontSize: 11, fontWeight: 700,
                border: '1px solid var(--green-200)',
              }}>Seguir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Feed({ setPage }) {
  const naoLidas = posts.filter(p => !p.lida).length;

  return (
    <div style={{ display: 'flex', gap: 20, padding: '24px', alignItems: 'flex-start', maxWidth: 1200 }}>
      {/* Centro — Feed */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { v: naoLidas, l: 'Por ler', cor: 'var(--red-600)' },
            { v: posts.length, l: 'Este mês', cor: 'var(--green-600)' },
            { v: 2, l: 'Com presença pendente', cor: 'var(--black)' },
          ].map(s => (
            <div key={s.l} style={{
              flex: 1, background: 'var(--white)', borderRadius: 16, padding: '14px 16px',
              border: '1px solid var(--gray-200)', borderTop: `4px solid ${s.cor}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.cor }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['Todos', 'Por ler', 'Circulares', 'Convocatórias'].map((f, i) => (
            <button key={f} style={{
              padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: i === 0 ? 'var(--red-600)' : 'var(--white)',
              color: i === 0 ? 'var(--white)' : 'var(--gray-600)',
              border: '1px solid var(--gray-200)',
            }}>{f}</button>
          ))}
        </div>

        {/* Posts */}
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>

      {/* Coluna direita */}
      <RightColumn setPage={setPage} />
    </div>
  );
}
