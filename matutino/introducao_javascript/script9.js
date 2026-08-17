//promises
//1 + 2 + 3 + ... + (n - 2) + (n - 1) + n
function calculoDemorado(numero){
  return new Promise((resolve, reject) => {
    let res = 0
    for(let i = 1; i <= numero; i++){
      res += i
    }
    resolve(res)
  })
}
//primeiro: then/catch
//depois: async/await

//callback hell
// const fs = require('fs')
// const abrirArquivo = function(nomeArquivo){
//   const exibirConteudo = function(erro, conteudo){
//     if(erro){
//       console.log(`Deu erro: ${erro}`)
//     }
//     else{
//       console.log(conteudo.toString())
//       const dobro = +conteudo.toString() * 2
//       const finalizar = function(erro){
//         if(erro){
//           console.log('Deu erro tentando salvar o dobro')
//         }
//         else{
//           console.log('Salvou o dobro com sucesso')
//         }
//       }
//       fs.writeFile('dobro.txt', dobro.toString(), finalizar)
//     }
//   }
//   fs.readFile(nomeArquivo, exibirConteudo)
// }
// abrirArquivo('arquivo.txt')
//síncrono ou bloqueante (sequencial, não paralelo)
//ambiente single threaded
// function demorada(tempo){
//   console.log(`demorada: ${tempo}`)
//   const atualMaisTempo = new Date().getTime() + tempo
//   while(new Date().getTime() <= atualMaisTempo);
//   const d = 8 + 4
//   return d
// }
// setTimeout(() => {demorada(2000)}, 2000)
// setTimeout(() => {demorada(1000)}, 1000)
// console.log('chegou ao fim do script principal')
// console.log('Começando o script principal')
// setTimeout(() => {
//   console.log('dentro da timeout')
// }, 0)

// const a = new Date().getTime() + 10000
// while(new Date().getTime() <= a);
// console.log('fora da timeout')

// function demorada(){
//   const atualMais2Segundos = new Date().getTime() + 2000
//   while(new Date().getTime() <= atualMais2Segundos);
//   const d = 8 + 4
//   return d
// }
// const a = 2 + 3
// const b = 5 + 9
// //const d = demorada()
// setTimeout(() => {
//   const d = demorada()
//   console.log(`d: ${d}`)
// }, 500)

// const e = 2 + a + b
// console.log(`e: ${e}`)
// const a = 2 + 7
// const b = 5
// console.log(a + b)
// console.log('Eu primeiro')
// console.log('Agora eu')
// console.log('Sempre vou ser a última...:(')