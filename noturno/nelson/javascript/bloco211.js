// Declaração de um objeto literal chamado 'pessoa' contendo propriedades de chave e valor.
let pessoa = {
  nome: "João",
  idade: 17,
};

// O acesso a propriedades de um objeto pode ser feito utilizando a notação de ponto (dot notation).
console.log("Me chamo " + pessoa.nome);

// O acesso a propriedades também pode ser feito utilizando colchetes (bracket notation), 
// o que é útil quando a chave é passada como uma string literal ou variável.
console.log("Tenho " + pessoa["idade"] + " anos");