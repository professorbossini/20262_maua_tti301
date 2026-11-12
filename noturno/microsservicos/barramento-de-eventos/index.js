const express = require('express');

const app = express();
const axios = require('axios');

app.use(express.json());
PORTA = 10000;

const eventos = []

app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento);

    axios.post('http://lembretes-service:4000/eventos', evento);
    axios.post('http://observacoes-service:5000/eventos', evento);
    axios.post('http://consulta-service:6000/eventos', evento);
    axios.post('http://classificacao-service:7000/eventos', evento);
    console.log('Evento recebido:', evento.tipo);
    res.status(200).send({ msg: 'ok' });
});

app.get('/eventos', (req, res) => {
    res.send(eventos);
});

app.listen(PORTA, () => {
    console.log(`Barramento de eventos ouvindo na porta ${PORTA}.`);
});

