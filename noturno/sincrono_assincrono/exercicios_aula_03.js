// Exercícios da aula: assincronismo, callbacks, Promises e async/await
// Preencha os trechos marcados com TODO e execute com:
// node exercicios_aula_03.js

function esperar(tempoEmMs) {
    return new Promise((resolve) => setTimeout(resolve, tempoEmMs));
}

async function executarExercicios() {
    console.log("=== Exercício 1: callback com setTimeout ===");

    function executarDepois(mensagem, atraso, callback) {
        // Use setTimeout para chamar callback(mensagem) depois do atraso.
        // TODO: substitua a linha provisória abaixo.
        callback(undefined);
    }

    const resultado1 = await new Promise((resolve) => {
        executarDepois("Pronto", 20, resolve);
    });

    console.log("Esperado: Pronto | Obtido:", resultado1);

    console.log("\n=== Exercício 2: criar uma Promise ===");

    function somarDepois(a, b, atraso) {
        // Devolva uma Promise que resolva a + b depois do atraso.
        // TODO
        return Promise.resolve(undefined);
    }

    console.log("Esperado: 7 | Obtido:", await somarDepois(3, 4, 20));

    console.log("\n=== Exercício 3: resolve e reject ===");

    function validarIdade(idade) {
        // Resolva com "Permitido" quando idade >= 18.
        // Rejeite com "Idade insuficiente" nos demais casos.
        // TODO
        return Promise.resolve("TODO");
    }

    const maior = await validarIdade(20).catch((erro) => erro);
    const menor = await validarIdade(15).catch((erro) => erro);

    console.log("Esperado: Permitido | Obtido:", maior);
    console.log("Esperado: Idade insuficiente | Obtido:", menor);

    console.log("\n=== Exercício 4: encadeamento ===");

    function buscarProduto(id) {
        return Promise.resolve({ id: id, nome: "Teclado", preco: 200 });
    }

    function aplicarDesconto(produto) {
        // Devolva um novo objeto com precoFinal igual a 90% do preço.
        // TODO
        return produto;
    }

    const produtoComDesconto = await buscarProduto(1).then(aplicarDesconto);
    console.log("Esperado: 180 | Obtido:", produtoComDesconto.precoFinal);

    console.log("\n=== Exercício 5: função async ===");

    async function dobroAssincrono(numero) {
        // Devolva o dobro do número.
        // TODO
    }

    const promessaDobro = dobroAssincrono(6);
    console.log(
        "Esperado: true | Obtido:",
        promessaDobro instanceof Promise
    );
    console.log("Esperado: 12 | Obtido:", await promessaDobro);

    console.log("\n=== Exercício 6: await ===");

    function buscarUsuario() {
        return esperar(20).then(() => ({ nome: "Lia" }));
    }

    async function obterNomeUsuario() {
        // Aguarde buscarUsuario() e devolva apenas o nome.
        // TODO
    }

    console.log("Esperado: Lia | Obtido:", await obterNomeUsuario());

    console.log("\n=== Exercício 7: try/catch ===");

    function dividir(a, b) {
        return b === 0
            ? Promise.reject(new Error("Divisão por zero"))
            : Promise.resolve(a / b);
    }

    async function dividirComMensagem(a, b) {
        // Use try/catch. No sucesso, devolva o resultado.
        // No erro, devolva `Erro: ${erro.message}`.
        // TODO
    }

    console.log("Esperado: 5 | Obtido:", await dividirComMensagem(10, 2));
    console.log(
        "Esperado: Erro: Divisão por zero | Obtido:",
        await dividirComMensagem(10, 0)
    );

    console.log("\n=== Desafio: Promise.all ===");

    async function somarTresPromessas() {
        const p1 = esperar(30).then(() => 10);
        const p2 = esperar(10).then(() => 20);
        const p3 = esperar(20).then(() => 30);

        // Aguarde as três Promises com Promise.all e devolva a soma.
        // TODO
        return undefined;
    }

    console.log("Esperado: 60 | Obtido:", await somarTresPromessas());
}

executarExercicios();
