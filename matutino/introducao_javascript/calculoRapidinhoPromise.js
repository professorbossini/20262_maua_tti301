function calculoRapidinho(numero) {
    return Promise.resolve((numero * (numero + 1)) / 2);
}

calculoRapidinho(10).then((resultado) => {
    console.log(`resultado: ${resultado}`);
});

console.log("Esperando")