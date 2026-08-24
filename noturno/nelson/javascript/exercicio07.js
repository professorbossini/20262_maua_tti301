// Atribuição de uma função anônima a uma constante, utilizando parâmetro padrão (default parameter)
const gerarCodigoValidacao = function (tamanho = 6) {
  return "Código com tamanho: " + tamanho;
};

// Chamada sem parâmetros (assume o valor padrão 6)
console.log(gerarCodigoValidacao());

// Chamada passando um argumento explícito (4)
console.log(gerarCodigoValidacao(4));
