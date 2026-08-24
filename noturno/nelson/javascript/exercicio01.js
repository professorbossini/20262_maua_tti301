// Declaração do vetor contendo as quantidades em estoque
const estoque = [15, 3, 8, 22, 1];

// Laço for clássico para percorrer o vetor do índice 0 até o seu comprimento total
for (let i = 0; i < estoque.length; i++) {
  // Verifica se o valor armazenado na posição atual (estoque[i]) é menor que 5
  if (estoque[i] < 5) {
    // Exibe no console apenas o índice da posição que atende à condição
    console.log(i);
  }
}
