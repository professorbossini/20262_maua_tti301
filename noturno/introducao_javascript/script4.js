// Continuação da introdução a Javascript: comparação
// Execute com: node script4.js

console.log("=== Comparação com == e === ===");

console.log('1 == 1:', 1 == 1);
console.log('1 == "1":', 1 == "1");
console.log('1 === 1:', 1 === 1);
console.log('1 === "1":', 1 === "1");

console.log("\n=== Alguns resultados contraintuitivos de == ===");

console.log("true == 1:", true == 1);
console.log("null == undefined:", null == undefined);
console.log("[] == false:", [] == false);
console.log("[] == []:", [] == []);

console.log("\n=== Comparação de desigualdade ===");

console.log('1 != "1":', 1 != "1");
console.log('1 !== "1":', 1 !== "1");

console.log("\nRegra prática: prefira === e !== para evitar coerções implícitas.");
