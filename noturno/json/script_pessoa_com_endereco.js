let pessoaComEndereco = {
    nome: "Maria",
    idade: 21,
    endereco: {
        rua: "Rua das Flores",
        numero: 123,
        cidade: "São Paulo",
        estado: "SP",
    },
};

console.log(`Sou ${pessoaComEndereco.nome}, 
    tenho ${pessoaComEndereco.idade} anos 
    e moro na ${pessoaComEndereco.endereco.rua}, número ${pessoaComEndereco["endereco"]["numero"]}, na cidade de ${pessoaComEndereco.endereco.cidade}, estado ${pessoaComEndereco.endereco.estado}.`);