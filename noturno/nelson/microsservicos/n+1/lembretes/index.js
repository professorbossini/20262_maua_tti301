// Importa o módulo 'express', framework responsável por criar e gerenciar o servidor HTTP e as rotas
const express = require ('express');

// Importa o middleware 'body-parser', utilizado para processar os dados enviados no corpo das requisições HTTP
const bodyParser = require('body-parser');

// Instancia a aplicação do Express, criando o objeto 'app' que gerencia todo o servidor
const app = express();

// Configura o middleware body-parser para converter o corpo das requisições em objetos JSON acessíveis via req.body
app.use(bodyParser.json());

// Declara o objeto em memória 'lembretes', que funcionará como base de dados para guardar todos os registros
const lembretes = {};

// Registra novamente um parser de JSON nativo do Express (redundante, pois o bodyParser.json() já cumpre esse papel)
app.use(express.json());

// Declara a variável global 'contador', utilizada para gerar a chave/ID incremental de cada lembrete
contador = 0;

// Mapeia a rota do tipo GET na URL '/lembretes' para consultar a lista completa
app.get ('/lembretes', (req, res) => {
    // Retorna o objeto completo 'lembretes' contendo todos os itens cadastrados até o momento
    res.send(lembretes);
});

// Mapeia a rota do tipo PUT na URL '/lembretes' para cadastrar um novo registro
app.put('/lembretes', (req, res) => {
    // Incrementa a variável 'contador' em 1 unidade para gerar um novo ID único
    contador++;

    // Desestrutura o objeto 'req.body' para extrair apenas a propriedade 'texto' enviada na requisição
    const { texto } = req.body;

    // Associa ao objeto 'lembretes', na chave do contador atual, um novo objeto contendo o ID e o texto recebido
    lembretes[contador] = {
        contador, texto
    }

    // Retorna a resposta HTTP com status 201 (Created) e devolve no corpo da resposta o lembrete recém-criado
    res.status(201).send(lembretes[contador]);
});

// Inicializa a escuta de requisições do servidor na porta 4000
app.listen(4000, () => {
    // Exibe no console uma mensagem indicando que o serviço está ativo e operando na porta 4000
    console.log('Lembretes. Porta 4000');
});