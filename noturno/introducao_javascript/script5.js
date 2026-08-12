// Vetores em Javascript: criação, acesso, tamanho e iteração
// Execute com: node script5.js

console.log("=== Vetor criado vazio ===");

const v1 = [];

v1[0] = 3.4;
v1[10] = 2;
v1[2] = "abc";

console.log("v1:", v1);
console.log("Comprimento de v1:", v1.length);
console.log("v1[2]:", v1[2]);
console.log("v1[5]:", v1[5]);
console.log("v1[14]:", v1[14]);

console.log("\n=== Vetor inicializado na declaração ===");

const v2 = [2, "abc", true];
console.log("v2:", v2);

console.log("\n=== Iteração com for tradicional ===");

for (let i = 0; i < v2.length; i++) {
    console.log(`Índice ${i}:`, v2[i]);
}

console.log("\n=== Iteração com for...of ===");

for (const elemento of v2) {
    console.log("Elemento:", elemento);
}

console.log("\n=== const não torna o vetor imutável ===");

const linguagens = ["Javascript"];
linguagens.push("Python");
console.log("Depois de push:", linguagens);

// A referência não pode ser trocada por outra:
// linguagens = ["Java"]; // TypeError
