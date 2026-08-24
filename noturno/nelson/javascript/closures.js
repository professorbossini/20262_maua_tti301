let umaFuncao = function(){
    console.log("F 01")
}
umaFuncao()

function f(funcao){
    funcao()
}
function g(){
    function outraFuncao(){
        console.log("F 02")
    }
    return outraFuncao
}

f(function() {
    console.log('Teste de F')
})

const gResultado = g()
console.log(gResultado)
f(g())


