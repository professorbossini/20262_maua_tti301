// TTI301 - Aula prática 4 - Criação de lembretes com POST.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, criação de lembretes,
//   aprox. p. 21.
// - http_apostila.pdf, POST e códigos de status, aprox. pp. 8-10.
// Relação: adaptação didática. A apostila antiga usa PUT para criar;
// adotamos POST, conforme a apostila HTTP mais recente.
// Também usamos express.json() no lugar do antigo body-parser.

const express = require("express");

const app = express();
const PORTA = 4000;

app.use(express.json());

const lembretes = {};
let contador = 0;

app.get("/lembretes", (req, res) => {
    res.status(200).send(lembretes);
});

app.post("/lembretes", (req, res) => {
    contador++;

    const { texto } = req.body;

    const lembrete = {
        id: contador,
        texto: texto,
    };

    lembretes[contador] = lembrete;

    res.status(201).send(lembrete);
});

app.listen(PORTA, () => {
    console.log(`Servidor de lembretes ouvindo na porta ${PORTA}.`);
    console.log(`POST/GET: http://localhost:${PORTA}/lembretes`);
});
