// A função 'f' é declarada. Ela serve como escopo externo (enclosing scope).
function f() {
  // Declaração de uma variável local no escopo de 'f'.
  let nome = 'João';

  // A função 'g' é declarada dentro de 'f', tornando-se uma função aninhada.
  function g() {
    // 'g' acessa a variável 'nome' que pertence ao escopo da função pai ('f').
    // Isso demonstra o conceito de Escopo Léxico (Lexical Scope) e Closures.
    console.log(nome);
  }

  // A função interna 'g' é executada imediatamente dentro de 'f'.
  g();
}

// A função externa 'f' é chamada, dando início à execução do bloco.
f();