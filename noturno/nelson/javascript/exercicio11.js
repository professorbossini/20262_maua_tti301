function contaCorrente(saldoInicial) {
// Variável privada protegida por closure
  let saldo = saldoInicial;

  // Retorna um objeto contendo métodos públicos para interagir com o saldo privado
  return {
    depositar: function (valor) {
      saldo += valor;
      return saldo;
    },
    consultarSaldo: function () {
      return saldo;
    }
  };
}

// Inicializa a conta corrente com saldo 500
const minhaConta = contaCorrente(500);
minhaConta.depositar(200); // Adiciona valor ao saldo protegido
console.log(minhaConta.consultarSaldo()); // Consulta o saldo atual
