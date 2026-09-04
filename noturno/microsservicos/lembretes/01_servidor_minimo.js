// TTI301 - Aula prática 4 - Primeiro servidor Express.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, início da construção da aplicação,
//   aprox. pp. 17-19.
// - 01_apostila_nodejs_introducao_e_instalacao.pdf, Node.js e npm,
//   aprox. pp. 1-3.
// Relação: adaptação didática. A rota /saude isola servidor, porta,
// requisição e resposta antes das rotas de negócio.

const express = require("express");

const app = express();
const PORTA = 4000;

app.get("/saude", (req, res) => {
    res.status(200).send({
        status: "ok",
        servico: "lembretes",
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor de lembretes ouvindo na porta ${PORTA}.`);
    console.log(`Teste: http://localhost:${PORTA}/saude`);
});
