import { ShieldCheck, Star } from 'lucide-react';

export default function Login({ onLogin }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--red-800) 0%, var(--red-600) 50%, var(--red-900) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(22,122,69,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251,192,45,0.08) 0%, transparent 50%)',
      }} />

      {/* Flag stripe top */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 7, display: 'flex', zIndex: 10 }}>
        <div style={{ flex: 1, background: 'var(--black)' }} />
        <div style={{ flex: 1, background: 'var(--yellow)' }} />
        <div style={{ flex: 1, background: 'var(--white)' }} />
        <div style={{ flex: 1, background: 'var(--green-600)' }} />
        <div style={{ flex: 1, background: 'var(--red-400)' }} />
      </div>

      <div style={{ maxWidth: 440, width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img
            src="/frelimo.png"
            alt="FRELIMO"
            style={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 16, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}
          />
          <h1 style={{ color: 'var(--white)', fontSize: 32, fontWeight: 900, letterSpacing: -0.5, marginBottom: 6 }}>FRELIMO</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15 }}>Rede Interna · Uso exclusivo de militantes</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 20, padding: '36px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: 'var(--black)' }}>Bem-vindo(a)</h2>
          <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 28, lineHeight: 1.6 }}>
            Plataforma exclusiva para militantes e quadros do Partido FRELIMO. Acesso cifrado e auditado.
          </p>

          <button
            onClick={onLogin}
            className="btn-primary"
            style={{
              width: '100%', padding: '14px', fontSize: 16, fontWeight: 800,
              borderRadius: 12, letterSpacing: 0.3,
              background: 'linear-gradient(135deg, var(--red-600) 0%, var(--red-800) 100%)',
              boxShadow: '0 4px 16px rgba(210,35,42,0.4)',
            }}
          >
            Entrar na Plataforma
          </button>

          <div style={{ marginTop: 20, padding: '12px 14px', background: 'var(--green-50)', borderRadius: 10, display: 'flex', gap: 8 }}>
            <ShieldCheck size={16} color="var(--green-600)" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 11, color: 'var(--green-800)', lineHeight: 1.6 }}>
              Versão protótipo — dados alojados em Moçambique (Raxio MZ1). Comunicações cifradas de ponta a ponta.
            </p>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textAlign: 'center', marginTop: 24 }}>
          © 2026 Partido FRELIMO · Confidencial · Versão 2.0
        </p>
      </div>
    </div>
  );
}
