// let contador = 1;
// var contador = 1;

function eAgora() {
    let contador = 1;
    contador++;

    function f1() {
        console.log("f1:", contador);
    }

    function f2() {
        console.log("f2:", contador);
    }

    return { f1, f2 };
}

// dontpad.com/mamazzei

const funcoes = eAgora();
funcoes.f1();
funcoes.f2();
