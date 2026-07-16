import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function Login({ onLogin }) {
  const [cartao, setCartao] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Painel esquerdo — vermelho ── */}
      <div style={{
        width: '46%',
        background: 'var(--red-600)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 56px',
        overflow: 'hidden',
      }}>
        {/* Grid lines overlay */}
        {[...Array(16)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(i + 1) * 6.25}%`, width: 1, background: 'rgba(255,255,255,0.06)' }} />
        ))}

        {/* Logo + nome */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/frelimo.png" alt="FRELIMO" style={{ width: 56, height: 56, objectFit: 'contain', marginBottom: 28, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }} />
          <h1 style={{ color: 'var(--white)', fontSize: 52, fontWeight: 900, letterSpacing: -1, lineHeight: 1, marginBottom: 10 }}>FRELIMO</h1>
          <p style={{ color: 'var(--yellow)', fontSize: 18, fontWeight: 500, marginBottom: 28 }}>Rede interna de militantes e quadros</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7, maxWidth: 380, marginBottom: 40 }}>
            Comunicação oficial, segura e soberana entre os órgãos do Partido — do Comité Central a cada célula.
          </p>
        </div>

        {/* Feature list */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            'Circulares e convocatórias oficiais',
            'Mensagens cifradas por órgão',
            'Votações e deliberações internas',
            'Formação política de quadros',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--yellow)', flexShrink: 0 }} />
              <span style={{ color: 'var(--white)', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ position: 'absolute', bottom: 32, left: 56, right: 56, zIndex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            Alojado em Moçambique · Raxio MZ1, Maputo
          </p>
        </div>
      </div>

      {/* ── Painel direito — branco ── */}
      <div style={{
        flex: 1,
        background: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Card */}
          <div style={{ background: 'var(--white)', border: '1.5px solid var(--gray-200)', borderRadius: 16, padding: '40px 36px' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--black)', marginBottom: 6 }}>Entrar na rede interna</h2>
            <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 30 }}>Acesso restrito a membros do Partido FRELIMO</p>

            {/* Cartão */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--black)', marginBottom: 7 }}>
                N.º de cartão de militante
              </label>
              <input
                value={cartao}
                onChange={e => setCartao(e.target.value)}
                placeholder="0000000-MZ"
                style={{
                  width: '100%', padding: '13px 16px',
                  border: '1.5px solid var(--gray-200)', borderRadius: 8,
                  background: 'var(--gray-100)', fontSize: 14, color: 'var(--black)',
                  outline: 'none', fontFamily: 'monospace', letterSpacing: 1,
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--red-600)'}
                onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
              />
            </div>

            {/* Senha */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--black)', marginBottom: 7 }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && onLogin()}
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '13px 44px 13px 16px',
                    border: '1.5px solid var(--gray-200)', borderRadius: 8,
                    background: 'var(--gray-100)', fontSize: 14, color: 'var(--black)',
                    outline: 'none', transition: 'border-color 0.15s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--red-600)'}
                  onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--gray-400)', padding: 0 }}
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Botão */}
            <button
              onClick={onLogin}
              style={{
                width: '100%', padding: '14px',
                background: 'var(--red-600)', color: 'var(--white)',
                border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700,
                cursor: 'pointer', transition: 'background 0.15s',
                marginBottom: 16,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--red-800)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}
            >
              Entrar
            </button>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--red-600)', cursor: 'pointer', marginBottom: 28 }}>
              Recuperar acesso através do secretariado da sua célula
            </p>

            {/* Security note */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 14px', background: 'var(--gray-100)', borderRadius: 8 }}>
              <Lock size={13} color="var(--gray-400)" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 11, color: 'var(--gray-600)', lineHeight: 1.5 }}>
                Ligação cifrada · Os acessos a este sistema são registados
              </p>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--gray-400)', marginTop: 20 }}>
            Sistema de uso interno do Partido. Não partilhe as suas credenciais.
          </p>
        </div>
      </div>
    </div>
  );
}
