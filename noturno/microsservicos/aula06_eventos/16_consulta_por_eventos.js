// TTI301 - Aula 06 - Script 16: base de consulta montada por eventos.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.35-4.3.39 e 4.3.46-4.3.47.
// Páginas impressas 43-48 e 58-60; no leitor PDF, somar 4 à página impressa.
// Relação: adaptação; inclui evento genérico; ainda não deduplica nem recupera histórico.
// Estudo local: dados em memória; não é um broker de produção.


const express = require("express");
const { validarEvento } = require("./apoio/contrato");
const app = express();
const PORTA = Number(process.env.PORTA_Q || 6000);
const baseConsulta = Object.create(null);
app.use(express.json());

const funcoes = {
    LembreteCriado: (dados) => {
        baseConsulta[dados.contador] = { ...dados, observacoes: [] };
    },
    ObservacaoCriada: (dados) => {
        const lembrete = baseConsulta[dados.lembreteId];
        if (!lembrete) throw new Error("Lembrete ainda não está na consulta.");
        lembrete.observacoes.push({ ...dados });
    },
    ObservacaoAtualizada: (dados) => {
        const lembrete = baseConsulta[dados.lembreteId];
        if (!lembrete) throw new Error("Lembrete ainda não está na consulta.");
        const indice = lembrete.observacoes.findIndex((item) => item.id === dados.id);
        if (indice < 0) throw new Error("Observação ainda não está na consulta.");
        lembrete.observacoes[indice] = { ...dados };
    }
};

app.get("/saude", (req, res) => res.send({ servico: "consulta-basica", porta: PORTA }));
app.get("/lembretes", (req, res) => res.send(baseConsulta));

app.post("/eventos", (req, res) => {
    const evento = req.body;
    const problema = validarEvento(evento);
    if (problema) return res.status(400).send({ erro: problema });
    if (!Object.hasOwn(funcoes, evento.tipo)) {
        return res.send({ recebido: true, aplicado: false });
    }
    try {
        funcoes[evento.tipo](evento.dados);
        console.log(`[APLICADO] ${evento.tipo}`);
        res.send({ aplicado: true });
    } catch (erro) {
        res.status(409).send({ erro: erro.message });
    }
});

app.use((erro, req, res, next) => {
    res.status(erro.status || 500).send({ erro: "Requisição inválida ou falha interna." });
});
app.listen(PORTA, "127.0.0.1", () => {
    console.log(`Consulta básica em ${PORTA}; sem recuperação automática.`);
}).on("error", (erro) => {
    console.error(`Porta ${PORTA}: ${erro.code}`);
    process.exitCode = 1;
});
