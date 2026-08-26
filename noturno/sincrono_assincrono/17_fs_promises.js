const fs = require("fs/promises");

async function dobrarConteudoDoArquivo(nomeEntrada, nomeSaida) {
    try {
        const conteudo = await fs.readFile(nomeEntrada, "utf8");
        const numero = Number(conteudo.trim());

        if (Number.isNaN(numero)) {
            throw new Error("O arquivo não contém um número válido.");
        }

        const dobro = numero * 2;
        await fs.writeFile(nomeSaida, dobro.toString());

        const confirmacao = await fs.readFile(nomeSaida, "utf8");
        console.log(`Valor lido: ${numero}`);
        console.log(`Valor salvo: ${confirmacao}`);
    } catch (erro) {
        console.error(`Falha no processamento: ${erro.message}`);
    }
}

dobrarConteudoDoArquivo("arquivo.txt", "arquivo_dobro.txt");
