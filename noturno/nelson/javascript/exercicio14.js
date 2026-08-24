// Declaração de objeto com aninhamento de outro objeto interno
let veiculo = {
  marca: "Toyota",
  modelo: "Corolla",
  // Objeto aninhado representando as especificações do motor
  motor: {
    potencia: 177,
    tipoCombustivel: "Flex"
  }
};

// Exibe informações acessando propriedades diretas e aninhadas
console.log(`Carro: ${veiculo.marca} ${veiculo.modelo}, Motor: ${veiculo.motor.potencia}cv`);
