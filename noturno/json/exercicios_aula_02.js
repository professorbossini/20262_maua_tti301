// Exercícios da aula: objetos JavaScript
// Preencha os trechos marcados com TODO e execute com:
// node exercicios_aula_02.js

console.log("=== Exercício 1: objeto simples ===");

const estudante = {
    nome: "Lívia",
    idade: 20,
    curso: "Engenharia de Computação",
};

function apresentarEstudante(estudante) {
    // Devolva: "Lívia cursa Engenharia de Computação e tem 20 anos."
    // TODO
}

console.log(
    "Esperado: Lívia cursa Engenharia de Computação e tem 20 anos. | Obtido:",
    apresentarEstudante(estudante)
);

console.log("\n=== Exercício 2: acesso com colchetes ===");

const cadastro = {
    nome: "Rafael",
    "cpf-principal": "123.456.789-00",
};

function obterCpf(cadastro) {
    // Devolva o valor da propriedade "cpf-principal".
    // TODO
}

console.log("Esperado: 123.456.789-00 | Obtido:", obterCpf(cadastro));

console.log("\n=== Exercício 3: objeto aninhado ===");

const pedido = {
    numero: 101,
    cliente: {
        nome: "Ana",
    },
    entrega: {
        cidade: "São Caetano do Sul",
        estado: "SP",
    },
};

function resumirPedido(pedido) {
    // Devolva: "Pedido 101: Ana - São Caetano do Sul/SP"
    // TODO
}

console.log(
    "Esperado: Pedido 101: Ana - São Caetano do Sul/SP | Obtido:",
    resumirPedido(pedido)
);

console.log("\n=== Exercício 4: vetor de objetos ===");

const garagem = {
    veiculos: [
        { marca: "Ford", modelo: "Ka", ano: 2019 },
        { marca: "Chevrolet", modelo: "Onix", ano: 2022 },
        { marca: "Toyota", modelo: "Corolla", ano: 2021 },
    ],
};

function listarModelos(garagem) {
    // Use map para devolver somente os modelos.
    // TODO
}

console.log(
    'Esperado: ["Ka", "Onix", "Corolla"] | Obtido:',
    listarModelos(garagem)
);

console.log("\n=== Exercício 5: propriedades opcionais ===");

const frota = {
    veiculos: [
        { modelo: "Ka", placa: "ABC-1234" },
        { modelo: "Onix" },
        { modelo: "Corolla", placa: "XYZ-9876" },
    ],
};

function descreverPlacas(frota) {
    // Use map e o operador ternário para produzir:
    // ["Ka: ABC-1234", "Onix: Não informada", "Corolla: XYZ-9876"]
    // TODO
}

console.log(
    'Esperado: ["Ka: ABC-1234", "Onix: Não informada", "Corolla: XYZ-9876"] | Obtido:',
    descreverPlacas(frota)
);

console.log("\n=== Exercício 6: funções em um objeto ===");

const calculadoraExercicio = {
    multiplicacao: (a, b) => {
        // TODO
    },
    divisao: function (a, b) {
        // TODO
    },
};

console.log(
    "Esperado: 42 | Obtido:",
    calculadoraExercicio.multiplicacao(6, 7)
);
console.log(
    "Esperado: 5 | Obtido:",
    calculadoraExercicio.divisao(20, 4)
);

console.log("\n=== Desafio: combine conteúdos anteriores ===");

const biblioteca = {
    livros: [
        { titulo: "Clean Code", paginas: 464 },
        { titulo: "Refactoring", paginas: 448 },
        { titulo: "The Pragmatic Programmer", paginas: 352 },
    ],
};

function totalDePaginas(biblioteca) {
    // Use map ou reduce para devolver a soma das páginas: 1264.
    // TODO
}

console.log("Esperado: 1264 | Obtido:", totalDePaginas(biblioteca));
