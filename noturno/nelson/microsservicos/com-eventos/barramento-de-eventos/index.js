// Importa o framework Express para criação e gerenciamento das rotas do servidor
const express = require('express');

// Importa o middleware body-parser para converter o corpo das requisições recebidas em objetos JSON
const bodyParser = require('body-parser');

// Importa a biblioteca Axios para realizar requisições HTTP (envio de eventos) para outros serviços
const axios = require('axios');

// Inicializa a aplicação Express criando a instância do servidor
const app = express();

// Configura o servidor para aceitar e interpretar requisições com formato JSON
app.use(bodyParser.json());

const eventos = []

// Define a rota POST '/eventos' responsável por receber um evento e repassá-lo para os demais microsserviços
app.post('/eventos', (req, res) => {

    const evento = req.body;

    eventos.push(evento);

    axios.post('http://localhost:4000/eventos', evento)
        .catch(err => {
            console.log("Serviço Lembretes indisponível");
        });

    axios.post('http://localhost:5000/eventos', evento)
        .catch(err => {
            console.log("Serviço Observações indisponível");
        });

    axios.post('http://localhost:6000/eventos', evento)
        .catch(err => {
            console.log("Serviço Consultas indisponível");
        });

    axios.post('http://localhost:7000/eventos', evento)
        .catch(err => {
            console.log("Serviço Classificação indisponível");
        });

    res.status(200).send({ msg: "ok" });
});

app.get('/eventos', (req, res) => {
    res.send(eventos)
})


// Inicializa o servidor para escutar requisições ativamente na porta 10000
app.listen(10000, () => {
    // Exibe no console a confirmação de que o Barramento de Eventos está em execução
    console.log('Barramento de eventos. Porta 10000.');
});