// Exercícios da aula: vetores, funções e closures
// Preencha os trechos marcados com TODO e execute com:
// node exercicios_aula_01.js

console.log("=== Exercício 1: arrow function ===");

// Crie uma arrow function que devolva base * altura.
const areaRetangulo = (base, altura) => {
    // TODO
};

console.log("Esperado: 20 | Obtido:", areaRetangulo(5, 4));

console.log("\n=== Exercício 2: filter ===");

function filtrarNomesLongos(nomes) {
    // Devolva somente os nomes com mais de 5 caracteres.
    // TODO
}

const nomes = ["Fernanda", "Ana", "Beatriz", "Carlos", "Davi"];
console.log(
    'Esperado: ["Fernanda", "Beatriz", "Carlos"] | Obtido:',
    filtrarNomesLongos(nomes)
);

console.log("\n=== Exercício 3: map ===");

function formatarValores(valores) {
    // Produza strings no formato "O valor é: X".
    // TODO
}

console.log(
    'Esperado: ["O valor é: 10", "O valor é: 20", "O valor é: 30"] | Obtido:',
    formatarValores([10, 20, 30])
);

console.log("\n=== Exercício 4: reduce ===");

function encontrarMaior(valores) {
    // Use reduce para devolver o maior valor.
    // TODO
}

console.log("Esperado: 89 | Obtido:", encontrarMaior([12, 45, 7, 89, 23]));

console.log("\n=== Exercício 5: return em arrow function ===");

const calcular = (x) => {
    // Corrija a função para devolver x * 3 + 1.
    x * 3 + 1;
};

console.log("Esperado: 13 | Obtido:", calcular(4));

console.log("\n=== Exercício 6: função de alta ordem ===");

function executarDuasVezes(funcao) {
    // Chame a função recebida duas vezes.
    // TODO
}

let quantidadeDeChamadas = 0;
executarDuasVezes(() => quantidadeDeChamadas++);
console.log("Esperado: 2 | Obtido:", quantidadeDeChamadas);

console.log("\n=== Exercício 7: closure ===");

function criarMultiplicador(fator) {
    // Devolva uma função que receba um número e multiplique pelo fator.
    // TODO
}

const vezesQuatro = criarMultiplicador(4);
console.log(
    "Esperado: 28 | Obtido:",
    typeof vezesQuatro === "function" ? vezesQuatro(7) : vezesQuatro
);

console.log("\n=== Desafio: preveja antes de executar ===");

function exemplo() {
    let valor = 100;

    function mostrar() {
        console.log("Valor exibido pelo closure:", valor);
    }

    valor = 200;
    return mostrar;
}

const fn = exemplo();
fn();
