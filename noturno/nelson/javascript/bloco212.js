// Declaração de um objeto literal complexo (aninhado) chamado 'pessoaComEndereco'.
let pessoaComEndereco = {
  nome: "Maria",
  idade: 21,
  // Objeto aninhado dentro da propriedade 'endereco'.
  endereco: {
    logradouro: "Rua B",
    numero: 121,
  },
};

// Utilização de Template Literals (delimitados por crases ``) para interpolação de strings.
// Demonstra diferentes formas de acessar propriedades de objetos aninhados (ponto e colchetes).
console.log(
  `Sou ${pessoaComEndereco.nome}, ` +
  `tenho ${pessoaComEndereco.idade} anos ` +
  `e moro na rua ${pessoaComEndereco.endereco["logradouro"]} ` +
  `número ${pessoaComEndereco["endereco"]["numero"]}`
);