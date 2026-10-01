// TTI301 - Aula 06 - Script 22: repetir e inverter eventos sem abrir servidores.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.49-4.3.52.
// Páginas impressas 63-68; no leitor PDF, somar 4 à página impressa.
// Relação: extensão: experimento determinístico da projeção do Script 20.
// Estudo local: dados em memória; não é um broker de produção.


const { criarProjecao } = require("./20_projecao_idempotente");
const projecao = criarProjecao();
const lembrete = {
    id: "evt-lembrete", tipo: "LembreteCriado",
    dados: { contador: 1, texto: "Estudar eventos", concluido: false }
};
const criada = {
    id: "evt-criada", tipo: "ObservacaoCriada",
    dados: { id: "obs-1", lembreteId: "1", texto: "prazo importante",
        status: "aguardando", versao: 1 }
};
const atualizada = {
    id: "evt-atualizada", tipo: "ObservacaoAtualizada",
    dados: { ...criada.dados, status: "importante", versao: 2 }
};

console.log("1. Atualização antes do lembrete:", projecao.aplicar(atualizada));
console.log("Pendências:", projecao.resumo());
console.log("2. Chegada do lembrete:", projecao.aplicar(lembrete));
console.log("3. Criação antiga chega depois:", projecao.aplicar(criada));
console.log("4. Mesma atualização chega novamente:", projecao.aplicar(atualizada));
console.log("Estado final:", JSON.stringify(projecao.listar(), null, 2));
console.log("Esperado: 1 observação, importante, versão 2; sem pendências.");
