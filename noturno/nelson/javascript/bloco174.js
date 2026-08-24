// A função 'eAgora' é declarada. Ela gerencia o estado encapsulado da variável 'cont'.
function eAgora() {
  let cont = 1;

  // Primeira função interna que referencia a variável 'cont'.
  function f1() {
    console.log(cont);
  }

  // A variável 'cont' é incrementada de 1 para 2 antes de 'f2' ser declarada.
  cont++;

  // Segunda função interna que também referencia a variável 'cont'.
  function f2() {
    console.log(cont);
  }

  // Retorna um objeto contendo as duas funções (Shorthand Property Names do ES6).
  // Ambas as funções compartilham a mesma closure sobre o escopo de 'eAgora'.
  return { f1, f2 };
}

// A função 'eAgora' é executada e o objeto retornado é armazenado em 'eAgoraResult'.
let eAgoraResult = eAgora();

/* 
 * Conceito de Closure Compartilhada e Estado Mutável:
 * Neste momento, a função 'eAgora' já executou por completo e a variável 'cont' 
 * foi incrementada para 2. Como tanto 'f1' quanto 'f2' fecham sobre o mesmo 
 * ambiente léxico (lexical environment), ambas enxergam o valor atualizado de 'cont'.
 * Portanto, ambas exibirão 2 no console.
 */
eAgoraResult.f1();
eAgoraResult.f2();