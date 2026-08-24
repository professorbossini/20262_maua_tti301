function criadorDeSessao(limiteTentativas) {
  // Armazena o limite de tentativas no escopo léxico
  let tentativas = limiteTentativas;

  // Retorna a função validadora
  return function () {
    if (tentativas > 0) {
      tentativas--; // Decrementa a quantidade de tentativas restantes
      return `Acesso permitido. Tentativas restantes: ${tentativas}`;
    } else {
      return "Conta bloqueada por excesso de tentativas.";
    }
  };
}

// Cria uma sessão com limite de 2 tentativas
const validar = criadorDeSessao(2);
console.log(validar()); // Primeira tentativa (resta 1)
console.log(validar()); // Segunda tentativa (resta 0)
console.log(validar()); // Terceira tentativa (bloqueado)
