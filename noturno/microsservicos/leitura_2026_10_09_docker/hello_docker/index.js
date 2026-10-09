// TTI301 — 09/10/2026 — Primeiro exemplo Docker.
// Bossini: 01_apostila_microsservicos.pdf, seção 4.3.56,
// Bloco 4.3.34, p. impressa 78 (p. 82 do PDF fornecido).
// Adaptação: cabeçalho e formatação; rota e resposta preservadas.
const express = require("express");
const app = express();
app.use(express.json());

app.get("/hey-docker", (req, res) => {
    res.status(200).json({
        mensagem: "Hey, Docker!!",
    });
});

app.listen(5200, () => {
    console.log("up and running inside docker");
});
