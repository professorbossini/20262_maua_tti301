// TTI301 - Aula 06 - Script 18: proprietário atualiza e publica evento genérico.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.42 e 4.3.45-4.3.48.
// Páginas impressas 54-55 e 57-63; no leitor PDF, somar 4 à página impressa.
// Relação: adaptação; versão do recurso, id derivado e deduplicação explícitos.
// Estudo local: dados em memória; não é um broker de produção.


const express = require("express");
const axios = require("axios");
const { randomUUID } = require("node:crypto");
const { textoValido, validarEvento } = require("./apoio/contrato");
const app = express();
const PORTA = Number(process.env.PORTA_O || 5000);
const BASE_B = process.env.BASE_B || "http://127.0.0.1:10000";
const observacoesPorLembreteId = Object.create(null);
app.use(express.json());

app.get("/saude", (req, res) => res.send({ servico: "observacoes", porta: PORTA }));
app.get("/lembretes/:id/observacoes", (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post("/lembretes/:id/observacoes", async (req, res) => {
    const texto = req.body?.texto;
    if (!textoValido(texto)) {
        return res.status(400).send({ erro: "O campo texto é obrigatório." });
    }
    const lembreteId = req.params.id;
    const observacao = {
        id: randomUUID(), lembreteId, texto: texto.trim(),
        status: "aguardando", versao: 1
    };
    const lista = observacoesPorLembreteId[lembreteId] || [];
    lista.push(observacao);
    observacoesPorLembreteId[lembreteId] = lista;
    const evento = { id: randomUUID(), tipo: "ObservacaoCriada", dados: { ...observacao } };
    try {
        await axios.post(`${BASE_B}/eventos`, evento, { timeout: 2000, proxy: false });
        res.status(201).send(observacao);
    } catch (erro) {
        res.status(503).send({
            erro: "Criada localmente, mas a publicação não foi confirmada.",
            observacao, eventoId: evento.id
        });
    }
});

const processados = new Set();

app.post("/eventos", async (req, res) => {
    const evento = req.body;
    const problema = validarEvento(evento);
    if (problema) return res.status(400).send({ erro: problema });
    if (evento.tipo !== "ObservacaoClassificada") {
        return res.send({ recebido: true, aplicado: false });
    }
    if (processados.has(evento.id)) return res.send({ repetido: true });
    const dados = evento.dados;
    if (!["importante", "comum"].includes(dados.status)) {
        return res.status(400).send({ erro: "Classificação deve ser importante ou comum." });
    }
    const lista = observacoesPorLembreteId[dados.lembreteId] || [];
    const observacao = lista.find((item) => item.id === dados.id);
    if (!observacao) return res.status(409).send({ erro: "Observação não existe nesta base." });
    observacao.status = dados.status;
    observacao.versao = 2;
    const atualizacao = {
        id: `${evento.id}:atualizada`,
        tipo: "ObservacaoAtualizada",
        dados: { ...observacao }
    };
    try {
        await axios.post(`${BASE_B}/eventos`, atualizacao, { timeout: 2000, proxy: false });
        processados.add(evento.id);
        console.log(`[ATUALIZADA] ${observacao.id}: ${observacao.status}`);
        res.send({ atualizado: true });
    } catch (erro) {
        res.status(503).send({ erro: "Estado local atualizado; publicação sem confirmação." });
    }
});

app.use((erro, req, res, next) => {
    res.status(erro.status || 500).send({ erro: "Requisição inválida ou falha interna." });
});
app.listen(PORTA, "127.0.0.1", () => {
    console.log(`Observações em ${PORTA}; base vazia.`);
}).on("error", (erro) => {
    console.error(`Porta ${PORTA}: ${erro.code}`);
    process.exitCode = 1;
});
