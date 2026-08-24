// Declaração da função 'calculoRapidinho' que recebe um parâmetro numérico.
function calculoRapidinho(numero) {
  // Retorna imediatamente uma Promise já resolvida (fulfilled) 
  // utilizando a fórmula de soma de PA (Progressão Aritmética).
  return Promise.resolve((numero * (numero + 1)) / 2);
}

// Executa a função passando o argumento 10.
// Utiliza o método '.then()' para capturar o resultado resolvido.
calculoRapidinho(10).then(resultado => {
  // Exibe no console o resultado obtido (55).
  // Nota sobre o Event Loop: embora a Promise já esteja resolvida, 
  // o '.then()' é executado de forma assíncrona (na microtask queue).
  console.log(resultado);
});

/* 
 * Comentário explicativo presente no código original:
 * Esta instrução síncrona é executada primeiro, 
 * mesmo que a Promise já esteja resolvida (fulfilled), 
 * pois as microtasks do ecossistema de Promises aguardam a pilha de execução (call stack) esvaziar.
 */
console.log('Esperando...');