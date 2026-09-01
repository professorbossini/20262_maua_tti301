function consultarServico(nome, tempoEmMs, valor) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`${nome} respondeu depois de ${tempoEmMs} ms`);
            resolve(valor);
        }, tempoEmMs);
    });
}

async function consultarTudo() {
    console.time("tempo-total");

    const resultados = await Promise.all([
        consultarServico("Serviço A", 500, 10),
        consultarServico("Serviço B", 300, 20),
        consultarServico("Serviço C", 400, 30),
    ]);

    console.timeEnd("tempo-total");
    console.log("Resultados na ordem original:", resultados);
    console.log(
        "Soma dos resultados:",
        resultados.reduce((total, valor) => total + valor, 0)
    );
}

consultarTudo();
