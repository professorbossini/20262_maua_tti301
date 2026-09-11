// TTI301 - Aula 06 - Script 14: produtor LembreteCriado e receptor de eventos.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.29-4.3.34.
// Páginas impressas 38-43; no leitor PDF, somar 4 à página impressa.
// Relação: adaptação da main; POST, validação, ACK e falha parcial explícita.
// Estudo local: dados em memória; não é um broker de produção.


const express = require("express");
const axios = require("axios");
const { randomUUID } = require("node:crypto");
const { textoValido, validarEvento } = require("./apoio/contrato");
const app = express();
const PORTA = Number(process.env.PORTA_L || 4000);
const BASE_B = process.env.BASE_B || "http://127.0.0.1:10000";
const lembretes = Object.create(null);
let contador = 0;
app.use(express.json());

app.get("/saude", (req, res) => res.send({ servico: "lembretes", porta: PORTA }));
app.get("/lembretes", (req, res) => res.send(lembretes));

app.post("/lembretes", async (req, res) => {
    const texto = req.body?.texto;
    if (!textoValido(texto)) {
        return res.status(400).send({ erro: "O campo texto é obrigatório." });
    }
    contador++;
    const lembrete = { id: contador, texto: texto.trim(), concluido: false };
    lembretes[contador] = lembrete;
    const evento = {
        id: randomUUID(),
        tipo: "LembreteCriado",
        dados: { contador, texto: lembrete.texto, concluido: false }
    };
    try {
        await axios.post(`${BASE_B}/eventos`, evento, { timeout: 2000, proxy: false });
        res.status(201).send(lembrete);
    } catch (erro) {
        res.status(503).send({
            erro: "Criado localmente, mas a publicação não foi confirmada.",
            lembrete, eventoId: evento.id
        });
    }
});

app.get("/lembretes/:id", (req, res) => {
    const lembrete = lembretes[req.params.id];
    if (!lembrete) return res.status(404).send({ erro: "Lembrete não encontrado." });
    res.send(lembrete);
});

app.post("/eventos", (req, res) => {
    const problema = validarEvento(req.body);
    if (problema) return res.status(400).send({ erro: problema });
    console.log(`[RECEBIDO] ${req.body.tipo}; sem alteração na base de lembretes.`);
    res.send({ recebido: true, aplicado: false });
});

app.use((erro, req, res, next) => {
    res.status(erro.status || 500).send({ erro: "Requisição inválida ou falha interna." });
});
app.listen(PORTA, "127.0.0.1", () => {
    console.log(`Lembretes em ${PORTA}; base vazia.`);
}).on("error", (erro) => {
    console.error(`Porta ${PORTA}: ${erro.code}`);
    process.exitCode = 1;
});
