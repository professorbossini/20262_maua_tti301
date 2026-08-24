// Objeto JSON complexo contendo endereço aninhado e vetor de objetos
let livraria = {
  cnpj: "12.345.678/0001-99",
  endereco: {
    logradouro: "Avenida Paulista",
    numero: 1000,
    bairro: "Bela Vista"
  },
  livros: [
    { titulo: "Domain-Driven Design", autor: "Eric Evans", anoPublicacao: 2003 },
    { titulo: "Clean Code", autor: "Robert C. Martin", anoPublicacao: 2008 }
  ]
};

// Laço for...of para iterar de forma limpa sobre cada livro do vetor 'livros'
for (let livro of livraria.livros) {
  console.log(`Título: ${livro.titulo} | Autor: ${livro.autor} (${livro.anoPublicacao})`);
}
