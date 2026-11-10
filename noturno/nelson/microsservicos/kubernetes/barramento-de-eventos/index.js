
/**
 * ======================================================
 * BARRAMENTO DE EVENTOS - MICROSSERVIÇOS
 * ======================================================
 *
 * Responsabilidades:
 * 1. Receber eventos dos microsserviços.
 * 2. Armazenar os eventos temporariamente em memória.
 * 3. Encaminhar eventos para TODOS os microsserviços.
 * 4. Tratar falhas de comunicação sem encerrar o servidor.
 *
 * Ambiente: Kubernetes - Docker Desktop
 * Porta: 10000
 */

// Importa o Express para criar o servidor HTTP.
const express = require('express');

// Importa o Axios para realizar requisições HTTP.
const axios = require('axios');

// Inicializa a aplicação Express.
const app = express();

// Configura a interpretação de requisições JSON.
// ALTERAÇÃO: antes era usado o pacote 'body-parser', que NÃO
// está declarado no package.json (só funcionava porque o
// Express 5 o instala como dependência interna).
// O express.json() é nativo e faz exatamente o mesmo papel.
app.use(express.json());

// Armazena os eventos recebidos em memória.
// Os eventos serão perdidos caso o Pod seja reiniciado.
const eventos = [];

// ======================================================
// CONFIGURAÇÃO DOS ENDEREÇOS DOS MICROSSERVIÇOS
// ======================================================

// ALTERAÇÃO: em vez de uma constante e um bloco axios.post
// para cada serviço, usamos uma LISTA. Para incluir um novo
// microsserviço basta acrescentar uma linha aqui.
//
// Cada endereço usa o NOME DO SERVICE ClusterIP do Kubernetes.
// O DNS interno do cluster (CoreDNS) traduz esse nome para o
// IP do Service, que repassa a requisição a um Pod disponível.
//
// Os nomes seguem o padrão já usado em Lembretes:
//   <microsservico>-clusterip-service
const SERVICOS = [
    {
        nome: 'Lembretes',
        url: 'http://lembretes-clusterip-service:4000/eventos'
    },
    {
        nome: 'Observações',
        url: 'http://observacoes-clusterip-service:5000/eventos'
    },
    {
        nome: 'Consultas',
        url: 'http://consultas-clusterip-service:6000/eventos'
    },
    {
        nome: 'Classificação',
        url: 'http://classificacao-clusterip-service:7000/eventos'
    }
];

// ======================================================
// ROTA POST /eventos
// Recebe e distribui eventos para os microsserviços.
// ======================================================

app.post('/eventos', (req, res) => {

    // Recupera o evento recebido no corpo da requisição.
    const evento = req.body;

    // Registra o evento no console para acompanhamento.
    console.log('Evento recebido:', evento);

    // Armazena o evento na memória do barramento.
    eventos.push(evento);

    // --------------------------------------------------
    // ENVIO PARA TODOS OS MICROSSERVIÇOS
    // --------------------------------------------------

    // Percorre a lista e envia o evento para cada Service.
    // Cada envio é independente: se um serviço estiver fora
    // do ar, os outros continuam recebendo normalmente.
    SERVICOS.forEach(servico => {

        axios.post(servico.url, evento, {
            // Tempo máximo de espera pela resposta (5 s).
            timeout: 5000
        })
        .then(() => {

            // Executado quando o serviço responde com
            // um código HTTP de sucesso.
            console.log(
                `Evento ${evento.tipo} enviado para ${servico.nome}.`
            );

        })
        .catch(err => {

            // Captura erros de comunicação ou respostas
            // HTTP de erro, sem derrubar o barramento.
            console.error(
                `Erro ao enviar evento para ${servico.nome}:`,
                err.message
            );

        });

    });

    // Confirma que o Barramento recebeu o evento.
    // O encaminhamento acontece de forma assíncrona.
    // Portanto, a resposta não garante que o evento
    // tenha sido entregue aos demais microsserviços.
    res.status(200).json({
        msg: 'ok'
    });

});

// ======================================================
// ROTA GET /eventos
// Consulta os eventos armazenados no Barramento.
// Usada pelo microsserviço de Consultas para recuperar
// o histórico quando ele (re)inicia.
// ======================================================

app.get('/eventos', (req, res) => {

    // Retorna todos os eventos recebidos até o momento.
    res.status(200).json(eventos);

});

// ======================================================
// INICIALIZAÇÃO DO SERVIDOR
// ======================================================

// Porta na qual o Barramento receberá requisições.
const PORTA = 10000;

// 0.0.0.0 permite que o servidor receba conexões
// pelas interfaces de rede do contêiner.
app.listen(PORTA, '0.0.0.0', () => {

    console.log('===================================');
    console.log('Barramento de Eventos iniciado.');
    console.log(`Porta: ${PORTA}`);
    console.log('Ambiente: Kubernetes - Docker Desktop');
    console.log('===================================');

});
