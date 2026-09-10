const express = require('express');

const app = express();
const axios = require('axios');

app.use(express.json());
PORTA = 10000;

app.post('/eventos', (req, res) => {
    const evento = req.body;

    axios.post('http://localhost:4000/eventos', evento);
    axios.post('http://localhost:5000/eventos', evento);
    console.log('Evento recebido:', evento.tipo);
    res.status(200).send({ msg: 'ok' });
});

app.listen(PORTA, () => {
    console.log(`Barramento de eventos ouvindo na porta ${PORTA}.`);
});

