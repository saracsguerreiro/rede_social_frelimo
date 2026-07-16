import { Users, TrendingUp, FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { statsAdmin } from '../data/mockData';

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

export default function Administracao() {
  return (
    <div style={{ padding: '24px', maxWidth: 980 }}>
      {/* Warning bar */}
      <div style={{ padding: '10px 16px', background: 'var(--yellow)', borderRadius: 4, marginBottom: 24, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Shield size={16} color="var(--black)" />
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--black)' }}>Painel de Administração — acesso restrito a administradores. Todos os acessos ficam em auditoria imutável.</span>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        <KPICard label="Militantes activos" valor={statsAdmin.militantesActivos.toLocaleString('pt-PT')} sub="Na plataforma este mês" cor="var(--red-600)" icon={Users} />
        <KPICard label="Quotas em dia" valor={statsAdmin.quotasEmDia} sub="78% dos militantes" cor="var(--green-600)" icon={CheckCircle} />
        <KPICard label="Células activas" valor={statsAdmin.celulasActivas} sub="Com espaço activo" cor="var(--yellow)" icon={TrendingUp} />
        <KPICard label="Uso da plataforma" valor={statsAdmin.usoPlatforma} sub="Activos semanais / meta: 60%" cor="var(--red-600)" icon={TrendingUp} />
        <KPICard label="Circulares difundidas" valor={statsAdmin.circularesDifundidas} sub="Este mês" cor="var(--green-600)" icon={FileText} />
        <KPICard label="Tempo de difusão" valor={statsAdmin.tempoDifusao} sub="Sede → células (média)" cor="var(--black)" icon={TrendingUp} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* KPI target */}
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

        {/* Audit log */}
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
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: log.tipo === 'auth' ? 'var(--green-600)' : log.tipo === 'publicacao' ? 'var(--red-600)' : log.tipo === 'admin' ? 'var(--yellow)' : 'var(--gray-400)',
                }} />
                <span style={{ fontSize: 12, flex: 1 }}>{log.acao}</span>
                <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{log.usuario}</span>
              </div>
            ))}
          </div>
          <button className="btn-ghost" style={{ width: '100%', marginTop: 12, fontSize: 12 }}>Ver auditoria completa</button>
        </div>

        {/* Governance rules */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Regras Estatutárias — Estado de Cumprimento</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
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
