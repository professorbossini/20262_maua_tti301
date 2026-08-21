function esperar(tempoEmMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, tempoEmMs);
    });
}

async function buscarTemperatura(cidade) {
    await esperar(300);

    return {
        cidade: cidade,
        temperatura: 24,
    };
}

async function exibirPrevisao() {
    console.log("2. A função async começou");

    const previsao = await buscarTemperatura("São Paulo");

    console.log(
        `4. Temperatura em ${previsao.cidade}: ${previsao.temperatura}°C`
    );
    console.log("5. A função async terminou");
}

console.log("1. Antes de chamar exibirPrevisao");
exibirPrevisao();
console.log("3. Depois de chamar exibirPrevisao");
