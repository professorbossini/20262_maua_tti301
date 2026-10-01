// TTI301 - Aula 06 - Script 19: incluir o serviço de classificação.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.43 e 4.3.50.
// Páginas impressas 55-56 e 66-67; no leitor PDF, somar 4 à página impressa.
// Relação: adaptação do Script 13: adiciona a porta 7000 à distribuição.
// Estudo local: dados em memória; não é um broker de produção.


const express = require("express");
const axios = require("axios");
const { validarEvento } = require("./apoio/contrato");
const app = express();
const PORTA = Number(process.env.PORTA_B || 10000);
const BASE_L = process.env.BASE_L || "http://127.0.0.1:4000";
const BASE_O = process.env.BASE_O || "http://127.0.0.1:5000";
const BASE_Q = process.env.BASE_Q || "http://127.0.0.1:6000";
const BASE_K = process.env.BASE_K || "http://127.0.0.1:7000";
const destinos = [BASE_L, BASE_O, BASE_Q, BASE_K];
const historico = [];
const porId = new Map();
const fila = [];
let distribuindo = false;
const TIMEOUT = 3000;
app.use(express.json());

async function distribuir() {
    if (distribuindo) return;
    distribuindo = true;
    try {
        while (fila.length > 0) {
            const evento = fila.shift();
            for (const destino of destinos) {
                try {
                    await axios.post(`${destino}/eventos`, evento, {
                        timeout: TIMEOUT, proxy: false
                    });
                    console.log(`[ENTREGUE] ${evento.tipo} -> ${destino}`);
                } catch (erro) {
                    const motivo = erro.response?.status || erro.code || erro.message;
                    console.log(`[FALHOU] ${evento.tipo} -> ${destino}: ${motivo}`);
                }
            }
        }
    } finally {
        distribuindo = false;
    }
}

app.get("/saude", (req, res) => {
    res.send({ servico: "barramento", porta: PORTA });
});

app.get("/eventos", (req, res) => {
    res.send(historico);
});

app.get("/estado", (req, res) => {
    res.send({ eventos: historico.length, pendentes: fila.length, distribuindo });
});

app.post("/eventos", (req, res) => {
    const problema = validarEvento(req.body);
    if (problema) return res.status(400).send({ erro: problema });
    const { id, tipo, dados } = req.body;
    const anterior = porId.get(id);
    if (anterior) {
        if (anterior.tipo !== tipo || JSON.stringify(anterior.dados) !== JSON.stringify(dados)) {
            return res.status(409).send({ erro: "Mesmo id com conteúdo diferente." });
        }
        return res.status(202).send({ recebido: true, repetido: true, id });
    }
    const evento = {
        id, tipo, dados: structuredClone(dados), sequencia: historico.length + 1
    };
    historico.push(evento);
    porId.set(id, evento);
    fila.push(evento);
    res.status(202).send({ recebido: true, id, sequencia: evento.sequencia });
    distribuir().catch((erro) => console.error("Falha interna na distribuição:", erro));
});

app.use((erro, req, res, next) => {
    res.status(erro.status || 500).send({ erro: "Requisição inválida ou falha interna." });
});

app.listen(PORTA, "127.0.0.1", () => {
    console.log(`Barramento em ${PORTA}; ${destinos.length} destinos; estado vazio.`);
}).on("error", (erro) => {
    console.error(`Não foi possível abrir a porta ${PORTA}: ${erro.code}`);
    process.exitCode = 1;
});
