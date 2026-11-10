// ======================================================
// MICROSSERVIÇO DE CONSULTAS - Porta 6000
// Mantém uma visão consolidada: lembretes + observações.
// Reage aos eventos LembreteCriado, ObservacaoCriada e
// ObservacaoAtualizada. Ao iniciar, recupera o histórico
// de eventos do Barramento.
// ======================================================

const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// ALTERAÇÃO: endereço do Barramento no Kubernetes.
// Antes era 'http://barramento:10000' (nome do Docker Compose).
const URL_BARRAMENTO = "http://barramento-de-eventos-service:10000/eventos";

// Base consolidada em memória
const baseConsulta = {};

// Manipuladores de cada tipo de evento
const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete;
    },
    ObservacaoCriada: (observacao) => {
        // ALTERAÇÃO: se o lembrete ainda não existir na base,
        // ignora a observação (antes gerava erro silencioso).
        const lembrete = baseConsulta[observacao.lembreteId];
        if (!lembrete) return;
        const observacoes = lembrete["observacoes"] || [];
        observacoes.push(observacao);
        lembrete["observacoes"] = observacoes;
    },
    ObservacaoAtualizada: (observacao) => {
        const lembrete = baseConsulta[observacao.lembreteId];
        if (!lembrete || !lembrete["observacoes"]) return;
        const observacoes = lembrete["observacoes"];
        const indice = observacoes.findIndex((o) => o.id === observacao.id);
        // Só substitui se a observação foi encontrada
        if (indice >= 0) observacoes[indice] = observacao;
    },
};

// Devolve a visão consolidada
app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta);
});

// Recebe eventos repassados pelo Barramento
app.post("/eventos", (req, res) => {
    try {
        // ALTERAÇÃO: verifica se existe manipulador para o tipo
        if (funcoes[req.body.tipo]) {
            funcoes[req.body.tipo](req.body.dados);
        }
    } catch (err) {
        console.error("Erro ao processar evento:", err.message);
    }
    res.status(200).send({ msg: "ok" });
});

app.listen(6000, async () => {
    console.log("Consultas. Porta 6000");

    // Recupera todos os eventos já registrados no Barramento
    // (útil quando o Pod de Consultas é recriado).
    try {
        const resp = await axios.get(URL_BARRAMENTO);

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
            "Não foi possível recuperar o histórico do barramento:",
            err.message
        );
    }
});
