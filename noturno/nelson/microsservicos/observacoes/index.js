const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const observacoesPorLembreteId = {};
const { v4: uuidv4 } = require('uuid');
//:id é um placeholder
//exemplo: /lembretes/123456/observacoes

app.put('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    //req.params dá acesso à lista de parâmetros da URL
    const observacoesDoLembrete =
    observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });
    observacoesPorLembreteId[req.params.id] =
    observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
});
app.get('/lembretes/:id/observacoes', (req, res) => {

});
app.listen(5000, (() => {
console.log('Lembretes. Porta 5000');
}));