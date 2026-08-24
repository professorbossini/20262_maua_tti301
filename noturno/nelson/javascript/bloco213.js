// Declaração de um objeto complexo chamado 'concessionaria' 
// contendo propriedades primitivas, um objeto aninhado ('endereco') 
// e um array de objetos ('veiculos').
let concessionaria = {
  cnpj: "00011122210001-45",
  endereco: {
    logradouro: "Rua A",
    numero: 10,
    bairro: "Vila J",
  },
  veiculos: [
    {
      marca: "Ford",
      modelo: "Ecosport",
      anoDeFabricacao: 2018,
    },
    {
      marca: "Chevrolet",
      modelo: "Onix",
      anoDeFabricacao: 2020,
    },
    {
      marca: "Volkswagen",
      modelo: "Nivus",
      anoDeFabricacao: 2020,
    },
  ],
};

// Utilização do laço de repetição 'for...of' para iterar sobre 
// cada elemento (objeto) presente no array 'concessionaria.veiculos'.
for (let veiculo of concessionaria.veiculos) {
  // Exibição dos dados de cada veículo utilizando Template Literals e notação de ponto.
  console.log(`Marca: ${veiculo.marca}`);
  console.log(`Modelo: ${veiculo.modelo}`);
  console.log(`Ano de Fabricação: ${veiculo.anoDeFabricacao}`);
}