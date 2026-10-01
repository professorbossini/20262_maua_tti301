const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');

const PORTA = 6000;

const baseConsulta = {};

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete;
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"] || [];
        observacoes.push(observacao);
        baseConsulta[observacao.lembreteId]["observacoes"] = observacoes;
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes =
            baseConsulta[observacao.lembreteId]["observacoes"];
        const indice = observacoes.findIndex((o) => o.id ===
            observacao.id);
        observacoes[indice] = observacao;
    }
};


app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err) { }
    res.status(200).send({ msg: "ok" });
});


app.listen(PORTA, async () => {
    console.log(`Servidor de consulta ouvindo na porta ${PORTA}.`);
    const resp = await
        axios.get("http://localhost:10000/eventos");
    //axios entrega os dados na propriedade data
    resp.data.forEach((valor, indice, colecao) => {
        try {
            funcoes[valor.tipo](valor.dados);
        } catch (err) { }
    });
});
