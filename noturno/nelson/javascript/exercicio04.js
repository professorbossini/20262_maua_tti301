// Declaração do vetor com os nomes de usuários
const usuarios = ["Ana", "Carlos", "Amanda", "Beatriz", "Alex"];

// Utiliza o filter combinado com startsWith para reter apenas strings que começam com "A"
const apenasComA = usuarios.filter((n) => n.startsWith("A"));

// Exibe o vetor filtrado no console
console.log(apenasComA);
