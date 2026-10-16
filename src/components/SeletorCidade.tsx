// src/components/SeletorCidade.tsx
import { useState, useRef, useEffect } from 'react';

interface SeletorCidadeProps {
  cidades: string[];
  name: string;
}

export function SeletorCidade({ cidades, name }: SeletorCidadeProps) {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [selecionada, setSelecionada] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const cidadesFiltradas = cidades.filter(c => 
    c.toLowerCase().includes(busca.toLowerCase())
  );

  useEffect(() => {
    function handleClickFora(evento: MouseEvent) {
      if (ref.current && !ref.current.contains(evento.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', marginTop: '4px' }}>
      <input type="hidden" name={name} value={selecionada} required />
      
      <div 
        onClick={() => setAberto(!aberto)}
        style={{ 
          width: '100%', padding: '10px', backgroundColor: '#333', 
          border: '1px solid #444', color: selecionada ? '#fff' : '#aaa', 
          borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selecionada || 'Selecione uma cidade'}
        </span>
        <span style={{ fontSize: '12px', color: '#666' }}>↕</span>
      </div>

      {aberto && (
        <div style={{ 
          position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#222', border: '1px solid #444', 
          borderRadius: '4px', marginTop: '4px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          <div style={{ padding: '10px', borderBottom: '1px solid #333' }}>
            <input 
              type="text" placeholder="🔍 Buscar cidade..." value={busca} onChange={(e) => setBusca(e.target.value)} autoFocus
              style={{ width: '100%', padding: '8px', backgroundColor: '#111', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none' }}
            />
          </div>
          
          <ul style={{ padding: 0, margin: 0, listStyle: 'none', maxHeight: '200px', overflowY: 'auto' }}>
            {cidades.length === 0 ? (
              // Se a lista estiver vazia, mostramos este aviso!
              <li style={{ padding: '10px 15px', color: '#ff6b00', fontSize: '14px' }}>⏳ A carregar cidades...</li>
            ) : cidadesFiltradas.length > 0 ? (
              cidadesFiltradas.map((cidade, index) => (
                <li 
                  key={index} 
                  onClick={() => { setSelecionada(cidade); setAberto(false); setBusca(''); }}
                  style={{ padding: '10px 15px', borderBottom: '1px solid #333', cursor: 'pointer', color: '#fff', fontSize: '14px' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 107, 0, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {cidade}
                </li>
              ))
            ) : (
              <li style={{ padding: '10px 15px', color: '#aaa', fontSize: '14px' }}>Nenhuma cidade encontrada...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}