// Declara uma arrow function chamada "hello" sem parâmetros e com uma única instrução no corpo.
// Como não há parâmetros, usa parênteses vazios "()". Como há apenas uma instrução, as chaves "{}" foram omitidas.
const hello = () => console.log("Hello");

// Chama a função "hello()", que imprime "Hello" no console.
hello();

// Declara uma arrow function chamada "dobro" que recebe um único parâmetro ("valor").
// Quando há apenas um parâmetro, os parênteses em volta dele também poderiam ser omitidos.
const dobro = (valor) => valor * 2;

// Chama a função "dobro" passando o número 10. Ela retorna implicitamente 10 * 2 (20) e o imprime no console.
console.log(dobro(10));

// Declara uma arrow function chamada "triplo" que recebe um parâmetro ("valor").
// Aqui foram utilizadas chaves "{}" no corpo da função. Quando usamos chaves, o uso do "return" torna-se obrigatório.
const triplo = (valor) => {
return valor * 3;
};

// Chama a função "triplo" passando o número 10. Ela executa o cálculo (3 * 10 = 30) e o imprime no console.
console.log(triplo(10));

// E agora? Vamos analisar esta última função:
 const ehPar = (n) => {
 // ATENÇÃO: Aqui está a pegadinha clássica das arrow functions! 
 // Quando abrimos chaves "{}" em uma arrow function, o JavaScript espera que você utilize explicitamente a palavra "return" se quiser devolver algum valor.
 // Como o "return" foi omitido e há apenas uma expressão avaliando a paridade ("n % 2 === 0"), 
 // a função processa a verificação, mas não retorna nada para fora (retorna implicitamente "undefined").
 n % 2 === 0;
 };

// Chama a função "ehPar" passando o número 10. Como a função não retorna explicitamente nenhum valor, 
// o console exibirá "undefined" na tela, e não "true" como seria intuitivo de se esperar.
 console.log(ehPar(10));