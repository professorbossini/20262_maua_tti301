const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

app.post('/eventos', async (req, res) => {
  //pegar o evento do corpo da requisição
  const evento = req.body
  console.log(evento)
  //enviar o evento para o mss de lembretes POST /eventos
  try{
    await axios.post('http://localhost:4000/eventos', evento) //resulta em promise
  }
  catch(e){
    console.log(e)
  }
  try{
    //enviar o evento para o mss de observações POST /eventos
    await axios.post('http://localhost:5000/eventos', evento)
  }
  catch(e){
    console.log(e)
  } 

  try{
    //enviar o evento para o mss de consultas POST /eventos
    await axios.post('http://localhost:6000/eventos', evento)
  }
  catch(e){
    console.log(e)
  } 

  try{
    //enviar o evento para o mss de consultas POST /eventos
    await axios.post('http://localhost:7000/eventos', evento)
  }
  catch(e){
    console.log(e)
  } 
  


  //responder com um 200 OK ao terminar
  res.status(200).json({mensagem: 'ok'})
})


const port = 10000
app.listen(port, () => {console.log(`Barramento de eventos. Porta ${port}.`)})