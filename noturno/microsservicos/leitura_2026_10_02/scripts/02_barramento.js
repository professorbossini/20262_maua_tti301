const express = require('express');

const app = express();
const axios = require('axios');

app.use(express.json());
PORTA = 10000;

const eventos = []

app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento);

    axios.post('http://localhost:4000/eventos', evento);
    axios.post('http://localhost:5000/eventos', evento);
    axios.post('http://localhost:6000/eventos', evento);
    axios.post('http://localhost:7000/eventos', evento);
    console.log('Evento recebido:', evento.tipo);
    res.status(200).send({ msg: 'ok' });
});

app.get('/eventos', (req, res) => {
    res.send(eventos);
});

app.listen(PORTA, () => {
    console.log(`Barramento de eventos ouvindo na porta ${PORTA}.`);
});


// Referência desta cópia de leitura - TTI301 - 02/10/2026.
// Fonte: noturno/microsservicos/barramento-de-eventos/index.js
// Snapshot: 29622331d71c03d1aac164f875709b63f2bf7d2a
// Apostila: 01_apostila_microsservicos.pdf.
// Seções e páginas aproximadas: 4.3.28, 4.3.38, 4.3.43 e 4.3.50; pp. impressas 36-38, 47, 55-56 e 66-67 (PDF 40-42, 51, 59-60 e 70-71).
// Relação: código do snapshot preservado; apenas este rodapé foi acrescentado.
