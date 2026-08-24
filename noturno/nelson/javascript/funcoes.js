// function
function hello (){
    console.log('Teste')
}
hello()

function hello1 (nome){
    console.log('Oi '+ nome)
}
hello1('NOME')

function soma (x, y){
    return x+y;
}
const resultado = soma(5,3)
console.log(resultado)

const dobro = function(n){
    return n*2;
}
const res = dobro(3);
console.log(res)

const hello2 = () => console.log("Olá");
hello2();
const  dobro2 = (valor) => valor *2;
console.log(dobro2(6));

const triplo2 = (valor) => {
    return valor*3;
}
console.log(triplo2(3))