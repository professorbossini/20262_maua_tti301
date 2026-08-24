// Função fábrica que recebe um prefixo base
function geradorMensagemSistema(prefixo) {
  // Retorna uma função interna que utiliza o prefixo armazenado lexicalmente
  return function (texto) {
    console.log(`${prefixo} ${texto}`);
  };
}

// Cria uma instância específica para logs de erro
const logErro = geradorMensagemSistema("[ERRO]");
logErro("Falha na conexão com o banco de dados.");
