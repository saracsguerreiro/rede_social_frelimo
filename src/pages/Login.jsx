import { useState } from 'react';
import { Star, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Login({ onLogin }) {
  const [cartao, setCartao] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!cartao || !senha) { setErro('Preencha todos os campos.'); return; }
    setLoading(true);
    setErro('');
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--red-600)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      {/* Flag stripe */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 6, display: 'flex' }}>
        <div style={{ flex: 1, background: 'var(--black)' }} />
        <div style={{ flex: 1, background: 'var(--yellow)' }} />
        <div style={{ flex: 1, background: 'var(--white)' }} />
        <div style={{ flex: 1, background: 'var(--green-600)' }} />
        <div style={{ flex: 1, background: 'var(--red-600)' }} />
      </div>

      <div style={{ maxWidth: 420, width: '100%' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, background: 'var(--white)', borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            border: '3px solid var(--yellow)',
          }}>
            <Star size={40} color="var(--red-600)" fill="var(--red-600)" />
          </div>
          <h1 style={{ color: 'var(--white)', fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>FRELIMO</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>Rede Interna · Uso exclusivo de militantes</p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--white)', borderRadius: 8, padding: '32px 28px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Lock size={16} color="var(--red-600)" />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Acesso Seguro</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--gray-600)' }}>
                NÚMERO DE CARTÃO DE MILITANTE
              </label>
              <input
                className="input"
                value={cartao}
                onChange={e => setCartao(e.target.value)}
                placeholder="Ex: FREL-2019-047821"
                style={{ fontFamily: 'monospace', letterSpacing: 1 }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--gray-600)' }}>
                SENHA
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="A sua senha"
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--gray-400)' }}
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {erro && (
              <div style={{ background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: 4, padding: '8px 12px', color: 'var(--red-800)', fontSize: 13, marginBottom: 16 }}>
                {erro}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: 14, opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? 'A verificar...' : 'Entrar na Plataforma'}
            </button>
          </form>

          <div style={{ marginTop: 20, padding: '12px', background: 'var(--gray-100)', borderRadius: 4, display: 'flex', gap: 8 }}>
            <ShieldCheck size={15} color="var(--green-600)" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 11, color: 'var(--gray-600)', lineHeight: 1.5 }}>
              Esta plataforma é de uso exclusivo de militantes do FRELIMO. O acesso é cifrado e auditado. Dados alojados em Moçambique.
            </p>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, textAlign: 'center', marginTop: 20 }}>
          © 2026 Partido FRELIMO · Todos os direitos reservados · Confidencial
        </p>
      </div>
    </div>
  );
}
