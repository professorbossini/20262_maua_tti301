// TTI301 - Aula prática 5 - Criação e consulta de observações.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, seções 4.3.19 a 4.3.23,
//   páginas impressas 27-31 (aprox. páginas 31-35 do PDF).
// Relação: adaptação didática. Usamos POST em vez do PUT da apostila antiga,
// express.json() em vez de body-parser e randomUUID() nativo do Node
// em vez do pacote externo uuid.

const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express();
const PORTA = 5000;

app.use(express.json());

const observacoesPorLembreteId = {};

app.get("/saude", (req, res) => {
    res.status(200).send({
        status: "ok",
        servico: "observacoes",
    });
});

app.get("/lembretes/:id/observacoes", (req, res) => {
    const idLembrete = req.params.id;
    const observacoes = observacoesPorLembreteId[idLembrete] || [];

    res.status(200).send(observacoes);
});

app.post("/lembretes/:id/observacoes", (req, res) => {
    const { texto } = req.body;

    if (typeof texto !== "string" || texto.trim() === "") {
        return res.status(400).send({
            erro: "O campo texto é obrigatório e não pode estar vazio.",
        });
    }

    const idLembrete = req.params.id;

    const observacao = {
        id: randomUUID(),
        lembreteId: idLembrete,
        texto: texto.trim(),
    };

    const observacoes = observacoesPorLembreteId[idLembrete] || [];
    observacoes.push(observacao);
    observacoesPorLembreteId[idLembrete] = observacoes;

    res.status(201).send(observacao);
});

app.listen(PORTA, () => {
    console.log(`Serviço de observações ouvindo na porta ${PORTA}.`);
    console.log("Rotas: GET/POST /lembretes/:id/observacoes");
});
