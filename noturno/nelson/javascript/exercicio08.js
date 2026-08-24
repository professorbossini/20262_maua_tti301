// Função de alta ordem que recebe um valor e uma função (callback) como parâmetros
function processarFrete(valorProduto, callback) {
  const freteBase = 20.0;
  // Executa a função callback injetada, passando o frete base e o valor do produto
  return callback(freteBase, valorProduto);
}

// Chamada da função de alta ordem fornecendo uma arrow function como callback condicional
const resultado = processarFrete(150, (frete, produto) => produto > 100 ? 0 : frete);
console.log(resultado);
