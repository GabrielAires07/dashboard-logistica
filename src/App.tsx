// src/App.tsx
import { useState } from 'react';
import './App.css';
import { TabelaFretes, type Frete } from './components/TabelaFretes';
import { TabelaClientes, type Cliente } from './components/TabelaClientes';
import { SeletorCidade } from './components/SeletorCidade';
import listaCidadesJson from './cidades.json'; 

type Aba = 'fretes' | 'clientes';

function App() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('clientes'); 
  
  const [listaFretes, setListaFretes] = useState<Frete[]>([]);
  const [modalFreteAberto, setModalFreteAberto] = useState(false);
  
  // As cidades agora carregam em 0 segundos a partir do nosso ficheiro JSON
  const [cidades] = useState<string[]>(listaCidadesJson);

  const [listaClientes, setListaClientes] = useState<Cliente[]>([
    { id: 1, nome: 'YARA RONDONOPOLIS', cnpj: '92.660.604/0118-93', tipo: 'Pessoa jurídica', filial: 'Trans Betim', canal: 'WhatsApp', contato: '' }
  ]);
  const [modalClienteAberto, setModalClienteAberto] = useState(false);

  function handleSalvarCliente(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formData = new FormData(evento.currentTarget);
    
    const novoCliente: Cliente = {
      id: Date.now(),
      nome: formData.get('nome') as string,
      tipo: formData.get('tipo') as string,
      cnpj: formData.get('cnpj') as string,
      filial: 'Trans Betim', 
      canal: formData.get('canal') as string,
      contato: formData.get('contato') as string,
    };

    setListaClientes([...listaClientes, novoCliente]);
    setModalClienteAberto(false);
  }

  function handleSalvarFrete(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formData = new FormData(evento.currentTarget);
    
    const nomeClienteSelecionado = formData.get('cliente') as string;
    const clienteEncontrado = listaClientes.find(c => c.nome === nomeClienteSelecionado);

    const novoFrete: Frete = {
      id: Date.now(),
      cliente: nomeClienteSelecionado,
      cnpj: clienteEncontrado ? clienteEncontrado.cnpj : '00.000.000/0000-00',
      origem: formData.get('origem') as string,
      destino: formData.get('destino') as string,
      produto: formData.get('produto') as string,
      veiculo: formData.get('veiculo') as string,
      carregado: 0,
      total: Number(formData.get('total')),
    };

    setListaFretes([...listaFretes, novoFrete]);
    setModalFreteAberto(false);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      
      {/* Menu Lateral */}
      <aside style={{ width: '80px', backgroundColor: '#1e1e1e', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', gap: '20px' }}>
        <button onClick={() => setAbaAtiva('clientes')} style={{ backgroundColor: 'transparent', border: 'none', color: abaAtiva === 'clientes' ? '#ff6b00' : '#aaa', cursor: 'pointer', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', marginBottom: '4px' }}>🏢</span>
          Clientes
        </button>
        <button onClick={() => setAbaAtiva('fretes')} style={{ backgroundColor: 'transparent', border: 'none', color: abaAtiva === 'fretes' ? '#ff6b00' : '#aaa', cursor: 'pointer', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', marginBottom: '4px' }}>📦</span>
          Fretes
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {abaAtiva === 'clientes' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Clientes</h1>
                <p style={{ color: '#aaa', fontSize: '14px' }}>Empresas que contratam o transporte.</p>
              </div>
              <button onClick={() => setModalClienteAberto(true)} style={{ backgroundColor: '#ff6b00', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Cadastrar cliente
              </button>
            </div>
            <TabelaClientes clientes={listaClientes} />
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Fretes</h1>
                <p style={{ color: '#aaa', fontSize: '14px' }}>Fretes disponíveis pra resgate.</p>
              </div>
              <button onClick={() => setModalFreteAberto(true)} style={{ backgroundColor: '#ff6b00', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Cadastrar frete
              </button>
            </div>
            <TabelaFretes fretes={listaFretes} />
          </>
        )}
      </main>

      {/* MODAL NOVO CLIENTE */}
      {modalClienteAberto && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '8px', width: '450px' }}>
            <h2 style={{ marginBottom: '8px' }}>Novo cliente</h2>
            <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px' }}>Preencha os dados pra cadastrar um cliente novo.</p>
            
            <form onSubmit={handleSalvarCliente} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#aaa' }}>Nome *</label>
                <input name="nome" placeholder="Razão social ou nome fantasia" required style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Tipo *</label>
                  <select name="tipo" required style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }}>
                    <option value="Pessoa jurídica">Pessoa jurídica</option>
                    <option value="Pessoa física">Pessoa física</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>CNPJ *</label>
                  <input name="cnpj" placeholder="00.000.000/0000-00" required style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Canal</label>
                  <select name="canal" style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }}>
                    <option value="">—</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="E-mail">E-mail</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Contato</label>
                  <input name="contato" placeholder="E-mail, telefone ou URL" style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                <button type="button" onClick={() => setModalClienteAberto(false)} style={{ padding: '10px 15px', backgroundColor: 'transparent', color: '#aaa', border: '1px solid #444', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#ff6b00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cadastrar cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOVO FRETE */}
      {modalFreteAberto && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '8px', width: '450px' }}>
            <h2 style={{ marginBottom: '20px' }}>Novo Frete</h2>
            
            <form onSubmit={handleSalvarFrete} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <div>
                <label style={{ fontSize: '12px', color: '#aaa' }}>Cliente *</label>
                <select name="cliente" required style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }}>
                  <option value="">Selecione o cliente</option>
                  {listaClientes.map(c => (
                    <option key={c.id} value={c.nome}>
                      {c.nome.toUpperCase()} ({c.cnpj})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Origem *</label>
                  <SeletorCidade name="origem" cidades={cidades} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Destino *</label>
                  <SeletorCidade name="destino" cidades={cidades} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Produto</label>
                  <input name="produto" placeholder="Ex: Adubo (geral)" required style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Veículo</label>
                  <select name="veiculo" required style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }}>
                    <option value="">Selecione...</option>
                    <option value="Rodotrem">Rodotrem</option>
                    <option value="Bitrem 9 eixos">Bitrem 9 eixos</option>
                    <option value="Carreta LS">Carreta LS</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#aaa' }}>Volume Total (Toneladas)</label>
                <input name="total" type="number" step="0.01" placeholder="Ex: 1500" required style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', marginTop: '4px' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                <button type="button" onClick={() => setModalFreteAberto(false)} style={{ padding: '10px 15px', backgroundColor: 'transparent', color: '#aaa', border: '1px solid #444', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#ff6b00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;