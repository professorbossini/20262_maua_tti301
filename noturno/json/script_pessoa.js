let pessoa = {
    nome: "João",
    idade: 17,
    "rg-1": "123456789",
};
// O acesso a propriedade pode ser feito com ponto
console.log("Me chamo " + pessoa.nome + " e tenho " + pessoa.idade + " anos.");

// Também pode ser feito com colchetes, usando o nome da propriedade como string
console.log("Me chamo " + pessoa["nome"] + " e tenho " + pessoa["idade"] + " anos.");

// É obrigatório usar colchetes quando o nome da propriedade não é um identificador válido, como no caso de "rg-1"
console.log("Meu RG é " + pessoa["rg-1"] + ".");
