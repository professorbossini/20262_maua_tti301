// TTI301 - Aula prática 4 - GET de um lembrete pelo identificador.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, serviço de lembretes,
//   aprox. pp. 20-23.
// - http_apostila.pdf, GET, URLs, recursos e status, aprox. pp. 8-12.
// Relação: extensão didática. A rota GET /lembretes/:id não aparece
// como exemplo literal nessa etapa da apostila.

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

    const lembrete = { id: contador, texto: texto };
    lembretes[contador] = lembrete;

    res.status(201).send(lembrete);
});

app.get("/lembretes/:id", (req, res) => {
    const id = req.params.id;
    const lembrete = lembretes[id];

    if (!lembrete) {
        return res.status(404).send({
            erro: "Lembrete não encontrado.",
        });
    }

    res.status(200).send(lembrete);
});

app.listen(PORTA, () => {
    console.log(`Servidor de lembretes ouvindo na porta ${PORTA}.`);
});
