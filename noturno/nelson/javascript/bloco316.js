// Declaração da função 'demorada', que recebe um parâmetro 'tempo' em milissegundos.
function demorada(tempo) {
  // Exibe no console qual operação demorada está sendo iniciada, utilizando template literal.
  console.log(`demorada ${tempo}`);
  
  // Calcula o timestamp futuro adicionando o tempo informado ao momento atual.
  const atualMaisTempo = new Date().getTime() + tempo;
  
  // Laço de espera ocupada (busy waiting) que bloqueia a thread pelo tempo estipulado.
  // O ponto e vírgula no final indica que o bloco do while é vazio.
  while (new Date().getTime() <= atualMaisTempo);
  
  // Declara uma constante 'd' com o valor da soma (8 + 4 = 12).
  const d = 8 + 4;
  
  // Retorna o valor calculado.
  return d;
}

/* 
 * Agendamento da primeira tarefa assíncrona via setTimeout:
 * Configurada para executar após 2000ms (2 segundos).
 */
setTimeout(function () {
  demorada(2000);
}, 2000);

/* 
 * Agendamento da segunda tarefa assíncrona via setTimeout:
 * Configurada para executar após 1000ms (1 segundo).
 */
setTimeout(function () {
  demorada(1000);
}, 1000);

// Execução síncrona imediata: esta linha roda assim que o script principal é lido,
// antes que qualquer um dos timers do setTimeout expire.
console.log("chegou ao fim do script principal");