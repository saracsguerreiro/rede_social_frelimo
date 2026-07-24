import { Plus } from 'lucide-react';

const AD = {
  categoria: 'Tecnologia',
  nome: 'Computadores Dell Premium',
  fornecedor: 'Tech Store Moçambique',
  preco: '185.000 MT',
  imagem: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80',
};

export default function AnuncioCard() {
  return (
    <div style={{ background: 'var(--white)', borderRadius: 16, border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ position: 'relative' }}>
        <img src={AD.imagem} alt={AD.nome} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
        <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.05em' }}>ANÚNCIO</span>
      </div>
      <div style={{ padding: '10px 13px 12px' }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--red-600)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 }}>{AD.categoria}</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--black)', marginBottom: 5, lineHeight: 1.3 }}>{AD.nome}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 9 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green-600)', flexShrink: 0 }} />
          <span style={{ fontSize: 10, color: 'var(--gray-500)' }}>{AD.fornecedor}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--red-600)' }}>{AD.preco}</span>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 13px', background: 'var(--red-600)', borderRadius: 50, border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={11} /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
