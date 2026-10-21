const express = require('express');
const app = express();
app.use(express.json());

const palavraChave = 'importante';

const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status = observacao.texto.includes(palavraChave) ? 'importante' : 'comum';
        // Para comunicação entre hosts no docker, use o host.docker.internal. Para comunicação entre containers, use o nome do container.
        // axios.post('http://host.docker.internal:10000/eventos', { //resulta em promise
        axios.post('http://host.docker.internal:10000/eventos', {
            tipo: 'ObservacaoClassificada',
            dados: observacao
        });
    },
};


app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);

    } catch (e) {
    }
    res.status(200).send({ msg: "ok" });

});


app.listen(7000, () => {
    console.log('Servidor de classificação ouvindo na porta 7000.');
});