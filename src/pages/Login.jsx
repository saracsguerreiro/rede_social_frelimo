import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

const inputStyle = {
  width: '100%', padding: '11px 14px',
  border: '1.5px solid var(--gray-200)', borderRadius: 8,
  background: 'var(--gray-100)', fontSize: 13, color: 'var(--black)',
  outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block', fontSize: 11, fontWeight: 700,
  color: 'var(--black)', marginBottom: 5,
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function EntrarForm({ onLogin }) {
  const [cartao, setCartao] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <>
      <Field label="N.º de cartão de militante">
        <input
          value={cartao}
          onChange={e => setCartao(e.target.value)}
          placeholder="0000000-MZ"
          style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: 1 }}
          onFocus={e => e.target.style.borderColor = 'var(--red-600)'}
          onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
        />
      </Field>

      <Field label="Senha">
        <div style={{ position: 'relative' }}>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onLogin()}
            placeholder="••••••••"
            style={{ ...inputStyle, paddingRight: 42 }}
            onFocus={e => e.target.style.borderColor = 'var(--red-600)'}
            onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--gray-400)', padding: 0 }}
          >
            {mostrarSenha ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </Field>

      <button
        onClick={onLogin}
        style={{
          width: '100%', padding: '13px',
          background: 'var(--red-600)', color: '#fff',
          border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
          cursor: 'pointer', transition: 'background 0.15s', marginBottom: 14,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--red-800)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}
      >
        Entrar
      </button>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--red-600)', cursor: 'pointer', marginBottom: 20 }}>
        Recuperar acesso através do secretariado da sua célula
      </p>
    </>
  );
}

export default function Login({ onLogin }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Painel esquerdo */}
      <div style={{
        width: '46%',
        background: 'linear-gradient(180deg, #E15059 0%, #D2232A 28%, #8C171C 68%, #5C0F13 100%)',
        position: 'relative', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '48px 56px', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
            <img
              src={`${import.meta.env.BASE_URL}frelimo.png`}
              alt="FRELIMO"
              style={{ width: 120, height: 120, objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}
            />
          </div>
          <h1 style={{ color: '#fff', fontSize: 52, fontWeight: 900, letterSpacing: -1, lineHeight: 1, marginBottom: 10, textAlign: 'center' }}>FRELIMO</h1>
          <p style={{ color: 'var(--yellow)', fontSize: 17, fontWeight: 500, marginBottom: 28, textAlign: 'center' }}>Rede interna de militantes e quadros</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7, textAlign: 'center' }}>
            Comunicação oficial, segura e soberana entre os órgãos do Partido, do Comité Central a cada célula.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 28, left: 56, right: 56, zIndex: 1, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
            Alojado em Moçambique · Raxio MZ1, Maputo
          </p>
        </div>
      </div>

      {/* Painel direito */}
      <div style={{
        flex: 1, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px 48px', overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div style={{ background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 16, padding: '32px 32px 24px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)', marginBottom: 4 }}>Entrar na rede interna</h2>
            <p style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 22 }}>Acesso restrito a membros do Partido FRELIMO</p>
            <EntrarForm onLogin={onLogin} />

            {/* Nota de segurança */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '10px 12px', background: 'var(--gray-100)', borderRadius: 8 }}>
              <Lock size={12} color="var(--gray-400)" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 11, color: 'var(--gray-600)', lineHeight: 1.5 }}>
                Ligação cifrada · Os acessos a este sistema são registados
              </p>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--gray-400)', marginTop: 16 }}>
            Sistema de uso interno do Partido. Não partilhe as suas credenciais.
          </p>
        </div>
      </div>
    </div>
  );
}
