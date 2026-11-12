const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');

const PORTA = 6000;

const baseConsulta = {};

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
        const observacoes =
            baseConsulta[observacao.lembreteId]["observacoes"];
        const indice = observacoes.findIndex((o) => o.id ===
            observacao.id);
        observacoes[indice] = observacao;
    }
};


app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err) { }
    res.status(200).send({ msg: "ok" });
});


// No Kubernetes não há ordem garantida de subida dos pods. Se a consulta subir antes do
// barramento, o axios.get rejeita, o processo cai (nodemon: "app crashed") e o pod continua
// Running sem funcionar — o Kubernetes não o reinicia, pois o contêiner não terminou.
// Por isso a recuperação inicial dos eventos usa o Service ClusterIP do barramento e tenta de novo.
const sincronizarComBarramento = async (tentativa = 1) => {
    const maxTentativas = 20;
    try {
        // const resp = await axios.get("http://localhost:10000/eventos"); // versão anterior
        const resp = await
            axios.get("http://barramento-de-eventos-service:10000/eventos");
        //axios entrega os dados na propriedade data
        resp.data.forEach((valor, indice, colecao) => {
            try {
                funcoes[valor.tipo](valor.dados);
            } catch (err) { }
        });
        console.log(`Consulta sincronizada com o barramento: ${resp.data.length} evento(s).`);
    } catch (err) {
        console.log(`Barramento indisponível (tentativa ${tentativa}/${maxTentativas}): ${err.message}`);
        if (tentativa < maxTentativas)
            setTimeout(() => sincronizarComBarramento(tentativa + 1), 3000);
    }
};



app.listen(PORTA, async () => {
    console.log(`Servidor de consulta ouvindo na porta ${PORTA}.`);
    await sincronizarComBarramento();
});
