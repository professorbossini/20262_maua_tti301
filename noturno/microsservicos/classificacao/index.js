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