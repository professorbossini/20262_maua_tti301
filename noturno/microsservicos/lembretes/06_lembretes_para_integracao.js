// TTI301 - Aula prática 5 - Serviço de lembretes preparado para integração.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, seções 4.3.3 a 4.3.14,
//   páginas impressas 18-24 (aprox. páginas 22-28 do PDF).
// - http_apostila.pdf, métodos GET/POST e status 200/201/400/404,
//   páginas impressas 8-10.
// Relação: consolidação dos Scripts 01-05. Mantemos apenas as operações
// necessárias para integrar lembretes ao novo microsserviço de observações.

const express = require("express");

const app = express();
const PORTA = 4000;

app.use(express.json());

const lembretes = {};
let contador = 0;

app.get("/saude", (req, res) => {
    res.status(200).send({
        status: "ok",
        servico: "lembretes",
    });
});

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
    console.log(`Serviço de lembretes ouvindo na porta ${PORTA}.`);
    console.log("Mantenha este processo ativo durante a integração.");
});
