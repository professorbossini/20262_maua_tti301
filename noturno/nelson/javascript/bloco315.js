/* 
 * Utilização da função assíncrona 'setTimeout' com atraso de 0 milissegundos.
 * Embora o tempo seja 0, a função passada como callback não é executada imediatamente.
 * Ela é enviada para a Fila de Mensagens (Message Queue / Task Queue) 
 * e só poderá rodar quando a pilha de execução (Call Stack) estiver totalmente vazia.
 */
setTimeout(function () {
  console.log('dentro da timeout', 0);
}, 0);

// Obtém o timestamp atual em milissegundos e adiciona 1000ms (1 segundo).
const a = new Date().getTime() + 1000;

/* 
 * Laço de espera ocupada (busy waiting) / bloqueio síncrono:
 * O thread principal do JavaScript fica travada executando este 'while' 
 * durante exatamente 1 segundo. 
 * Mesmo que o 'setTimeout' já tenha terminado seu tempo (0ms), 
 * o seu callback continua preso na fila aguardando a thread liberar.
 */
while (new Date().getTime() <= a);

// Quando o laço 'while' finalmente termina após 1 segundo, 
// a linha seguinte é executada de forma síncrona, exibindo esta mensagem primeiro.
console.log('fora da timeout');