// Declaração da função 'calculoRapidinho' que valida o número de entrada.
function calculoRapidinho(numero) {
  // Utiliza o operador ternário para verificar se o número é maior ou igual a zero.
  return numero >= 0
    // Se for positivo ou zero, retorna uma Promise resolvida com o cálculo da PA.
    ? Promise.resolve((numero * (numero + 1)) / 2)
    // Se for negativo, retorna uma Promise rejeitada com uma mensagem de erro descritiva.
    : Promise.reject("Somente valores positivos, por favor");
}

// Primeira chamada da função passando o valor positivo 10.
calculoRapidinho(10)
  .then((resultado) => {
    // Como a Promise é resolvida com sucesso, este bloco é executado, exibindo 55 no console.
    console.log(resultado);
  })
  .catch((err) => {
    // Ignorado neste fluxo, pois não houve erro.
    console.log(err);
  });

// Segunda chamada da função passando o valor negativo -1.
calculoRapidinho(-1)
  .then((resultado) => {
    // Ignorado neste fluxo, pois a Promise foi rejeitada.
    console.log(resultado);
  })
  .catch((err) => {
    // Como a Promise foi rejeitada, este bloco catch é acionado, 
    // exibindo a mensagem "Somente valores positivos, por favor" no console.
    console.log(err);
  });

/* 
 * Instrução síncrona principal:
 * Esta linha é executada imediatamente após o agendamento das Promises, 
 * exibindo "esperando..." no console antes que os resultados assíncronos das microtasks sejam processados.
 */
console.log("esperando...");