// Funções como cidadãs de primeira classe e funções de alta ordem
// Execute com: node script8.js

console.log("=== Uma função pode ser armazenada em uma variável ===");

const umaFuncao = function () {
    console.log("Fui armazenada em uma constante.");
};

umaFuncao();

console.log("\n=== Uma função pode ser passada como argumento ===");

function executarDuasVezes(funcao) {
    funcao();
    funcao();
}

executarDuasVezes(() => console.log("Estou sendo executada."));

console.log("\n=== Uma função pode ser devolvida por outra função ===");

function criarMensagem() {
    function outraFuncao() {
        console.log("Fui criada e devolvida por criarMensagem.");
    }

    return outraFuncao;
}

const mensagemCriada = criarMensagem();
mensagemCriada();

// Também funciona assim:
criarMensagem()();

console.log("\n=== Função de alta ordem ===");
console.log(
    "executarDuasVezes recebe uma função; criarMensagem devolve uma função."
);
