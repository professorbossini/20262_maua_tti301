

//Exercício 1: Criação de Promise com a função Construtora

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




//Exercício 2: Tratamento de Regras Rápidas com Retorno Imediato

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


//Exercício 3: Encadeamento de Promises

// Função auxiliar simulando a comunicação com o gateway de cartão de crédito.
function processarPagamento(dados) {
  return new Promise((resolve, reject) => {
    const pagamentoAprovado = true; 
    
    if (pagamentoAprovado) {
      resolve({
        pedidoId: Math.floor(Math.random() * 10000),
        statusFinal: "PAGAMENTO_CONFIRMADO",
        detalhes: dados
      });
    } else {
      reject("Transação recusada pela operadora de cartão.");
    }
  });
}

const itemDesejado = { id: 101, qtd: 2, valorUnitario: 450.00 };

// O encadeamento simplifica a passagem de parâmetros entre funções assíncronas[cite: 1].
verificarEstoque(itemDesejado.id, itemDesejado.qtd)
  // O primeiro .then() recebe o resultado da Promise de "verificarEstoque"[cite: 1].
  .then((dadosEstoque) => {
    console.log("Etapa 1 Concluída: Estoque confirmado.");
    dadosEstoque.valorTotal = itemDesejado.qtd * itemDesejado.valorUnitario;
    
    // Retornar a execução de "avaliarRisco" faz com que o próximo .then() 
    // aguarde a resolução desta nova Promise[cite: 1].
    return avaliarRisco(dadosEstoque);
  })
  // Este .then() recebe o resultado da Promise "avaliarRisco"[cite: 1].
  .then((dadosRisco) => {
    console.log("Etapa 2 Concluída: Antifraude aprovado.");
    
    // Retornamos a última Promise da cadeia
    return processarPagamento(dadosRisco);
  })
  // Este .then() recebe o resultado final de "processarPagamento"[cite: 1].
  .then((resultadoFinal) => {
    console.log("Etapa 3 Concluída: Pedido finalizado com sucesso!");
    console.log("Resumo da Operação:", resultadoFinal);
  })
  // O uso de um único .catch() no final da cadeia captura falhas de qualquer 
  // uma das Promises anteriores. O tratamento de resultados sempre se dá nos 
  // blocos .then() e o de erros no .catch()[cite: 1].
  .catch((erro) => {
    console.error("Falha no processamento do checkout:", erro);
  });

