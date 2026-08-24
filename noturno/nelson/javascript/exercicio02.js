// Declaração do vetor de notas originais
const notas = [4.5, 7.0, 8.5, 3.0, 9.0];

// Utiliza o método filter para percorrer o vetor e filtrar os elementos
const notasAprovadas = notas.filter((n) => n >= 7.0);

// Exibe o novo vetor gerado contendo apenas as notas aprovadas
console.log(notasAprovadas);
