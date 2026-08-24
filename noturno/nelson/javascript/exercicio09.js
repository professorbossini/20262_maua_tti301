// Função fábrica (factory function)
function criarContadorCliques() {
  // Variável local encapsulada no escopo externo
  let cliques = 0;
  
  // Retorna uma função interna que mantém referência à variável cliques (closure)
  return function () {
    cliques++;
    console.log(`Total de cliques: ${cliques}`);
  };
}
// Instancia o contador
const meuContador = criarContadorCliques();
meuContador(); // Incrementa e exibe 1
meuContador(); // Incrementa e exibe 2
