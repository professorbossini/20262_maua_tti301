const express = require('express');
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

// Referência desta cópia de leitura - TTI301 - 02/10/2026.
// Fonte: noturno/microsservicos/classificacao/index.js
// Snapshot: 29622331d71c03d1aac164f875709b63f2bf7d2a
// Apostila: 01_apostila_microsservicos.pdf.
// Seções e páginas aproximadas: 4.3.41-4.3.44 e 4.3.47; pp. impressas 52-57 e 59-60 (PDF 56-61 e 63-64).
// Relação: código do snapshot preservado; apenas este rodapé foi acrescentado.
// Atenção: neste snapshot, axios é chamado mas não é importado neste arquivo.
