v1 = [];
v1[0] = "teste";
v1[40] = 90;
v1[18] = 8.91;
console.log(v1.length)
v2 = [83, 6.34, "teste", false]
console.log(v2)
console.log(v2[1])
console.log(v1)

const nomes = ["Ana", "Antonio", "Márcia", "Joana", "Alex"];
const apenasComA = nomes.filter((n) => n.startsWith("A"));
console.log(apenasComA);
const resultado = nomes.map((nom) => nom.charAt(0));
console.log(resultado);
const todosComA = nomes.every((n) => n.startsWith("A"));
console.log(todosComA);
const valores = [1,2,3,4];
const soma = valores.reduce((ac,v) => ac + v);
console.log(soma);