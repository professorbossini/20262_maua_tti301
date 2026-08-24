// Esta função demonstra como retornar Promises que já nascem em estados finais 
// (Fulfilled ou Rejected), útil quando a resposta computacional é imediata[cite: 1].
function avaliarRisco(dadosPedido) {
  
  // Validação imediata de erro.
  if (dadosPedido.valorTotal <= 0) {
    // Promise.reject() cria uma Promise já no estado "Rejected"[cite: 1].
    // O código cliente que consumir esta função cairá diretamente no bloco .catch()[cite: 1].
    return Promise.reject("Erro de validação: O valor do pedido deve ser maior que zero.");
  }

  // Regra de análise sem necessidade de processamento demorado.
  if (dadosPedido.valorTotal <= 5000) {
    // Promise.resolve() cria uma Promise já no estado "Fulfilled"[cite: 1].
    // O valor passado é entregue imediatamente ao próximo .then() da cadeia[cite: 1].
    return Promise.resolve({
      ...dadosPedido,
      risco: "BAIXO",
      statusRisco: "APROVADO"
    });
  } else {
    // Rejeição imediata baseada na regra de negócio de limite de valor.
    return Promise.reject(`Alerta Antifraude: Transação com valor de R$ ${dadosPedido.valorTotal} excede o limite permitido.`);
  }
}

// Teste isolado da função de risco
avaliarRisco({ produtoId: 101, quantidade: 3, valorTotal: 1200.00 })
  .then((resultado) => console.log("Risco Aprovado:", resultado))
  .catch((erro) => console.log("Risco Rejeitado:", erro));
