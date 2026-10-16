// baixar-cidades.js
import fs from 'fs';

console.log('A ligar ao IBGE...');

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
  .then(resposta => resposta.json())
  .then(dados => {
    // Formata os dados para "Nome - UF"
    const lista = dados.map(c => {
      const uf = c.microrregiao?.mesorregiao?.UF?.sigla || '';
      return `${c.nome} - ${uf}`;
    });
    
    // Coloca em ordem alfabética
    lista.sort((a, b) => a.localeCompare(b));
    
    // Guarda tudo num ficheiro JSON dentro da pasta src
    fs.writeFileSync('./src/cidades.json', JSON.stringify(lista, null, 2));
    
    console.log(`✅ Sucesso! ${lista.length} cidades foram guardadas em src/cidades.json.`);
  })
  .catch(erro => console.error('Erro ao transferir:', erro));