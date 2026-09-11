// TTI301 - Lista 6 - Consumidor de auditoria de eventos.
// Bossini: 01_apostila_microsservicos.pdf, 4.3.33, 4.3.47 e 4.3.50,
// pp. impressas 42, 59-60 e 66-67. Atividade de adaptação e extensão.
// Porta 7100. Não integra automaticamente o barramento da aula.
// Envie eventos diretamente a esta porta com curl.

const express = require("express");
const { validarEvento } = require("./apoio/contrato");
const app = express();
const PORTA = Number(process.env.PORTA_EX || 7100);
const eventos = [];
const idsRecebidos = new Set();
app.use(express.json());

// Exercício 1: responder 200 com todos os eventos auditados.
app.get("/eventos", (req, res) => {
    res.status(501).send({ erro: "TODO: listar eventos" });
});

// Exercício 2: validar req.body; se inválido, responder 400 sem guardar.
// Exercício 3: se o id já existir, responder 200 com repetido: true.
// Se for novo, guardar uma cópia, registrar o id e responder 201.
// Aceitar também tipos desconhecidos: auditoria registra, não executa regra de negócio.
app.post("/eventos", (req, res) => {
    res.status(501).send({ erro: "TODO: validar e registrar sem duplicar" });
});

// Exercício 4: responder 200 com { total, porTipo }.
// Exemplo: { total: 2, porTipo: { LembreteCriado: 1, ObservacaoCriada: 1 } }.
// Desafio: explicar por que estes dados desaparecem ao reiniciar.
app.get("/resumo", (req, res) => {
    res.status(501).send({ erro: "TODO: calcular resumo" });
});

app.listen(PORTA, "127.0.0.1", () => {
    console.log(`Lista 6: auditoria na porta ${PORTA}. TODOs retornam 501.`);
}).on("error", (erro) => {
    console.error(`Porta ${PORTA}: ${erro.code}`);
    process.exitCode = 1;
});
