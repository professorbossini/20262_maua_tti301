const axios = require('axios')
const express = require('express')
const app = express()

//middleware
app.use(express.json())
lembretes = {};
contador = 0;

//GET /lembretes
app.get('/lembretes', (req, res) => {
  res.send(lembretes);
})

//POST /lembretes
app.post('/lembretes', async (req, res) => {
  contador++;
  const texto = req.body;
  lembretes[contador] = {
    contador, texto
  }
  await axios.post('http://localhost:10000/eventos', {
    tipo: 'LembreteCriado',
    dados: {
      contador, texto
    }
  })
  res.status(201).send(lembretes[contador]);
})

const port = 4000
app.listen(port, () => {
  console.log(`Lembretes. ${port}`)
})