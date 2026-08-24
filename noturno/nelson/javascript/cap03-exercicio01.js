// A função simula uma operação demorada (como uma consulta a banco de dados).
// Ela retorna um objeto Promise, que representa um valor que pode estar disponível 
// agora, no futuro ou nunca[cite: 1].
function verificarEstoque(produtoId, quantidadeSolicitada) {
  const estoqueDisponivel = 5;

  // Ao instanciar uma nova Promise, ela inicia no estado "Pending" (pendente)[cite: 1].
  // O construtor recebe uma função com dois parâmetros: resolve e reject[cite: 1].
  return new Promise((resolve, reject) => {
    
    // Lógica de validação do negócio
    if (quantidadeSolicitada <= estoqueDisponivel) {
      // Se a operação for bem-sucedida, chamamos "resolve"[cite: 1].
      // Isso transita a Promise do estado "Pending" para "Fulfilled" (realizada)[cite: 1].
      // O objeto passado como argumento será propagado para o bloco ".then()"[cite: 1].
      resolve({
        produtoId: produtoId,
        quantidade: quantidadeSolicitada,
        statusEstoque: "RESERVADO"
      });
    } else {
      // Se a operação falhar, chamamos "reject"[cite: 1].
      // Isso transita a Promise do estado "Pending" para "Rejected" (rejeitada)[cite: 1].
      // A mensagem de erro será capturada pelo bloco ".catch()"[cite: 1].
      reject(`Erro: Estoque insuficiente para o produto ID ${produtoId}. Solicitado: ${quantidadeSolicitada}, Disponível: ${estoqueDisponivel}`);
    }
  });
}

// Execução da função assíncrona
verificarEstoque(101, 3)
  // O bloco .then() é executado apenas se a Promise for resolvida (Fulfilled)[cite: 1].
  .then((resultado) => console.log("Sucesso no estoque:", resultado))
  // O bloco .catch() captura e trata rejeições (Rejected)[cite: 1].
  .catch((erro) => console.log("Falha no estoque:", erro));
