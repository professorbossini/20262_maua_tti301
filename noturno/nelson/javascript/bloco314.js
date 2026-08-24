// Declaração da função 'demorada' que simula uma operação síncrona custosa (bloqueante).
function demorada() {
  // Obtém o timestamp atual em milissegundos e adiciona 2000ms (2 segundos).
  const atualMais2Segundos = new Date().getTime() + 2000;
  
  // Laço de espera ocupada (busy waiting): trava a thread por 2 segundos.
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

/* 
 * Utilização da função assíncrona 'setTimeout':
 * Agenda a execução da função anônima para depois de, pelo menos, 500 milissegundos.
 * Como o JavaScript utiliza um modelo assíncrono baseado em eventos (Event Loop),
 * essa função é colocada na fila de callbacks e o código abaixo continua rodando imediatamente.
 */
setTimeout(function () {
  // Quando o tempo expirar e a thread estiver livre, esta função será executada.
  // Ela chama 'demorada()', que por sua vez vai travar a thread por mais 2 segundos.
  const d = demorada();
  console.log(d);
}, 500);

/* 
 * Enquanto o timer do setTimeout está contando no fundo,
 * estas linhas prosseguem executando de forma síncrona e imediata,
 * sem ficar esperando o tempo acabar.
 */
const e = a + b;

// Exibe o valor de 'e' (5 + 14 = 19) no console imediatamente antes da tarefa assíncrona terminar.
console.log(e);