import { useState } from 'react';
import {
  ShoppingCart, Store, Laptop, Wrench, Briefcase, Building2,
  Truck, Plus, Minus, X, ChevronLeft, Check, Star, Search,
  Package, CheckCircle, ArrowRight,
} from 'lucide-react';

// ── Dados ──────────────────────────────────────────────────────────────────────
const CATEGORIAS = [
  { nome: 'Tecnologia',   icon: Laptop,    count: 340, desc: 'Software, hardware e soluções tecnológicas para a sua empresa' },
  { nome: 'Equipamentos', icon: Wrench,    count: 280, desc: 'Maquinaria, ferramentas e equipamentos industriais' },
  { nome: 'Serviços',     icon: Briefcase, count: 195, desc: 'Consultoria, formação e serviços empresariais especializados' },
  { nome: 'Construção',   icon: Building2, count: 160, desc: 'Materiais, empreiteiros e soluções para construção civil' },
  { nome: 'Logística',    icon: Truck,     count: 125, desc: 'Transporte, armazenamento e distribuição de mercadorias' },
];

const PRODUTOS = [
  { id: 1,   nome: 'Sistema ERP Completo',         categoria: 'Tecnologia',   tipo: 'Software',  fornecedor: 'TechSolutions Moz',     preco: '450.000 MT', precoNum: 450000, avaliacao: 4.9, novo: true,  desc: 'Sistema ERP empresarial completo com módulos de finanças, recursos humanos, inventário e relatórios em tempo real. Implementação incluída.', imagem: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { id: 101, nome: 'Computadores Dell Premium',    categoria: 'Tecnologia',   tipo: 'Produto',   fornecedor: 'Tech Store Moçambique',  preco: '185.000 MT', precoNum: 185000, avaliacao: 4.8, novo: false, desc: 'Computadores Dell de alta performance para uso empresarial. Processador Intel Core i7, 16GB RAM, SSD 512GB. Garantia de 2 anos.', imagem: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80' },
  { id: 102, nome: 'Software CRM Cloud',           categoria: 'Tecnologia',   tipo: 'Serviço',   fornecedor: 'CloudSoft Moçambique',   preco: '320.000 MT', precoNum: 320000, avaliacao: 4.6, novo: false, desc: 'Plataforma CRM completa em nuvem para gestão de clientes, vendas e marketing. Inclui formação e suporte prioritário 12 meses.', imagem: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80' },
  { id: 2,   nome: 'Equipamento Industrial',       categoria: 'Equipamentos', tipo: 'Produto',   fornecedor: 'Máquinas Premium',       preco: '850.000 MT', precoNum: 850000, avaliacao: 4.8, novo: false, desc: 'Equipamento industrial de alta capacidade para linha de produção. Potência 15kW, capacidade 500kg/h. Instalação e formação incluídas.', imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80' },
  { id: 103, nome: 'Ferramentas Industriais',      categoria: 'Equipamentos', tipo: 'Produto',   fornecedor: 'Tools Master Moz',       preco: '245.000 MT', precoNum: 245000, avaliacao: 4.5, novo: false, desc: 'Kit completo de ferramentas industriais profissionais para oficinas e fábricas. 48 peças certificadas com garantia de 3 anos.', imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80' },
  { id: 3,   nome: 'Consultoria Empresarial',      categoria: 'Serviços',     tipo: 'Serviço',   fornecedor: 'Consulting Pro Moz',     preco: '28.000 MT',  precoNum: 28000,  avaliacao: 4.7, novo: false, desc: 'Consultoria estratégica para PMEs: diagnóstico organizacional, plano de negócios e acompanhamento trimestral.', imagem: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80' },
  { id: 104, nome: 'Serviços de Marketing Digital', categoria: 'Serviços',   tipo: 'Serviço',   fornecedor: 'Digital Boost Moz',      preco: '180.000 MT', precoNum: 180000, avaliacao: 4.9, novo: false, desc: 'Pacote completo de marketing digital: gestão de redes sociais, SEO, campanhas pagas e relatórios mensais. Contrato mínimo 6 meses.', imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
  { id: 105, nome: 'Consultoria Financeira PME',   categoria: 'Serviços',     tipo: 'Serviço',   fornecedor: 'AuditMoz Lda',           preco: '62.000 MT',  precoNum: 62000,  avaliacao: 4.7, novo: false, desc: 'Consultoria financeira especializada para PMEs: planeamento, orçamentação e controlo de custos.', imagem: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80' },
  { id: 4,   nome: 'Materiais de Construção',      categoria: 'Construção',   tipo: 'Produto',   fornecedor: 'Build Master Moz',       preco: '62.000 MT',  precoNum: 62000,  avaliacao: 4.6, novo: true,  desc: 'Pack de materiais de construção para obras de média dimensão: cimento, ferro, blocos e acessórios. Entrega ao domicílio em 48h.', imagem: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80' },
  { id: 107, nome: 'Painéis Solares Empresariais', categoria: 'Construção',   tipo: 'Produto',   fornecedor: 'SolarMoz Energy',        preco: '420.000 MT', precoNum: 420000, avaliacao: 4.8, novo: false, desc: 'Sistema solar fotovoltaico para empresas: 20kW, baterias de armazenamento, inversores e instalação completa.', imagem: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80' },
  { id: 106, nome: 'Camião de Transporte 10T',     categoria: 'Logística',    tipo: 'Serviço',   fornecedor: 'MozCargo Transport',     preco: '35.000 MT',  precoNum: 35000,  avaliacao: 4.5, novo: false, desc: 'Serviço de transporte de carga até 10 toneladas para todo o território nacional. Seguro de carga incluído.', imagem: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80' },
];

const ANUNCIOS = [
  { id: 'ad1', empresa: { nome: 'DigiMoz Agency',      avatar: 'DM', cor: 'var(--green-600)' }, produto: 'Serviços de Marketing Digital', preco: 'A partir de 25.000 MT', categoria: 'Serviços',    imagem: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80' },
  { id: 'ad2', empresa: { nome: 'MozTech Solutions',   avatar: 'MT', cor: 'var(--red-800)' },   produto: 'Laptop HP ProBook 450 G9',      preco: '185.000 MT',            categoria: 'Tecnologia',  imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
  { id: 'ad3', empresa: { nome: 'BuildMoz Construções', avatar: 'BM', cor: 'var(--green-800)' }, produto: 'Serviços de Construção Civil', preco: 'Sob consulta',          categoria: 'Construção',  imagem: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = n => n.toLocaleString('pt-PT') + ' MT';

const tabStyle = (active) => ({
  padding: '14px 20px', fontSize: 13,
  fontWeight: active ? 800 : 500,
  color: active ? 'var(--red-600)' : 'var(--gray-600)',
  background: 'none', border: 'none', cursor: 'pointer',
  borderBottom: active ? '2.5px solid var(--red-600)' : '2.5px solid transparent',
  marginBottom: -1, transition: 'all 0.15s',
});

// ── ProdutoCard ────────────────────────────────────────────────────────────────
function ProdutoCard({ p, onVer, onAddToCart }) {
  return (
    <div
      onClick={() => onVer(p)}
      style={{ background: 'var(--white)', borderRadius: 16, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'transform 0.15s, box-shadow 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)'; }}
    >
      <div style={{ height: 190, position: 'relative', overflow: 'hidden', flexShrink: 0, background: 'var(--gray-100)' }}>
        <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
        {p.novo && <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--red-600)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 50 }}>NOVO</span>}
      </div>
      <div style={{ padding: '12px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: .8 }}>{p.categoria}</span>
          <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 50, background: p.tipo === 'Produto' ? 'var(--green-50)' : '#EFF6FF', color: p.tipo === 'Produto' ? 'var(--green-800)' : '#1D4ED8' }}>{p.tipo}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, lineHeight: 1.3, flex: 1 }}>{p.nome}</div>
        <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 10 }}>{p.fornecedor}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
          {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i <= Math.round(p.avaliacao) ? '#F59E0B' : 'none'} color={i <= Math.round(p.avaliacao) ? '#F59E0B' : 'var(--gray-300)'} />)}
          <span style={{ fontSize: 10, color: 'var(--gray-400)', marginLeft: 2 }}>{p.avaliacao}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--red-600)' }}>{p.preco}</span>
          <button onClick={e => { e.stopPropagation(); onAddToCart(p); }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={11} /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ProdutoModal ───────────────────────────────────────────────────────────────
function ProdutoModal({ produto, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  if (!produto) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', maxWidth: 780, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.35)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <X size={16} color="white" />
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '42% 58%' }}>
          <div style={{ background: 'var(--gray-100)', minHeight: 340, position: 'relative' }}>
            <img src={produto.imagem} alt={produto.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
            {produto.novo && <span style={{ position: 'absolute', top: 14, left: 14, background: 'var(--red-600)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 50 }}>NOVO</span>}
          </div>
          <div style={{ padding: '28px 28px 24px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', background: 'var(--red-50)', padding: '3px 10px', borderRadius: 50 }}>{produto.categoria}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 50, background: 'var(--green-50)', color: 'var(--green-800)' }}>{produto.tipo}</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6, lineHeight: 1.2 }}>{produto.nome}</h2>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 10 }}>{produto.fornecedor}</div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={13} fill={i <= Math.round(produto.avaliacao) ? '#F59E0B' : 'none'} color={i <= Math.round(produto.avaliacao) ? '#F59E0B' : 'var(--gray-300)'} />)}
              <span style={{ fontSize: 11, color: 'var(--gray-400)', marginLeft: 4 }}>{produto.avaliacao}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: 20 }}>{produto.desc}</p>
            <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--red-600)', marginBottom: 20 }}>{produto.preco}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--gray-200)', borderRadius: 50, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                <span style={{ width: 32, textAlign: 'center', fontWeight: 700, fontSize: 14 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
              </div>
              <button onClick={() => { onAddToCart(produto, qty); onClose(); }} style={{ flex: 1, padding: '11px 0', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <ShoppingCart size={14} /> Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CarrinhoModal ──────────────────────────────────────────────────────────────
function CarrinhoModal({ itens, onClose, onUpdateQty, onRemove }) {
  const total = itens.reduce((s, i) => s + i.produto.precoNum * i.qty, 0);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 380, height: '100vh', background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingCart size={18} color="var(--red-600)" />
            <span style={{ fontSize: 16, fontWeight: 800 }}>Carrinho</span>
            <span style={{ background: 'var(--red-600)', color: '#fff', borderRadius: 50, padding: '2px 8px', fontSize: 11, fontWeight: 800 }}>{itens.length}</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)' }}><X size={18} /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {itens.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>O carrinho está vazio.</div>}
          {itens.map(({ produto: p, qty }) => (
            <div key={p.id} style={{ display: 'flex', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--gray-200)' }}>
              <div style={{ width: 60, height: 60, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'var(--gray-100)' }}>
                <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, marginBottom: 3 }}>{p.nome}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 8 }}>{p.categoria}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--gray-200)', borderRadius: 50, overflow: 'hidden' }}>
                    <button onClick={() => onUpdateQty(p.id, -1)} style={{ width: 26, height: 26, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={10} /></button>
                    <span style={{ width: 24, textAlign: 'center', fontSize: 12, fontWeight: 700 }}>{qty}</span>
                    <button onClick={() => onUpdateQty(p.id, 1)} style={{ width: 26, height: 26, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={10} /></button>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--red-600)' }}>{fmt(p.precoNum * qty)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', alignSelf: 'flex-start', padding: 4 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--red-600)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}><X size={14} /></button>
            </div>
          ))}
        </div>
        {itens.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-200)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--red-600)' }}>{fmt(total)}</span>
            </div>
            <button style={{ width: '100%', padding: '13px', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Finalizar Encomenda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Secção: Início ─────────────────────────────────────────────────────────────
function SecaoInicio({ mobile, onVer, onAddToCart, carrinho, onOpenCart }) {
  const [busca, setBusca] = useState('');
  const [catActiva, setCatActiva] = useState(null);

  const produtosFiltrados = PRODUTOS.filter(p =>
    (!busca || p.nome.toLowerCase().includes(busca.toLowerCase()) || p.categoria.toLowerCase().includes(busca.toLowerCase())) &&
    (!catActiva || p.categoria === catActiva)
  );

  if (catActiva) {
    const cat = CATEGORIAS.find(c => c.nome === catActiva);
    const Icon = cat?.icon || Package;
    return (
      <div>
        <button onClick={() => setCatActiva(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--gray-600)', marginBottom: 18, padding: '6px 0', fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--red-600)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-600)'}>
          <ChevronLeft size={16} /> Voltar ao Marketplace
        </button>
        <div style={{ background: 'linear-gradient(125deg, var(--red-400) 0%, var(--red-600) 45%, var(--red-800) 100%)', borderRadius: 20, padding: '22px 26px', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={26} color="#fff" /></div>
          <div><div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Categoria</div><h2 style={{ color: '#fff', fontSize: 20, fontWeight: 900, marginBottom: 4 }}>{cat.nome}</h2><p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{cat.desc}</p></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {produtosFiltrados.map(p => <ProdutoCard key={p.id} p={p} onVer={onVer} onAddToCart={onAddToCart} />)}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', padding: mobile ? '16px 8px' : '22px 28px', marginBottom: 24, display: 'flex' }}>
        {[{ v: '500+', l: 'Produtos e Serviços', color: 'var(--red-600)' }, { v: '11', l: 'Províncias', color: 'var(--green-600)' }, { v: '50+', l: 'Empresas Registadas', color: 'var(--green-600)' }].map((s, i, arr) => (
          <div key={s.l} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--gray-200)' : 'none', padding: '0 8px' }}>
            <div style={{ fontSize: mobile ? 26 : 38, fontWeight: 900, color: s.color, lineHeight: 1, letterSpacing: -1 }}>{s.v}</div>
            <div style={{ fontSize: mobile ? 9.5 : 12, color: 'var(--gray-400)', marginTop: mobile ? 4 : 6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Pesquisa */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={14} color="var(--gray-400)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Pesquisar produtos e serviços..." style={{ width: '100%', padding: '11px 14px 11px 38px', border: '1.5px solid var(--gray-200)', borderRadius: 50, background: 'var(--white)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'var(--red-600)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
      </div>

      {/* Categorias */}
      {!busca && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 14, textTransform: 'uppercase', letterSpacing: .8, color: 'var(--gray-600)' }}>Categorias</h3>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: 10 }}>
            {CATEGORIAS.map(cat => {
              const Icon = cat.icon;
              return (
                <div key={cat.nome} onClick={() => setCatActiva(cat.nome)} style={{ background: 'var(--white)', border: '1.5px solid var(--gray-200)', borderRadius: 14, padding: '14px 12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-600)'; e.currentTarget.style.background = 'var(--red-50)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'var(--white)'; }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--red-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><Icon size={20} color="var(--red-600)" /></div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{cat.nome}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{cat.count} itens</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Produtos */}
      <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 14, textTransform: 'uppercase', letterSpacing: .8, color: 'var(--gray-600)' }}>{busca ? `Resultados para "${busca}"` : 'Todos os Produtos e Serviços'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
        {produtosFiltrados.map(p => <ProdutoCard key={p.id} p={p} onVer={onVer} onAddToCart={onAddToCart} />)}
        {produtosFiltrados.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: 'var(--gray-400)', fontSize: 13 }}>Nenhum resultado encontrado.</div>}
      </div>
    </div>
  );
}

// ── Secção: Minha Empresa ─────────────────────────────────────────────────────
function SecaoMinhaEmpresa({ mobile }) {
  const [etapa, setEtapa] = useState('landing');
  const [form, setForm] = useState({ nome: '', nuit: '', sector: '', provincia: '', telefone: '', descricao: '' });
  const [empresa, setEmpresa] = useState(null);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  if (etapa === 'sucesso') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center', maxWidth: 360, padding: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--green-50)', border: '3px solid var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={40} color="var(--green-600)" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Empresa Registada!</h2>
          <p style={{ color: 'var(--gray-600)', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
            <strong>{empresa?.nome || 'A sua empresa'}</strong> foi registada com sucesso no Marketplace FRELIMO.
          </p>
          <button onClick={() => setEtapa('landing')} style={{ padding: '10px 28px', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <ArrowRight size={14} /> Entrar no Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (etapa === 'form') {
    const iStyle = { width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: 8, background: 'var(--gray-100)', fontSize: 13, outline: 'none', boxSizing: 'border-box' };
    const lStyle = { display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--black)', marginBottom: 5 };
    const focRed = e => e.target.style.borderColor = 'var(--red-600)';
    const blrGray = e => e.target.style.borderColor = 'var(--gray-200)';
    return (
      <div style={{ padding: mobile ? '14px 0 32px' : '22px 0 40px' }}>
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 900, marginBottom: 5 }}>Registar Empresa</h2>
            <p style={{ fontSize: 13, color: 'var(--gray-600)' }}>Os campos são opcionais neste protótipo — pode avançar directamente.</p>
          </div>
          <div style={{ background: 'var(--white)', borderRadius: 22, border: '1px solid var(--gray-200)', padding: mobile ? '18px 14px' : '28px 32px' }}>
            {[['Nome da empresa', 'nome', 'Ex: MozTech Lda'], ['NUIT', 'nuit', '000000000'], ['Sector de actividade', 'sector', 'Ex: Tecnologia'], ['Província', 'provincia', 'Ex: Maputo'], ['Telefone', 'telefone', '+258 8X XXX XXXX']].map(([label, key, ph]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label style={lStyle}>{label}</label>
                <input value={form[key]} onChange={set(key)} placeholder={ph} style={iStyle} onFocus={focRed} onBlur={blrGray} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={lStyle}>Descrição</label>
              <textarea value={form.descricao} onChange={set('descricao')} placeholder="Descreva brevemente a sua empresa..." rows={3} style={{ ...iStyle, resize: 'vertical' }} onFocus={focRed} onBlur={blrGray} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setEtapa('landing')} style={{ flex: 1, padding: '12px', background: 'none', color: 'var(--gray-600)', border: '1.5px solid var(--gray-200)', borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => { setEmpresa(form); setEtapa('sucesso'); }} style={{ flex: 2, padding: '12px', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Registar Empresa</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--red-600), var(--red-800))', borderRadius: 20, padding: mobile ? '20px 16px' : '28px 32px', marginBottom: 22, color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Store size={28} color="#fff" />
          <div>
            <div style={{ fontSize: mobile ? 18 : 22, fontWeight: 900 }}>Marketplace FRELIMO</div>
            <div style={{ fontSize: 12, opacity: .8 }}>Para militantes e empresas afiliadas</div>
          </div>
        </div>
        <button onClick={() => setEtapa('form')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: mobile ? '10px 24px' : '12px 34px', background: '#fff', color: 'var(--red-600)', border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
          <Plus size={13} /> Registar a minha empresa
        </button>
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', padding: mobile ? '16px 8px' : '22px 28px', marginBottom: 22, display: 'flex' }}>
        {[{ v: '500+', l: 'Produtos e Serviços', color: 'var(--red-600)' }, { v: '11', l: 'Províncias', color: 'var(--green-600)' }, { v: '50+', l: 'Empresas Registadas', color: 'var(--green-600)' }].map((s, i, arr) => (
          <div key={s.l} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--gray-200)' : 'none', padding: '0 8px' }}>
            <div style={{ fontSize: mobile ? 26 : 38, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: mobile ? 9.5 : 12, color: 'var(--gray-400)', marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 20, border: '1px solid var(--gray-200)', padding: mobile ? '16px 14px' : '24px 28px' }}>
        <h3 style={{ fontSize: mobile ? 14 : 16, fontWeight: 800, marginBottom: 8 }}>O que é o Marketplace FRELIMO?</h3>
        <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: 14 }}>Uma plataforma de comércio exclusiva para militantes e empresas afiliadas ao Partido FRELIMO. Publique produtos e serviços, encontre fornecedores verificados e faça negócios com outros militantes em todo o país.</p>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 10, marginBottom: 22 }}>
          {['Fornecedores verificados pelo secretariado', 'Cobertura nacional — todas as províncias', 'Publicação gratuita de anúncios', 'Contacto directo com compradores'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--gray-600)' }}>
              <Check size={14} color="var(--green-600)" style={{ flexShrink: 0, marginTop: 1 }} /> {t}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setEtapa('form')} style={{ padding: mobile ? '10px 24px' : '12px 34px', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Store size={13} /> Registar a minha empresa
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Secção: Anúncios ───────────────────────────────────────────────────────────
function SecaoAnuncios({ mobile }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>Anúncios de Empresas</h2>
          <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Empresas afiliadas ao Partido FRELIMO a promover os seus produtos e serviços</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={12} /> Publicar Anúncio
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 18 }}>
        {ANUNCIOS.map(ad => (
          <div key={ad.id} style={{ background: 'var(--white)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--gray-200)', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: 'var(--gray-100)' }}>
              <img src={ad.imagem} alt={ad.produto} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
              <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 3 }}>ANÚNCIO</span>
            </div>
            <div style={{ padding: '14px 16px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: ad.empresa.cor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{ad.empresa.avatar}</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{ad.empresa.nome}</div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 4 }}>{ad.categoria}</div>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>{ad.produto}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--red-600)' }}>{ad.preco}</span>
                <button style={{ padding: '6px 14px', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>Ver mais</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Componente principal ────────────────────────────────────────────────────────
export default function Marketplace({ setPage, mobile }) {
  const [tab, setTab] = useState('inicio');
  const [produtoAberto, setProdutoAberto] = useState(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  const addToCart = (produto, qty = 1) => {
    setCarrinho(c => {
      const exists = c.find(i => i.produto.id === produto.id);
      if (exists) return c.map(i => i.produto.id === produto.id ? { ...i, qty: i.qty + qty } : i);
      return [...c, { produto, qty }];
    });
  };

  const updateQty = (id, delta) => {
    setCarrinho(c => c.map(i => i.produto.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = id => setCarrinho(c => c.filter(i => i.produto.id !== id));

  const totalCarrinho = carrinho.reduce((s, i) => s + i.qty, 0);

  const TABS = [
    { id: 'inicio', label: 'Início' },
    { id: 'empresa', label: 'Minha Empresa' },
    { id: 'anuncios', label: 'Anúncios' },
  ];

  return (
    <div>
      {/* Header com tabs */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={tabStyle(tab === t.id)}>{t.label}</button>
          ))}
        </div>
        <button onClick={() => setCarrinhoAberto(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 50, background: totalCarrinho > 0 ? 'var(--red-600)' : 'var(--gray-100)', color: totalCarrinho > 0 ? '#fff' : 'var(--gray-600)', border: totalCarrinho > 0 ? 'none' : '1.5px solid var(--gray-200)', cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'all 0.2s' }}>
          <ShoppingCart size={14} /> Carrinho
          {totalCarrinho > 0 && <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: '1px 7px', fontSize: 11, fontWeight: 900 }}>{totalCarrinho}</span>}
        </button>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: mobile ? '14px 12px' : '22px 28px' }}>
        {tab === 'inicio'  && <SecaoInicio  mobile={mobile} onVer={setProdutoAberto} onAddToCart={addToCart} carrinho={carrinho} onOpenCart={() => setCarrinhoAberto(true)} />}
        {tab === 'empresa' && <SecaoMinhaEmpresa mobile={mobile} />}
        {tab === 'anuncios' && <SecaoAnuncios mobile={mobile} />}
      </div>

      {/* Modais */}
      <ProdutoModal produto={produtoAberto} onClose={() => setProdutoAberto(null)} onAddToCart={addToCart} />
      {carrinhoAberto && <CarrinhoModal itens={carrinho} onClose={() => setCarrinhoAberto(false)} onUpdateQty={updateQty} onRemove={removeItem} />}
    </div>
  );
}
