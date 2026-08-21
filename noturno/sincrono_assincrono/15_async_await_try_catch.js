function dividir(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (b === 0) {
                reject(new Error("Não é possível dividir por zero."));
            } else {
                resolve(a / b);
            }
        }, 200);
    });
}

async function executarDivisao(a, b) {
    try {
        const resultado = await dividir(a, b);
        console.log(`${a} / ${b} = ${resultado}`);
    } catch (erro) {
        console.log(`Erro em ${a} / ${b}: ${erro.message}`);
    } finally {
        console.log(`Tentativa ${a} / ${b} encerrada.`);
    }
}

async function principal() {
    await executarDivisao(10, 2);
    await executarDivisao(10, 0);
}

principal();
