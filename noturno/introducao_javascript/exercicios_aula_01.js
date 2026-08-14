// Exercícios da aula: vetores, funções e closures
// Preencha os trechos marcados com TODO e execute com:
// node exercicios_aula_01.js

console.log("=== Exercício 1: arrow function ===");

// Crie uma arrow function que devolva base * altura.
const areaRetangulo = (base, altura) => base*altura;

console.log("Esperado: 20 | Obtido:", areaRetangulo(5, 4));

console.log("\n=== Exercício 2: filter ===");

function filtrarNomesLongos(nomes) {
    return nomes.filter((nome) => nome.length > 5);
    
}

const nomes = ["Fernanda", "Ana", "Beatriz", "Carlos", "Davi"];
console.log(
    'Esperado: ["Fernanda", "Beatriz", "Carlos"] | Obtido:',
    filtrarNomesLongos(nomes)
);

console.log("\n=== Exercício 3: map ===");

function formatarValores(valores) {
    return valores.map((valor) => `O valor é: ${valor}`);
    }

console.log(
    'Esperado: ["O valor é: 10", "O valor é: 20", "O valor é: 30"] | Obtido:',
    formatarValores([10, 20, 30])
);

console.log("\n=== Exercício 4: reduce ===");

function encontrarMaior(valores) {
    return valores.reduce(
        (maior,valor) => (valor > maior? valor : maior)
    );
}

console.log("Esperado: 89 | Obtido:", encontrarMaior([12, 45, 7, 89, 23]));

console.log("\n=== Exercício 5: return em arrow function ===");

const calcular = (x) => x * 3 + 1;

console.log("Esperado: 13 | Obtido:", calcular(4));

console.log("\n=== Exercício 6: função de alta ordem ===");

function executarDuasVezes(funcao) {
    funcao();
    funcao();
}

let quantidadeDeChamadas = 0;
executarDuasVezes(() => quantidadeDeChamadas++);
console.log("Esperado: 2 | Obtido:", quantidadeDeChamadas);

console.log("\n=== Exercício 7: closure ===");

function criarMultiplicador(fator) {
    return function(numero) {
        return numero * fator;
    }
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
