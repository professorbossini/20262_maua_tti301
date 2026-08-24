// Cria uma constante chamada "nomes" contendo um vetor (array) com cinco strings de nomes de pessoas.
const nomes = ["Ana Maria", "Antonio", "Rodrigo", "Alex", "Cristina"];

// O método "filter" percorre cada elemento do vetor original ("nomes") aplicando uma condição.
// A arrow function "(n) => n.startsWith("A")" verifica se o nome (representado por "n") começa com a letra "A".
// Se a condição for verdadeira, o elemento é mantido; caso contrário, é descartado, gerando um novo vetor.
const apenasComA = nomes.filter((n) => n.startsWith("A"));

// Exibe no console o resultado do filtro, contendo apenas os nomes que começam com "A".
console.log(apenasComA);

// O método "map" percorre todos os elementos do vetor original e transforma cada um deles com base na regra fornecida.
// A função "(nome) => nome.charAt(0)" extrai apenas o primeiro caractere (índice 0) de cada nome.
const res = nomes.map((nome) => nome.charAt(0));

// Exibe no console o novo vetor gerado pelo map, contendo apenas as iniciais de cada nome.
console.log(res);

// O método "every" testa se TODOS os elementos do vetor passam na condição estipulada.
// Verifica se todos os nomes começam com a letra "A". Como há nomes que começam com outras letras, o resultado será falso.
const todosComecamComA = nomes.every((n) => n.startsWith("A"));

// Exibe no console o valor booleano resultante da validação (false).
console.log(todosComecamComA);

// Cria uma constante chamada "valores" contendo um vetor com quatro números inteiros.
const valores = [1, 2, 3, 4];

// O método "reduce" reduz todos os elementos de um vetor a um único valor acumulado.
// "ac" representa o acumulador (o total que vai sendo somado) e "v" representa o valor atual do vetor.
// Os números são somados sequencialmente (1+2=3, 3+3=6, 6+4=10).
const soma = valores.reduce((ac, v) => ac + v);

// Exibe no console o valor final da soma acumulada.
console.log(soma);