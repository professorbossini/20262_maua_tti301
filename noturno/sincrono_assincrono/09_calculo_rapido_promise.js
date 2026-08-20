function calculoRapidinho(numero) {
    return Promise.resolve((numero * (numero + 1)) / 2);
}

calculoRapidinho(10).then((resultado) => {
    console.log(resultado);
});

console.log("Não interesse se já está devolvendo como fullfilled, o que importa é que a promisse será resolvida após o processamento das instruções síncronas existentes.");

