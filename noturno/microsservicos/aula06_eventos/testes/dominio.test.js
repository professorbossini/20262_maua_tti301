// Testes determinísticos: usam apenas módulos nativos do Node.
const test = require("node:test");
const assert = require("node:assert/strict");
const { criarProjecao } = require("../20_projecao_idempotente");
const { textoValido, validarEvento } = require("../apoio/contrato");
const lembrete = { id: "e1", tipo: "LembreteCriado", dados: { contador: 1, texto: "Estudar" } };
const criada = { id: "e2", tipo: "ObservacaoCriada", dados: {
    id: "o1", lembreteId: "1", texto: "importante", status: "aguardando", versao: 1
} };
const atualizada = { id: "e3", tipo: "ObservacaoAtualizada", dados: {
    ...criada.dados, status: "importante", versao: 2
} };

test("texto exige string não vazia", () => {
    assert.equal(textoValido("texto"), true);
    for (const valor of ["", "  ", null, undefined, 12, {}]) assert.equal(textoValido(valor), false);
});
test("validação exige envelope e contador", () => {
    assert.equal(validarEvento(lembrete), null);
    assert.ok(validarEvento({}));
    assert.ok(validarEvento({ ...lembrete, dados: { contador: "1", texto: "X" } }));
});
test("tipos não conhecidos podem circular sem execução de regra", () => {
    const p = criarProjecao();
    assert.equal(p.aplicar({ id: "x", tipo: "OutroEvento", dados: {} }), "ignorado");
    assert.equal(p.resumo().eventosAplicados, 0);
});
test("propriedade herdada não vira handler", () => {
    const p = criarProjecao();
    assert.equal(p.aplicar({ id: "x", tipo: "toString", dados: {} }), "ignorado");
});
test("mesmo evento aplicado duas vezes não duplica observação", () => {
    const p = criarProjecao(); p.aplicar(lembrete); p.aplicar(criada);
    assert.equal(p.aplicar(criada), "repetido");
    assert.equal(p.listar()[1].observacoes.length, 1);
});
test("replay completo é idempotente", () => {
    const p = criarProjecao();
    for (const e of [lembrete, criada, atualizada]) p.aplicar(e);
    const antes = JSON.stringify(p.listar());
    for (const e of [lembrete, criada, atualizada]) p.aplicar(e);
    assert.equal(JSON.stringify(p.listar()), antes);
});
test("evento antigo não regride versão", () => {
    const p = criarProjecao();
    for (const e of [lembrete, atualizada, criada]) p.aplicar(e);
    assert.equal(p.listar()[1].observacoes[0].status, "importante");
    assert.equal(p.listar()[1].observacoes[0].versao, 2);
});
test("observação antes do lembrete fica pendente e é anexada depois", () => {
    const p = criarProjecao(); p.aplicar(atualizada);
    assert.equal(p.resumo().lembretesComObservacoesPendentes, 1);
    p.aplicar(lembrete);
    assert.equal(p.resumo().lembretesComObservacoesPendentes, 0);
    assert.equal(p.listar()[1].observacoes.length, 1);
});
test("LembreteCriado repetido com outro id não apaga observações", () => {
    const p = criarProjecao();p.aplicar(lembrete);p.aplicar(criada);
    p.aplicar({ ...lembrete, id: "e4" });
    assert.equal(p.listar()[1].observacoes.length, 1);
});
test("mesma observação com outro id de evento continua única", () => {
    const p=criarProjecao();p.aplicar(lembrete);p.aplicar(criada);
    p.aplicar({ ...criada, id: "outro-evento" });
    assert.equal(p.listar()[1].observacoes.length, 1);
});
test("erro de contrato não marca evento como processado", () => {
    const p = criarProjecao();
    assert.throws(() => p.aplicar({ ...lembrete, dados: {} }));
    assert.equal(p.aplicar(lembrete), "aplicado");
});
test("todas as permutações convergem", () => {
    const ordens = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
    const eventos = [lembrete,criada,atualizada];
    for (const ordem of ordens) {
        const p = criarProjecao();
        for (const i of ordem) p.aplicar(eventos[i]);
        assert.equal(p.listar()[1].observacoes.length, 1);
        assert.equal(p.listar()[1].observacoes[0].status, "importante");
    }
});
