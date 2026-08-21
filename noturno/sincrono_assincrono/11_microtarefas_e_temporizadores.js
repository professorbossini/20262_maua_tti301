console.log("1. Início do script");

setTimeout(() => {
    console.log("4. Callback do setTimeout");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Callback da Promise");
});

console.log("2. Fim do código síncrono");
