// Importa o módulo nativo 'fs' (File System) do Node.js para manipulação de arquivos.
const fs = require("fs");

// Declara uma função chamada 'abrirArquivo' que recebe o nome de um arquivo como parâmetro.
const abrirArquivo = function (nomeArquivo) {
  
  // Declara uma função de callback chamada 'exibirConteudo' que aceita dois parâmetros:
  // 'erro' (caso ocorra falha na leitura) e 'conteudo' (os dados lidos do arquivo).
  const exibirConteudo = function (erro, conteudo) {
    if (erro) {
      // Se houver um erro, exibe uma mensagem formatada com template literal.
      console.log(`Deu erro: ${erro}`);
    } else {
      // Caso contrário, converte o buffer de dados lido para string e o exibe no console.
      console.log(conteudo.toString());
    }
  };

  // Chama a função assíncrona 'fs.readFile' passando o nome do arquivo 
  // e a função de callback que será executada quando a leitura terminar.
  fs.readFile(nomeArquivo, exibirConteudo);
};

/* 
 * Instruções descritas no código original:
 * 1. Crie um arquivo chamado 'arquivo.txt' com o conteúdo '2' (sem as aspas)
 * 2. No mesmo diretório em que se encontra o seu script.
 */

// Executa a função passando o arquivo alvo.
abrirArquivo("arquivo.txt");