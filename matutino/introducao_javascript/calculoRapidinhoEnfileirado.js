function calculoRapidinho(numero) {
    return numero >= 0 ? Promise.resolve((numero * (numero + 1)) / 2) : Promise.reject("Somente números positivos, por favor");
}

calculoRapidinho(10).then((resultado) => {
    console.log(`resultado: ${resultado}`);
}).catch((erro) => {
    console.log(`erro: ${erro}`);
});

calculoRapidinho(-1).then((resultado) => {
    console.log(`resultado: ${resultado}`);
}).catch((erro) => {
    console.log(`erro: ${erro}`);
});

console.log("Esperando...");

console.log("Ainda esperando...");
