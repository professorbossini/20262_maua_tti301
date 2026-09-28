const axios = require('axios')
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');

const observacoesPorLembreteId = {};

app.use(express.json())

app.post('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    //emitir o evento ObservacaoCriada
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'ObservacaoCriada',
        dados: {
            id: idObs, texto, lembreteId: req.params.id
        }
    })
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
})

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    res.end()
})

app.listen(5000, (() => {
    console.log('Lembretes. Porta 5000');
}));
