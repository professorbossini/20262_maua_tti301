// TTI301 - Lista 4 - APIs HTTP com Express, recorte até o Script 05.
// Referências Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, serviço de lembretes,
//   aprox. pp. 17-24.
// - http_apostila.pdf, GET, POST e status 200/201/400/404,
//   aprox. pp. 8-12.
// Relação: atividade de consolidação criada a partir das apostilas.
//
// Complete os TODOs e execute com:
// node exercicios_aula_04.js
//
// Serviço: tarefas | Porta: 4100

const express = require("express");

const app = express();
const PORTA = 4100;

app.use(express.json());

const tarefas = {};
let contador = 0;

// Exercício 1 - Liste todas as tarefas com status 200.
app.get("/tarefas", (req, res) => {
    // TODO: substitua a resposta provisória.
    res.status(501).send({ erro: "TODO: implementar GET /tarefas" });
});

// Exercício 2 - Crie uma tarefa com POST.
// Corpo: { "descricao": "Estudar Express" }
// Valide descricao. Responda 400 se estiver ausente/vazia.
// Em caso de sucesso, responda 201 com { id, descricao, concluida: false }.
app.post("/tarefas", (req, res) => {
    // TODO
    res.status(501).send({ erro: "TODO: implementar POST /tarefas" });
});

// Exercício 3 - Devolva uma tarefa pelo id.
// Responda 404 quando a tarefa não existir.
app.get("/tarefas/:id", (req, res) => {
    // TODO
    res.status(501).send({ erro: "TODO: implementar GET /tarefas/:id" });
});

app.listen(PORTA, () => {
    console.log(`Lista 4 em execução na porta ${PORTA}.`);
    console.log(`Teste inicial: http://localhost:${PORTA}/tarefas`);
});
