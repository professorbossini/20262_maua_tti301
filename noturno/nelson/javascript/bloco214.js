// Declaração de um objeto chamado 'calculadora' que armazena funções como propriedades (métodos).
let calculadora = {
  // A propriedade 'soma' utiliza uma função de seta (arrow function) para realizar a operação.
  soma: (a, b) => a + b,
  
  // A propriedade 'subtracao' utiliza uma função anônima tradicional (function expression).
  subtracao: function (a, b) {
    return a - b;
  },
};

// Invocação do método 'soma' do objeto 'calculadora' dentro de um Template Literal.
console.log(`2 + 3 = ${calculadora.soma(2, 3)}`);

// Invocação do método 'subtracao' do objeto 'calculadora' dentro de um Template Literal.
console.log(`2 - 3 = ${calculadora.subtracao(2, 3)}`);