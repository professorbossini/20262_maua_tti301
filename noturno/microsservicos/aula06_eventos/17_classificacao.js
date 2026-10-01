// TTI301 - Aula 06 - Script 17: classificar sem possuir a base de observações.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.40-4.3.44 e 4.3.47.
// Páginas impressas 48-57 e 59-60; no leitor PDF, somar 4 à página impressa.
// Relação: regra original: inclui "importante" -> importante; caso contrário comum.
// Estudo local: dados em memória; não é um broker de produção.


const express = require("express");
const axios = require("axios");
const { validarEvento } = require("./apoio/contrato");
const app = express();
const PORTA = Number(process.env.PORTA_K || 7000);
const BASE_B = process.env.BASE_B || "http://127.0.0.1:10000";
const ATRASO = Number(process.env.ATRASO_MS || 800);
const processados = new Set();
app.use(express.json());

app.get("/saude", (req, res) => res.send({ servico: "classificacao", porta: PORTA }));

app.post("/eventos", async (req, res) => {
    const evento = req.body;
    const problema = validarEvento(evento);
    if (problema) return res.status(400).send({ erro: problema });
    if (evento.tipo !== "ObservacaoCriada") {
        return res.send({ recebido: true, aplicado: false });
    }
    if (processados.has(evento.id)) return res.send({ repetido: true });
    await new Promise((resolve) => setTimeout(resolve, ATRASO));
    const observacao = evento.dados;
    const status = observacao.texto.includes("importante") ? "importante" : "comum";
    const classificacao = {
        id: `${evento.id}:classificada`,
        tipo: "ObservacaoClassificada",
        dados: { ...observacao, status }
    };
    try {
        await axios.post(`${BASE_B}/eventos`, classificacao, { timeout: 2000, proxy: false });
        processados.add(evento.id);
        console.log(`[CLASSIFICADA] ${observacao.id}: ${status}`);
        res.send({ classificado: true, status });
    } catch (erro) {
        res.status(503).send({ erro: "Classificação pronta; publicação sem confirmação." });
    }
});

app.use((erro, req, res, next) => {
    res.status(erro.status || 500).send({ erro: "Requisição inválida ou falha interna." });
});
app.listen(PORTA, "127.0.0.1", () => {
    console.log(`Classificação em ${PORTA}; atraso didático ${ATRASO} ms.`);
}).on("error", (erro) => {
    console.error(`Porta ${PORTA}: ${erro.code}`);
    process.exitCode = 1;
});
