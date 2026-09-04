// TTI301 - Aula prática 5 - Problema das n + 1 requisições.
// Onde estamos nas apostilas Bossini:
// - 01_apostila_microsservicos.pdf, cap. 4, seção 4.3.24,
//   páginas impressas 31-32 (aprox. páginas 35-36 do PDF).
// Relação: adaptação didática direta da Figura 4.3.8.
// Uma requisição busca os lembretes; depois, uma nova requisição é feita
// para buscar as observações de cada lembrete.

const axios = require("axios");

const URL_LEMBRETES = "http://localhost:4000";
const URL_OBSERVACOES = "http://localhost:5000";

async function montarPainel() {
    console.log("Requisição 1: obter a coleção de lembretes.");

    const respostaLembretes = await axios.get(`${URL_LEMBRETES}/lembretes`);
    const lembretes = Object.values(respostaLembretes.data);

    const painel = [];
    let numeroDaRequisicao = 1;

    for (const lembrete of lembretes) {
        numeroDaRequisicao++;
        console.log(
            `Requisição ${numeroDaRequisicao}: observações do lembrete ${lembrete.id}.`
        );

        const respostaObservacoes = await axios.get(
            `${URL_OBSERVACOES}/lembretes/${lembrete.id}/observacoes`
        );

        painel.push({
            ...lembrete,
            observacoes: respostaObservacoes.data,
        });
    }

    console.log(`Total de requisições: ${numeroDaRequisicao}.`);
    console.log(JSON.stringify(painel, null, 2));
}

montarPainel().catch((erro) => {
    console.error("Não foi possível montar o painel.");
    console.error("Confirme se os serviços das portas 4000 e 5000 estão ativos.");
    console.error(erro.message);
});
