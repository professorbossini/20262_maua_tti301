const express = require('express')
const app = express()
//middleware
app.use(express.json())

const lembretes = {}

//GET /lembretes
app.get('/lembretes', (req, res) => {

})

//POST /lembretes
app.post('/lembretes', (req, res) => {

})

const port = 4000
app.listen(port, () => {
  console.log(`Lembretes. ${port}`)
})