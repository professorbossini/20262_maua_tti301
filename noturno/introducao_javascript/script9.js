// Closures: função interna + variáveis do escopo externo
// Execute com: node script9.js

console.log("=== Escopo léxico ===");

function externa() {
    const nome = "João";

    function interna() {
        console.log("Nome acessado pela função interna:", nome);
    }

    interna();
}

externa();

console.log("\n=== Closure criado por uma fábrica de saudações ===");

function saudacoesFactory(saudacao, nome) {
    return function () {
        console.log(saudacao + ", " + nome);
    };
}

const olaJoao = saudacoesFactory("Olá", "João");
const tchauJoao = saudacoesFactory("Tchau", "João");

olaJoao();
tchauJoao();

console.log("\n=== Outro closure: fábrica de multiplicadores ===");

function criarMultiplicador(fator) {
    return function (numero) {
        return numero * fator;
    };
}

const triplicar = criarMultiplicador(3);
const multiplicarPorDez = criarMultiplicador(10);

console.log("3 x 7 =", triplicar(7));
console.log("10 x 4 =", multiplicarPorDez(4));

console.log("\n=== O closure mantém referência à variável externa ===");

function eAgora() {
    let contador = 1;

    function f1() {
        console.log("f1:", contador);
    }

    contador++;

    function f2() {
        console.log("f2:", contador);
    }

    return { f1, f2 };
}

const funcoes = eAgora();
funcoes.f1();
funcoes.f2();
