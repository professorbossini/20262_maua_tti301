let calculadora = {
    soma: (a ,b ) => a + b,
    subtracao: function (a,b) {
        return a-b;
    },
};
console.log(`2+3 = ${calculadora.soma(2,3)}`);
console.log(`5-2 = ${calculadora.subtracao(5,2)}`);
