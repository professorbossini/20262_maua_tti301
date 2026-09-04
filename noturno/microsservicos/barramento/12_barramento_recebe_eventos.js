// TTI301 - Aula prática 5 - Primeira etapa de um barramento de eventos.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, seções 4.3.27 e 4.3.28,
//   páginas impressas 34-38 (aprox. páginas 38-42 do PDF).
// Relação: extensão didática e material de reserva. Este primeiro estágio
// recebe, valida e armazena eventos, mas ainda não faz broadcast.

const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express();
const PORTA = 10000;

app.use(express.json());

const eventos = [];

app.get("/eventos", (req, res) => {
    res.status(200).send(eventos);
});

app.post("/eventos", (req, res) => {
    const { tipo, dados } = req.body;

    if (typeof tipo !== "string" || tipo.trim() === "" || dados === undefined) {
        return res.status(400).send({
            erro: "O evento precisa conter tipo e dados.",
        });
    }

    const evento = {
        id: randomUUID(),
        tipo: tipo.trim(),
        dados: dados,
        recebidoEm: new Date().toISOString(),
    };

    eventos.push(evento);

    console.log(`Evento recebido: ${evento.tipo}`);
    res.status(201).send(evento);
});

app.listen(PORTA, () => {
    console.log(`Barramento didático ouvindo na porta ${PORTA}.`);
    console.log("Nesta etapa, ele apenas recebe e registra eventos.");
});
