// A função 'umaFuncao' é declarada como exemplo conceitual.
function umaFuncao() {
  console.log("Chamando umaFuncao");
}

// Pode ser chamada assim:
umaFuncao();

/* 
 * 'f' recebe uma função como parâmetro e, por isso, 
 * é classificada como uma função de alta ordem (higher-order function).
 * Como 'g' devolve outra função, ela também se enquadra nessa categoria.
 */
function f(funcao) {
  // Verificação de segurança para mitigar os riscos da tipagem dinâmica
  if (typeof funcao === "function") {
    funcao();
  } else {
    console.log("Erro tratado: O argumento passado não é uma função.");
  }
}

function g() {
  function outraFuncao() {
    console.log("Fui criada por g");
  }
  // Retorna a definição da função interna, permitindo closures.
  return outraFuncao;
}

// 'f' pode ser chamada assim:
f(function () {
  console.log('Estou sendo passada para f');
});

// E 'g' pode ser chamada assim:
const gResult = g();
gResult();

// E assim também:
g()();

// Outros testes:

/* 
 * 'f' chama 'g', que somente devolve uma função.
 * Contudo, como 'f' executa a função recebida, 'g()' é acionada internamente,
 * mas seu retorno não é impresso.
 */
f(g);

/* 
 * 'f' chama a função devolvida por g.
 * "Fui criada por g" é exibido.
 */
f(g());

/* 
 * Teste ajustado: 'g()()' executa a função interna (imprimindo "Fui criada por g") 
 * e retorna 'undefined'. Para evitar o erro em tempo de execução, 
 * protegemos a função 'f' com a verificação de tipo acima.
 */
f(g()());

/* 
 * Teste com valor não funcional.
 * Graças à validação em 'f', o sistema lida com o valor 1 
 * de forma segura, sem travar a execução com um TypeError não tratado.
 */
f(1);