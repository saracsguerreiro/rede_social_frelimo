import { useState } from 'react';
import { CheckCircle, Clock, Lock, Users, TrendingUp, Award } from 'lucide-react';
import { votacoes as initialVotacoes } from '../data/mockData';
import AnunciosSidebar from '../components/AnunciosSidebar';
import AnuncioCard from '../components/AnuncioCard';

export default function Votacoes({ setPage, mobile }) {
  const [votacoes, setVotacoes] = useState(initialVotacoes);
  const [myVotes, setMyVotes] = useState({ 2: 'a', 3: 'a' });

  function votar(votacaoId, opcaoId) {
    if (myVotes[votacaoId]) return;
    setMyVotes(prev => ({ ...prev, [votacaoId]: opcaoId }));
    setVotacoes(prev => prev.map(v => {
      if (v.id !== votacaoId) return v;
      return { ...v, votaram: v.votaram + 1, opcoes: v.opcoes.map(o => ({ ...o, votos: o.id === opcaoId ? o.votos + 1 : o.votos })) };
    }));
  }

  const abertas = votacoes.filter(v => v.estado === 'aberta');
  const encerradas = votacoes.filter(v => v.estado === 'encerrada');
  const ultimasEncerradas = encerradas.slice(-3);

  return (
    <div style={{ display: 'flex', gap: mobile ? 0 : 32, padding: mobile ? '14px 12px' : '28px 32px', alignItems: 'flex-start', flexDirection: mobile ? 'column' : 'row' }}>

      <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
        {/* Abertas */}
        {abertas.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--green-600)' }} />
              <h2 style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--green-600)' }}>Votações Abertas</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {abertas.map(v => {
                const meuVoto = myVotes[v.id];
                const totalVotos = v.opcoes.reduce((s, o) => s + o.votos, 0) || 1;
                const pct = Math.round((v.votaram / v.total) * 100);
                const quorumOk = pct >= v.quorum;
                return (
                  <div key={v.id} style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', borderTop: `4px solid ${quorumOk ? 'var(--green-600)' : 'var(--yellow)'}`, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{v.titulo}</h3>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)', display: 'flex', gap: 10 }}>
                          <span>{v.orgao}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} />Até {v.fim}</span>
                        </div>
                      </div>
                      <span className="badge badge-green">Aberta</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 16, lineHeight: 1.6 }}>{v.descricao}</p>
                    {/* Quorum */}
                    <div style={{ marginBottom: 16, padding: '10px 14px', background: quorumOk ? 'var(--green-50)' : 'var(--red-50)', borderRadius: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                      <Users size={13} color={quorumOk ? 'var(--green-600)' : 'var(--red-600)'} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600 }}>{v.votaram}/{v.total} participantes ({pct}%)</span>
                          <span style={{ color: quorumOk ? 'var(--green-600)' : 'var(--red-600)', fontWeight: 700 }}>Quórum: {v.quorum}% {quorumOk ? '✓' : '— pendente'}</span>
                        </div>
                        <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 50 }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: quorumOk ? 'var(--green-600)' : 'var(--red-600)', borderRadius: 50 }} />
                        </div>
                      </div>
                    </div>
                    {/* Opções */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {v.opcoes.map(o => {
                        const opcPct = Math.round((o.votos / totalVotos) * 100);
                        const sel = meuVoto === o.id;
                        return (
                          <button key={o.id} onClick={() => votar(v.id, o.id)} style={{
                            padding: '12px 16px', border: `2px solid ${sel ? 'var(--green-600)' : 'var(--gray-200)'}`, borderRadius: 14,
                            background: sel ? 'var(--green-50)' : 'var(--white)', cursor: meuVoto ? 'default' : 'pointer',
                            textAlign: 'left', position: 'relative', overflow: 'hidden',
                          }}>
                            {meuVoto && <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${opcPct}%`, background: sel ? 'rgba(22,122,69,0.1)' : 'rgba(0,0,0,0.03)' }} />}
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {sel && <CheckCircle size={14} color="var(--green-600)" />}
                                <span style={{ fontSize: 13, fontWeight: sel ? 700 : 400 }}>{o.texto}</span>
                              </div>
                              {meuVoto && <span style={{ fontSize: 12, fontWeight: 800, color: sel ? 'var(--green-600)' : 'var(--gray-400)' }}>{opcPct}%</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {!meuVoto && <div style={{ marginTop: 12, padding: '8px 14px', background: 'var(--red-50)', borderRadius: 50, fontSize: 12, color: 'var(--red-800)', display: 'flex', gap: 6, alignItems: 'center' }}>
                      <Lock size={12} />Seleccione uma opção para registar o seu voto. O voto é secreto.
                    </div>}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Encerradas — resultados */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Award size={15} color="var(--gray-600)" />
          <h2 style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--gray-600)' }}>Resultados das Últimas Votações</h2>
        </div>
        {ultimasEncerradas.map(v => {
          const totalVotos = v.opcoes.reduce((s, o) => s + o.votos, 0) || 1;
          const vencedora = [...v.opcoes].sort((a, b) => b.votos - a.votos)[0];
          return (
            <div key={v.id} style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', padding: '20px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{v.titulo}</h3>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{v.orgao} · {v.inicio} – {v.fim}</div>
                </div>
                <span className="badge badge-red">Encerrada</span>
              </div>
              {/* Resultado destaque */}
              <div style={{ padding: '10px 16px', background: 'var(--green-50)', borderRadius: 14, marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                <CheckCircle size={16} color="var(--green-600)" />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--green-800)' }}>{vencedora.texto}</div>
                  <div style={{ fontSize: 11, color: 'var(--green-700)' }}>{Math.round((vencedora.votos / totalVotos) * 100)}% dos votos · {v.votaram} participantes</div>
                </div>
              </div>
              {/* Barras */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {v.opcoes.map(o => {
                  const pct = Math.round((o.votos / totalVotos) * 100);
                  return (
                    <div key={o.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          {o.id === vencedora.id && <CheckCircle size={11} color="var(--green-600)" />}
                          {o.texto}
                        </span>
                        <span style={{ fontWeight: 700, color: o.id === vencedora.id ? 'var(--green-600)' : 'var(--gray-400)' }}>{pct}%</span>
                      </div>
                      <div style={{ height: 8, background: 'var(--gray-200)', borderRadius: 50 }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: o.id === vencedora.id ? 'var(--green-600)' : 'var(--gray-300)', borderRadius: 50 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Coluna direita */}
      {!mobile && <div style={{ width: 260, flexShrink: 0 }}>
        <div className="widget">
          <div className="widget-header"><div className="widget-title"><TrendingUp size={14} color="var(--red-600)" />Resumo de Votações</div></div>
          <div style={{ padding: '14px 16px' }}>
            {[
              { label: 'Abertas', val: abertas.length, cor: 'var(--green-600)' },
              { label: 'Encerradas', val: encerradas.length, cor: 'var(--gray-400)' },
              { label: 'O meu voto', val: `${Object.keys(myVotes).length}/${votacoes.length}`, cor: 'var(--red-600)' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: s.cor }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 12 }}><AnuncioCard /></div>
        <div className="widget" style={{ padding: '16px', marginTop: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Participação por Órgão</div>
          {[
            { orgao: 'Comité Central', pct: 74 },
            { orgao: 'CP Maputo', pct: 89 },
            { orgao: 'OJM Nacional', pct: 84 },
          ].map(o => (
            <div key={o.orgao} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: 'var(--gray-600)' }}>{o.orgao}</span>
                <span style={{ fontWeight: 700 }}>{o.pct}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 50 }}>
                <div style={{ width: `${o.pct}%`, height: '100%', background: 'var(--red-600)', borderRadius: 50 }} />
              </div>
            </div>
          ))}
        </div>
        <AnunciosSidebar />
      </div>
      }
    </div>
  );
}
