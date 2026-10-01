// TTI301 - Aula 06 - Script 15: produtor ObservacaoCriada.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.31-4.3.34 e 4.3.42.
// Páginas impressas 40-43 e 54-55; no leitor PDF, somar 4 à página impressa.
// Relação: adaptação; status aguardando antecipado e versão 1 acrescentada.
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

app.post("/eventos", (req, res) => {
    const problema = validarEvento(req.body);
    if (problema) return res.status(400).send({ erro: problema });
    console.log(`[RECEBIDO] ${req.body.tipo}; este estágio ainda não classifica.`);
    res.send({ recebido: true, aplicado: false });
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
