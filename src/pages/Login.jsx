import { useState } from 'react';
import { Eye, EyeOff, Lock, UserPlus, LogIn } from 'lucide-react';

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
          placeholder="FREL-0000-000000"
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

function RegistarForm({ onLogin }) {
  const [form, setForm] = useState({
    cartao: '', dataNascimento: '',
    sexo: '', telefone: '', email: '', celula: '', cargo: '',
    senha: '', confirmarSenha: '',
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.cartao || !form.senha) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    setErro('');
    onLogin();
  };

  const fStyle = campo => ({
    ...inputStyle,
    ...(campo === 'cartao' ? { fontFamily: 'monospace', letterSpacing: 1 } : {}),
  });

  const focusRed = e => e.target.style.borderColor = 'var(--red-600)';
  const blurGray = e => e.target.style.borderColor = 'var(--gray-200)';

  return (
    <>
      <Field label="N.º de cartão de militante *">
        <input value={form.cartao} onChange={set('cartao')} placeholder="FREL-0000-000000"
          style={fStyle('cartao')} onFocus={focusRed} onBlur={blurGray} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
        <Field label="Data de nascimento">
          <input type="date" value={form.dataNascimento} onChange={set('dataNascimento')}
            style={fStyle()} onFocus={focusRed} onBlur={blurGray} />
        </Field>
        <Field label="Sexo">
          <select value={form.sexo} onChange={set('sexo')}
            style={{ ...fStyle(), appearance: 'none' }} onFocus={focusRed} onBlur={blurGray}>
            <option value="">Seleccionar</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
        <Field label="N.º de telemóvel">
          <input value={form.telefone} onChange={set('telefone')} placeholder="+258 8X XXX XXXX"
            style={fStyle()} onFocus={focusRed} onBlur={blurGray} />
        </Field>
        <Field label="Email institucional">
          <input type="email" value={form.email} onChange={set('email')} placeholder="nome@frelimo.mz"
            style={fStyle()} onFocus={focusRed} onBlur={blurGray} />
        </Field>
      </div>

      <Field label="Célula / Órgão partidário">
        <input value={form.celula} onChange={set('celula')} placeholder="Ex: Célula 7 — Polana Cimento"
          style={fStyle()} onFocus={focusRed} onBlur={blurGray} />
      </Field>

      <Field label="Cargo">
        <input value={form.cargo} onChange={set('cargo')} placeholder="Ex: Secretário Distrital"
          style={fStyle()} onFocus={focusRed} onBlur={blurGray} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
        <Field label="Senha *">
          <div style={{ position: 'relative' }}>
            <input type={mostrarSenha ? 'text' : 'password'} value={form.senha} onChange={set('senha')}
              placeholder="••••••••" style={{ ...fStyle(), paddingRight: 38 }}
              onFocus={focusRed} onBlur={blurGray} />
            <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--gray-400)', padding: 0 }}>
              {mostrarSenha ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
        </Field>
        <Field label="Confirmar senha *">
          <input type="password" value={form.confirmarSenha} onChange={set('confirmarSenha')}
            placeholder="••••••••" style={fStyle()} onFocus={focusRed} onBlur={blurGray} />
        </Field>
      </div>

      {erro && (
        <p style={{ fontSize: 12, color: 'var(--red-600)', marginBottom: 10, fontWeight: 600 }}>{erro}</p>
      )}

      <button
        onClick={handleSubmit}
        style={{
          width: '100%', padding: '13px',
          background: 'var(--red-600)', color: '#fff',
          border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
          cursor: 'pointer', transition: 'background 0.15s', marginBottom: 8,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--red-800)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}
      >
        Registar e entrar
      </button>
    </>
  );
}

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('entrar');

  const TabBtn = ({ id, label, Icon }) => (
    <button
      onClick={() => setTab(id)}
      style={{
        flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 700,
        border: 'none', borderRadius: 8, cursor: 'pointer',
        background: tab === id ? 'var(--red-600)' : 'transparent',
        color: tab === id ? '#fff' : 'var(--gray-400)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        transition: 'all 0.15s',
      }}
    >
      <Icon size={14} /> {label}
    </button>
  );

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

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--gray-100)', borderRadius: 10, padding: 4, marginBottom: 24 }}>
              <TabBtn id="entrar" label="Entrar" Icon={LogIn} />
              <TabBtn id="registar" label="Registar" Icon={UserPlus} />
            </div>

            {tab === 'entrar' ? (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)', marginBottom: 4 }}>Entrar na rede interna</h2>
                <p style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 22 }}>Acesso restrito a membros do Partido FRELIMO</p>
                <EntrarForm onLogin={onLogin} />
              </>
            ) : (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)', marginBottom: 4 }}>Registo de militante</h2>
                <p style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 22 }}>Preencha os seus dados para solicitar acesso à plataforma</p>
                <RegistarForm onLogin={onLogin} />
              </>
            )}

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
