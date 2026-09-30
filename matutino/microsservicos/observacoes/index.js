const axios = require('axios')
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');

const observacoesPorLembreteId = {};

app.use(express.json())

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = observacoesPorLembreteId[observacao.lembreteId];
        const obsParaAtualizar = observacoes.find(o => o.id === observacao.id)
        obsParaAtualizar.status = observacao.status;
        axios.post('http://localhost:10000/eventos', {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id,
                texto: observacao.texto,
                lembreteId: observacao.lembreteId,
                status: observacao.status
            }
        });
    }
};

app.post('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto, status: 'aguardando' });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    //emitir o evento ObservacaoCriada
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'ObservacaoCriada',
        dados: {
            id: idObs, texto,
            status: 'aguardando',
            lembreteId: req.params.id
        }
    })
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
})

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);

    } catch (e) {
    }
    res.status(200).send({ msg: "ok" });
})

app.listen(5000, (() => {
    console.log('Lembretes. Porta 5000');
}));
