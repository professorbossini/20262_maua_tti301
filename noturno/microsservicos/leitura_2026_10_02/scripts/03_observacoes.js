const express = require('express');
const app = express();
const PORTA = 5000;
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

const axios = require('axios');

const observacoesPorLembreteId = {};

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes =
            observacoesPorLembreteId[observacao.lembreteId];
        const obsParaAtualizar = observacoes.find(o => o.id ===
            observacao.id)
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
}



app.post('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto, status: 'aguardando' });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'ObservacaoCriada',
        dados: {
            id: idObs,
            texto,
            lembreteId: req.params.id,
            status: 'aguardando'
        }
    });
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err) {}
    res.status(200).send({ msg: "ok" });
});

app.listen(PORTA, () => {
    console.log(`Servidor de observações ouvindo na porta ${PORTA}.`);
});

// Referência desta cópia de leitura - TTI301 - 02/10/2026.
// Fonte: noturno/microsservicos/observacoes/index.js
// Snapshot: 29622331d71c03d1aac164f875709b63f2bf7d2a
// Apostila: 01_apostila_microsservicos.pdf.
// Seções e páginas aproximadas: 4.3.31, 4.3.42, 4.3.45 e 4.3.47; pp. impressas 40-41, 54-55 e 57-60 (PDF 44-45, 58-59 e 61-64).
// Relação: código do snapshot preservado; apenas este rodapé foi acrescentado.
