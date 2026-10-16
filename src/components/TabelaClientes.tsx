// src/components/TabelaClientes.tsx

export interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  tipo: string;
  filial: string;
  canal: string;
  contato: string;
}

interface TabelaClientesProps {
  clientes: Cliente[];
}

export function TabelaClientes({ clientes }: TabelaClientesProps) {
  if (clientes.length === 0) {
    return (
      <div style={{ marginTop: '30px', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#aaa' }}>
        Nenhum cliente cadastrado. Clique no botão laranja para adicionar.
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333', color: '#aaa' }}>
            <th style={{ padding: '12px 8px' }}>Nome</th>
            <th style={{ padding: '12px 8px' }}>Filial</th>
            <th style={{ padding: '12px 8px' }}>Canal de ordem</th>
            <th style={{ padding: '12px 8px' }}>Contato</th>
            <th style={{ padding: '12px 8px', width: '40px' }}></th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
              <td style={{ padding: '16px 8px' }}>
                <strong>{cliente.nome}</strong><br/>
                <span style={{ color: '#aaa', fontSize: '12px' }}>{cliente.cnpj}</span>
              </td>
              <td style={{ padding: '16px 8px' }}>{cliente.filial}</td>
              <td style={{ padding: '16px 8px' }}>{cliente.canal || '—'}</td>
              <td style={{ padding: '16px 8px' }}>{cliente.contato || '—'}</td>
              <td style={{ padding: '16px 8px', textAlign: 'center', cursor: 'pointer' }}>⋮</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}