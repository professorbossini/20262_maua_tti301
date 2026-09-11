// TTI301 - Aula 06 - Script 21: recuperar histórico sem duplicar a projeção.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.49-4.3.52.
// Páginas impressas 63-68; no leitor PDF, somar 4 à página impressa.
// Relação: adaptação + extensão: replay manual, prontidão e módulo idempotente Script 20.
// Estudo local: dados em memória; não é um broker de produção.


const express = require("express");
const axios = require("axios");
const { criarProjecao } = require("./20_projecao_idempotente");
const app = express();
const PORTA = Number(process.env.PORTA_Q || 6000);
const BASE_B = process.env.BASE_B || "http://127.0.0.1:10000";
const projecao = criarProjecao();
let pronta = false;
let reprocessando = false;
app.use(express.json());

async function recuperar() {
    const resposta = await axios.get(`${BASE_B}/eventos`, { timeout: 2000, proxy: false });
    const contagem = { aplicado: 0, repetido: 0, ignorado: 0 };
    for (const evento of resposta.data) {
        const resultado = projecao.aplicar(evento);
        contagem[resultado]++;
    }
    pronta = true;
    return contagem;
}

app.get("/saude", (req, res) => {
    res.send({ servico: "consulta-replay", porta: PORTA, pronta });
});
app.get("/lembretes", (req, res) => {
    if (!pronta) return res.status(503).send({ erro: "Histórico ainda não recuperado." });
    res.send(projecao.listar());
});
app.get("/estado", (req, res) => {
    res.send({ pronta, reprocessando, ...projecao.resumo() });
});

app.post("/eventos", (req, res) => {
    try {
        const resultado = projecao.aplicar(req.body);
        res.send({ resultado });
    } catch (erro) {
        res.status(400).send({ erro: erro.message });
    }
});

app.post("/reprocessar", async (req, res) => {
    if (reprocessando) return res.status(409).send({ erro: "Replay em andamento." });
    reprocessando = true;
    try {
        const contagem = await recuperar();
        res.send({ recuperado: true, contagem, ...projecao.resumo() });
    } catch (erro) {
        res.status(503).send({ erro: "Não foi possível recuperar o histórico." });
    } finally {
        reprocessando = false;
    }
});

app.use((erro, req, res, next) => {
    res.status(erro.status || 500).send({ erro: "Requisição inválida ou falha interna." });
});
app.listen(PORTA, "127.0.0.1", async () => {
    console.log(`Consulta em ${PORTA}; recuperando histórico.`);
    reprocessando = true;
    try {
        console.log("Replay inicial:", await recuperar());
    } catch (erro) {
        console.error("Histórico indisponível. Após recuperar o barramento, use POST /reprocessar.");
    } finally {
        reprocessando = false;
    }
}).on("error", (erro) => {
    console.error(`Porta ${PORTA}: ${erro.code}`);
    process.exitCode = 1;
});
