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

// Referência desta cópia de leitura - TTI301 - 02/10/2026.
// Fonte: noturno/microsservicos/consulta/index.js
// Snapshot: 29622331d71c03d1aac164f875709b63f2bf7d2a
// Apostila: 01_apostila_microsservicos.pdf.
// Seções e páginas aproximadas: 4.3.35-4.3.38, 4.3.46-4.3.47 e 4.3.51; pp. impressas 43-47, 58-60 e 67-68 (PDF 47-51, 62-64 e 71-72).
// Relação: código do snapshot preservado; apenas este rodapé foi acrescentado.
