// Funções em Javascript: declarações, expressões e arrow functions
// Execute com: node script7.js

console.log("=== Funções declaradas com function ===");

function hello() {
    console.log("Oi");
}

hello();

function helloComNome(nome) {
    console.log("Hello, " + nome);
}

helloComNome("Pedro");

function soma(a, b) {
    return a + b;
}

const resultadoSoma = soma(2, 3);
console.log("2 + 3 =", resultadoSoma);

console.log("\n=== Funções anônimas armazenadas em constantes ===");

const dobro = function (n) {
    return n * 2;
};

console.log("Dobro de 4:", dobro(4));

const triplo = function (n = 5) {
    return 3 * n;
};

console.log("Triplo do valor padrão:", triplo());
console.log("Triplo de 10:", triplo(10));

console.log("\n=== Arrow functions ===");

const saudacao = () => console.log("Hello");
saudacao();

const quadrado = (valor) => valor * valor;
console.log("Quadrado de 6:", quadrado(6));

const cubo = (valor) => {
    return valor * valor * valor;
};
console.log("Cubo de 3:", cubo(3));

console.log("\n=== Cuidado com chaves e return ===");

const ehParSemReturn = (n) => {
    n % 2 === 0;
};

const ehPar = (n) => n % 2 === 0;

console.log("ehParSemReturn(10):", ehParSemReturn(10));
console.log("ehPar(10):", ehPar(10));
