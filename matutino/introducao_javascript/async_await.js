//callbacks => 2 problemas: inferno de callbacks + ordem dos parâmetros => promises => primeiro momento (2015): tratamento then/catch => segundo momento (2017): async/await
//async: tem significado por conta própria, pode ser usado sem await
//await: somente pode ser usado em conjunto com o async

// const fatorial = (n) => {
//   if(n < 0)
//     return Promise.reject('Valor não pode ser negativo')
//   let res = 1
//   for(let i = 2; i <= n; i++)
//     res *= i
//   return Promise.resolve(res)
// }

// const chamadaComAsyncAwait = async () => {
//   try{
//     const f1 = await fatorial(10)
//     console.log(f1)
//   }
//   catch(e){
//     console.log(`Erro: ${e}`)
//   }
//   try{
//     const f2 = await fatorial(-1)
//     console.log(f2)
//   }
//   catch(e){
//     console.log(`Erro: ${e}`)
//   }
// }
// chamadaComAsyncAwait()

// const chamadaComThenCatch = () => {
//   fatorial(10)
//   .then(res => console.log(res))
//   .catch(erro => console.log(erro))

//   fatorial(-1)
//   .then(res => console.log(res))
//   .catch(erro => console.log(erro))
// }
// chamadaComThenCatch()


// async function hello(nome){
//   return `Hello, ${nome}`
// }

// const resultado = hello('Ana')
// resultado.then(res => console.log(res))


// function hello(nome){
//   return Promise.resolve(`Oi, ${nome}`)
// }

// const resultado = hello('Ana')
// // console.log(resultado)
// resultado.then((res) => console.log(res))
// console.log('Fim')



// calculoRapidinho(10)
// .then((resultado) => {
//     console.log(`resultado: ${resultado}`);
//     calculoRapidinho(resultado)
//     .then(res2 => {
//       calculoRapidinho(res2)
//       .then(res3 => {
//         console.log(res3)
//       })
//     })
// })
// .catch((erro) => {
//     console.log(`erro: ${erro}`);
// });
