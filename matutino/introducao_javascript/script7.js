
function f() {
    let nome = "João";
    function g() {
        console.log(nome);
    }
    g();
}

// f();

function ola() {
    let nome = "João";
    return function () {
        console.log('Olá, João');
    }
}

let olaResult = ola();

// olaResult();

function saudacoesFactory(saudacao, nome) {
    return function () {
        console.log(saudacao + ", " + nome);
    }
}

let olaJoao = saudacoesFactory('Olá', 'João');
let tchauJoao = saudacoesFactory('Tchau', 'João')

olaJoao();
tchauJoao();