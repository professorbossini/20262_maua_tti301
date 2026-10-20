const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.json());

const baseConsulta = {};

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete;
    },
    ObservacaoCriada: (observacao) => {
        const observacoes =
        baseConsulta[observacao.lembreteId]["observacoes"] ||
        [];
        observacoes.push(observacao);
        baseConsulta[observacao.lembreteId]["observacoes"] =
        observacoes;
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes =
        baseConsulta[observacao.lembreteId]["observacoes"];
        const indice = observacoes.findIndex((o) => o.id ===
        observacao.id);
        observacoes[indice] = observacao;
    },
};

app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err) {}
    res.status(200).send({ msg: "ok" });
});

//app.listen(6000, () => console.log("Consultas. Porta 6000"));
app.listen(6000, async () => {
    console.log("Consultas. Porta 6000");

    try {
        const resp = await axios.get(
            "http://barramento:10000/eventos"
        );

        resp.data.forEach((valor) => {
            try {
                if (funcoes[valor.tipo]) {
                    funcoes[valor.tipo](valor.dados);
                }
            } catch (err) {}
        });

        console.log("Histórico de eventos recuperado.");
    } catch (err) {
        console.log(
            "Não foi possível recuperar o histórico do barramento."
        );
    }
});