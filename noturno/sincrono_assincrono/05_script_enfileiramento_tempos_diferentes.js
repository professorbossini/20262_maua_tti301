function demorada(tempo) {
    console.log(`Demorada ${tempo}`);
    const atualMaisTempo = new Date().getTime() + tempo;
    while (new Date().getTime() <= atualMaisTempo);
    const d = 8 + 4;
    return d;
}

setTimeout(function () { demorada(2000) }, 2000);
setTimeout(function () { demorada(1000) }, 1000);
console.log("Fim do script principal");
