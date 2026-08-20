const fs = require('fs');
const abrirArquivo = function (nomeArquivo) {
    const exibirConteudo = function (erro, conteudo) {
        if (erro) {
            console.error(`Erro ao ler o arquivo: ${erro}`);
        } else {
            console.log(conteudo.toString());
        }
    };
    fs.readFile(nomeArquivo, exibirConteudo);
    //    fs.readFile(nomeArquivo, 'utf8', exibirConteudo); // informa a codificação do arquivo, evitando a necessidade de usar toString() no conteúdo
};

abrirArquivo('arquivo.txt');