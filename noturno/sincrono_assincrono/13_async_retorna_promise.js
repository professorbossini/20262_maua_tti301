async function criarSaudacao(nome) {
    return `Olá, ${nome}!`;
}

const resultado = criarSaudacao("Lívia");

console.log("1. O retorno é uma Promise?", resultado instanceof Promise);

resultado.then((mensagem) => {
    console.log("3. Resultado da função async:", mensagem);
});

console.log("2. Fim do código síncrono");
