import { Plus } from 'lucide-react';

const ADS = [
  { id: 102, nome: 'Software CRM Cloud',      categoria: 'Tecnologia',   preco: '320.000 MT', imagem: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80' },
  { id: 2,   nome: 'Equipamento Industrial',   categoria: 'Equipamentos', preco: '850.000 MT', imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&q=80' },
  { id: 103, nome: 'Ferramentas Industriais',  categoria: 'Equipamentos', preco: '245.000 MT', imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&q=80' },
];

export default function AnunciosSidebar() {
  return (
    <div style={{ background: 'var(--white)', borderRadius: 16, border: '1px solid var(--gray-200)', overflow: 'hidden', marginTop: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--gray-200)' }}>
        <span style={{ fontSize: 12, fontWeight: 800 }}>Anúncios em Destaque</span>
      </div>
      {ADS.map((p, i) => (
        <div key={p.id} style={{ display: 'flex', gap: 10, padding: '11px 13px', borderBottom: i < ADS.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
          <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: '1px solid var(--gray-200)' }}>
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
              <button style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--red-50)', border: '1px solid var(--red-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <Plus size={13} color="var(--red-600)" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
