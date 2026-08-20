function calculoRapidinho(numero) {
    return numero >= 0 ? Promise.resolve((numero * (numero + 1)) / 2) : Promise.reject("Número inválido: somente valores positivos, por favor");
}

calculoRapidinho(10)
.then((resultado) => {
    console.log(resultado);
})
.catch((err) => {
    console.log(err);
});

calculoRapidinho(-10)
.then((resultado) => {
    console.log(resultado);
})
.catch((err) => {
    console.log(err);
});

console.log("Não interesse se já está devolvendo como fullfilled ou rejected, o que importa é que a promisse será resolvida após o processamento das instruções síncronas existentes.");
