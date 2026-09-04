// TTI301 - Aula prática 4 - GET da coleção de lembretes.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, serviço de lembretes,
//   aprox. pp. 19-20.
// - http_apostila.pdf, GET e códigos de status, aprox. pp. 8-10.
// Relação: exemplo diretamente baseado na apostila, com status 200 explícito.

const express = require("express");

const app = express();
const PORTA = 4000;

// Base provisória: objeto JavaScript mantido somente na memória do processo.
const lembretes = {};

app.get("/lembretes", (req, res) => {
    res.status(200).send(lembretes);
});

app.listen(PORTA, () => {
    console.log(`Servidor de lembretes ouvindo na porta ${PORTA}.`);
    console.log(`GET: http://localhost:${PORTA}/lembretes`);
});
