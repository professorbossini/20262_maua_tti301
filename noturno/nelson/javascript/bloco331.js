// Declaração da função 'calculoDemorado' que recebe um parâmetro numérico.
function calculoDemorado(numero) {
  // Retorna uma nova Promise, que representa uma operação assíncrona 
  // capaz de produzir um valor no futuro.
  return new Promise(function (resolve, reject) {
    let res = 0;
    // Validação: se o número for menor ou igual a zero, consideramos um erro
    if (numero <= 0) {
      // Rejeita a Promise passando um objeto de Erro
      return reject(new Error("O número deve ser maior que zero!"));
    }
    // Laço de repetição síncrono que acumula a soma de 1 até o valor de 'numero'.
    for (let i = 1; i <= numero; i++) {
      res += i;
    }
    
    // Quando o cálculo termina, a função 'resolve' é chamada 
    // para indicar que a Promise foi cumprida com sucesso, retornando o resultado.
    resolve(res);
  });
}

// Executa a função 'calculoDemorado' passando o argumento 10.
// Utiliza o método '.then()' para capturar o valor resolvido pela Promise de forma assíncrona.
calculoDemorado(10).then((resultado) => {
  // Exibe no console o resultado obtido (soma de 1 a 10, que resulta em 55).
  console.log(resultado);
  // Exemplo 1: Execução com erro (passando o número 0)
calculoDemorado(0)
  .then((resultado) => {
    console.log("Resultado:", resultado);
  })
  .catch((erro) => {
    // Captura o erro disparado pelo 'reject'
    console.error("Erro capturado:", erro.message);
  });
});