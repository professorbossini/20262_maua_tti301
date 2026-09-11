// TTI301 - Aula 06 - Contrato dos eventos e validação de entrada.
// Bossini: 01_apostila_microsservicos.pdf, 4.3.29-4.3.47, pp. 38-60.
// Adaptação: acrescentamos id do evento e versão do recurso para deduplicação.
// O tipo LembreteCriado conserva dados.contador, como no snapshot da main.

function textoValido(texto) {
    return typeof texto === "string" && texto.trim().length > 0;
}

function objetoValido(valor) {
    return valor !== null && typeof valor === "object" && !Array.isArray(valor);
}

function validarEvento(evento) {
    if (!objetoValido(evento) || !textoValido(evento.id) ||
        !textoValido(evento.tipo) || !objetoValido(evento.dados)) {
        return "Envie um objeto com id, tipo e dados.";
    }
    const dados = evento.dados;
    if (evento.tipo === "LembreteCriado") {
        if (!Number.isInteger(dados.contador) || dados.contador < 1 ||
            !textoValido(dados.texto)) {
            return "LembreteCriado exige contador inteiro positivo e texto.";
        }
    }
    const tiposDeObservacao = [
        "ObservacaoCriada", "ObservacaoClassificada", "ObservacaoAtualizada"
    ];
    if (tiposDeObservacao.includes(evento.tipo)) {
        if (!textoValido(dados.id) || !textoValido(dados.lembreteId) ||
            !textoValido(dados.texto) || !Number.isInteger(dados.versao) ||
            dados.versao < 1) {
            return "Observação exige id, lembreteId, texto e versão positiva.";
        }
        if (!["aguardando", "importante", "comum"].includes(dados.status)) {
            return "Status de observação inválido.";
        }
    }
    return null;
}

module.exports = { textoValido, validarEvento };
