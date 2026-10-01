// TTI301 - Aula 06 - Script 20: funções de projeção, duplicatas e ordem.
// Bossini: 01_apostila_microsservicos.pdf, seções 4.3.37, 4.3.46 e 4.3.49-4.3.52.
// Páginas impressas 46, 58-59 e 63-68; no leitor PDF, somar 4 à página impressa.
// Relação: extensão: Set, versões e pendências não são o exemplo literal da apostila.
// Estudo local: dados em memória; não é um broker de produção.


const { validarEvento } = require("./apoio/contrato");

function criarProjecao() {
    const base = Object.create(null);
    const pendentes = Object.create(null);
    const processados = new Set();

    function guardarObservacao(dados) {
        const chave = dados.lembreteId;
        const lembrete = base[chave];
        if (!lembrete && !pendentes[chave]) pendentes[chave] = [];
        const lista = lembrete ? lembrete.observacoes : pendentes[chave];
        const indice = lista.findIndex((item) => item.id === dados.id);
        if (indice < 0) {
            lista.push({ ...dados });
        } else if (dados.versao >= lista[indice].versao) {
            lista[indice] = { ...dados };
        }
    }

    const funcoes = {
        LembreteCriado: (dados) => {
            const chave = String(dados.contador);
            if (!base[chave]) {
                base[chave] = { ...dados, observacoes: pendentes[chave] || [] };
                delete pendentes[chave];
            }
        },
        ObservacaoCriada: guardarObservacao,
        ObservacaoAtualizada: guardarObservacao
    };

    function aplicar(evento) {
        const problema = validarEvento(evento);
        if (problema) throw new Error(problema);
        if (!Object.hasOwn(funcoes, evento.tipo)) return "ignorado";
        if (processados.has(evento.id)) return "repetido";
        funcoes[evento.tipo](evento.dados);
        processados.add(evento.id);
        return "aplicado";
    }

    function listar() {
        return base;
    }

    function resumo() {
        return {
            eventosAplicados: processados.size,
            lembretes: Object.keys(base).length,
            lembretesComObservacoesPendentes: Object.keys(pendentes).length
        };
    }

    return { aplicar, listar, resumo };
}

module.exports = { criarProjecao };
