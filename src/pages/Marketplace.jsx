import { useState, useEffect } from 'react';
import {
  ShoppingCart, Store, Laptop, Wrench, Briefcase, Building2, Truck,
  Plus, Minus, X, ChevronLeft, ChevronRight, Check, Star, Search,
  Package, CheckCircle, FileText, SlidersHorizontal,
  TrendingUp, Eye, MessageSquare, Pencil, Trash2, Megaphone,
  MousePointer, Pause, Play, Home, DollarSign, BarChart2,
  ClipboardList, Leaf, Heart, MoreHorizontal, Smartphone, Copy,
} from 'lucide-react';

// ── Logos de métodos de pagamento ───────────────────────────────────────────────
const VisaLogo = () => (
  <svg width="56" height="36" viewBox="0 0 56 36" fill="none">
    <rect width="56" height="36" rx="6" fill="#1A1F71"/>
    <text x="7" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="18" fill="white" letterSpacing="1">VISA</text>
  </svg>
);

const EmolhLogo = () => (
  <div style={{ width: 56, height: 36, borderRadius: 6, background: '#E30613', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
    <span style={{ color: '#fff', fontSize: 13, fontWeight: 900, letterSpacing: '-0.3px', lineHeight: 1 }}>e-mola</span>
    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 7, fontWeight: 600, letterSpacing: 0.5 }}>VODACOM</span>
  </div>
);

const AtmLogo = () => (
  <div style={{ width: 56, height: 36, borderRadius: 6, background: '#0A2D6E', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
    <Building2 size={14} color="#fff" />
    <span style={{ color: '#fff', fontSize: 7, fontWeight: 800, letterSpacing: 0.5 }}>REFERÊNCIA</span>
  </div>
);

const MKT_CSS = `
@keyframes mkt-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0.5)} 50%{box-shadow:0 0 0 10px rgba(255,255,255,0)} }
@keyframes mkt-pulse-red { 0%,100%{box-shadow:0 0 0 0 rgba(210,35,42,0.4)} 50%{box-shadow:0 0 0 10px rgba(210,35,42,0)} }
@keyframes mkt-fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.mkt-pulse{animation:mkt-pulse 1.8s ease-in-out infinite}
.mkt-pulse-red{animation:mkt-pulse-red 1.8s ease-in-out infinite}
.mkt-fadein{animation:mkt-fadein 0.3s ease}
`;

const HERO_IMG = `${import.meta.env.BASE_URL}marketplace-hero.jpg`;

const CATEGORIAS = [
  { nome: 'Tecnologia',   icon: Laptop,          count: 340, desc: 'Software, hardware e soluções tecnológicas para a sua empresa' },
  { nome: 'Equipamentos', icon: Wrench,          count: 280, desc: 'Maquinaria, ferramentas e equipamentos industriais' },
  { nome: 'Serviços',     icon: Briefcase,       count: 195, desc: 'Consultoria, formação e serviços empresariais especializados' },
  { nome: 'Construção',   icon: Building2,       count: 160, desc: 'Materiais, empreiteiros e soluções para construção civil' },
  { nome: 'Logística',    icon: Truck,           count: 125, desc: 'Transporte, armazenamento e distribuição de mercadorias' },
  { nome: 'Agronegócio',  icon: Leaf,            count: 98,  desc: 'Produtos agrícolas, equipamentos rurais e insumos' },
  { nome: 'Saúde',        icon: Heart,           count: 74,  desc: 'Equipamentos médicos, farmácia e serviços de saúde' },
  { nome: 'Outros',       icon: MoreHorizontal,  count: 210, desc: 'Outros produtos e serviços para a sua empresa' },
];

const PRODUTOS = [
  { id: 1,   nome: 'Sistema ERP Completo',          categoria: 'Tecnologia',   tipo: 'Software',  fornecedor: 'TechSolutions Moz',     preco: '450.000 MT', precoNum: 450000, avaliacao: 4.9, novo: true,  desc: 'Sistema ERP empresarial completo com módulos de finanças, recursos humanos, inventário e relatórios em tempo real.',    imagem: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { id: 101, nome: 'Computadores Dell Premium',     categoria: 'Tecnologia',   tipo: 'Produto',   fornecedor: 'Tech Store Moçambique',  preco: '185.000 MT', precoNum: 185000, avaliacao: 4.8, novo: false, desc: 'Computadores Dell de alta performance para uso empresarial. Processador Intel Core i7, 16GB RAM, SSD 512GB.',         imagem: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80' },
  { id: 102, nome: 'Software CRM Cloud',            categoria: 'Tecnologia',   tipo: 'Serviço',   fornecedor: 'CloudSoft Moçambique',   preco: '320.000 MT', precoNum: 320000, avaliacao: 4.6, novo: false, desc: 'Plataforma CRM completa em nuvem para gestão de clientes, vendas e marketing.',                                       imagem: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80' },
  { id: 2,   nome: 'Equipamento Industrial',        categoria: 'Equipamentos', tipo: 'Produto',   fornecedor: 'Máquinas Premium',       preco: '850.000 MT', precoNum: 850000, avaliacao: 4.8, novo: false, desc: 'Equipamento industrial de alta capacidade. Potência 15kW, capacidade 500kg/h.',                                       imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80' },
  { id: 103, nome: 'Ferramentas Industriais',       categoria: 'Equipamentos', tipo: 'Produto',   fornecedor: 'Tools Master Moz',       preco: '245.000 MT', precoNum: 245000, avaliacao: 4.5, novo: false, desc: 'Kit completo de ferramentas industriais profissionais. 48 peças certificadas com garantia de 3 anos.',              imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80' },
  { id: 3,   nome: 'Consultoria Empresarial',       categoria: 'Serviços',     tipo: 'Serviço',   fornecedor: 'Consulting Pro Moz',     preco: '28.000 MT',  precoNum: 28000,  avaliacao: 4.7, novo: false, desc: 'Consultoria estratégica para PMEs: diagnóstico organizacional, plano de negócios e acompanhamento trimestral.',     imagem: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80' },
  { id: 104, nome: 'Serviços de Marketing Digital', categoria: 'Serviços',     tipo: 'Serviço',   fornecedor: 'Digital Boost Moz',      preco: '180.000 MT', precoNum: 180000, avaliacao: 4.9, novo: false, desc: 'Pacote completo de marketing digital: gestão de redes sociais, SEO, campanhas pagas e relatórios mensais.',         imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
  { id: 105, nome: 'Consultoria Financeira PME',    categoria: 'Serviços',     tipo: 'Serviço',   fornecedor: 'AuditMoz Lda',           preco: '62.000 MT',  precoNum: 62000,  avaliacao: 4.7, novo: false, desc: 'Consultoria financeira especializada para PMEs: planeamento, orçamentação e controlo de custos.',                  imagem: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80' },
  { id: 4,   nome: 'Materiais de Construção',       categoria: 'Construção',   tipo: 'Produto',   fornecedor: 'Build Master Moz',       preco: '62.000 MT',  precoNum: 62000,  avaliacao: 4.6, novo: true,  desc: 'Pack de materiais de construção: cimento, ferro, blocos e acessórios. Entrega ao domicílio em 48h.',               imagem: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80' },
  { id: 107, nome: 'Painéis Solares Empresariais',  categoria: 'Construção',   tipo: 'Produto',   fornecedor: 'SolarMoz Energy',        preco: '420.000 MT', precoNum: 420000, avaliacao: 4.8, novo: false, desc: 'Sistema solar fotovoltaico para empresas: 20kW, baterias de armazenamento, inversores e instalação completa.',     imagem: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80' },
  { id: 106, nome: 'Camião de Transporte 10T',      categoria: 'Logística',    tipo: 'Serviço',   fornecedor: 'MozCargo Transport',     preco: '35.000 MT',  precoNum: 35000,  avaliacao: 4.5, novo: false, desc: 'Serviço de transporte de carga até 10 toneladas para todo o território nacional. Seguro de carga incluído.',      imagem: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80' },
];

const CAMPANHAS = [
  { id: 'a1', nome: 'Laptop HP ProBook 450 G9',            tipo: 'Produto em Destaque', status: 'Activo',  orcamento: '15.000 MT', gastoNum: 8450,  impressoes: 12430, cliques: 287, ctr: 2.3, inicio: '01 Jul', fim: '31 Jul', imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80' },
  { id: 'a2', nome: 'Desenvolvimento de Software à Medida', tipo: 'Anúncio de Serviço',  status: 'Activo',  orcamento: '20.000 MT', gastoNum: 11200, impressoes: 9870,  cliques: 198, ctr: 2.0, inicio: '10 Jul', fim: '10 Ago', imagem: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&q=80' },
  { id: 'a3', nome: 'Consultoria em Tecnologia IT',         tipo: 'Produto em Destaque', status: 'Pausado', orcamento: '10.000 MT', gastoNum: 10000, impressoes: 18650, cliques: 421, ctr: 2.3, inicio: '01 Jun', fim: '30 Jun', imagem: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
];

const CHART_ADS = [
  {dia:'4',imp:720,cli:17},{dia:'5',imp:890,cli:21},{dia:'6',imp:830,cli:18},
  {dia:'7',imp:1040,cli:25},{dia:'8',imp:960,cli:22},{dia:'9',imp:1120,cli:26},
  {dia:'10',imp:980,cli:23},{dia:'11',imp:1200,cli:30},{dia:'12',imp:870,cli:19},
  {dia:'13',imp:1350,cli:33},{dia:'14',imp:1180,cli:28},{dia:'15',imp:1420,cli:35},
  {dia:'16',imp:1390,cli:34},{dia:'17',imp:1560,cli:38},
];

const RECEITAS = [
  {mes:'Jan',valor:42000},{mes:'Fev',valor:58000},{mes:'Mar',valor:51000},
  {mes:'Abr',valor:76000},{mes:'Mai',valor:89000},{mes:'Jun',valor:68000},
  {mes:'Jul',valor:95000},
];

const ENCOMENDAS = [
  { id: '#001', data: '14 Jul 2026', servico: 'Consultoria de Gestão',  cliente: 'Empresa ABC Lda', valor: '45.000 MT', estado: 'Confirmado' },
  { id: '#002', data: '10 Jul 2026', servico: 'Formação em Liderança',   cliente: 'XYZ Comércio',    valor: '18.500 MT', estado: 'Concluído'  },
  { id: '#003', data: '03 Jul 2026', servico: 'Consultoria de Gestão',  cliente: 'MozBuild SA',     valor: '45.000 MT', estado: 'Concluído'  },
];

const MEUS_PRODUTOS = [
  { id: 'mp1', nome: 'Sistema ERP Completo',      categoria: 'Tecnologia', preco: '450.000 MT', estado: 'Activo',   vistas: 142, enquiries: 8 },
  { id: 'mp2', nome: 'Consultoria Empresarial',   categoria: 'Serviços',   preco: '28.000 MT',  estado: 'Activo',   vistas: 87,  enquiries: 5 },
  { id: 'mp3', nome: 'Consultoria Financeira PME',categoria: 'Serviços',   preco: '62.000 MT',  estado: 'Inactivo', vistas: 34,  enquiries: 1 },
];

const fmt = n => n.toLocaleString('pt-PT') + ' MT';

// ── ProdutoCard ────────────────────────────────────────────────────────────────
function ProdutoCard({ p, onVer, onAddToCart }) {
  return (
    <div onClick={() => onVer(p)} style={{ background: 'var(--white)', borderRadius: 16, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'transform 0.15s, box-shadow 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)'; }}>
      <div style={{ height: 190, position: 'relative', overflow: 'hidden', flexShrink: 0, background: 'var(--gray-100)' }}>
        <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
        {p.novo && <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--red-600)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 50 }}>NOVO</span>}
      </div>
      <div style={{ padding: '12px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: .8 }}>{p.categoria}</span>
          {p.tipo && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 50, background: p.tipo === 'Produto' ? 'var(--green-50)' : '#EFF6FF', color: p.tipo === 'Produto' ? 'var(--green-800)' : '#1D4ED8' }}>{p.tipo}</span>}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35, marginBottom: 5, flex: 1 }}>{p.nome}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-600)', flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{p.fornecedor}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 12 }}>
          {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i <= Math.floor(p.avaliacao) ? '#F59E0B' : 'none'} color={i <= Math.floor(p.avaliacao) ? '#F59E0B' : 'var(--gray-300)'} />)}
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', marginLeft: 4 }}>{p.avaliacao}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: 'var(--red-600)' }}>{p.preco}</span>
          <button onClick={e => { e.stopPropagation(); onAddToCart(p, 1); }}
            style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--red-50)', border: '1.5px solid var(--red-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.background = 'var(--red-600)'; e.currentTarget.querySelector('svg').style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-50)'; e.currentTarget.querySelector('svg').style.color = 'var(--red-600)'; }}>
            <Plus size={14} color="var(--red-600)" />
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
      <style>{MKT_CSS}</style>
      <div onClick={e => e.stopPropagation()} className="mkt-fadein" style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', maxWidth: 780, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.35)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <X size={16} color="white" />
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '42% 58%' }}>
          <div style={{ position: 'relative', minHeight: 340, background: 'var(--gray-100)' }}>
            <img src={produto.imagem} alt={produto.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
            {produto.novo && <span style={{ position: 'absolute', top: 14, left: 14, background: 'var(--red-600)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 50 }}>NOVO</span>}
          </div>
          <div style={{ padding: '28px 28px 24px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', background: 'var(--red-50)', padding: '3px 10px', borderRadius: 50 }}>{produto.categoria}</span>
              {produto.tipo && <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 50, background: 'var(--green-50)', color: 'var(--green-800)' }}>{produto.tipo}</span>}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6, lineHeight: 1.2 }}>{produto.nome}</h2>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 10 }}>{produto.fornecedor}</div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={13} fill={i <= Math.floor(produto.avaliacao) ? '#F59E0B' : 'none'} color={i <= Math.floor(produto.avaliacao) ? '#F59E0B' : 'var(--gray-300)'} />)}
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
const METODOS = [
  {
    id: 'visa',
    Logo: VisaLogo,
    nome: 'Cartão Visa / Mastercard',
    desc: 'Pague com cartão de crédito ou débito. Processamento seguro.',
  },
  {
    id: 'referencia',
    Logo: AtmLogo,
    nome: 'Referência Bancária (ATM)',
    desc: 'Receba uma referência para pagar em qualquer caixa ATM ou homebanking.',
  },
  {
    id: 'emola',
    Logo: EmolhLogo,
    nome: 'E-mola',
    desc: 'Pague rapidamente com a sua carteira Vodacom E-mola.',
  },
];

function PanelHeader({ titulo, onBack, onClose, passo }) {
  return (
    <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 10 }}>
      {onBack && (
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', padding: 4, display: 'flex' }}>
          <ChevronLeft size={18} />
        </button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 800 }}>{titulo}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          {['Carrinho', 'Pagamento', 'Confirmação'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: i < passo ? 'var(--green-600)' : i === passo ? 'var(--red-600)' : 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i < passo ? <Check size={10} color="#fff" /> : <span style={{ fontSize: 9, fontWeight: 800, color: i === passo ? '#fff' : 'var(--gray-400)' }}>{i + 1}</span>}
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: i === passo ? 'var(--red-600)' : i < passo ? 'var(--green-600)' : 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: 0.4 }}>{s}</span>
              {i < 2 && <div style={{ width: 14, height: 1, background: 'var(--gray-200)' }} />}
            </div>
          ))}
        </div>
      </div>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', padding: 4, display: 'flex' }}><X size={18} /></button>
    </div>
  );
}

function CarrinhoModal({ itens, onClose, onUpdateQty, onRemove }) {
  const [passo, setPasso] = useState(0); // 0=carrinho 1=pagamento 2=confirmacao
  const [metodoId, setMetodoId] = useState(null);
  const [copiado, setCopiado] = useState(false);
  const total = itens.reduce((s, i) => s + i.produto.precoNum * i.quantidade, 0);
  const metodo = METODOS.find(m => m.id === metodoId);

  const REF = '94 261 830 5';
  const ENTIDADE = '21847';
  const EMOLA_NUM = '84 848 8484';
  const EMOLA_REF = 'MKT-' + Math.floor(10000 + Math.random() * 90000);

  const copiar = (texto) => {
    navigator.clipboard?.writeText(texto).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 400, height: '100vh', background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>

        {/* ── PASSO 0: Carrinho ── */}
        {passo === 0 && <>
          <PanelHeader titulo="Carrinho" onClose={onClose} passo={0} />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {itens.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>
                <ShoppingCart size={40} strokeWidth={1} style={{ margin: '0 auto 12px', display: 'block' }} />
                <p>O carrinho está vazio</p>
              </div>
            )}
            {itens.map(({ produto: p, quantidade }) => (
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
                      <span style={{ width: 24, textAlign: 'center', fontSize: 12, fontWeight: 700 }}>{quantidade}</span>
                      <button onClick={() => onUpdateQty(p.id, 1)} style={{ width: 26, height: 26, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={10} /></button>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--red-600)' }}>{fmt(p.precoNum * quantidade)}</span>
                  </div>
                </div>
                <button onClick={() => onRemove(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', alignSelf: 'flex-start', padding: 4 }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--red-600)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}><X size={14} /></button>
              </div>
            ))}
          </div>
          {itens.length > 0 && (
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Total ({itens.reduce((s,i) => s+i.quantidade,0)} itens)</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--red-600)' }}>{fmt(total)}</span>
              </div>
              <button onClick={() => setPasso(1)} className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: 13, fontWeight: 800 }}>
                Finalizar Compra →
              </button>
              <button onClick={onClose} style={{ width: '100%', padding: '10px', fontSize: 12, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-600)', marginTop: 8 }}>Continuar a comprar</button>
            </div>
          )}
        </>}

        {/* ── PASSO 1: Método de Pagamento ── */}
        {passo === 1 && <>
          <PanelHeader titulo="Método de Pagamento" onBack={() => setPasso(0)} onClose={onClose} passo={1} />
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 16 }}>
              Seleccione como pretende efectuar o pagamento de <strong style={{ color: 'var(--red-600)' }}>{fmt(total)}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {METODOS.map(m => {
                const selected = metodoId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMetodoId(m.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px', borderRadius: 12, textAlign: 'left',
                      border: `2px solid ${selected ? 'var(--red-600)' : 'var(--gray-200)'}`,
                      background: selected ? 'var(--red-50)' : 'var(--white)',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <m.Logo />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--black)', marginBottom: 3 }}>{m.nome}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', lineHeight: 1.4 }}>{m.desc}</div>
                    </div>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${selected ? 'var(--red-600)' : 'var(--gray-300)'}`, background: selected ? 'var(--red-600)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {selected && <Check size={11} color="#fff" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-200)' }}>
            <button
              onClick={() => metodoId && setPasso(2)}
              style={{ width: '100%', padding: '13px', fontSize: 13, fontWeight: 800, borderRadius: 50, border: 'none', cursor: metodoId ? 'pointer' : 'not-allowed', background: metodoId ? 'var(--red-600)' : 'var(--gray-200)', color: metodoId ? '#fff' : 'var(--gray-400)', transition: 'background 0.15s' }}
            >
              {metodoId ? `Confirmar com ${metodo.nome}` : 'Seleccione um método'}
            </button>
          </div>
        </>}

        {/* ── PASSO 2: Confirmação ── */}
        {passo === 2 && <>
          <PanelHeader titulo="Confirmação" onBack={() => setPasso(1)} onClose={onClose} passo={2} />
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
            {/* Sucesso */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--green-50)', border: '3px solid var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <CheckCircle size={28} color="var(--green-600)" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Encomenda registada!</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Complete o pagamento para confirmar o seu pedido.</div>
            </div>

            {/* Resumo */}
            <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--gray-500)', marginBottom: 8 }}>Resumo</div>
              {itens.map(({ produto: p, quantidade }) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--gray-700)' }}>{p.nome} ×{quantidade}</span>
                  <span style={{ fontWeight: 700 }}>{fmt(p.precoNum * quantidade)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 900, borderTop: '1px solid var(--gray-300)', marginTop: 8, paddingTop: 8, color: 'var(--red-600)' }}>
                <span>Total</span><span>{fmt(total)}</span>
              </div>
            </div>

            {/* Instruções por método */}
            {metodoId === 'visa' && (
              <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ background: '#1A1F71', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <VisaLogo />
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>Cartão Visa / Mastercard</div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>Pagamento seguro via 3D Secure</div>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 12 }}>
                    Será redireccionado para o portal seguro do seu banco para introduzir os dados do cartão. O processo é encriptado e certificado.
                  </div>
                  <button style={{ width: '100%', padding: '12px', background: '#1A1F71', color: '#fff', border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
                    Ir para pagamento seguro →
                  </button>
                </div>
              </div>
            )}

            {metodoId === 'referencia' && (
              <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ background: '#0A2D6E', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <AtmLogo />
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>Referência Bancária</div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>Válida por 48 horas</div>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  {[
                    { label: 'Entidade', value: ENTIDADE },
                    { label: 'Referência', value: REF },
                    { label: 'Valor', value: fmt(total) },
                    { label: 'Prazo', value: '48 horas' },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--gray-100)' }}>
                      <span style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600 }}>{r.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, fontFamily: r.label === 'Referência' || r.label === 'Entidade' ? 'monospace' : 'inherit', color: 'var(--black)' }}>{r.value}</span>
                        {(r.label === 'Referência' || r.label === 'Entidade') && (
                          <button onClick={() => copiar(r.value)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiado ? 'var(--green-600)' : 'var(--gray-400)', padding: 2, display: 'flex' }}>
                            {copiado ? <Check size={13} /> : <Copy size={13} />}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--gray-100)', borderRadius: 8, fontSize: 11, color: 'var(--gray-600)', lineHeight: 1.5 }}>
                    Aceda ao ATM ou homebanking e seleccione <strong>Pagamento de Serviços</strong>. Introduza a entidade e referência acima.
                  </div>
                </div>
              </div>
            )}

            {metodoId === 'emola' && (
              <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ background: '#E30613', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <EmolhLogo />
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>E-mola — Vodacom</div>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>Pagamento móvel imediato</div>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  {[
                    { label: 'Número E-mola', value: EMOLA_NUM, copy: true },
                    { label: 'Referência', value: EMOLA_REF, copy: true },
                    { label: 'Valor a enviar', value: fmt(total), copy: false },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--gray-100)' }}>
                      <span style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600 }}>{r.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, fontFamily: r.copy ? 'monospace' : 'inherit', color: 'var(--black)' }}>{r.value}</span>
                        {r.copy && (
                          <button onClick={() => copiar(r.value)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiado ? 'var(--green-600)' : 'var(--gray-400)', padding: 2, display: 'flex' }}>
                            {copiado ? <Check size={13} /> : <Copy size={13} />}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, padding: '10px 12px', background: '#FFF0F0', borderRadius: 8, fontSize: 11, color: '#C00', lineHeight: 1.5 }}>
                    No seu telemóvel marque <strong>*880#</strong>, escolha <strong>Pagar Serviços</strong> e introduza o número e referência acima.
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 7, padding: '10px 12px', background: 'var(--gray-100)', borderRadius: 8 }}>
                    <Smartphone size={14} color="var(--gray-500)" />
                    <span style={{ fontSize: 11, color: 'var(--gray-600)' }}>Também pode usar a app E-mola para pagar.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--gray-200)' }}>
            <button onClick={onClose} style={{ width: '100%', padding: '12px', fontSize: 13, fontWeight: 700, borderRadius: 50, border: '1.5px solid var(--gray-200)', background: 'var(--white)', color: 'var(--gray-700)', cursor: 'pointer' }}>
              Fechar
            </button>
          </div>
        </>}
      </div>
    </div>
  );
}

// ── SecaoCategoria ─────────────────────────────────────────────────────────────
function SecaoCategoria({ cat, onBack, onVer, onAddToCart, mobile }) {
  const [busca, setBusca] = useState('');
  const [ordem, setOrdem] = useState('relevancia');
  const Icon = cat.icon;
  let prods = PRODUTOS.filter(p => p.categoria === cat.nome);
  if (busca) prods = prods.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
  if (ordem === 'preco_asc') prods = [...prods].sort((a, b) => a.precoNum - b.precoNum);
  if (ordem === 'avaliacao') prods = [...prods].sort((a, b) => b.avaliacao - a.avaliacao);
  return (
    <div>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--gray-600)', marginBottom: 18, padding: '6px 0', fontWeight: 600 }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--red-600)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-600)'}>
        <ChevronLeft size={16} /> Voltar ao Marketplace
      </button>
      <div style={{ background: 'linear-gradient(125deg, var(--red-400) 0%, var(--red-600) 45%, var(--red-800) 100%)', borderRadius: 20, padding: '22px 26px', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={26} color="#fff" /></div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Categoria</div>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 900, marginBottom: 4 }}>{cat.nome}</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{cat.desc}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: '10px 18px', textAlign: 'center', flexShrink: 0 }}>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 900 }}>{cat.count}</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>anúncios</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--white)', borderRadius: 50, padding: '0 16px', border: '1.5px solid var(--gray-200)' }}>
          <Search size={14} color="var(--gray-400)" style={{ flexShrink: 0 }} />
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder={`Pesquisar em ${cat.nome}...`} style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 13, padding: '12px 0' }} />
        </div>
        <select value={ordem} onChange={e => setOrdem(e.target.value)} style={{ padding: '10px 14px', borderRadius: 50, border: '1.5px solid var(--gray-200)', background: 'var(--white)', fontSize: 12, fontWeight: 600, cursor: 'pointer', outline: 'none' }}>
          <option value="relevancia">Mais relevante</option>
          <option value="preco_asc">Menor preço</option>
          <option value="avaliacao">Melhor avaliação</option>
        </select>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 50, border: '1.5px solid var(--gray-200)', background: 'var(--white)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          <SlidersHorizontal size={13} color="var(--gray-600)" /> Filtros
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16 }}>
        {prods.map(p => <ProdutoCard key={p.id} p={p} onVer={onVer} onAddToCart={onAddToCart} />)}
        {prods.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: 'var(--gray-400)', fontSize: 13 }}>Nenhum produto encontrado.</div>}
      </div>
    </div>
  );
}

// ── SecaoInicio ────────────────────────────────────────────────────────────────
function SecaoInicio({ mobile, onVer, onAddToCart, totalCarrinho, onOpenCart }) {
  const [busca, setBusca] = useState('');
  const [catActiva, setCatActiva] = useState(null);

  if (catActiva) return <SecaoCategoria cat={catActiva} onBack={() => setCatActiva(null)} onVer={onVer} onAddToCart={onAddToCart} mobile={mobile} />;

  const produtosDestaque = PRODUTOS.slice(0, 6);
  const anunciosLista   = PRODUTOS.slice(0, 4);
  const sidebarDestaque = PRODUTOS.slice(0, 3);
  const sidebarAds      = PRODUTOS.slice(2, 5);
  const produtosFiltrados = busca ? PRODUTOS.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.categoria.toLowerCase().includes(busca.toLowerCase())) : null;

  return (
    <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start', flexDirection: mobile ? 'column' : 'row', width: '100%', minWidth: 0 }}>
      <div style={{ flex: 1, minWidth: 0, width: mobile ? '100%' : undefined }}>
        {!mobile && (
          <div style={{ background: 'linear-gradient(125deg, var(--red-400) 0%, var(--red-600) 45%, var(--red-800) 100%)', borderRadius: 20, padding: '22px 28px', marginBottom: 20, boxShadow: '0 4px 18px rgba(210,35,42,0.22)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -20, top: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 7 }}>Marketplace FRELIMO</div>
              <h2 style={{ color: 'var(--white)', fontSize: 21, fontWeight: 900, lineHeight: 1.2 }}>Impulsione o seu negócio</h2>
            </div>
            <Store size={50} color="rgba(255,255,255,0.1)" style={{ position: 'absolute', right: 20, bottom: 10, zIndex: 0 }} />
          </div>
        )}

        <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', padding: mobile ? '18px' : '24px 28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 28 }}>
          <h3 style={{ fontSize: mobile ? 15 : 17, fontWeight: 800, textAlign: 'center', marginBottom: 4 }}>O que procura para a sua empresa?</h3>
          <p style={{ fontSize: 12, color: 'var(--gray-400)', textAlign: 'center', marginBottom: 16 }}>Pesquise em mais de 1.200 produtos e serviços</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-100)', borderRadius: 50, padding: mobile ? '0 10px 0 16px' : '0 16px', border: '2px solid var(--gray-200)', marginBottom: 26 }}>
            <Search size={14} color="var(--gray-400)" style={{ flexShrink: 0 }} />
            <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Ex: software, transporte, equipamento..." style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 13, padding: '12px 0' }} />
            {mobile
              ? <button style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--red-600)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Search size={16} color="#fff" /></button>
              : <button className="btn-primary" style={{ padding: '7px 18px', fontSize: 12, flexShrink: 0 }}>Pesquisar</button>
            }
          </div>
          <div style={{ height: 1, background: 'var(--gray-200)', marginBottom: 22 }} />
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: mobile ? 14 : 15, fontWeight: 800, marginBottom: 3 }}>Explore por <span style={{ color: 'var(--red-600)' }}>Categoria</span></h3>
            <p style={{ fontSize: 11, color: 'var(--gray-400)' }}>Encontre exactamente o que a sua empresa precisa</p>
          </div>
          {mobile ? (
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
              {CATEGORIAS.map(cat => { const Icon = cat.icon; return (
                <button key={cat.nome} onClick={() => setCatActiva(cat)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 50, cursor: 'pointer', background: 'var(--white)', border: '1.5px solid var(--gray-200)', flexShrink: 0, fontSize: 12, fontWeight: 600, color: 'var(--black)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-50)'; e.currentTarget.style.borderColor = 'var(--red-200)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}>
                  <Icon size={14} color="var(--red-600)" /> {cat.nome}
                </button>
              ); })}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {CATEGORIAS.map(cat => { const Icon = cat.icon; return (
                <button key={cat.nome} onClick={() => setCatActiva(cat)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '22px 12px', borderRadius: 14, cursor: 'pointer', background: 'var(--white)', border: '1.5px solid var(--gray-200)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-50)'; e.currentTarget.style.borderColor = 'var(--red-200)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}>
                  <Icon size={26} color="var(--red-600)" />
                  <div style={{ fontSize: 12, fontWeight: 700, textAlign: 'center', lineHeight: 1.3, color: 'var(--black)' }}>{cat.nome}</div>
                </button>
              ); })}
            </div>
          )}
        </div>

        {!busca && (
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Star size={mobile ? 16 : 20} color="#EAB308" fill="#EAB308" style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: mobile ? 15 : 17, fontWeight: 800 }}>Produtos em Destaque</h3>
                {!mobile && <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>Selecção dos melhores produtos e serviços do marketplace</p>}
              </div>
            </div>
            {!mobile && (
              <>
                <div style={{ height: 1, background: 'var(--gray-200)', marginBottom: 16 }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                  {produtosDestaque.map(p => <ProdutoCard key={p.id} p={p} onVer={onVer} onAddToCart={onAddToCart} />)}
                </div>
              </>
            )}
            {mobile && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PRODUTOS.map(p => (
                  <div key={p.id} onClick={() => onVer(p)} style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--gray-200)', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <div style={{ height: 130, overflow: 'hidden', position: 'relative' }}>
                      <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                      {p.novo && <span style={{ position: 'absolute', top: 9, right: 9, background: 'var(--red-600)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 50 }}>NOVO</span>}
                    </div>
                    <div style={{ padding: '12px 14px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 4 }}>{p.categoria}</div>
                      <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3, marginBottom: 5 }}>{p.nome}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 17, fontWeight: 900, color: 'var(--red-600)' }}>{p.preco}</span>
                        <button onClick={e => { e.stopPropagation(); onAddToCart(p, 1); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--red-600)', borderRadius: 50, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                          <Plus size={12} /> Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {busca && (
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Resultados para "{busca}"</h3>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
              {produtosFiltrados.map(p => <ProdutoCard key={p.id} p={p} onVer={onVer} onAddToCart={onAddToCart} />)}
              {produtosFiltrados.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: 'var(--gray-400)', fontSize: 13 }}>Nenhum resultado encontrado.</div>}
            </div>
          </div>
        )}

        {!mobile && !busca && (
          <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', overflow: 'hidden', marginTop: 16, marginBottom: 8 }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 7 }}>
              <FileText size={13} color="var(--red-600)" />
              <span style={{ fontSize: 14, fontWeight: 800 }}>Anúncios em Destaque</span>
            </div>
            {anunciosLista.map((p, i) => (
              <div key={p.id} onClick={() => onVer(p)} style={{ display: 'flex', gap: 12, padding: '12px 14px', cursor: 'pointer', borderBottom: i < anunciosLista.length - 1 ? '1px solid var(--gray-200)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ width: 66, height: 66, borderRadius: 12, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                  <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                  <span style={{ position: 'absolute', top: 4, left: 4, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 7, fontWeight: 700, padding: '1px 5px', borderRadius: 3 }}>AD</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 2 }}>{p.categoria}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nome}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 7 }}>{p.fornecedor}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: 'var(--red-600)' }}>{p.preco}</span>
                    <button onClick={e => { e.stopPropagation(); onAddToCart(p, 1); }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', background: 'var(--red-600)', borderRadius: 50, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700 }}
                      onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.background = 'var(--red-800)'; }} onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}>
                      <Plus size={10} /> Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!mobile && (
        <div style={{ width: 272, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {totalCarrinho > 0 && (
            <button onClick={onOpenCart} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', borderRadius: 12, background: 'var(--red-600)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
              <ShoppingCart size={14} /> Ver carrinho ({totalCarrinho} {totalCarrinho === 1 ? 'item' : 'itens'})
            </button>
          )}
          <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '13px 15px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Star size={13} color="#EAB308" fill="#EAB308" />
              <span style={{ fontSize: 13, fontWeight: 800 }}>Produtos em Destaque</span>
            </div>
            {sidebarDestaque.map((p, i) => (
              <div key={p.id} onClick={() => onVer(p)} style={{ cursor: 'pointer', borderBottom: i < 2 ? '1px solid var(--gray-200)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ height: 95, overflow: 'hidden', position: 'relative' }}>
                  <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                  <span style={{ position: 'absolute', top: 7, left: 7, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>ANÚNCIO</span>
                  {p.novo && <span style={{ position: 'absolute', top: 7, right: 7, background: 'var(--red-600)', color: '#fff', fontSize: 8, fontWeight: 800, padding: '2px 6px', borderRadius: 50 }}>NOVO</span>}
                </div>
                <div style={{ padding: '9px 13px 11px' }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 2 }}>{p.categoria}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{p.nome}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 7 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green-600)', flexShrink: 0 }} />
                    <span style={{ fontSize: 9, color: 'var(--gray-400)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.fornecedor}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: 'var(--red-600)' }}>{p.preco}</span>
                    <button onClick={e => { e.stopPropagation(); onAddToCart(p, 1); }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', background: 'var(--red-600)', borderRadius: 50, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700 }}
                      onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.background = 'var(--red-800)'; }} onMouseLeave={e => e.currentTarget.style.background = 'var(--red-600)'}>
                      <Plus size={10} /> Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ padding: '8px 13px', background: 'var(--gray-100)', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: 1 }}>Mais anúncios</span>
            </div>
            {sidebarAds.map((p, i) => (
              <div key={p.id} onClick={() => onVer(p)} style={{ display: 'flex', gap: 10, padding: '11px 13px', cursor: 'pointer', borderBottom: i < sidebarAds.length - 1 ? '1px solid var(--gray-200)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: '1px solid var(--gray-200)', position: 'relative' }}>
                  <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 8, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: .6 }}>{p.categoria}</span>
                    <span style={{ fontSize: 7, fontWeight: 700, padding: '1px 4px', borderRadius: 3, background: 'var(--gray-100)', color: 'var(--gray-600)', border: '1px solid var(--gray-200)' }}>ANÚNCIO</span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.3, marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nome}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: 'var(--red-600)' }}>{p.preco}</span>
                    <button onClick={e => { e.stopPropagation(); onAddToCart(p, 1); }} style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--red-50)', border: '1px solid var(--red-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.background = 'var(--red-600)'; }}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--red-50)'}>
                      <Plus size={14} color="var(--red-600)" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── SecaoEmpresaDashboard ──────────────────────────────────────────────────────
function SecaoEmpresaDashboard({ empresa, mobile }) {
  const maxReceita = Math.max(...RECEITAS.map(r => r.valor));
  return (
    <div className="mkt-fadein">
      <style>{MKT_CSS}</style>
      <div style={{ background: 'linear-gradient(125deg, var(--red-400) 0%, var(--red-600) 45%, var(--red-800) 100%)', borderRadius: 20, padding: '20px 24px', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 15, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Store size={24} color="var(--white)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginBottom: 3 }}>A minha empresa</div>
          <div style={{ color: 'var(--white)', fontSize: 17, fontWeight: 900 }}>{empresa?.nome || 'Empresa FRELIMO'}</div>
          {empresa?.sector && <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>{empresa.sector}{empresa.provincia ? ` · ${empresa.provincia}` : ''}</div>}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 50, padding: '5px 12px', flexShrink: 0 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--yellow)' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--white)' }}>Verificado</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {[
          { Icon: Package,     label: 'Produtos Activos',  value: '3',           trend: '+1',   color: 'var(--red-600)',   bg: 'var(--red-50)'   },
          { Icon: Store,       label: 'Vendas este mês',   value: '5',           trend: '+2',   color: 'var(--green-600)', bg: 'var(--green-50)' },
          { Icon: DollarSign,  label: 'Receita este mês',  value: '108.500 MT',  trend: '+22%', color: 'var(--green-600)', bg: 'var(--green-50)' },
          { Icon: Star,        label: 'Avaliação média',   value: '4,8 ★',       trend: '+0.1', color: '#D97706',          bg: '#FEF3C7'         },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--white)', borderRadius: 18, padding: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.Icon size={18} color={s.color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, fontWeight: 700, color: 'var(--green-600)' }}>
                <TrendingUp size={10} />{s.trend}
              </div>
            </div>
            <div style={{ fontSize: mobile ? 14 : 17, fontWeight: 900, marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 18, marginBottom: 22 }}>
        <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}>
              <BarChart2 size={15} color="var(--red-600)" /> Histórico de Receitas
            </div>
            <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>Jan – Jul 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
            {RECEITAS.map((r, i) => (
              <div key={r.mes} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 8, color: 'var(--gray-400)', fontWeight: 600 }}>{(r.valor/1000).toFixed(0)}k</div>
                <div style={{ width: '100%', borderRadius: '6px 6px 0 0', height: `${Math.round(r.valor/maxReceita*90)}px`, background: i === RECEITAS.length-1 ? 'var(--red-600)' : 'var(--red-200)' }} />
                <div style={{ fontSize: 9, color: 'var(--gray-400)', fontWeight: 600 }}>{r.mes}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: 'var(--gray-600)' }}>Total acumulado</span>
            <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--red-600)' }}>479.000 MT</span>
          </div>
        </div>

        <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 7 }}>
            <ClipboardList size={15} color="var(--red-600)" /> Encomendas Recentes
          </div>
          {ENCOMENDAS.map((e, i) => (
            <div key={e.id} style={{ padding: '11px 0', borderBottom: i < ENCOMENDAS.length-1 ? '1px solid var(--gray-200)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.servico}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{e.cliente} · {e.data}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--red-600)', marginBottom: 3 }}>{e.valor}</div>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 50, background: e.estado === 'Concluído' ? 'var(--green-50)' : 'var(--yellow)', color: e.estado === 'Concluído' ? 'var(--green-800)' : 'var(--black)' }}>{e.estado}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}>
            <Package size={15} color="var(--red-600)" /> Os Meus Produtos e Serviços
          </div>
          <button className="btn-primary" style={{ padding: '7px 14px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Plus size={12} /> Publicar novo
          </button>
        </div>
        {MEUS_PRODUTOS.map((p, i) => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < MEUS_PRODUTOS.length-1 ? '1px solid var(--gray-200)' : 'none' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--red-50)', border: '1px solid var(--red-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={18} color="var(--red-600)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nome}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{p.categoria}</span>
                <span style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3, color: 'var(--gray-400)' }}><Eye size={10} />{p.vistas}</span>
                <span style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3, color: 'var(--gray-400)' }}><MessageSquare size={10} />{p.enquiries}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--red-600)', marginBottom: 5 }}>{p.preco}</div>
              <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 50, background: p.estado === 'Activo' ? 'var(--green-50)' : 'var(--gray-100)', color: p.estado === 'Activo' ? 'var(--green-800)' : 'var(--gray-600)', border: `1px solid ${p.estado === 'Activo' ? 'var(--green-200)' : 'var(--gray-200)'}` }}>{p.estado}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Pencil size={12} color="var(--gray-600)" /></button>
              <button style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--red-50)', border: '1px solid var(--red-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Trash2 size={12} color="var(--red-600)" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SecaoAnuncios ──────────────────────────────────────────────────────────────
function SecaoAnuncios({ mobile }) {
  const [filtro, setFiltro] = useState('todos');
  const campanhas = filtro === 'todos' ? CAMPANHAS : CAMPANHAS.filter(c => c.status === (filtro === 'activos' ? 'Activo' : 'Pausado'));
  const maxImp = Math.max(...CHART_ADS.map(d => d.imp));
  const totalImp = CAMPANHAS.reduce((s, c) => s + c.impressoes, 0);
  const totalCli = CAMPANHAS.reduce((s, c) => s + c.cliques, 0);
  const totalGasto = CAMPANHAS.reduce((s, c) => s + c.gastoNum, 0);
  const ctr = (totalCli / totalImp * 100).toFixed(1);

  return (
    <div className="mkt-fadein">
      <style>{MKT_CSS}</style>
      <div style={{ background: 'linear-gradient(135deg, #14532d 0%, var(--green-800) 55%, var(--green-600) 100%)', borderRadius: 20, padding: mobile ? '20px 16px' : '24px 28px', marginBottom: 22, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', right: 80, bottom: -50, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                <Megaphone size={15} color="rgba(255,255,255,0.75)" />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>Gestão de Publicidade</span>
              </div>
              <div style={{ color: 'var(--white)', fontSize: mobile ? 20 : 24, fontWeight: 900, lineHeight: 1 }}>Os Meus Anúncios</div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 50, background: 'rgba(255,255,255,0.15)', color: 'var(--white)', border: '1.5px solid rgba(255,255,255,0.25)', cursor: 'pointer', fontSize: 12, fontWeight: 700, flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.26)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
              <Plus size={13} /> Novo Anúncio
            </button>
          </div>
          <div style={{ display: 'flex', gap: mobile ? 8 : 12 }}>
            {[
              { Icon: Eye,          label: 'Impressões', value: totalImp.toLocaleString('pt') },
              { Icon: MousePointer, label: 'Cliques',    value: totalCli.toLocaleString('pt') },
              { Icon: TrendingUp,   label: 'CTR Médio',  value: `${ctr}%` },
              ...mobile ? [] : [{ Icon: DollarSign, label: 'Gasto Total', value: `${(totalGasto/1000).toFixed(0)}k MT` }],
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: mobile ? '10px' : '12px 14px', border: '1px solid rgba(255,255,255,0.14)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                  <s.Icon size={12} color="rgba(255,255,255,0.7)" />
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: .4, textTransform: 'uppercase' }}>{s.label}</span>
                </div>
                <div style={{ fontSize: mobile ? 14 : 16, fontWeight: 900, color: 'var(--white)', letterSpacing: -.5 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {[
          { Icon: Eye,          label: 'Impressões (mês)', value: totalImp.toLocaleString('pt'), trend: '+18%', color: 'var(--green-600)', bg: 'var(--green-50)' },
          { Icon: MousePointer, label: 'Cliques (mês)',    value: totalCli.toLocaleString('pt'), trend: '+12%', color: 'var(--green-600)', bg: 'var(--green-50)' },
          { Icon: TrendingUp,   label: 'CTR médio',        value: `${ctr}%`,                     trend: '+0.3%', color: '#D97706',          bg: '#FEF3C7'         },
          { Icon: DollarSign,   label: 'Gasto total',      value: `${(totalGasto/1000).toFixed(1)}k MT`, trend: '3 camps.', color: 'var(--red-600)', bg: 'var(--red-50)' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--white)', borderRadius: 18, padding: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.Icon size={18} color={s.color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, fontWeight: 700, color: 'var(--green-600)' }}>
                <TrendingUp size={10} />{s.trend}
              </div>
            </div>
            <div style={{ fontSize: mobile ? 15 : 18, fontWeight: 900, marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', padding: '20px 22px', marginBottom: 22, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}>
            <BarChart2 size={15} color="var(--green-600)" /> Desempenho Diário — Últimos 14 dias
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#bbf7d0', display: 'inline-block' }} />Impressões</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--green-600)', display: 'inline-block' }} />Cliques ×10</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 130 }}>
          {CHART_ADS.map((d, i) => (
            <div key={d.dia} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-end', height: 110, justifyContent: 'center' }}>
                <div style={{ flex: 1, borderRadius: '4px 4px 0 0', height: `${Math.round(d.imp/maxImp*100)}px`, background: i === CHART_ADS.length-1 ? '#15803d' : '#bbf7d0', transition: 'height 0.3s' }} />
                <div style={{ flex: 1, borderRadius: '4px 4px 0 0', height: `${Math.round(d.cli*10/maxImp*100)}px`, background: i === CHART_ADS.length-1 ? 'var(--green-600)' : '#4ade80', transition: 'height 0.3s' }} />
              </div>
              <div style={{ fontSize: 8, color: 'var(--gray-400)', fontWeight: 600 }}>{d.dia}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 28 }}>
          <div><div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 2 }}>Pico de impressões</div><div style={{ fontSize: 13, fontWeight: 800, color: 'var(--green-600)' }}>1.560 / dia</div></div>
          <div><div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 2 }}>Pico de cliques</div><div style={{ fontSize: 13, fontWeight: 800, color: 'var(--green-600)' }}>38 / dia</div></div>
          <div><div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 2 }}>Tendência</div><div style={{ fontSize: 13, fontWeight: 800, color: 'var(--green-600)' }}>↑ Crescente</div></div>
        </div>
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}>
            <Megaphone size={15} color="var(--green-600)" /> Campanhas Activas
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{k:'todos',l:'Todos'},{k:'activos',l:'Activos'},{k:'pausados',l:'Pausados'}].map(f => (
              <button key={f.k} onClick={() => setFiltro(f.k)} style={{ padding: '5px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: '1.5px solid', transition: 'all 0.15s', background: filtro === f.k ? 'var(--green-600)' : 'transparent', color: filtro === f.k ? 'var(--white)' : 'var(--gray-600)', borderColor: filtro === f.k ? 'var(--green-600)' : 'var(--gray-200)' }}>{f.l}</button>
            ))}
          </div>
        </div>
        {!mobile && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 90px 90px 60px 100px 90px 80px', gap: 12, padding: '10px 20px', background: 'var(--gray-100)', borderBottom: '1px solid var(--gray-200)' }}>
            {['Anúncio','Tipo','Impressões','Cliques','CTR','Gasto','Período','Ações'].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: .5 }}>{h}</div>
            ))}
          </div>
        )}
        {campanhas.map((c, i) => (
          <div key={c.id} style={{ borderBottom: i < campanhas.length-1 ? '1px solid var(--gray-200)' : 'none' }}>
            {mobile ? (
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <img src={c.imagem} alt={c.nome} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 3 }}>{c.nome}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 50, background: c.status === 'Activo' ? 'var(--green-50)' : 'var(--gray-100)', color: c.status === 'Activo' ? 'var(--green-800)' : 'var(--gray-600)', border: `1px solid ${c.status === 'Activo' ? 'var(--green-200)' : 'var(--gray-200)'}` }}>{c.status}</span>
                      <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{c.tipo}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                  {[{l:'Impressões',v:c.impressoes.toLocaleString('pt')},{l:'Cliques',v:c.cliques},{l:'CTR',v:`${c.ctr}%`},{l:'Gasto',v:`${(c.gastoNum/1000).toFixed(1)}k MT`}].map(s => (
                    <div key={s.l} style={{ background: 'var(--gray-100)', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--green-600)' }}>{s.v}</div>
                      <div style={{ fontSize: 9, color: 'var(--gray-400)', marginTop: 1 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 90px 90px 60px 100px 90px 80px', gap: 12, padding: '14px 20px', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <img src={c.imagem} alt={c.nome} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.nome}</div>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 50, background: c.status === 'Activo' ? 'var(--green-50)' : 'var(--gray-100)', color: c.status === 'Activo' ? 'var(--green-800)' : 'var(--gray-600)', border: `1px solid ${c.status === 'Activo' ? 'var(--green-200)' : 'var(--gray-200)'}` }}>{c.status}</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>{c.tipo}</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{c.impressoes.toLocaleString('pt')}</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{c.cliques}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-600)' }}>{c.ctr}%</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--red-600)' }}>{(c.gastoNum/1000).toFixed(1)}k MT</div>
                  <div style={{ marginTop: 4, height: 4, background: 'var(--gray-200)', borderRadius: 50, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 50, background: 'var(--green-600)', width: `${Math.min(100, Math.round(c.gastoNum / parseInt(c.orcamento.replace(/\./g,'').replace(' MT','')) * 100))}%` }} />
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--gray-400)', marginTop: 2 }}>de {c.orcamento}</div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--gray-600)' }}>{c.inicio} – {c.fim}</div>
                <div style={{ display: 'flex', gap: 5 }}>
                  <button style={{ width: 28, height: 28, borderRadius: 7, background: c.status === 'Activo' ? '#FEF3C7' : 'var(--green-50)', border: `1px solid ${c.status === 'Activo' ? '#FDE68A' : 'var(--green-200)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    {c.status === 'Activo' ? <Pause size={11} color="#D97706" /> : <Play size={11} color="var(--green-600)" />}
                  </button>
                  <button style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Pencil size={11} color="var(--gray-600)" />
                  </button>
                  <button style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--red-50)', border: '1px solid var(--red-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Trash2 size={11} color="var(--red-600)" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MarketplaceTabs ────────────────────────────────────────────────────────────
function MarketplaceTabs({ empresa, mobile, initialTab }) {
  const [tab, setTab] = useState(initialTab || 'inicio');
  const [produtoAberto, setProdutoAberto] = useState(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState({});

  const addToCart = (produto, qty = 1) => {
    setCarrinho(c => ({ ...c, [produto.id]: { produto, quantidade: (c[produto.id]?.quantidade || 0) + qty } }));
  };
  const updateQty = (id, delta) => {
    setCarrinho(c => {
      const qty = (c[id]?.quantidade || 0) + delta;
      if (qty <= 0) { const { [id]: _, ...rest } = c; return rest; }
      return { ...c, [id]: { ...c[id], quantidade: qty } };
    });
  };
  const removeItem = id => setCarrinho(c => { const { [id]: _, ...rest } = c; return rest; });
  const itens = Object.values(carrinho);
  const totalCarrinho = itens.reduce((s, i) => s + i.quantidade, 0);

  return (
    <div>
      <style>{MKT_CSS}</style>
      {mobile ? (
        <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'stretch' }}>
          {[{id:'inicio',label:'Início',Icon:Home},{id:'empresa',label:'Empresa',Icon:Store},{id:'anuncios',label:'Anúncios',Icon:Megaphone}].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '9px 4px', fontSize: 9, fontWeight: tab === t.id ? 800 : 500, color: tab === t.id ? 'var(--red-600)' : 'var(--gray-400)', background: 'none', border: 'none', cursor: 'pointer', borderBottom: tab === t.id ? '2.5px solid var(--red-600)' : '2.5px solid transparent', marginBottom: -1 }}>
              <t.Icon size={17} />{t.label}
            </button>
          ))}
          <button onClick={() => setCarrinhoAberto(true)} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '9px 14px', fontSize: 9, fontWeight: 500, color: 'var(--gray-400)', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '2.5px solid transparent', marginBottom: -1 }}>
            <ShoppingCart size={17} />Carrinho
            {totalCarrinho > 0 && <span style={{ position: 'absolute', top: 5, right: 10, width: 15, height: 15, borderRadius: '50%', background: 'var(--red-600)', color: 'var(--white)', fontSize: 8, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--white)' }}>{totalCarrinho}</span>}
          </button>
        </div>
      ) : (
        <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', padding: '0 28px', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex' }}>
            {[{id:'inicio',label:'Início'},{id:'empresa',label:'Minha Empresa'},{id:'anuncios',label:'Anúncios'}].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '14px 20px', fontSize: 13, fontWeight: tab === t.id ? 800 : 500, color: tab === t.id ? 'var(--red-600)' : 'var(--gray-600)', background: 'none', border: 'none', cursor: 'pointer', borderBottom: tab === t.id ? '2.5px solid var(--red-600)' : '2.5px solid transparent', marginBottom: -1, transition: 'all 0.15s' }}>{t.label}</button>
            ))}
          </div>
          <button onClick={() => setCarrinhoAberto(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 50, background: totalCarrinho > 0 ? 'var(--red-600)' : 'var(--gray-100)', color: totalCarrinho > 0 ? 'var(--white)' : 'var(--gray-600)', border: totalCarrinho > 0 ? 'none' : '1.5px solid var(--gray-200)', cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'all 0.2s' }}>
            <ShoppingCart size={14} /> Carrinho
            {totalCarrinho > 0 && <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: '1px 7px', fontSize: 11, fontWeight: 900 }}>{totalCarrinho}</span>}
          </button>
        </div>
      )}
      <div style={{ padding: mobile ? '14px 12px' : '22px 28px' }}>
        {tab === 'inicio'   && <SecaoInicio mobile={mobile} onVer={setProdutoAberto} onAddToCart={addToCart} totalCarrinho={totalCarrinho} onOpenCart={() => setCarrinhoAberto(true)} />}
        {tab === 'empresa'  && <SecaoEmpresaDashboard empresa={empresa} mobile={mobile} />}
        {tab === 'anuncios' && <SecaoAnuncios mobile={mobile} />}
      </div>
      <ProdutoModal produto={produtoAberto} onClose={() => setProdutoAberto(null)} onAddToCart={addToCart} />
      {carrinhoAberto && <CarrinhoModal itens={itens} onClose={() => setCarrinhoAberto(false)} onUpdateQty={updateQty} onRemove={removeItem} />}
    </div>
  );
}

// ── LandingPage ────────────────────────────────────────────────────────────────
function LandingPage({ onRegister, mobile }) {
  return (
    <div style={{ padding: mobile ? '14px 12px 32px' : '22px 28px 40px' }}>
      <style>{MKT_CSS}</style>
      <div style={{ borderRadius: mobile ? 18 : 24, overflow: 'hidden', marginBottom: mobile ? 14 : 28, position: 'relative', minHeight: mobile ? 140 : 240, background: '#000', boxShadow: '0 8px 32px rgba(0,0,0,0.30)' }}>
        <img src={HERO_IMG} alt="" style={{ position: 'absolute', top: 0, right: 0, width: mobile ? '55%' : '65%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} onError={e => e.target.style.display = 'none'} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000 30%, rgba(0,0,0,0.88) 48%, rgba(0,0,0,0.4) 68%, transparent 90%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: mobile ? '20px 18px' : '36px 40px', minHeight: mobile ? 140 : 240, maxWidth: 420, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {!mobile && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 50, padding: '4px 12px', marginBottom: 16, width: 'fit-content', border: '1px solid rgba(255,255,255,0.18)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--yellow)', flexShrink: 0, display: 'inline-block' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: 1, textTransform: 'uppercase' }}>Marketplace Oficial FRELIMO</span>
            </div>
          )}
          <h2 style={{ color: 'var(--white)', fontSize: mobile ? 20 : 28, fontWeight: 900, lineHeight: 1.2, marginBottom: mobile ? 14 : 24 }}>
            Impulsione<br />o seu negócio
          </h2>
          <button onClick={onRegister} className="mkt-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--red-600)', color: 'var(--white)', padding: mobile ? '9px 18px' : '13px 26px', borderRadius: 50, border: 'none', cursor: 'pointer', fontSize: mobile ? 11 : 13, fontWeight: 800, width: 'fit-content' }}>
            <Store size={mobile ? 12 : 14} /> Registar Empresa <ChevronRight size={mobile ? 11 : 13} />
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--white)', borderRadius: mobile ? 14 : 18, border: '1px solid var(--gray-200)', padding: mobile ? '16px 8px' : '22px 28px', marginBottom: mobile ? 14 : 28, display: 'flex' }}>
        {[{v:'500+',l:'Produtos e Serviços',color:'var(--red-600)'},{v:'11',l:'Províncias',color:'var(--green-600)'},{v:'50+',l:'Empresas Registadas',color:'var(--green-600)'}].map((s, i, arr) => (
          <div key={s.l} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length-1 ? '1px solid var(--gray-200)' : 'none', padding: '0 8px' }}>
            <div style={{ fontSize: mobile ? 26 : 38, fontWeight: 900, color: s.color, lineHeight: 1, letterSpacing: -1 }}>{s.v}</div>
            <div style={{ fontSize: mobile ? 9.5 : 12, color: 'var(--gray-400)', marginTop: mobile ? 4 : 6, lineHeight: 1.3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--white)', borderRadius: mobile ? 16 : 20, border: '1px solid var(--gray-200)', padding: mobile ? '16px 14px' : '24px 28px' }}>
        <h3 style={{ fontSize: mobile ? 14 : 16, fontWeight: 800, marginBottom: 8 }}>O que é o Marketplace FRELIMO?</h3>
        <p style={{ fontSize: mobile ? 12.5 : 13, color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: 14 }}>Uma plataforma de comércio exclusiva para militantes e empresas afiliadas ao Partido FRELIMO. Publique produtos e serviços, encontre fornecedores verificados e faça negócios com outros militantes em todo o país.</p>
        <div style={{ ...(mobile ? {display:'flex',flexDirection:'column',gap:10} : {display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}), marginBottom: mobile ? 16 : 22 }}>
          {['Fornecedores verificados pelo secretariado','Cobertura nacional — todas as províncias','Publicação gratuita de anúncios','Contacto directo com compradores'].map(t => (
            <div key={t} style={{ fontSize: mobile ? 12.5 : 12, color: 'var(--gray-600)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Check size={14} color="var(--green-600)" style={{ flexShrink: 0, marginTop: 1 }} />{t}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={onRegister} className="btn-primary mkt-pulse-red" style={{ padding: mobile ? '10px 24px' : '12px 34px', fontSize: mobile ? 12 : 13, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Store size={13} /> Registar a minha empresa
          </button>
        </div>
      </div>
    </div>
  );
}

// ── RegistrationForm ───────────────────────────────────────────────────────────
function RegistrationForm({ onSubmit, onBack, mobile }) {
  const [form, setForm] = useState({ nome: '', nuit: '', sector: '', provincia: '', telefone: '', descricao: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const iStyle = { width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: 8, background: 'var(--gray-100)', fontSize: 13, outline: 'none', boxSizing: 'border-box' };
  const lStyle = { display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--gray-600)', marginBottom: 5 };
  return (
    <div style={{ padding: mobile ? '14px 12px 32px' : '22px 28px 40px' }}>
      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 900, marginBottom: 5 }}>Registar Empresa</h2>
          <p style={{ fontSize: mobile ? 12 : 13, color: 'var(--gray-600)' }}>Os campos são opcionais neste protótipo — pode avançar directamente.</p>
        </div>
        <div style={{ background: 'var(--white)', borderRadius: mobile ? 18 : 22, border: '1px solid var(--gray-200)', padding: mobile ? '18px 14px' : '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[['Nome da Empresa / Actividade','nome','Ex: Muteia Consultores Lda'],['NUIT','nuit','Ex: 400123456789'],['Sector de Actividade','sector','Ex: Tecnologia'],['Província','provincia','Ex: Maputo'],['Telefone','telefone','+258 8X XXX XXXX']].map(([label, key, ph]) => (
            <div key={key}>
              <label style={lStyle}>{label}</label>
              <input value={form[key]} onChange={set(key)} placeholder={ph} style={iStyle} onFocus={e => e.target.style.borderColor = 'var(--red-600)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
            </div>
          ))}
          <div>
            <label style={lStyle}>Descrição</label>
            <textarea value={form.descricao} onChange={set('descricao')} placeholder="Descreva brevemente a sua empresa..." rows={3} style={{ ...iStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = 'var(--red-600)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button onClick={onBack} style={{ flex: 1, padding: '12px', background: 'none', color: 'var(--gray-600)', border: '1.5px solid var(--gray-200)', borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>← Voltar</button>
            <button onClick={() => onSubmit(form)} style={{ flex: 2, padding: '12px', background: 'var(--red-600)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Registar Empresa</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SuccessScreen ──────────────────────────────────────────────────────────────
function SuccessScreen({ empresa, onEnter }) {
  useEffect(() => {
    const t = setTimeout(onEnter, 2000);
    return () => clearTimeout(t);
  }, [onEnter]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
      <style>{MKT_CSS}</style>
      <div style={{ textAlign: 'center', maxWidth: 360, padding: 32, animation: 'mkt-fadein 0.4s ease' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--green-50)', border: '3px solid var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle size={40} color="var(--green-600)" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Empresa Registada!</h2>
        <p style={{ color: 'var(--gray-600)', fontSize: 13, lineHeight: 1.6 }}>
          <strong>{empresa?.nome || 'A sua empresa'}</strong> foi registada com sucesso no Marketplace FRELIMO. A entrar no marketplace...
        </p>
      </div>
    </div>
  );
}

// ── Marketplace (export) ───────────────────────────────────────────────────────
export default function Marketplace({ setPage, mobile, initialTab }) {
  const [etapa, setEtapa] = useState(initialTab ? 'marketplace' : 'landing');
  const [empresa, setEmpresa] = useState(null);

  if (etapa === 'landing')    return <LandingPage onRegister={() => setEtapa('form')} mobile={mobile} />;
  if (etapa === 'form')       return <RegistrationForm onSubmit={emp => { setEmpresa(emp); setEtapa('sucesso'); }} onBack={() => setEtapa('landing')} mobile={mobile} />;
  if (etapa === 'sucesso')    return <SuccessScreen empresa={empresa} onEnter={() => setEtapa('marketplace')} />;
  return <MarketplaceTabs empresa={empresa} mobile={mobile} initialTab={initialTab} />;
}
