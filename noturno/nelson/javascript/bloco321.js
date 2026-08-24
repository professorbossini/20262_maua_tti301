// Importa o módulo nativo 'fs' (File System) do Node.js para manipulação de arquivos.
const fs = require("fs");

// Declara a função 'abrirArquivo' que recebe o nome de um arquivo como parâmetro.
const abrirArquivo = function (nomeArquivo) {
  
  // Declara a função de callback 'exibirConteudo' para lidar com o retorno de fs.readFile.
  const exibirConteudo = function (erro, conteudo) {
    if (erro) {
      // Se houver falha na leitura, exibe uma mensagem de erro formatada.
      console.log(`Deu erro: ${erro}`);
    } else {
      // Exibe o conteúdo lido convertido para string no console.
      console.log(conteudo.toString());
      
      // Converte o conteúdo lido para número (utilizando o operador unário '+') e calcula o dobro.
      const dobro = +conteudo.toString() * 2;
      
      // Declara a função de callback 'finalizar' para lidar com o retorno de fs.writeFile.
      const finalizar = function (erro) {
        if (erro) {
          console.log('Deu erro tentando salvar o dobro');
        } else {
          console.log("Salvou o dobro com sucesso");
        }
      };
      
      // Escreve o valor do dobro (convertido para string) em um novo arquivo chamado 'dobro.txt',
      // passando a função 'finalizar' como callback assíncrona.
      fs.writeFile('dobro.txt', dobro.toString(), finalizar);
    }
  };

  // Inicia a leitura assíncrona do arquivo especificado.
  fs.readFile(nomeArquivo, exibirConteudo);
};

// Executa a função passando "arquivo.txt" como alvo.
abrirArquivo("arquivo.txt");