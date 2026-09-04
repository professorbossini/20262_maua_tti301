// TTI301 - Aula prática 5 - Lembretes com observações via comunicação síncrona.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, seção 4.3.25,
//   páginas impressas 32-33 (aprox. páginas 36-37 do PDF).
// Relação: extensão didática baseada na Figura 4.3.9.
// O cliente faz uma única requisição ao serviço de lembretes; este serviço
// consulta o serviço de observações e devolve uma representação combinada.

const express = require("express");
const axios = require("axios");

const app = express();
const PORTA = 4000;
const URL_OBSERVACOES = "http://localhost:5000";

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

app.get("/lembretes-com-observacoes", async (req, res) => {
    const ids = Object.keys(lembretes);

    if (ids.length === 0) {
        return res.status(200).send({});
    }

    try {
        const respostaObservacoes = await axios.get(
            `${URL_OBSERVACOES}/observacoes`,
            {
                params: {
                    lembreteIds: ids.join(","),
                },
            }
        );

        const resultado = {};

        for (const [id, lembrete] of Object.entries(lembretes)) {
            resultado[id] = {
                ...lembrete,
                observacoes: respostaObservacoes.data[id] || [],
            };
        }

        res.status(200).send(resultado);
    } catch (erro) {
        res.status(503).send({
            erro: "Não foi possível consultar o serviço de observações.",
        });
    }
});

app.listen(PORTA, () => {
    console.log(`Serviço síncrono de lembretes ouvindo na porta ${PORTA}.`);
    console.log("Rota agregada: GET /lembretes-com-observacoes");
});
