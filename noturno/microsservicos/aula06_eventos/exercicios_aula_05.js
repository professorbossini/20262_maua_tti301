// TTI301 - Lista 5 - Segundo microsserviço e coleções associadas.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, seções 4.3.16 a 4.3.23,
//   páginas impressas 25-31 (aprox. páginas 29-35 do PDF).
// Relação: atividade de consolidação criada a partir do serviço de observações.
//
// Complete os TODOs e execute com:
// npm run exercicios5
//
// Serviço: comentários por artigo | Porta: 5100

const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express();
const PORTA = 5100;

app.use(express.json());

const comentariosPorArtigoId = {};

// Exercício 1 - Liste os comentários de um artigo.
// Quando não houver comentários, responda 200 com um vetor vazio.
app.get("/artigos/:id/comentarios", (req, res) => {
    // TODO: substitua a resposta provisória.
    res.status(501).send({ erro: "TODO: implementar a listagem" });
});

// Exercício 2 - Crie um comentário associado ao artigo informado na URL.
// Corpo: { "texto": "Comentário de teste" }
// Valide texto. Em caso de sucesso, gere UUID e responda 201.
app.post("/artigos/:id/comentarios", (req, res) => {
    // TODO: substitua a resposta provisória.
    res.status(501).send({ erro: "TODO: implementar a criação" });
});

// Exercício 3 - Consulte um comentário específico.
// Responda 404 quando o comentário não estiver na coleção do artigo.
app.get("/artigos/:id/comentarios/:comentarioId", (req, res) => {
    // TODO: substitua a resposta provisória.
    res.status(501).send({ erro: "TODO: implementar a consulta por id" });
});

app.listen(PORTA, () => {
    console.log(`Lista 5 em execução na porta ${PORTA}.`);
    console.log("Rotas: GET/POST /artigos/:id/comentarios");
});
