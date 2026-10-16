// src/components/TabelaFretes.tsx

// 1. Criamos um "molde" (Interface) para dizer ao TypeScript o formato exato de um Frete
export interface Frete {
  id: number;
  cliente: string;
  cnpj: string;
  origem: string;
  destino: string;
  produto: string;
  veiculo: string;
  carregado: number;
  total: number;
}

// 2. Dizemos que este componente vai receber uma lista (Array) de fretes
interface TabelaProps {
  fretes: Frete[];
}

export function TabelaFretes({ fretes }: TabelaProps) {
  // Se a lista estiver vazia, mostramos uma mensagem em vez da tabela
  if (fretes.length === 0) {
    return (
      <div style={{ marginTop: '30px', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#aaa' }}>
        Nenhum frete cadastrado no momento. Clique no botão laranja acima para começar.
      </div>
    );
  }

  // Se tiver dados, desenhamos a tabela
  return (
    <div style={{ marginTop: '30px', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333', color: '#aaa' }}>
            <th style={{ padding: '12px 8px' }}>Cliente</th>
            <th style={{ padding: '12px 8px' }}>Rota</th>
            <th style={{ padding: '12px 8px' }}>Produto</th>
            <th style={{ padding: '12px 8px' }}>Veículos</th>
            <th style={{ padding: '12px 8px' }}>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {fretes.map((frete) => {
            const porcentagem = (frete.carregado / frete.total) * 100;
            const disponivel = frete.total - frete.carregado;

            return (
              <tr key={frete.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                <td style={{ padding: '16px 8px' }}>
                  <strong>{frete.cliente}</strong><br/>
                  <span style={{ color: '#aaa', fontSize: '12px' }}>{frete.cnpj}</span>
                </td>
                <td style={{ padding: '16px 8px' }}>
                  {frete.origem} <br/> <span style={{ color: '#aaa' }}>→ {frete.destino}</span>
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <span style={{ border: '1px solid #444', padding: '4px 8px', borderRadius: '16px', fontSize: '12px' }}>{frete.produto}</span>
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <span style={{ border: '1px solid #444', padding: '4px 8px', borderRadius: '16px', fontSize: '12px' }}>{frete.veiculo}</span>
                </td>
                <td style={{ padding: '16px 8px', width: '250px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span><strong>{frete.carregado} t</strong> carregadas</span>
                    <span style={{ color: '#aaa' }}>de {frete.total} t</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${porcentagem}%`, height: '100%', backgroundColor: '#00c853' }}></div>
                  </div>
                  <div style={{ marginTop: '4px', color: '#aaa', fontSize: '12px' }}>{disponivel.toFixed(2)} t disponíveis</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}