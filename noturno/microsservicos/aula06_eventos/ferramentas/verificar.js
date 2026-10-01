// Diagnóstico local: não inicia servidores, não altera arquivos e não libera portas.
const net = require("node:net");
const { spawnSync } = require("node:child_process");
const { readdirSync } = require("node:fs");
const path = require("node:path");
const raiz = path.resolve(__dirname, "..");
let falhou = false;
console.log("Node:", process.version);
if (Number(process.versions.node.split(".")[0]) < 22) {
    console.error("Use Node 22 ou mais recente para este pacote.");
    falhou = true;
}
for (const pacote of ["express", "axios"]) {
    try {
        console.log(pacote + ":", require(`${pacote}/package.json`).version);
    } catch (erro) {
        console.error(`${pacote} ausente. Execute npm ci nesta pasta.`);
        falhou = true;
    }
}
for (const nome of readdirSync(raiz).filter((nome) => nome.endsWith(".js"))) {
    const resultado = spawnSync(process.execPath, ["--check", path.join(raiz, nome)]);
    if (resultado.status !== 0) {
        console.error("Sintaxe inválida:", nome, resultado.stderr.toString());
        falhou = true;
    }
}
async function conferirPorta(porta) {
    await new Promise((resolve) => {
        const servidor = net.createServer();
        servidor.once("error", () => {
            console.error(`Porta ${porta} ocupada. Encerre apenas o processo conhecido.`);
            falhou = true;
            resolve();
        });
        servidor.listen(porta, "127.0.0.1", () => {
            console.log(`Porta ${porta}: livre`);
            servidor.close(resolve);
        });
    });
}
(async () => {
    for (const porta of [4000, 5000, 6000, 7000, 10000]) await conferirPorta(porta);
    console.log(falhou ? "Há pendências. Não comece a demonstração ainda." : "Pré-requisitos conferidos.");
    process.exitCode = falhou ? 1 : 0;
})();
