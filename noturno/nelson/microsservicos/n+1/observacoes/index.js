const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

// Base de dados em memória para armazenar as observações associadas a cada ID de lembrete
const observacoesPorLembreteId = {};

// CADASTRAR OU ADICIONAR OBSERVAÇÃO
app.put('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;

    // Obtém o array de observações existente ou inicializa um novo array vazio
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];

    // Adiciona a nova observação
    observacoesDoLembrete.push({ id: idObs, texto });

    // Atualiza a chave do lembrete com a lista renovada
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;

    // Retorna status 201 (Created) e o array atualizado
    res.status(201).send(observacoesDoLembrete);
});

// CONSULTAR OBSERVAÇÕES DE UM LEMBRETE
app.get('/lembretes/:id/observacoes', (req, res) => {
    // Retorna o array de observações ou um array vazio caso não exista nenhuma
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

// INICIALIZAÇÃO DO SERVIDOR
app.listen(5000, () => {
    console.log('Serviço de Observações rodando na porta 5000');
});