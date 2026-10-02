const express = require('express');
const axios = require('axios'); // Proposta: importar o cliente usado abaixo.
const app = express();
app.use(express.json());
PORTA = 7000;
const palavraChave = "importante";

const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status =
            observacao.texto.includes(palavraChave)
                ? "importante"
                : "comum";
        axios.post("http://localhost:10000/eventos", {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        });
    }
};


app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err) {}
    res.status(200).send({ msg: "ok" });
});

app.listen(PORTA, () => {
    console.log(`Classificação ouvindo na porta ${PORTA}.`);
});
// TTI301 - 02/10/2026 - proposta didática, não é o arquivo original da main.
// Única mudança executável: importação de axios na linha 2.
// Referência: 01_apostila_microsservicos.pdf, 4.3.44, bloco 4.3.26.
// Página impressa 57; página 61 do PDF. A importação aparece na apostila.
// A proposta não acrescenta tratamento de falhas HTTP, validação ou persistência.
