// ======================================================
// MICROSSERVIÇO DE OBSERVAÇÕES - Porta 5000
// Cadastra observações de um lembrete e publica os eventos
// "ObservacaoCriada" e "ObservacaoAtualizada" no Barramento.
// Reage ao evento "ObservacaoClassificada".
// ======================================================

const express = require('express');
const axios = require('axios');

// ALTERAÇÃO: o pacote 'uuid' (versão 14) é distribuído apenas como
// módulo ESM. Para evitar problemas de 'require' no contêiner,
// usamos o gerador de UUID nativo do Node.js (módulo 'crypto').
const { randomUUID } = require('crypto');

const app = express();

// ALTERAÇÃO: express.json() no lugar de 'body-parser'
// (que não está declarado no package.json).
app.use(express.json());

// ALTERAÇÃO: endereço do Barramento no Kubernetes.
// Antes era 'http://barramento:10000' (nome usado no Docker Compose).
// No Kubernetes, o nome correto é o do Service ClusterIP.
const URL_BARRAMENTO = 'http://barramento-de-eventos-service:10000/eventos';

// Base de dados em memória
const observacoesPorLembreteId = {};

// Mapeamento de manipuladores de eventos (Escopo Global)
const funcoes = {
    // Disparado pelo microsserviço de Classificação
    ObservacaoClassificada: (observacao) => {
        const observacoes = observacoesPorLembreteId[observacao.lembreteId];
        if (!observacoes) return;

        const obsParaAtualizar = observacoes.find(o => o.id === observacao.id);
        if (obsParaAtualizar) {
            obsParaAtualizar.status = observacao.status;

            // Notifica o barramento sobre a atualização do status
            axios.post(URL_BARRAMENTO, {
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
    const idObs = randomUUID();
    const { texto } = req.body;
    const lembreteId = req.params.id;

    const observacoesDoLembrete = observacoesPorLembreteId[lembreteId] || [];

    const novaObservacao = { id: idObs, texto, status: 'aguardando' };
    observacoesDoLembrete.push(novaObservacao);

    observacoesPorLembreteId[lembreteId] = observacoesDoLembrete;

    // Dispara o evento de criação para o barramento
    try {
        await axios.post(URL_BARRAMENTO, {
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

// RECEBIMENTO DE EVENTOS vindos do Barramento
app.post("/eventos", (req, res) => {
    try {
        const { tipo, dados } = req.body;
        // Executa o manipulador apenas se ele existir para o tipo recebido
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
    console.log('Observações. Porta 5000');
});
