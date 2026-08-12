/* Uma função pode ser atribuída a uma variável */

let umaFuncao = function () {
    console.log("Fui armazenada em uma variável");
}

umaFuncao();

function f(argumentoFuncao) {
    argumentoFuncao();
}

/* O argumento deve ser passado pela variável ou pela definicao da função */
f(umaFuncao);

f(function () {
    console.log("Função definida e passada como argumento para f na definição");
});

/* Haverá erro se na passagem do parametro eu indicar a execução */
// f(umaFuncao()); irá disparar uma mensagem de erro

function g() {
    function outraFuncao() {
        console.log("Fui criada por g");
    }
    return outraFuncao;
}

const gResult = g();
gResult();

g()();

f(g());

/* Uma função que recebe uma função como argumento, precisa que seja passada a função.
/ Nesse caso, está sendo passada a função em execução g()() e ela não serve como argumento
*/
// f(g()());

// Precisa ser passada uma função como argumento para f()
// f(1)