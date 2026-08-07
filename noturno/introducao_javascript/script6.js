// Métodos de vetores: filter, map, every e reduce
// Execute com: node script6.js

const nomes = ["Ana Maria", "Antonio", "Rodrigo", "Alex", "Cristina"];

console.log("=== filter: seleciona elementos ===");
const apenasComA = nomes.filter((nome) => nome.startsWith("A"));
console.log(apenasComA);

console.log("\n=== map: transforma cada elemento ===");
const iniciais = nomes.map((nome) => nome.charAt(0));
console.log(iniciais);

console.log("\n=== every: verifica uma condição para todos ===");
const todosComecamComA = nomes.every((nome) => nome.startsWith("A"));
console.log(todosComecamComA);

console.log("\n=== reduce: combina todos os elementos em um resultado ===");
const valores = [1, 2, 3, 4];
const soma = valores.reduce((acumulador, valor) => acumulador + valor, 0);
console.log("Soma:", soma);

console.log("\n=== Ligação com funções ===");
console.log(
    "As funções passadas a filter, map, every e reduce são chamadas de callbacks."
);
