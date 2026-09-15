const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Base de dados em memória
const observacoesPorLembreteId = {};

// Mapeamento de manipuladores de eventos (Escopo Global)
const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = observacoesPorLembreteId[observacao.lembreteId];
        if (!observacoes) return;

        const obsParaAtualizar = observacoes.find(o => o.id === observacao.id);
        if (obsParaAtualizar) {
            obsParaAtualizar.status = observacao.status;

            // Notifica o barramento sobre a atualização do status
            axios.post('http://localhost:10000/eventos', {
                tipo: "ObservacaoAtualizada",
                dados: {
                    id: observacao.id,
                    texto: observacao.texto,
                    lembreteId: observacao.lembreteId,
                    status: observacao.status
                }
            }).catch(err => console.error("Erro ao emitir ObservacaoAtualizada:", err.message));
        }
    }
};

// CADASTRAR OU ADICIONAR OBSERVAÇÃO
app.put('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const lembreteId = req.params.id;

    const observacoesDoLembrete = observacoesPorLembreteId[lembreteId] || [];

    const novaObservacao = { id: idObs, texto, status: 'aguardando' };
    observacoesDoLembrete.push(novaObservacao);
    
    observacoesPorLembreteId[lembreteId] = observacoesDoLembrete;

    // Dispara o evento de criação para o barramento
    try {
        await axios.post('http://localhost:10000/eventos', {
            tipo: "ObservacaoCriada",
            dados: {
                id: idObs,
                texto,
                lembreteId,
                status: 'aguardando'
            }
        });
    } catch (err) {
        console.error("Erro ao emitir ObservacaoCriada:", err.message);
    }

    res.status(201).send(observacoesDoLembrete);
});

// CONSULTAR OBSERVAÇÕES DE UM LEMBRETE
app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

// RECEBIMENTO DE EVENTOS (Única rota declarada)
app.post("/eventos", (req, res) => {
    try {
        const { tipo, dados } = req.body;
        if (funcoes[tipo]) {
            funcoes[tipo](dados);
        }
    } catch (err) {
        console.error("Erro ao processar evento:", err.message);
    }
    res.status(200).send({ msg: "ok" });
});

// INICIALIZAÇÃO DO SERVIDOR
app.listen(5000, () => {
    console.log('Serviço de Observações rodando na porta 5000');
});