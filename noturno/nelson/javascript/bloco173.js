// A função 'ola' é declarada. Ela cria um escopo local com a variável 'nome'.
function ola() {
  let nome = 'João';
  
  // 'ola' retorna uma função anônima que faz referência à variável 'nome'.
  return function () {
    // Nota didática: aqui a string está hardcoded ('Olá, João'), 
    // mas a função mantém o vínculo com o escopo léxico onde foi criada.
    console.log('Olá '+ nome);
  };
}

// A função 'ola' é executada e seu retorno (a função interna) é armazenado em 'olaResult'.
let olaResult = ola();

/* 
 * Conceito de Closure:
 * Perceba que aqui a execução da função 'ola' já foi finalizada e seu escopo 
 * deveria, em tese, ser limpo da memória. Contudo, como a função retornada 
 * precisa da variável 'nome', o JavaScript cria uma Closure (fechamento), 
 * preservando o acesso ao ambiente léxico onde ela nasceu.
 */
olaResult();

// Também é possível aplicar o mesmo conceito utilizando parâmetros:
// 'saudacoesFactory' atua como uma fábrica de funções (Function Factory).
function saudacoesFactory(saudacao, nome) {
  // Retorna uma função fechada (closure) que "lembra" dos argumentos 
  // passados para a função externa, mesmo após o término dela.
  return function () {
    console.log(saudacao + ', ' + nome);
  };
}

// Instanciação de funções especializadas através da fábrica:
let olaJoao = saudacoesFactory('Olá', 'João');
let tchauJoao = saudacoesFactory('Tchau', 'João');

// Cada função gerada preserva seu próprio estado e contexto (closure independente).
olaJoao();
tchauJoao();