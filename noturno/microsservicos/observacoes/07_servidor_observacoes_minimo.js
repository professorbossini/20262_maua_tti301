// TTI301 - Aula prática 5 - Segundo microsserviço: versão mínima.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, seções 4.3.16 a 4.3.18,
//   páginas impressas 25-27 (aprox. páginas 29-31 do PDF).
// Relação: adaptação didática. Usamos express.json() no lugar de body-parser
// e começamos apenas com a consulta da coleção de observações.

const express = require("express");

const app = express();
const PORTA = 5000;

app.use(express.json());

// Cada chave será o id de um lembrete; cada valor será um vetor de observações.
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

app.listen(PORTA, () => {
    console.log(`Serviço de observações ouvindo na porta ${PORTA}.`);
    console.log("Exemplo: GET /lembretes/1/observacoes");
});
