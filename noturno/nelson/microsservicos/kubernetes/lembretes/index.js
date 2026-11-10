// ======================================================
// MICROSSERVIÇO DE LEMBRETES - Porta 4000
// Cadastra lembretes e publica o evento "LembreteCriado"
// no Barramento de Eventos.
// ======================================================

// Importa o módulo 'express', framework responsável por criar e gerenciar o servidor HTTP e as rotas
const express = require('express');

// Importa o Axios, usado para enviar eventos ao Barramento
const axios = require("axios");

// Instancia a aplicação do Express, criando o objeto 'app' que gerencia todo o servidor
const app = express();

// Converte o corpo das requisições em objetos JSON acessíveis via req.body.
// ALTERAÇÃO: removido o 'body-parser' (não declarado no package.json e
// redundante). O express.json() nativo faz o mesmo trabalho.
app.use(express.json());

// Declara o objeto em memória 'lembretes', que funcionará como base de dados para guardar todos os registros
const lembretes = {};

// Variável utilizada para gerar a chave/ID incremental de cada lembrete.
// ALTERAÇÃO: declarada com 'let' (antes era uma variável global implícita).
let contador = 0;

// Endereço do Barramento de Eventos dentro do cluster.
// 'barramento-de-eventos-service' é o nome do Service ClusterIP
// definido em implantacao/kubernetes/barramento-de-eventos-deployment.yaml
const URL_BARRAMENTO = "http://barramento-de-eventos-service:10000/eventos";

// Recebe os eventos repassados pelo Barramento.
// Lembretes não reage a nenhum evento; apenas registra no log.
app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

// Mapeia a rota do tipo GET na URL '/lembretes' para consultar a lista completa
app.get('/lembretes', (req, res) => {
    // Retorna o objeto completo 'lembretes' contendo todos os itens cadastrados até o momento
    res.send(lembretes);
});

// Mapeia a rota do tipo PUT na URL '/lembretes' para cadastrar um novo registro
app.put("/lembretes", async (req, res) => {
    // Incrementa a variável 'contador' em 1 unidade para gerar um novo ID único
    contador++;

    // Desestrutura o objeto 'req.body' para extrair apenas a propriedade 'texto' enviada na requisição
    const { texto } = req.body;

    // Associa ao objeto 'lembretes', na chave do contador atual, um novo objeto contendo o ID e o texto recebido
    lembretes[contador] = {
        contador, texto
    };

    // Publica o evento LembreteCriado no Barramento.
    // ALTERAÇÃO: envolvido em try/catch. Antes, se o Barramento
    // estivesse fora do ar, a requisição retornava erro 500 mesmo
    // com o lembrete já salvo.
    try {
        await axios.post(URL_BARRAMENTO, {
            tipo: "LembreteCriado",
            dados: {
                contador,
                texto,
            },
        });
    } catch (err) {
        console.error("Erro ao enviar LembreteCriado ao Barramento:", err.message);
    }

    // Retorna a resposta HTTP com status 201 (Created) e devolve no corpo da resposta o lembrete recém-criado
    res.status(201).send(lembretes[contador]);
});

// Inicializa a escuta de requisições do servidor na porta 4000
app.listen(4000, () => {
    // Exibe no console uma mensagem indicando que o serviço está ativo e operando na porta 4000
    console.log('Lembretes. Porta 4000');
});
