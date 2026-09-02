// TTI301 - Aula prática 4 - Validação de entrada e status 400/404.
// Onde estamos nas apostilas Bossini:
// - http_apostila.pdf, códigos de status e POST, aprox. pp. 8-10.
// - 01_apostila_microsservicos.pdf, cap. 4, serviço de lembretes,
//   aprox. pp. 20-23.
// Relação: extensão didática. Esta validação não aparece como exemplo literal.

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
    const { texto } = req.body;

    if (typeof texto !== "string" || texto.trim() === "") {
        return res.status(400).send({
            erro: "O campo texto é obrigatório e não pode estar vazio.",
        });
    }

    contador++;

    const lembrete = {
        id: contador,
        texto: texto.trim(),
        concluido: false,
    };

    lembretes[contador] = lembrete;

    res.status(201).send(lembrete);
});

app.get("/lembretes/:id", (req, res) => {
    const lembrete = lembretes[req.params.id];

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
