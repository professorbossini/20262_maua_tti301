// Declara uma função anônima armazenada na constante "dobro", que recebe um parâmetro "n".
const dobro = function (n) {
  // Retorna o valor de "n" multiplicado por 2.
  return n * 2;
};

// Chama a função "dobro" passando o número 4 como argumento e armazena o resultado (8) na constante "res".
const res = dobro(4);

// Exibe o valor de "res" (que é 8) no console.
console.log(res);

// Declara outra função anônima armazenada na constante "triplo".
// Aqui definimos um valor padrão ("default parameter") de 5 para o parâmetro "n".
const triplo = function (n = 5) {
  // Retorna o triplo do valor de "n".
  return 3 * n;
};

// Chama a função "triplo()" sem passar nenhum argumento. 
// Como nenhum argumento foi fornecido, o parâmetro "n" assume automaticamente o valor padrão 5, retornando 15.
 console.log(triplo());

// Chama a função "triplo" passando o número 10 como argumento. 
// Como o argumento foi fornecido, o valor padrão é ignorado e o cálculo usa 10, retornando 30.
 console.log(triplo(10));