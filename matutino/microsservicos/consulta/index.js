const axios = require('axios')
const express = require('express');

const app = express();

app.use(express.json());

const baseConsulta = {};

//fazer os passos 6 e 7 que existe na figura para o classificação valendo aqui para o consulta
//ou seja, quando ele nasce, passa a funcionar, ele pede pela base inteira armazenada pelo barramento e trata cada evento recebido  om um mapa de funções tomando o cuidado de não lidar com eventos que não lhe interessam


const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete;
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"] || [];
        observacoes.push(observacao);
        baseConsulta[observacao.lembreteId]["observacoes"] = observacoes;
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"];
        const indice = observacoes.findIndex(o => o.id === observacao.id);
        observacoes[indice] = observacao;
    }
};


app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {

    try {
        funcoes[req.body.tipo](req.body.dados);

    } catch (e) {
    }
    res.status(200).send({ msg: "ok" });
});

app.listen(6000, async () => {
    console.log("Servidor de consulta ouvindo na porta 6000.");
    const eventos = await axios.get('http://localhost:10000/eventos')

    eventos.data.forEach((evento, indice, colecao) => {
        try{
            funcoes[evento.tipo](evento.dados)
        }
        catch(err){}    
    })
});



