// Objeto JSON contendo funções armazenadas em suas propriedades (métodos)
let geometria = {
  // Método tradicional usando a palavra function
  areaQuadrado: function (lado) {
    return lado * lado;
  },
  // Método construído com arrow function
  areaRetangulo: (base, altura) => base * altura
};

// Teste da chamada do método tradicional de cálculo de área do quadrado
console.log(`Área do quadrado: ${geometria.areaQuadrado(4)}`);

// Teste da chamada da arrow function de cálculo de área do retângulo
console.log(`Área do retângulo: ${geometria.areaRetangulo(5, 3)}`);
