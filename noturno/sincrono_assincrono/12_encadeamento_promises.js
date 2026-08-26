function esperar(tempoEmMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, tempoEmMs);
    });
}

function buscarUsuario(id) {
    return esperar(300).then(() => {
        if (id <= 0) {
            throw new Error("O id deve ser positivo.");
        }

        return {
            id: id,
            nome: "Lívia",
        };
    });
}

function buscarPedidos(usuarioId) {
    return esperar(300).then(() => [
        { id: 101, usuarioId: usuarioId, valor: 120 },
        { id: 102, usuarioId: usuarioId, valor: 80 },
        { id: 103, usuarioId: usuarioId, valor: 50 },
    ]);
}

console.log("1. Início do script");

buscarUsuario(1)
    .then((usuario) => {
        console.log(`3. Usuário encontrado: ${usuario.nome}`);
        return buscarPedidos(usuario.id);
    })
    .then((pedidos) => {
        console.log(`4. Quantidade de pedidos: ${pedidos.length}`);
        return pedidos.reduce((total, pedido) => total + pedido.valor, 0);
    })
    .then((total) => {
        console.log(`5. Valor total dos pedidos: R$ ${total}`);
    })
    .catch((erro) => {
        console.error(`Erro: ${erro.message}`);
    })
    .finally(() => {
        console.log("6. Fluxo encerrado");
    });

console.log("2. Fim do código síncrono");
