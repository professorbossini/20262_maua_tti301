// TTI301 - Aula prática 5 - Serviço de observações com consulta em lote.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, seção 4.3.25,
//   páginas impressas 32-33 (aprox. páginas 36-37 do PDF).
// Relação: extensão didática baseada na Figura 4.3.9.
// A apostila apresenta a comunicação síncrona conceitualmente; este script
// acrescenta uma rota que devolve observações de vários lembretes de uma vez.

const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express();
const PORTA = 5000;

app.use(express.json());

const observacoesPorLembreteId = {};

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

app.get("/observacoes", (req, res) => {
    const listaRecebida = req.query.lembreteIds;

    if (typeof listaRecebida !== "string" || listaRecebida.trim() === "") {
        return res.status(400).send({
            erro: "Informe lembreteIds na query string. Exemplo: 1,2,3.",
        });
    }

    const ids = listaRecebida
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== "");

    const resultado = {};

    for (const id of ids) {
        resultado[id] = observacoesPorLembreteId[id] || [];
    }

    res.status(200).send(resultado);
});

app.listen(PORTA, () => {
    console.log(`Serviço de observações em lote ouvindo na porta ${PORTA}.`);
    console.log("Exemplo: GET /observacoes?lembreteIds=1,2");
});
