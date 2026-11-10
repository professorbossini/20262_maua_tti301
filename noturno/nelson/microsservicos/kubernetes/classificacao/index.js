// ======================================================
// MICROSSERVIÇO DE CLASSIFICAÇÃO - Porta 7000
// Reage ao evento "ObservacaoCriada", classifica a observação
// como "importante" ou "comum" e publica "ObservacaoClassificada".
// Não é acessado de fora do cluster (só pelo Barramento).
// ======================================================

const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// ALTERAÇÃO: endereço do Barramento no Kubernetes.
// Antes era 'http://barramento:10000' (nome do Docker Compose).
const URL_BARRAMENTO = "http://barramento-de-eventos-service:10000/eventos";

// Palavra que torna uma observação "importante"
const palavraChave = "importante";

const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status =
            observacao.texto.includes(palavraChave)
                ? "importante"
                : "comum";

        // ALTERAÇÃO: adicionado .catch(). Sem ele, uma falha de rede
        // gerava uma Promise rejeitada sem tratamento, o que encerra
        // o processo Node.js (o nodemon fica "app crashed" e o Pod
        // para de responder sem ser reiniciado).
        axios.post(URL_BARRAMENTO, {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        }).catch(err =>
            console.error("Erro ao emitir ObservacaoClassificada:", err.message)
        );
    },
};

// Recebe eventos repassados pelo Barramento
app.post("/eventos", (req, res) => {
    try {
        // ALTERAÇÃO: só executa se houver manipulador para o tipo
        if (funcoes[req.body.tipo]) {
            funcoes[req.body.tipo](req.body.dados);
        }
    } catch (err) {
        console.error("Erro ao processar evento:", err.message);
    }
    res.status(200).send({ msg: "ok" });
});

app.listen(7000, () => console.log("Classificação. Porta 7000"));
