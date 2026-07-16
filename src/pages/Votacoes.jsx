import { useState } from 'react';
import { CheckCircle, Clock, Lock, Users } from 'lucide-react';
import { votacoes as initialVotacoes } from '../data/mockData';

export default function Votacoes() {
  const [votacoes, setVotacoes] = useState(initialVotacoes);
  const [myVotes, setMyVotes] = useState({ 2: 'a' });

  function votar(votacaoId, opcaoId) {
    setMyVotes(prev => ({ ...prev, [votacaoId]: opcaoId }));
    setVotacoes(prev => prev.map(v => {
      if (v.id !== votacaoId) return v;
      return {
        ...v,
        votaram: v.votaram + (myVotes[votacaoId] ? 0 : 1),
        opcoes: v.opcoes.map(o => ({
          ...o,
          votos: o.id === opcaoId ? o.votos + 1 : (o.id === myVotes[votacaoId] ? o.votos - 1 : o.votos),
        })),
      };
    }));
  }

  const abertas = votacoes.filter(v => v.estado === 'aberta');
  const encerradas = votacoes.filter(v => v.estado === 'encerrada');

  return (
    <div style={{ padding: '24px', maxWidth: 780 }}>
      {abertas.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-600)', animation: 'pulse 2s infinite' }} />
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--green-600)' }}>Votações Abertas</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {abertas.map(v => {
              const meuVoto = myVotes[v.id];
              const totalVotos = v.opcoes.reduce((s, o) => s + o.votos, 0) || 1;
              const pct = Math.round((v.votaram / v.total) * 100);
              const quorumOk = pct >= v.quorum;

              return (
                <div key={v.id} className="card" style={{ borderTop: `4px solid ${quorumOk ? 'var(--green-600)' : 'var(--yellow)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{v.titulo}</h3>
                      <div style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--gray-400)' }}>
                        <span>{v.orgao}</span>
                        <span>·</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={11} />Até {v.fim}</span>
                      </div>
                    </div>
                    <span className="badge badge-green">Aberta</span>
                  </div>

                  <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 16, lineHeight: 1.6 }}>{v.descricao}</p>

                  {/* Quorum */}
                  <div style={{ marginBottom: 16, padding: '10px 14px', background: quorumOk ? 'var(--green-50)' : 'var(--red-50)', borderRadius: 4, display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Users size={14} color={quorumOk ? 'var(--green-600)' : 'var(--red-600)'} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>Participação: {v.votaram}/{v.total} ({pct}%)</span>
                        <span style={{ color: quorumOk ? 'var(--green-600)' : 'var(--red-600)', fontWeight: 600 }}>
                          Quórum: {v.quorum}% {quorumOk ? '✓' : '—pendente'}
                        </span>
                      </div>
                      <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 3 }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: quorumOk ? 'var(--green-600)' : 'var(--red-600)', borderRadius: 3 }} />
                      </div>
                    </div>
                  </div>

                  {/* Opções */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {v.opcoes.map(o => {
                      const opcPct = Math.round((o.votos / totalVotos) * 100);
                      const seleccionada = meuVoto === o.id;
                      return (
                        <button
                          key={o.id}
                          onClick={() => !meuVoto && votar(v.id, o.id)}
                          style={{
                            padding: '12px 14px',
                            border: `2px solid ${seleccionada ? 'var(--green-600)' : 'var(--gray-200)'}`,
                            borderRadius: 6,
                            background: seleccionada ? 'var(--green-50)' : 'var(--white)',
                            cursor: meuVoto ? 'default' : 'pointer',
                            textAlign: 'left',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {meuVoto && (
                            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${opcPct}%`, background: seleccionada ? 'rgba(22,122,69,0.1)' : 'rgba(0,0,0,0.04)', transition: 'width 0.4s' }} />
                          )}
                          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              {seleccionada && <CheckCircle size={14} color="var(--green-600)" />}
                              <span style={{ fontSize: 13, fontWeight: seleccionada ? 700 : 400 }}>{o.texto}</span>
                            </div>
                            {meuVoto && <span style={{ fontSize: 12, fontWeight: 700, color: seleccionada ? 'var(--green-600)' : 'var(--gray-600)' }}>{opcPct}%</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {!meuVoto && (
                    <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--red-50)', borderRadius: 4, fontSize: 12, color: 'var(--red-800)', display: 'flex', gap: 6, alignItems: 'center' }}>
                      <Lock size={12} />Seleccione uma opção para registar o seu voto. O voto é secreto.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--gray-600)', marginBottom: 16 }}>Votações Encerradas</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {encerradas.map(v => {
          const totalVotos = v.opcoes.reduce((s, o) => s + o.votos, 0) || 1;
          return (
            <div key={v.id} className="card" style={{ opacity: 0.8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700 }}>{v.titulo}</h3>
                <span className="badge badge-red">Encerrada</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 12 }}>{v.orgao} · {v.inicio} – {v.fim}</p>
              {v.resultado && (
                <div style={{ padding: '8px 12px', background: 'var(--green-50)', borderRadius: 4, fontSize: 12, fontWeight: 700, color: 'var(--green-800)', marginBottom: 12 }}>
                  {v.resultado}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {v.opcoes.map(o => {
                  const pct = Math.round((o.votos / totalVotos) * 100);
                  return (
                    <div key={o.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                        <span>{o.texto}</span>
                        <span style={{ fontWeight: 700 }}>{pct}% ({o.votos})</span>
                      </div>
                      <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 3 }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: pct > 50 ? 'var(--green-600)' : 'var(--gray-400)', borderRadius: 3 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
