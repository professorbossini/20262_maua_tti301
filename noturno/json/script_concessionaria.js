let concessionaria = {
    cnpj: "12.345.678/0001-90",
    nome: "Concessionária Exemplo",
    endereco: {
        rua: "Avenida Principal",
        numero: 100,
        cidade: "São Paulo",
    },
    veiculos: [
        {
            marca: "Toyota",
            modelo: "Corolla",
            ano: 2020
        },
        {
            marca: "Honda",
            modelo: "Civic",
            ano: 2021
        },
        {
            marca: "Ford",
            modelo: "Focus",
            placa: "ABC-1234",
            ano: 2019,
        },
        {
            marca: "Volkswagen",
            modelo: "Gol",
            ano: 2020
        },
        {
            marca: "Chevrolet",
            modelo: "Onix",
            ano: 2021
        }
    ]
};

for (let veiculo of concessionaria.veiculos) {
    console.log(`Marca: ${veiculo.marca}, Modelo: ${veiculo.modelo}, Ano: ${veiculo.ano}, Placa: ${veiculo.placa ? veiculo.placa : "Não informada"}`);
}