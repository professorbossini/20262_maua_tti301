// Declaração da função 'demorada' que simula uma operação síncrona custosa (blocking).
function demorada() {
  // Obtém o timestamp atual em milissegundos e adiciona 2000ms (2 segundos).
  const atualMais2Segundos = new Date().getTime() + 2000;
  
  // Laço de espera ocupada (busy waiting): trava a thread principal por 2 segundos.
  // Nota didática: o ponto e vírgula no final do while indica um corpo vazio.
  while (new Date().getTime() <= atualMais2Segundos);
  
  // Declara a constante 'd' com o resultado da soma.
  const d = 8 + 4;
  
  // Retorna o valor calculado (12).
  return d;
}

// Declaração da constante 'a' com o resultado de 2 + 3 (5).
const a = 2 + 3;

// Declaração da constante 'b' com o resultado de 5 + 9 (14).
const b = 5 + 9;

// Chamada da função 'demorada'. Como a execução é estritamente síncrona (bloqueante),
// a thread principal aguardará 2 segundos travada aqui antes de prosseguir.
const d = demorada();

/* 
 * Comentário explicativo presente no código:
 * O valor da constante 'e' depende apenas de 'a' e 'b', 
 * e não do valor retornado pela função 'demorada' (ou da variável 'd' gerada lá fora).
 * Contudo, devido à natureza síncrona e bloqueante do JavaScript comum, 
 * esta linha só é alcançada após o término da espera de 2 segundos.
 */
const e = 2 + a + b;

// Exibição do resultado final da soma (2 + 5 + 14 = 21) no console.
console.log(e);