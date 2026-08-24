var linguagem = "Javascript";
console.log("Aprendendo " + linguagem);
//nome pode ser redeclarada
var linguagem = "Java";
console.log("Aprendendo, " + linguagem);

//escopo não restrito a bloco
var idade = 18;
//exibe undefined. Ou seja, a variável já existe aqui, só não teve valor atribuído.
//Ela é içada - do inglês hoist - para fora do bloco if
console.log(`Oi, ${nome}`);
if (idade >= 18) {
var nome = "João";
console.log(`Parabéns, ${nome}. Você pode dirigir`);
}
//ainda existe aqui
console.log(`Até mais, ${nome}.`);