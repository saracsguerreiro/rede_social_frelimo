import { useState } from 'react';
import {
  Users, TrendingUp, FileText, Shield, AlertTriangle, CheckCircle,
  Search, X, Phone, Mail, Calendar, MapPin, CreditCard, Bell, Send,
  BookOpen, Briefcase, Building2, Heart, GraduationCap,
} from 'lucide-react';
import { statsAdmin, membrosAdmin } from '../data/mockData';

// ── KPI card ──────────────────────────────────────────────────────────────────
const KPICard = ({ label, valor, sub, cor, icon: Icon }) => (
  <div className="card" style={{ padding: '20px', borderTop: `4px solid ${cor}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
      <Icon size={20} color={cor} />
      <span style={{ fontSize: 11, color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase' }}>{label}</span>
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--black)', marginBottom: 4 }}>{valor}</div>
    {sub && <div style={{ fontSize: 12, color: 'var(--gray-600)' }}>{sub}</div>}
  </div>
);

// ── Avatar círculo ─────────────────────────────────────────────────────────────
const Avatar = ({ initials, size = 36, bg = 'var(--red-600)' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: bg, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.33, fontWeight: 700, flexShrink: 0,
  }}>
    {initials}
  </div>
);

// ── Chip de estado de quotas ────────────────────────────────────────────────────
const QuotasChip = ({ estado }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
    background: estado === 'em_dia' ? 'var(--green-50)' : 'var(--red-50)',
    color: estado === 'em_dia' ? 'var(--green-800)' : 'var(--red-800)',
  }}>
    {estado === 'em_dia'
      ? <><CheckCircle size={11} /> Em dia</>
      : <><AlertTriangle size={11} /> Em atraso</>}
  </span>
);

// ── Modal de detalhe do membro ─────────────────────────────────────────────────
function ModalMembro({ membro, onClose }) {
  if (!membro) return null;

  const SectionLabel = ({ label }) => (
    <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: 1, padding: '16px 0 8px', borderBottom: '1.5px solid var(--red-100)', marginBottom: 10 }}>
      {label}
    </div>
  );

  const Field = ({ label, value }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: value ? 'var(--black)' : 'var(--gray-300)', fontWeight: 500 }}>{value || '—'}</div>
    </div>
  );

  const Grid2 = ({ children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>{children}</div>
  );

  const dataNasc = membro.dataNascimento ? new Date(membro.dataNascimento).toLocaleDateString('pt-PT') : null;
  const dataFil = membro.dataFiliacao ? new Date(membro.dataFiliacao).toLocaleDateString('pt-PT') : null;
  const dataQuota = membro.ultimoPagamento ? new Date(membro.ultimoPagamento).toLocaleDateString('pt-PT') : null;
  const sexoLabel = membro.sexo === 'M' ? 'Masculino' : membro.sexo === 'F' ? 'Feminino' : membro.sexo;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620,
        boxShadow: '0 24px 64px rgba(0,0,0,0.25)', overflow: 'hidden',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
      }} onClick={e => e.stopPropagation()}>

        {/* Cabeçalho */}
        <div style={{
          background: 'linear-gradient(135deg, var(--red-600), var(--red-800))',
          padding: '24px 24px 20px',
          display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
        }}>
          <Avatar initials={membro.avatar} size={56} bg="rgba(255,255,255,0.2)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{membro.nome}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{membro.cargo} · {membro.orgao}</div>
            <div style={{ marginTop: 6 }}><QuotasChip estado={membro.quotas} /></div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0 }}>
            <X size={15} />
          </button>
        </div>

        {/* Corpo com scroll */}
        <div style={{ overflowY: 'auto', padding: '4px 24px 24px' }}>

          <SectionLabel label="Identificação" />
          <Grid2>
            <Field label="Nome" value={membro.nome} />
            <Field label="Apelido" value={membro.apelido} />
          </Grid2>
          <Field label="Nome completo" value={membro.nomeCompleto || membro.nome} />
          <Grid2>
            <Field label="N.º de cartão de militante" value={membro.cartao} />
            <Field label="Data de nascimento" value={dataNasc} />
          </Grid2>
          <Grid2>
            <Field label="Sexo" value={sexoLabel} />
            <Field label="Estado civil" value={membro.estadoCivil} />
          </Grid2>

          <SectionLabel label="Contactos" />
          <Grid2>
            <Field label="Telefone" value={membro.telefone} />
            <Field label="Email institucional" value={membro.email} />
          </Grid2>
          <Field label="Morada" value={membro.morada} />

          <SectionLabel label="Formação e Profissão" />
          <Grid2>
            <Field label="Nível académico" value={membro.nivelAcademico} />
            <Field label="Profissão" value={membro.profissao} />
          </Grid2>

          <SectionLabel label="Filiação Partidária" />
          <Grid2>
            <Field label="Célula" value={membro.celula} />
            <Field label="Órgão partidário / Nível" value={membro.orgao ? `${membro.orgao} · ${membro.nivel}` : null} />
          </Grid2>
          <Grid2>
            <Field label="Cargo partidário" value={membro.cargo} />
            <Field label="Data de filiação" value={dataFil} />
          </Grid2>

          <SectionLabel label="Quotas" />
          <Grid2>
            <Field label="Estado das quotas" value={membro.quotas === 'em_dia' ? 'Em dia' : membro.quotas === 'em_atraso' ? 'Em atraso' : membro.quotas} />
            <Field label="Último pagamento" value={dataQuota} />
          </Grid2>
        </div>
      </div>
    </div>
  );
}

// ── Submenu ─────────────────────────────────────────────────────────────────────
const MENU = [
  { key: 'inicio', label: 'Início' },
  { key: 'membros', label: 'Membros' },
  { key: 'quotas', label: 'Quotas' },
];

// ── Secção: Membros ─────────────────────────────────────────────────────────────
function SecaoMembros({ mobile }) {
  const [busca, setBusca] = useState('');
  const [membroAberto, setMembroAberto] = useState(null);

  const filtrados = membrosAdmin.filter(m =>
    !busca || m.nome.toLowerCase().includes(busca.toLowerCase()) ||
    m.cartao.toLowerCase().includes(busca.toLowerCase()) ||
    m.orgao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800 }}>Lista de Membros</h3>
        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{membrosAdmin.length} militantes</span>
      </div>

      {/* Barra de pesquisa */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search size={14} color="var(--gray-400)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Pesquisar por nome, cartão ou órgão..."
          style={{
            width: '100%', padding: '10px 12px 10px 36px',
            border: '1.5px solid var(--gray-200)', borderRadius: 8,
            background: 'var(--gray-100)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--red-600)'}
          onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
        />
      </div>

      {/* Lista */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {filtrados.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>Nenhum membro encontrado.</div>
        )}
        {filtrados.map((m, i) => (
          <div
            key={m.id}
            onClick={() => setMembroAberto(m)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', cursor: 'pointer',
              borderBottom: i < filtrados.length - 1 ? '1px solid var(--gray-200)' : 'none',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Avatar initials={m.avatar} size={38} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--black)' }}>{m.nome}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>{m.cargo} · {m.orgao}</div>
            </div>
            {!mobile && <div style={{ fontSize: 11, color: 'var(--gray-400)', fontFamily: 'monospace' }}>{m.cartao}</div>}
            <QuotasChip estado={m.quotas} />
          </div>
        ))}
      </div>

      <ModalMembro membro={membroAberto} onClose={() => setMembroAberto(null)} />
    </div>
  );
}

// ── Secção: Quotas ──────────────────────────────────────────────────────────────
function SecaoQuotas({ mobile }) {
  const [notifGeral, setNotifGeral] = useState(false);
  const [notifIndividual, setNotifIndividual] = useState(null);

  const emDia = membrosAdmin.filter(m => m.quotas === 'em_dia');
  const emAtraso = membrosAdmin.filter(m => m.quotas === 'em_atraso');

  const enviarGeral = () => {
    setNotifGeral(true);
    setTimeout(() => setNotifGeral(false), 3000);
  };

  const enviarIndividual = (id) => {
    setNotifIndividual(id);
    setTimeout(() => setNotifIndividual(null), 2500);
  };

  const ListaQuotas = ({ membros, tipo }) => (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {membros.length === 0 && (
        <div style={{ padding: 20, textAlign: 'center', fontSize: 13, color: 'var(--gray-400)' }}>Nenhum.</div>
      )}
      {membros.map((m, i) => (
        <div key={m.id} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px',
          borderBottom: i < membros.length - 1 ? '1px solid var(--gray-200)' : 'none',
        }}>
          <Avatar initials={m.avatar} size={34} bg={tipo === 'atraso' ? 'var(--red-600)' : 'var(--green-600)'} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{m.nome}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>
              {tipo === 'atraso'
                ? `Último pag.: ${new Date(m.ultimoPagamento).toLocaleDateString('pt-PT')}`
                : `Pago em ${new Date(m.ultimoPagamento).toLocaleDateString('pt-PT')}`}
            </div>
          </div>
          {tipo === 'atraso' && (
            <button
              onClick={() => enviarIndividual(m.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 12px', borderRadius: 6, border: '1.5px solid var(--red-600)',
                background: notifIndividual === m.id ? 'var(--red-600)' : 'transparent',
                color: notifIndividual === m.id ? '#fff' : 'var(--red-600)',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
              }}
            >
              <Bell size={11} />
              {notifIndividual === m.id ? 'Enviado!' : 'Notificar'}
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Resumo */}
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 12 }}>
        <div className="card" style={{ padding: '16px 20px', borderTop: '4px solid var(--green-600)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <CheckCircle size={22} color="var(--green-600)" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{emDia.length}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Quotas em dia</div>
          </div>
        </div>
        <div className="card" style={{ padding: '16px 20px', borderTop: '4px solid var(--red-600)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <AlertTriangle size={22} color="var(--red-600)" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{emAtraso.length}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Com atraso no pagamento</div>
          </div>
        </div>
      </div>

      {/* Em atraso */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--red-800)' }}>
            <AlertTriangle size={14} color="var(--red-600)" style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Em atraso — {emAtraso.length} militante(s)
          </h3>
          <button
            onClick={enviarGeral}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 8,
              background: notifGeral ? 'var(--green-600)' : 'var(--red-600)',
              color: '#fff', border: 'none', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', transition: 'background 0.2s',
            }}
          >
            <Send size={12} />
            {notifGeral ? 'Notificação enviada!' : 'Notificar todos'}
          </button>
        </div>
        <ListaQuotas membros={emAtraso} tipo="atraso" />
      </div>

      {/* Em dia */}
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--green-800)', marginBottom: 12 }}>
          <CheckCircle size={14} color="var(--green-600)" style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Em dia — {emDia.length} militante(s)
        </h3>
        <ListaQuotas membros={emDia} tipo="emdia" />
      </div>
    </div>
  );
}

// ── Secção: Início (original) ───────────────────────────────────────────────────
function SecaoInicio({ mobile }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        <KPICard label="Militantes activos" valor={statsAdmin.militantesActivos.toLocaleString('pt-PT')} sub="Na plataforma este mês" cor="var(--red-600)" icon={Users} />
        <KPICard label="Quotas em dia" valor={statsAdmin.quotasEmDia} sub="78% dos militantes" cor="var(--green-600)" icon={CheckCircle} />
        <KPICard label="Células activas" valor={statsAdmin.celulasActivas} sub="Com espaço activo" cor="var(--yellow)" icon={TrendingUp} />
        <KPICard label="Uso da plataforma" valor={statsAdmin.usoPlatforma} sub="Activos semanais / meta: 60%" cor="var(--red-600)" icon={TrendingUp} />
        <KPICard label="Circulares difundidas" valor={statsAdmin.circularesDifundidas} sub="Este mês" cor="var(--green-600)" icon={FileText} />
        <KPICard label="Tempo de difusão" valor={statsAdmin.tempoDifusao} sub="Sede → células (média)" cor="var(--black)" icon={TrendingUp} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 16 }}>
        <div className="card">
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>KPIs do Piloto — Mês 12</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Uso activo semanal ≥ 60%', actual: 64, meta: 60, ok: true },
              { label: 'Circulares exclusivas na plataforma', actual: 78, meta: 80, ok: false },
              { label: '% quotas actualizadas na app', actual: 78, meta: 70, ok: true },
              { label: 'Células com espaço activo', actual: 52, meta: 60, ok: false },
            ].map(k => (
              <div key={k.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12 }}>{k.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {k.ok ? <CheckCircle size={13} color="var(--green-600)" /> : <AlertTriangle size={13} color="var(--yellow)" />}
                    <span style={{ fontSize: 12, fontWeight: 700, color: k.ok ? 'var(--green-600)' : '#92400E' }}>{k.actual}%</span>
                    <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>/ {k.meta}%</span>
                  </div>
                </div>
                <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 3 }}>
                  <div style={{ width: `${Math.min(k.actual, 100)}%`, height: '100%', background: k.ok ? 'var(--green-600)' : 'var(--yellow)', borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Registo de Auditoria</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { hora: '10:42', acao: 'Acesso ao espaço CP Maputo', usuario: 'A. Muteia', tipo: 'leitura' },
              { hora: '09:55', acao: 'Circular nº 12 publicada', usuario: 'Secretariado', tipo: 'publicacao' },
              { hora: '09:31', acao: 'Voto registado — Votação #1', usuario: 'Anónimo', tipo: 'votacao' },
              { hora: '08:12', acao: 'Login autenticado', usuario: 'F. Cossa', tipo: 'auth' },
              { hora: 'Ontem', acao: 'Relatório exportado', usuario: 'Admin', tipo: 'admin' },
            ].map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--gray-200)', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'monospace', width: 40, flexShrink: 0 }}>{log.hora}</span>
                <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: log.tipo === 'auth' ? 'var(--green-600)' : log.tipo === 'publicacao' ? 'var(--red-600)' : log.tipo === 'admin' ? 'var(--yellow)' : 'var(--gray-400)' }} />
                <span style={{ fontSize: 12, flex: 1 }}>{log.acao}</span>
                <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{log.usuario}</span>
              </div>
            ))}
          </div>
          <button className="btn-ghost" style={{ width: '100%', marginTop: 12, fontSize: 12 }}>Ver auditoria completa</button>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Regras Estatutárias — Estado de Cumprimento</h3>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { regra: 'Dono institucional único nomeado', ok: true },
              { regra: 'Estatuto interno publicado', ok: true },
              { regra: 'Protecção de dados (Malabo)', ok: true },
              { regra: 'Acesso por necessidade orgânica', ok: true },
              { regra: 'Relatório semestral ao CC', ok: false },
              { regra: 'Separação Partido/Estado', ok: true },
              { regra: 'Sem vigilância de militantes', ok: true },
              { regra: 'Alojamento no Raxio MZ1', ok: true },
              { regra: 'Auditoria externa anual', ok: false },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '10px 12px', background: r.ok ? 'var(--green-50)' : 'var(--red-50)', borderRadius: 4 }}>
                {r.ok ? <CheckCircle size={14} color="var(--green-600)" style={{ flexShrink: 0 }} /> : <AlertTriangle size={14} color="var(--red-600)" style={{ flexShrink: 0 }} />}
                <span style={{ fontSize: 12, color: r.ok ? 'var(--green-800)' : 'var(--red-800)', fontWeight: r.ok ? 400 : 600 }}>{r.regra}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ────────────────────────────────────────────────────────
export default function Administracao({ setPage, mobile }) {
  const [secao, setSecao] = useState('inicio');

  return (
    <div style={{ maxWidth: 980, width: '100%' }}>
      {/* Warning bar */}
      <div style={{ margin: mobile ? '14px 12px 0' : '28px 32px 0', padding: '10px 16px', background: 'var(--yellow)', borderRadius: 4, marginBottom: 0, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Shield size={16} color="var(--black)" />
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--black)' }}>Painel de Administração — acesso restrito a administradores. Todos os acessos ficam em auditoria imutável.</span>
      </div>

      {/* Submenu — mesmo estilo do Marketplace */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', padding: mobile ? '0 12px' : '0 32px', display: 'flex', alignItems: 'center', marginBottom: 0 }}>
        {MENU.map(item => (
          <button
            key={item.key}
            onClick={() => setSecao(item.key)}
            style={{
              padding: '14px 20px', fontSize: 13,
              fontWeight: secao === item.key ? 800 : 500,
              color: secao === item.key ? 'var(--red-600)' : 'var(--gray-600)',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: secao === item.key ? '2.5px solid var(--red-600)' : '2.5px solid transparent',
              marginBottom: -1, transition: 'all 0.15s',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div style={{ padding: mobile ? '14px 12px' : '24px 32px' }}>
        {secao === 'inicio'  && <SecaoInicio mobile={mobile} />}
        {secao === 'membros' && <SecaoMembros mobile={mobile} />}
        {secao === 'quotas'  && <SecaoQuotas mobile={mobile} />}
      </div>
    </div>
  );
}
