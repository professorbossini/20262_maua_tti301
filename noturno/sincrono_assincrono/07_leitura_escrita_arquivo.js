const fs = require('fs');

const abrirArquivo = function (nomeArquivo) {
    const exibirConteudo = function (erro, conteudo) {
        if (erro) {
            console.error(`Erro ao ler o arquivo: ${erro}`);
        } else {
            console.log(conteudo.toString());
            const dobro = +conteudo.toString() * 2;
            const finalizar = function (erro) {
                if (erro) {
                    console.error(`Erro ao escrever no arquivo: ${erro}`);
                } else {
                    console.log(`Salvou o dobro com sucesso!`);
                }
            };
            fs.writeFile('arquivo_dobro.txt', dobro.toString(), finalizar);
        }
    };
    fs.readFile(nomeArquivo, exibirConteudo);
    //    fs.readFile(nomeArquivo, 'utf8', exibirConteudo); // informa a codificação do arquivo, evitando a necessidade de usar toString() no conteúdo
};

abrirArquivo('arquivo.txt');