// Declaração do vetor com os valores das despesas
const despesas = [150.50, 80.00, 320.10, 45.90];

// Utiliza o método reduce para somar todos os elementos e acumular em um único valor final
const total = despesas.reduce((acumulador, valor) => acumulador + valor);

// Exibe o valor total acumulado das despesas
console.log(total);
